var express = require('express')
var app = express()
var router = require('./router/router')

app.set('view engine', 'ejs')

app.get('/', router.shoeIndex)

app.get('/add', router.addBook)

app.get('/doAdd', router.doAdd)
app.get('/edit/:id', router.showEdit)

app.listen(3000)