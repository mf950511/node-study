var http = require('http')
var fs = require('fs')
var server = http.createServer(function(req,res){
  if(req.url === '/fang'){
    fs.readFile('./test.html',(err,data) =>{
      res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
      res.end(data)
    })
  }else if(req.url === '/test2'){
    fs.readFile('./test2.html',(err,data) =>{
      res.writeHead(200,{'Content-Type': 'text/html;charset=UTF-8'})
      res.end(data)
    })
  }else if(req.url ==='/a.png') {
    fs.readFile('../image/1.png',(err,data) => {
      res.writeHead(200,{'Content-Type': 'image/png'})
      res.end(data)
    })
  }else if(req.url === '/test.css') {
    fs.readFile('./css.css',(err,data) => {
      res.writeHead(200,{'Content-Type':'text/css'})
      res.end(data)
    })
    
  }
  else{
    res.writeHead(404,{'Content-type':'text/html;charset=UTF-8'})
    res.end('未找到该页面')
  }
  
})
server.listen(3000,'127.0.0.1')