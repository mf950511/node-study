var mongoose = require('mongoose')

mongoose.connect('mongodb://47.104.71.163/studentmanage')
var db = mongoose.connection
db.once('open', () => {
  console.log('连接成功')
})
module.exports = db