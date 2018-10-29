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
app.listen(3000)