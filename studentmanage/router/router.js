var Student = require('../models/Student.js')
module.exports = {
  showIndex: function(req, res){
    Student.find({}, (err, result) => {
      res.render('index',{
        students: result
      })
    })
    
  },
  showAdd: function(req, res){
    res.render('add')
  },
  doAdd: function(req, res){
    req.query.sid = parseInt(req.query.sid)
    req.query.age = parseInt(req.query.age)
    Student.create(req.query, (err, result) => {
      res.redirect('/')
    })
  },
  showEdit: function(req, res){
    sid = parseInt(req.params.id)
    Student.findOne({sid}, (err, result) => {
      res.render('edit', {
        student: result
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