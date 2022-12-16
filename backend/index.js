const { Server } = require("socket.io");

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
  console.log('User connected')

  // オブジェクトを複製
  user_info[socket.id] = Object.assign({}, user_default)

  socket.on('position', (lat, lon) => {
    user_info[socket.id] = {
      position: {
        lat,
        lon
      },
      flag: true
    }
  })

  socket.on('join', (room) => {
    // ユーザーが複数のルームに入らないように制御
    if(socket.rooms.size() > 0) {
      for(let joinedRoom in socket.rooms) {
        socket.leave(joinedRoom)
      }
    }
    socket.join(room)
  })

  socket.on('leave', () => {

  })

})

io.on('position', () => {

})

setInterval(() => {
  io.emit('signal')
}, 1000 * 5)

console.log('Listening on 3000...')
io.listen(3000)
