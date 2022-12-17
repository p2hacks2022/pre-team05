const { Server } = require("socket.io");
const position = require("./position");
const db = require('./connect_to_db')

const io = new Server({
  cors: {
    origin: "*"
  }
})

io.on('connection', async (socket) => {

  // 2人以上になったら拒否
  const user_keys = await db.getUsersKeys()
  .catch((err) => {
    console.error(err)
    return
  })
  const user_count = user_keys.length
  if(user_count >= 2) {
    socket.disconnect()
    return
  }

  // オブジェクトを複製
  await db.addUser(socket.id)
  console.log('User connected')

  socket.on('position', async (lat, lon) => {
    console.log('Position received from ' + socket.id + ' lat: ' + lat + ' lon:' + lon)
    let user = await db.getUser(socket.id)
    user = {
      position: {
        lat: lat,
        lon: lon
      },
      flag: true
    }
    await db.changeUser(socket.id, user)

    // 全ユーザーにフラグが立ってるかを確かめる
    let count = 0
    const usersKeys = await db.getUsersKeys()
    const users = await db.getUsers()
    usersKeys.forEach((key) => {
      if(users[key]['flag']) count++
    })
    if(count >= 2) { // 全ユーザーにフラグが立った
      emitEachUsersDistance()
    }
  })

  socket.on('disconnect', async () => {
    await db.deleteUser(socket.id).then(() => {
      console.log('User disconnected')
    })
  })

})

const emitEachUsersDistance = async () => {
  const usersKeys = await db.getUsersKeys()
  const users = await db.getUsers()
  .catch(() => {console.error('Connection Error!'); return})

  const user0 = users[usersKeys[0]].position
  const user1 = users[usersKeys[1]].position

  let d, phai

  console.log('to: ' + usersKeys[0]);
  [d, phai] = position(user0.lon, user0.lat, user1.lon, user1.lat)
  console.log(d, phai)
  io.to(usersKeys[0]).emit('distance', d, phai)

  console.log('to: ' + usersKeys[1]);
  [d, phai] = position(user1.lon, user1.lat, user0.lon, user0.lat)
  console.log(d, phai)
  io.to(usersKeys[1]).emit('distance', d, phai)

  // ユーザーのフラグをfalseに戻す
  for(let key of usersKeys) {
    db.changeUserFlag(key, false)
  }
}

setInterval(() => {
  io.emit('signal')
}, 1000 * 5)

db.openRedis().then(async () => {
  await db.deleteAllUser().catch(e => console.error(e))
  console.log('Listening on 3000...')
  io.listen(3000)
})
.catch(() => {
  console.log('Cannot connect to Redis')
  return
})
