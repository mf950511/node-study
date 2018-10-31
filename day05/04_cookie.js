var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/',(req, res) => {
  res.cookie('name', '小明', {maxAge: 60 * 1000 * 2 * 60, httpOnly: true})
  res.send('访问成功')
})

app.get('/test', (req, res) => {
  console.log(req.cookies.name)
  res.send(`访问成功${req.cookies.name}`)
})

app.listen(3000)