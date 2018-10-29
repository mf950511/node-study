var express = require('express')
var app = express()
var a = 100
app.get('/',(req, res, next) => {
  a++
  console.log(1)
  res.send(a.toString())
  next()
})
app.get('/',(req, res) => {
  console.log(2)
})


app.get('/admin/login',(req, res) => {
  res.send('管理员登陆')
})

app.get('/:username/:id',(req, res) => {
  res.send('当前登陆用户'+req.params.username)
})
app.listen(3000)