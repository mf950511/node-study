var http = require('http')
var server = http.createServer((req,res)=>{
  console.log('当前访问路由为：'+req.url)
  res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
  res.write('<h1>我是主标题一</h1>')
  res.write('<h2>我是主标题二</h2>')
  res.end('<h1>我是主标题</h1>')
})
server.listen(3000,'127.0.0.1')