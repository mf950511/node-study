var express = require('express')
var app = express()

app.use(express.static(__dirname + '/../album'))

app.get('/',(req, res) => {
  res.send('哈哈')
})

app.listen(3000)