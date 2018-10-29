var express = require('express')
var app = express()
app.set('view engine', 'ejs')
app.get('/',(req, res) => {
  res.render('form')
})
app.post('/', (req, res) => {
  res.send('成功')
})
app.listen(3000)