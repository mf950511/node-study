var http = require('http')
var fs = require('fs')
var server = http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF8'})
  fs.readFile('./1.txt',{'charset': 'utf-8'},(err,data)=>{
    if(err) {
      throw err
    }
    res.end(data)
  })
})
server.listen(3000, '127.0.0.1')