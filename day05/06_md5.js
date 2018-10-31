var express = require('express')
var app = express()
var db = require('./models/db')
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'ejs')

app.get('/',(req, res) => {
  if(req.session.login) {
    res.send('欢迎您' + req.session.username)
  }else {
    res.send('请登录')
  }
})

app.get('/login',(req, res) => {
  res.render('login')
})

app.get('/checkLogin',(req,res) => {
  let {username, password} = req.query
  db.findSome('users', {name: username}, (err, result) => {
    if(result.length === 0) {
      res.send('用户名错误')
      return
    }
    var queryPassword = result[0].password
    if(password === queryPassword) {
      req.session.login = true
      req.session.username = username
      res.send('登陆成功，欢迎' + username)
    }else{
      res.send('密码错误')
    }
  })
})

app.listen(3000)