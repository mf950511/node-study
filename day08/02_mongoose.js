var mongoose = require('mongoose')
mongoose.connect('mongodb://47.104.71.163/test')

var db = mongoose.connection
var Schema = mongoose.Schema
db.once('open', () => {
  console.log('数据库连接成功')
})

var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{body: String, date: Date}],
  date: {type: Date,default: Date.now},
  hidden: Boolean,
  meta: {
    botes: Number,
    favs: Number
  }
})
blogSchema.methods.showInfo = function(){
    console.log(this)
}

var Blog = mongoose.model('Bolg', blogSchema)
var newBlog = new Blog({
  title: '测试',
  author: 'francis'
})
newBlog.showInfo()
newBlog.save(() => {
  console.log('保存成功')
})
module.exports = Blog