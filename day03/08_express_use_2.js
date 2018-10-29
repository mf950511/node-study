var express = require('express')
var app = express()
var fs = require('fs')
app.use(haha)
app.listen(3000)
function haha(req, res, next){
  var filePath = req.originalUrl
  fs.readFile(__dirname + '/../static' + filePath,(err,data) => {
    if(err) {
      next()
      return
    }
    res.send(data.toString())
  })
}