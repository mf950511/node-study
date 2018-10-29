var http = require('http')
var fs = require('fs')
var server = http.createServer((req,res) => {
  // 检测该路径下为文件还是文件夹
  fs.stat('../album/aaa',(err,data) => {
    console.log(data.isDirectory())
    res.end()
  })
})
server.listen(3000, '127.0.0.1')