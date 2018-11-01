var express = require('express')
var app = express()
var ejs = require('ejs')
var router = require('./router/router')
var bodyParser = require('body-parser')
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.engine('.html', ejs.__express)

app.set('view engine', 'html')

app.use(express.static('./public'))

app.get('/',router.showIndex)
app.get('/register', router.showRegister)

app.post('/doRegister', router.doRegister)


app.listen(3000)