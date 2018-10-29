var http = require('http')
var formidable = require('formidable')
var server = http.createServer((req,res) => {
  console.log(req.url)
  if(req.url === '/dopost' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm
    // 设置附件上传存放位置
    form.uploadDir = './uploads'
    form.parse(req, (err, fileds, files)=>{
      console.log(fileds)
      console.log(files)
      // res.write('received upload:\n\n')
      res.writeHead(200,{'Content-Type': 'text/html;charset=UTF8'})
      res.end('success')
    })
  }
})
server.listen(3000, '127.0.0.1')