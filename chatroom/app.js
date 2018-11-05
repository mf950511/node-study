var express = require('express')
var app = express()
var http = require('http').Server(app)

var io = require('socket.io')(http)
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


var alluser = []

app.set('view engine', 'ejs')

app.get('/', (req, res,next) => {
  res.render('index')
})
// 确认登陆，检查此人是否有用户名
app.get('/check', (req, res, next) => {
  var username = req.query.username
  if(!username) {
    res.send('必须填写用户名')
    return
  }
  if(alluser.indexOf(username) != -1) {
    res.send('用户名已被占用')
    return
  }
  alluser.push(username)
  req.session.username = username
  res.redirect('/chat')
})

app.get('/chat', (req, res) => {
  if(!req.session.username) {
    res.redirect('/')
    return
  }
  res.render('chat', {
    username: req.session.username
  })
})

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    io.emit('chat', msg)
  })
})

http.listen(3000)

