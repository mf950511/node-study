var http = require('http')
var ejs = require('ejs')
var fs = require('fs')
var pathUtil = require('path')
var url = require('url')
var server = http.createServer((req, res) => {
  var areaurl = url.parse(req.url).pathname
  if(areaurl === '/admin') {
    fs.readFile(__dirname + '/file.html',(err,data) =>{
      if(err) {
        throw err
      }
      res.writeHead(200, {'Content-Type': 'text/html;charset=UTF8'})
      res.end(data)
    })
  } else if(areaurl === '/') {
    fs.readdir(__dirname+'/../album',(err, files) => {
      var length = files.length
      var wenjianjia = []
      function iterator(i){
        if(i === length) {
          fs.readFile(__dirname +'/albumlist.ejs',(err, data) => {
            var template = data.toString()
            var config = {
              album: wenjianjia,
              fileType: 'folder'
            }
            var html = ejs.render(template, config)
            res.writeHead(200, {'Content-type':'text/html;charset=UTF8'})
            res.end(html)
          })
          return
        }
        fs.stat(__dirname+'/../album' + '/' + files[i],(err, data) => {
          if(data.isDirectory()) {
            wenjianjia.push(files[i])
          }
          
        })
        iterator(i+1)
      }
      iterator(0)
    })
  } else {
    if(pathUtil.extname(areaurl) === '') {
      
      fs.readdir(__dirname+'/../album/' + areaurl,(err,files) => {
        var length = files.length
        var wenjianjia = []
        if(length === 0) {
          fs.readFile(__dirname +'/albumlist.ejs',(err, data) => {
            var template = data.toString()
            var config = {
              album: wenjianjia,
              fileType: 'file'
            }
            var html = ejs.render(template, config)
            res.writeHead(200, {'Content-type':'text/html;charset=UTF8'})
            res.end(html)
          })
          return
        }
        function iterator(i){
          if(i === length) {
            fs.readFile(__dirname +'/albumlist.ejs',(err, data) => {
              var template = data.toString()
              var config = {
                album: wenjianjia,
                fileType: 'file'
              }
              var html = ejs.render(template, config)
              res.writeHead(200, {'Content-type':'text/html;charset=UTF8'})
              res.end(html)
            })
            return
          }
          fs.stat(__dirname + '/../album' + areaurl + '/' + files[i],(err, data) => {
            
            if(!data.isDirectory()) {
              wenjianjia.push(files[i])
            }
          })
          iterator(i+1)
        }
        iterator(0)
      })
    }else{
      fs.readFile(__dirname + '/../album' + areaurl, (err, data) =>{
        var extname = pathUtil.extname(areaurl)
        getExtname(extname, (content)=>{
          res.writeHead(200, {'Content-type':content})
          res.end(data)
        })
      })
    }
  }
})

function getEjs(files, type){
  var length = files.length
  var wenjianjia = []
  function iterator(i){
    if(i === length - 1) {
      fs.readFile(__dirname +'/albumlist.ejs',(err, data) => {
        var template = data.toString()
        var config = {
          album: wenjianjia,
          fileType: type
        }
        var html = ejs.render(template, config)
        res.writeHead(200, {'Content-type':'text/html;charset=UTF8'})
        res.end(html)
      })
      return
    }
    fs.stat(fileurl + '/' + files[i],(err, data) => {
      wenjianjia.push(data)
    })
    iterator(i+1)
  }
  iterator(0)
}

function getExtname(extname, callback){
  fs.readFile(__dirname+'/../static/mime.json', (err, data) => {
    data = JSON.parse(data)
    callback(data[extname])
  })
}
server.listen(3000, '127.0.0.1')