var mongoose = require('mongoose')
mongoose.connect('mongodb://47.104.71.163/mongoose')

var Cat = mongoose.model('Cat', {name: String})
var kitty = new Cat({name: 'kitty'})
kitty.save(() => {
  console.log('保存成功')
})
