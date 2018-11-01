var express = require('express')
var app = express()
var BodyParser = require('body-parser')
var db = require('./models/db')
var md5 = require('./models/md5')
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(BodyParser.json())

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/',(req, res) => {
  if(req.session.login) {
    res.send(`登陆成功，欢迎${req.session.username}`)
  } else {
    res.send(`请登录`)
  }
})

app.get('/login',(req, res) => {
  res.render('login')
})

app.post('/doLogin', (req, res) => {
  let {username, password} = req.body
  password = md5(md5(password))
  db.findSome('users', {name: username}, (err, result) => {
    if(result.length === 0) {
      res.json({
        code: -1,
        msg: '用户名错误'
      })
      return
    }
    if(password === result[0].password) {
      req.session.login = true
      req.session.username = result[0].name
      res.json({
        code: 1,
        msg: '登陆成功'
      })
    }else {
      res.json({
        code: -1,
        msg: '密码错误'
      })
    }

  })
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/doRegister',(req, res) => {
  let {username, password} = req.body
  password = md5(md5(password))
  db.insertOne('users', {name: username, password: password}, (err, result) => {
    if(err) {
      res.json({
        code: -1,
        msg: '注册失败'
      })
    }
    res.json({
      code: 1,
      msg: '注册成功，请登录',
      result
    })
  })
})


app.listen(3000)