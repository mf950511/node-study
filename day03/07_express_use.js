var express = require('express')
var app = express()
app.use('/',(req, res, next) => {
  res.write(new Date().toString())
  next()
})
app.use('/admin',(req, res, next) => {
  res.write(req.originalUrl + '\n')
  res.write(req.path + '\n')
  res.write(req.baseUrl + '\n')
  res.end('你好')
})
app.use((req,res)=>{
  // 因为没有页面可以接到这个请求，所以到这一步返回直接是404
  res.send('您的页面找不到了')
})
app.listen(3000)