var express = require('express')
var app = express()
var ejs = require('ejs')
var fs = require('fs')
var gm = require('gm')
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.engine('.html', ejs.__express)
app.set('view engine', 'html')
app.use(express.static('./public'))

app.get('/',(req, res) =>{
  res.render('crop')
})

app.post('/docut',(req, res) => {
  let {left, top, width, height} = req.body
  gm('./public/image/dog.jpg').crop(width, height, left,top).resize(200, 200, '!').write('./dog_cut.jpg',(err) => {
    if(err) {
      console.log(err)
      res.json({
        code: -1,
        msg: '裁剪失败'
      })
      return
    }
    res.send({
      code: 1,
      msg: '图片已保存'
    })
  })
})

app.listen(3000)