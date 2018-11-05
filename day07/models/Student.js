var mongoose = require('mongoose')
var db = require('./db')
var StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String
})
StudentSchema.statics.findPeople = function(name, callback){
  this.model('Student').find({name}, callback)
}

StudentSchema.statics.updatePeople = function(conditions, update, options, callback) {
  this.model('Student').update(conditions, update, options, callback)
}
var Student = db.model('Student', StudentSchema)
module.exports = Student