var http = require('http')
var fs = require('fs')
var server = http.createServer((req, res) => {
  if(req.url === '/') {
    fs.readFile('./public/index.html', (err,data) => {
      res.writeHead(200, {'Content-type': 'text/html;charset=UTF8'})
      res.end(data)
    })
  }
})

var io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('1个客户端连接了')
  socket.on('ask', (ask) => {
    console.log('本服务器收到一个信息：' + ask)
    socket.emit('answer', ask)  //服务器点对点回应
    // io.emit('answer', ask)  //服务器广播
  })
})

server.listen(3000, '127.0.0.1')
