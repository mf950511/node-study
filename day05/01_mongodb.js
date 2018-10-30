var express = require('express')
var app = express()

// 链接mongodb
var MongoClient = require('mongodb').MongoClient


app.get('/',(req, res) => {
  // 假如数据库不存在，则会自动创建
  var url = 'mongodb://47.104.71.163:27017'
  MongoClient.connect(url, (err, db) => {
    // 连接成功做的事
    if(err) {
      console.log('数据库连接失败')
      return
    }
    db = db.db('itcase')
    console.log('数据库连接成功')
    db.collection('student').insertOne({
      name: '哈哈',
      age: parseInt(Math.random() * 100 + 10)
    },(err, result) => {
      console.log(result)
      res.send(result)
      db.close()
    })
  })
})


app.listen(3000)