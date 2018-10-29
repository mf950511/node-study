var http = require('http')
var fs = require('fs')
var server = http.createServer((req,res) => {
  // 检测该路径下为文件还是文件夹
  var wenjianjia = []
  fs.readdir('../album', (err, files) => {
    var length = files.length
    for(var i = 0;i<length;i++){
      var file = files[i]
      // 因为文件检测的异步性，第一个文件为检测完就会将file替换为第二个，检测出来的结果与要检测的文件不符
      fs.stat(`../album/${file}`,(err,data)=>{
        if(data.isDirectory()){
          wenjianjia.push(data)
          console.log(wenjianjia)
        }
      })
    }
  })
})
server.listen(3000, '127.0.0.1')