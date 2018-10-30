var express = require('express')
var app = express()

var db = require('./models/db')

app.get('/', (req,res) => {
  db.insertOne('teacher', {
    name: '李文辉',
    age: '41'
  },(err, result) => {
    if(err) {
      res.send('链接数据库失败')
      return
    } 
    res.send('插入成功')
  })
})

app.listen(3000)