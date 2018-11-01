var db = require('../models/db')
var md5 = require('../models/md5')
module.exports = {
  showIndex: function(req, res, next){
    console.log(req.session.username)
    res.render('index')
  },
  getSession: function(req, res, next){
    if(req.session.login) {
      res.json({
        code: 1,
        result: {
          username: req.session.username
        }
      })
    }else{
      res.json({
        code: -1,
        result: {
          username: ''
        }
      })
    }
    
  },
  showRegister: function(req, res, next){
    res.render('register')
  },
  doRegister: function(req, res, next){
    let {username, password} = req.body
    db.findSome('users', {username}, (err, result) => {
      if(err) {
        res.json({
          code: -1,
          msg: '服务器错误'
        })
        return
      }
      if(result.length !== 0) {
        res.json({
          code: -1,
          msg: '用户名已占用'
        })
        return
      }
      password = md5(md5(password) + '孟帆')
      db.insertOne('users', {username, password}, (err, result) => {
        if(err) {
          res.json({
            code: -1,
            msg: '服务器错误'
          })
        }
        req.session.login = true
        req.session.username = username
        res.json({
          code: 1,
          msg: '注册成功',
          result: {
            username
          }
        })
        
      })
    })
  },
  showLogin: function(req, res, next){
    res.render('login')
  },
  doLogin: function(req, res, next){
    let {username, password} = req.body
    db.findSome('users', {username}, (err, result) => {
      if(err) {
        res.json({
          code: -1,
          msg: '服务器错误'
        })
        return
      }
      if(result.length === 0) {
        res.json({
          code: -1,
          msg: '用户名错误'
        })
        return
      }
      password = md5(md5(password) + '孟帆')
      if(result[0].password === password) {
        req.session.login = true
        req.session.username = username
        res.json({
          code: 1,
          msg: '登陆成功',
          result: {
            username
          }
        })
      }else {
        res.json({
          code: -1,
          msg: '密码错误'
        })
      }
    })
  }
}