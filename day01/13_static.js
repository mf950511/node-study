var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var server = http.createServer((req,res)=>{
  var areaPath = url.parse(req.url).pathname
  if(areaPath === '/'){
    areaPath = 'index.html'
  }
  var extname = path.extname(areaPath)
  fs.readFile('../static/' + areaPath,(err,data) => {
    if(err) {
      // 若该文件不存在，则访问404
      fs.readFile('../static/404.html',(err, data) => {
        res.writeHead(404, {'Content-Type': 'text/html;charset=UTF8'})
        res.end(data)
      })
      return
    }
    fs.readFile('../static/mime.json',(err,data1) => {
      data1 = JSON.parse(data1)
      res.writeHead(200,{'Content-Type': data1[extname] || 'text/plain'})
      res.end(data)
    })

    
  })
})
server.listen(3000, '127.0.0.1')