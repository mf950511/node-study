var db = require('../models/db')
var md5 = require('../models/md5')
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')
var gm = require('gm')
var sd = require('silly-datetime')
module.exports = {
  showIndex: function(req, res, next){
    console.log(req.session.username)
    res.render('index')
  },
  getSession: function(req, res, next){
    if(req.session.login) {
      db.findSome('users', {username: req.session.username},(err, result) => {
        res.json({
          code: 1,
          result: {
            username: req.session.username,
            user: result[0]
          }
        })
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
  },
  showSetAvator: function(req, res, next){
    if(!req.session.login){
      res.send('未登录状态，非法闯入')
      return
    }
    res.render('setAvator')
  },
  setAvator: function(req, res, next){
    var form = new formidable.IncomingForm()
    form.uploadDir = path.normalize(__dirname + '/../avator')
    form.parse(req, (err, fileds, files) => {
      var avator = files.avator
      var extname = path.extname(avator.name)
      console.log(avator)
      fs.rename(avator.path, form.uploadDir + '/' + req.session.username + extname, (err) => {
        gm(form.uploadDir + '/' + req.session.username + extname).resize(400, 400, '!').write(form.uploadDir + '/' + req.session.username + extname, (err) => {
          if(err) {
            res.json({
              code: -1,
              msg: '改名失败'
            })
            return
          }
          req.session.avatorName = req.session.username + extname
          res.json({
            code: 1,
            msg: '上传成功',
            result: 'avator/' + req.session.username + extname
          })
        })
      })
      
    })
  },
  docut: function(req, res){
    let {left, top, width, height} = req.body
    let avatorname = req.session.avatorName
    gm(path.normalize(__dirname + '/../avator/' + avatorname)).crop(width, height, left,top).resize(200, 200, '!').write(path.normalize(__dirname + '/../avator/' + avatorname),(err) => {
      if(err) {
        console.log(err)
        res.json({
          code: -1,
          msg: '裁剪失败'
        })
        return
      }
      db.updateMany('users', {username: req.session.username}, {$set: {avator: avatorname}}, (err, result) => {
        if(err) {
          res.json({
            code: -1,
            msg: '头像设置失败'
          })
          return
        }
        res.send({
          code: 1,
          msg: '头像设置成功'
        })
      })
      
    })
  },
  postArticle: function(req, res){
    var content = req.body.article
    var datetime = new Date()
    var formatDate = sd.format(datetime, 'YYYY-MM-DD HH:mm:ss')
    db.insertOne('postActicle', {username: req.session.username, datetime, formatDate, content}, (err, result) => {
      if(err) {
        res.json({
          code: -1,
          msg: '发表失败'
        })
        return
      }
      res.json({
        code: 1,
        msg: '发表成功'
      })
    })
  },
  getArticleList: function(req, res){
    // let username = req.session.username
    let params = req.query
    params.pageSize = parseInt(params.pageSize)
    params.page = parseInt(params.page)
    params.sort = {datetime: -1}
    db.findSome('postActicle', {}, params, (err, result, count) => {
      if(err) {
        res.json({
          code: -1,
          msg: '获取说说列表失败'
        })
      }
      res.json({
        code: 1,
        msg: '获取说说列表成功',
        result,
        count
      })
      
    })
  }
}