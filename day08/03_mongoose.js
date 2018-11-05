var mongoose = require('mongoose')
mongoose.connect('mongodb://47.104.71.163/test')

var db = mongoose.connection
var Schema = mongoose.Schema

var animalSchema = new Schema({
  name: String,
  type: String
})
animalSchema.methods.showtonglei = function(callback){
  return this.model('Animal').find({type: this.type}, callback)
}
var Animal = db.model('Animal', animalSchema)

// Animal.create({name: 'tom',type:'猫'})
// Animal.create({name: 'mimi',type:'猫'})
// Animal.create({name: '小白',type:'狗'})
// Animal.create({name: 'snoopy',type:'狗'})
// Animal.create({name: 'kitty',type:'猫'})
Animal.findOne({name: 'tom'},(err, result) => {
  var dog = result
  dog.showtonglei((err, result) => {
    console.log(result)
  })
})
