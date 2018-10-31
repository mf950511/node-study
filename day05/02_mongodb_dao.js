var express = require('express')
var app = express()

var db = require('./models/db')
// 新增
app.get('/', (req,res) => {
  db.insertOne('teacher', {
    name: '李文辉' + parseInt(Math.random() * 899 + 1000),
    age: parseInt(Math.random() * 100 + 99)
  },(err, result) => {
    if(err) {
      res.send('链接数据库失败')
      return
    } 
    res.send('插入成功')
  })
})
// 查找
app.get('/du',(req, res) => {
  var page = parseInt(req.query.page) || 0
  db.findSome('teacher',{}, {pageSize: 4, page: page},(err, result) => {
    if(err) {
      res.send('数据库连接失败')
      return
    } 
    res.json(result)
  })
})
// 删除
app.get('/shan',(req, res) => {
  var name = req.query.name
  db.deleteMany('teacher', {name: name}, (err, results) => {
    if(err){
      res.send('删除失败')
      return
    }
    res.json(results)
  })
})
// 更新
app.get('/update',(req, res) => {
  db.updateMany('teacher', {age: 99}, {$set: {age: parseInt(Math.random() * 89 + 10)}}, (err, results) => {
    if(err) {
      res.send('修改失败')
      return
    }
    res.send(results)
  })
})
app.listen(3000)