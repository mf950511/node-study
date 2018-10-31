var express = require('express')
var app = express()
var db = require('./models/db')
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID
var ejs = require('ejs')
// 处理formdata数据
app.use(bodyParser.json())


app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(express.static('./public'))
// 显示留言列表
app.get('/',(req, res,next) => {
  res.render('index')
})

app.get('/du', (req, res) => {
  var params = req.query
  params.pageSize = parseInt(params.pageSize)
  params.page = parseInt(params.page)
  params.sort = {time: -1}
  db.findSome('message', {}, params, (err, results, count) => {
    if(err) {
      res.json({
        code: -1,
        msg: '获取留言列表失败'
      })
      return
    }
    res.json({
      code: 1,
      msg:'',
      results,
      count
    })
  })
})

app.post('/submit', (req, res) => {
  var body = req.body
  body.time = new Date()
  db.insertOne('message', body, (err, result) => {
    if(err) {
      res.json({
        code: -1,
        msg: '留言失败'
      })
      return
    }
    res.json({
      code: 1,
      msg: '留言成功'
    })
  })
})

app.post('/deleteMessage', (req, res) => {
  var id = ObjectId(req.body._id)
  db.deleteMany('message', {_id: id}, (err, result) => {
    if(err) {
      res.json({
        code: -1,
        msg: '删除失败'
      })
      return
    }
    res.json({
      code: 1,
      msg: '删除成功'
    })
  })
})

app.listen(3000)