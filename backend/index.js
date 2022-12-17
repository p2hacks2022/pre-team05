const { Server } = require("socket.io");
const position = require("./position");

const io = new Server({
  cors: {
    origin: "*"
  }
})

var users = {}

const user_default = {
  position: {
    lat: 0.0,
    lon: 0.0
  },
  flag: false
}

io.on('connection', (socket) => {

  // 2人以上になったら拒否
  console.log(Object.keys(users).length)
  if (Object.keys(users).length >= 2) {
    socket.disconnect()
    return;
  }

  console.log('User connected')

  // オブジェクトを複製
  users[socket.id] = JSON.parse(JSON.stringify(user_default))

  socket.on('position', (lat, lon) => {
    users[socket.id] = {
      position: {
        lat,
        lon
      },
      flag: true
    }
    if(judgeAllUsersSent()) {
      emitEachUsersDistance()
    }
  })


  socket.on('disconnect', () => {
    delete users[socket.id]
  })

})

const judgeAllUsersSent = () => {
  setTimeout(() => {
    let count = 0;

    // 全ユーザーにフラグが立ってるかを確かめる
    for (let user in users) {
      if (user.flag) {
        count++;
      }
    }
    return count >= 2
  }, 1000)
}

const emitEachUsersDistance = () => {
  let user0 = users[0]
  let user1 = users[1]

  let d, phai

  [d, phai] = position(user0.position.lat, user1.position.lat, user0.position.lon, user1.position.lon)
  io.to(Object.keys(users)[0]).emit('distance',d,phai)

  [d, phai] = position(user1.position.lat, user0.position.lat, user1.position.lon, user0.position.lon)
  io.to(Object.keys(users)[1]).emit('distance',d,phai)

  // ユーザーのフラグをfalseに戻す
  for (let user in users) {
    user.flag = false
  }
}

setInterval(() => {
  io.emit('signal')
}, 1000 * 5)

console.log('Listening on 3000...')
io.listen(3000)
