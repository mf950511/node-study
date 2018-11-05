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
app.use('/avator', express.static('./avator'))

app.get('/',router.showIndex)
app.get('/session', router.getSession)
app.get('/register', router.showRegister)
app.post('/doRegister', router.doRegister)

app.get('/login', router.showLogin)
app.post('/doLogin', router.doLogin)

app.get('/setAvator', router.showSetAvator)
app.post('/setAvator', router.setAvator)

app.post('/docut', router.docut)

app.post('/postArticle', router.postArticle)
app.get('/articleList', router.getArticleList)


app.listen(3000)