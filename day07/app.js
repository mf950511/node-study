var db = require('./models/db')

var Student = require('./models/Student')

// var xiaoming = new Student({name: '小明',age: 24,sex: '男'})
// xiaoming.save(() => {
//   console.log('保存成功')
// })

// Student.create({name: '小红',age: 20,sex: '女'},(err) => {
//   console.log('小红保存成功')
// })

// Student.findPeople('小明',(err, result) => {
//   console.log(result)
// })

Student.updatePeople({name: '小红'}, {$set: {age: 50}}, {}, (err, result) => {
  console.log(result)
})