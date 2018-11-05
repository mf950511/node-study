var express = require('express')
var app = express()
var router = require('./router/router')
var db = require('./models/db')

app.set('view engine', 'ejs')

app.get('/', router.showIndex)
app.get('/add', router.showAdd)
app.get('/doAdd', router.doAdd)

app.get('/edit/:id', router.showEdit)
app.get('/doEdit/:sid', router.doEdit)

app.listen(3000)