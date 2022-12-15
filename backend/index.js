const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin:"*"
  }
})

io.on('connection', (socket) => {
  console.log('User connected')
})

setInterval(() => {
  io.emit('signal')
  // console.log('Signaled!')
//}, 1000 * 5)
}, 1000 * 10)

io.listen(3000)