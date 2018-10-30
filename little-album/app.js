var express = require('express')
var app = express()
var router = require('./controller/router')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false})
// 设置模板引擎
app.set('view engine', 'ejs')

// 路由中间件
// 静态页面
// app.use('/static', express.static('./public'))
app.use(express.static('./public'))
app.use(express.static('./uploads'))
// 首页
app.get('/', router.showIndex)

app.get('/:albumName', router.showAlbum)

app.get('/up', router.showUp)

app.post('/up', router.doPost)

app.post('/createFolder',urlencodedParser, router.createFodler)

app.use((req, res) => {
  res.render('err')
})

app.listen(3000)