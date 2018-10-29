var express = require('express')
var app = express()
var router = require('./controller/router')
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

app.use((req, res) => {
  res.render('err')
})

app.listen(3000)