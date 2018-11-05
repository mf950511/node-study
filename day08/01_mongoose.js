var mongoose = require('mongoose')
mongoose.connect('mongodb://47.104.71.163/test')
var Cat = mongoose.model('Cat', {name: String, age: Number})
// var tom = new Cat({name: 'tom'})
// tom.save(() => {
//   console.log('保存成功')
// })

Cat.find({name: 'kitty'}, (err, result) => {
  var mao = result[0]   //mao这个变量是Cat得一个实例，因为它是从Cat集合中find出来的。所以是一个实例
  mao.age = 20
  mao.save(() => {
    console.log('年龄修改成功')
  })
})