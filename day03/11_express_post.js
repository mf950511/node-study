var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs')
// 通过表单提交的
app.use(bodyParser.urlencoded({extended: false}))
// 通过json提交的
// app.use(bodyParser.json())
app.get('/',(req, res) => {
  res.render('form')
})

app.post('/',(req, res) => {
  console.log(req.body)
  res.send()
})
app.listen(3000)