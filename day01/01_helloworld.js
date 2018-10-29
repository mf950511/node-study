var http = require('http')
var server = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
  res.end('哈啊哈哈，我的第一个node页面')
})
server.listen(3000,'127.0.0.1')