var http = require('http')
var router = require('./router')
var server = http.createServer((req,res)=> {
  if(req.url === '/') {
    router.showIndex(req,res)
  }else if(req.url.substr(0, 9) === '/student/') {
    router.showStudent(req, res)
  }else{
    router.show404(req, res)
  }
})
server.listen(3000, '127.0.0.1')