var http = require('http')
var url = require('url')
var server = http.createServer((req,res)=>{
  let path = url.parse(req.url).pathname
  let query = url.parse(req.url, true).query
  console.log(query)
  res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
  res.end(`姓名：${query.name}性别：${query.sex}年龄：${query.age}`)
})
server.listen(3000,'127.0.0.1')