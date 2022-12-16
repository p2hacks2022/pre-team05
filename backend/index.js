const { Server } = require("socket.io");
//Server という変数にsocket.ioっていう関数の機能みたいなものを突っ込んでる...?

const io = new Server({
  cors: {
    origin: "*"
  }
}) //インスタンス生成

let rooms = new Object();

io.on('connection', (socket) => {
  console.log('User connected')
  socket.join()
})

var lat = 0;
var lon = 0;
const r = 6378.137;//赤道半径

io.on('position', (x,y) => {
  //つながっているのが前つながった人と異なるかどうかを判断する
  //同じの場合は何もしない
  //1回目の受け取りならばその値(lat,lon)、比較Idをどこかに記憶しておく

  //異なる場合を判定 if (lon != x1 && lat != y1) {

  let d, phai; //dが距離, phaiが方位角

  d = r * Math.acos(Math.sin(y1) * Math.sin(lat) + Math.cos(y1) * Math.cos(lat) * Math.cos(lon - x1));
  //2点間の（地表面上での）最短距離

  phai = 90 - Math.atan(Math.sin(x1 - lon) / (Math.cos(y1) * Math.tan(lat) - Math.sin(y1) * Math.cos(x1 - lon)));
  //（ｘ1，ｙ1）から（lon，lat）への方位角。　方位角は北:0度、東:90度、南:180度、西:270度。

  socket.emit('distance', 100, 100);//d,phaiの情報を返す
  console.log('deb1');
  //ここ軽率に'connection'にしてるけどちがうかも
  //ここでどういうシグナルを受けたときに返すのか考えたい
})

setInterval(() => {
  io.emit('signal')
  // console.log('Signaled!')
}, 1000 * 5)

console.log('Listening on 3000...')
io.listen(3000)
