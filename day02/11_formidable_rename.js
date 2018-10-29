var http = require('http')
var formidable = require('formidable')
var util = require('util')
var sd = require('silly-datetime')
var pathUtil = require('path')
var fs = require('fs')
var server = http.createServer((req, res) =>{
  if(req.url === '/dopost' && req.method.toLowerCase() === 'post') {
    var form = formidable.IncomingForm()
    form.uploadDir = './uploads'
    form.parse(req, (err, fileds, files) => {
      if(err) {
        throw err
      }
      console.log(util.inspect({fileds, files}))
      let {name, path} = files.img
      let ran = sd.format(new Date(), 'YYYYMMDDHHmm') + Math.round((Math.random() * 89999 + 10000))
      let extname = pathUtil.extname(name)
      name = ran + extname
      console.log(ran)
      let oldPath = __dirname + '/' + path
      let newpath = __dirname + '/uploads/' +  name
      fs.rename(oldPath, newpath, ()=>{
        res.writeHead(200, {'Content-Type':'text/html;charset=UTF8'})
        res.end('success')
      })
      
    })
  }else if(req.url === '/') {
    fs.readFile('./post.html',(err,data) => {
      if(err) {
        throw err
      }
      res.writeHead(200, {'Content-type': 'text/html;charset=UTF8'})
      res.end(data)
    })
    
  }
})
server.listen(3000, '127.0.0.1')