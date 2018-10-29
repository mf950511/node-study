var http = require('http')
var fs = require('fs')
var server = http.createServer((req,res) => {
  // 检测该路径下为文件还是文件夹
  fs.readdir('../album', (err, files) => {
    var length = files.length
    var wenjianjia = []
    
    function iterator(i){
      if(i === files.length){
        console.log(wenjianjia)
        return
      }
      fs.stat(`../album/${files[i]}`,(err,data) => {
        if(data.isDirectory()) {
          wenjianjia.push(files[i])
        }
        iterator(i+1)
      })
    }
    iterator(0)
  })
})
server.listen(3000, '127.0.0.1')