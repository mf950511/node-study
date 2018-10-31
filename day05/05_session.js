var express = require('express')
var app = express()
var session = require('express-session')

// 配置session属性
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/',(req, res) => {
  if(req.session.login) {
    res.send('欢迎你' + req.session.userName)
  } else {
    res.send('你没有登陆')
  }

})

app.get('/login', (req, res) => {
  req.session.login = true
  req.session.userName = '考拉'
  res.send('您已成功登陆')
})

app.listen(3000)