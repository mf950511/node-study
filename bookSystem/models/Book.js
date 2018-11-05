var mongoose = require('mongoose')
var db = require('./db')
var ObjectId = require('mongodb').ObjectID
var bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  // type: Array
})
bookSchema.statics.showList = function(callback){
  this.model('Book').find({}, callback)
}
bookSchema.statics.showBook = function(id, callback){
  this.model('Book').find({_id: ObjectId(id)},callback)
}
var Book = db.model('Book', bookSchema)

module.exports = Book