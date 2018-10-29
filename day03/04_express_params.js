var express = require('express')
var app = express()
app.get('/AAb', (req, res) => {
  res.send('我收到了aab')
})
app.get('/student/:id',(req, res) => {
  var id = req.params.id
  if(/^\d{6}$/.test(id)) {
    res.send('学生学号为'+id)
  }else {
    res.send('参数错误')
  }
  // res.send(id)
})
app.get('/:name/:id',(req, res) => {
  let {name, id} = req.params
  let str =  `姓名${name},id${id}`
  res.send(str)
})
app.listen(3000)