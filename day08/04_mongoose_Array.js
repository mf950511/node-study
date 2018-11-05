var mongoose = require('mongoose')
mongoose.connect('mongodb://47.104.71.163/test')

var db = mongoose.connection
var Schema = mongoose.Schema
db.once('open', () => {
  console.log('数据库连接成功')
})
var commentSchema = new Schema({
  body1: String,
  date1: Date
})
var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [commentSchema]
})
blogSchema.methods.comment = function(obj, callback){
  this.comments.push(obj)
  this.save()
}
var Blog = mongoose.model('Bolg', blogSchema)
// var newBlog = new Blog({
//   title: '测试啊',
//   author: 'francis',
//   body: '博客内容'
// })
// // newBlog.save()
// newBlog.comment({body: '评论内容',date: new Date()})
Blog.findOne({title: '测试啊'}, (err, result) => {
  result.comment({body: '好啊好啊',date: new Date(), name:'啊阿斯顿'})
})
module.exports = Blog