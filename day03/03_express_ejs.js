var express = require('express')
var app = express()
// 可更改视图所在文件夹
app.set('views', 'a')
app.set('view engine', 'ejs')
app.get('/',(req, res) => {
  //默认从views里寻找
  res.render('haha', {
    news: ['我是新闻','我也是新闻','他俩都是骗子']
  })
})
app.listen(3000)