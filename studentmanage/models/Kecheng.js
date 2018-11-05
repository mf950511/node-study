var mongoose = require('mongoose')
var kechengSchema = new mongoose.Schema({
  kid: Number,
  name: String,
  students: [Number]
})
kechengSchema.index({kid: 1})

kechengSchema.statics.addStudent = function(kidArr, sid, callback){
  for(var i = 0; i< kidArr.length; i++) {
    Kecheng.update({kid: kidArr[i]}, {$push: {students: sid}}, () => {
      console.log('课程添加成功')
    })
  }
}
var Kecheng = mongoose.model('KeCheng', kechengSchema)
module.exports = Kecheng