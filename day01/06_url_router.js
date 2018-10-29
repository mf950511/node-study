var http = require('http')
var server = http.createServer((req,res)=>{
  var url = req.url
  res.writeHead(200,{'Content-type': 'text/html;charset=UTF-8'})
  if(url.substr(0,9) === '/student/'){
    var studentId = url.substr(9)
    console.log(studentId)
    if(/^\d{10}$/.test(studentId)) {
      res.end('您要查询的学生学号为：'+studentId)
    }else{
      res.end('您要查询的学生学号位数不对')
    }
  }else if(url.substr(0,9) === '/teacher/') {
    var teacherId = url.substr(9)
    if(/^\d{8}$/.test(teacherId)) {
      res.end('您要查询的老师工号为：'+teacherId)
    }else{
      res.end('您要查询的老师工号位数不对')
    }
  }else{
    res.end('请检查你的地址输入')
  }
})
server.listen(3000, '127.0.0.1')