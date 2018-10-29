var express = require('express')
var app = express()
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.get('/',(req, res) => {
  res.render('xixi')
})
app.listen(3000)