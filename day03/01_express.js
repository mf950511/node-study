var express = require('express')
var app = express()
app.get('/',(req, res) => {
  res.send('哈哈哈')
})
app.get('/haha',(req ,res) => {
  res.send('我是啊哈哈哈页面')
})
app.get(/^\/student\/([\d]{10})$/,(req ,res) => {
  res.send(`我是学生${req.params[0]}`)
})
app.get('/teacher/:gonghao',(req, res) => {
  res.send(`我是老师，工号为${req.params.gonghao}`)
})
app.listen(3000)