var mongoose = require('mongoose')
mongoose.connect('mongodb://47.104.71.163/test')

var db = mongoose.connection
var Schema = mongoose.Schema
db.once('open', () => {
  console.log('数据库连接成功')
})
// 学生，课程
var studentSchema = new Schema({
  name: String,
  age: Number,
  sex: String
})
var Student = mongoose.model('Student', studentSchema)
studentSchema.methods.addAge = function(){
  this.age++
  this.save()
}
var kechenSchema = new Schema({
  name: String,
  info: String,
  student: [studentSchema]
})
kechenSchema.methods.addStudent = function(studentObj, callback){
  this.student.push(studentObj)
  this.save(() => {
    callback
  })
}
var Kechen = mongoose.model('Kechen', kechenSchema)

// 实例化几个学生
// Student.create({name: '小明',age: 12,sex: '男'})
// Student.create({name: '小红',age: 13,sex: '女'})
// Student.create({name: '小刚',age: 14,sex: '男'})
// Student.create({name: '小庄',age: 15,sex: '男'})
// var xiaochen = new Student({name: '小宝宝',age: 15,sex: '女'})
// xiaochen.save()
Kechen.findOne({name: '数学课'},(err, result) => {
  console.log(result)
  result.student[0].addAge()
  result.save()
})
// var shuxue = new Kechen({
//   name: '数学课',
//   info:'学数学的'
// })
// shuxue.addStudent(xiaochen, () => {
//   console.log('添加成功')
// })
