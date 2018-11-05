var Student = require('../models/Student.js')
var KeCheng = require('../models/Kecheng')
module.exports = {
  showIndex: function(req, res){
    Student.find({}, (err, result) => {
      res.render('index',{
        students: result
      })
    })
    
  },
  showAdd: function(req, res){
    KeCheng.find({}, (err, result) => {
      res.render('add', {
        kecheng: result
      })
    })
    
  },
  doAdd: function(req, res){
    req.query.sid = parseInt(req.query.sid)
    req.query.age = parseInt(req.query.age)
    Student.create(req.query, (err, result) => {
      KeCheng.addStudent(req.query.kechengs, req.query.sid, () => {})
      res.redirect('/')
    })
  },
  showEdit: function(req, res){
    sid = parseInt(req.params.id)
    Student.findOne({sid}, (err, result) => {
      KeCheng.find({}, (err, result1) => {
        res.render('edit', {
          student: result,
          kecheng: result1
        })
      })
      
    })
    
  },
  doEdit: function(req, res){
    var sid = parseInt(req.params.sid)
    Student.update({sid}, req.query, (err, result) => {
      res.send('修改成功')
    })
  }
}