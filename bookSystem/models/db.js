var mongoose = require('mongoose')
var db = mongoose.createConnection('mongodb://47.104.71.163/mongoose')

db.once('open', () => {
  console.log('数据库连接成功')
})

module.exports = db