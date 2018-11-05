var Book = require('../models/Book')
var router = {
  shoeIndex: function(req, res){
    Book.showList((err, result) => {
      res.render('index', {
        bookList: result
      })
    })
    
  },
  addBook: function(req,res){
    res.render('addBook')
  },
  doAdd: function(req, res) {
    req.query.price = parseInt(req.query.price)
    Book.create(req.query, (err, result) => {
      console.log('保存成功')
      res.redirect('/')
    })
  },
  showEdit: function(req, res) {
    let id = req.params.id
    Book.showBook(id, (err, result) => {
      res.render('edit', {
        book: result[0]
      })
    })
    
  }
}
module.exports = router