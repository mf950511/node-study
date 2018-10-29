var express = require('express')
var app = express()
app.use(express.static('./static'))
app.get('/haha', (req, res) => {
  res.send('哈哈哈哈')
})
app.listen(3000)