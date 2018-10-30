var file = require('../models/file')
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')
var sd = require('silly-datetime')
// 首页
exports.showIndex = (req ,res, next) =>{
  file.getAllAlbums((err, allAlbums)=>{
    if(err) {
      // 我不做处理,给下家
      next()
      return
    }
    res.render('index', {
      album: allAlbums
    })
  })
  
}
// 相册页
exports.showAlbum =  (req, res, next) => {
  var albumName = req.params.albumName
  file.getAllImagesByAlbumName(albumName, (err,images) => {
    if(err) {
      next()
      return
    }
    res.render('album', {
      albumName: albumName,
      album: images
    })
  })
  
}

// 上传列表页
exports.showUp = (req,res) => {
  file.getAllAlbums((err, allAlbums) => {
    res.render('up', {
      albums: allAlbums
    })
  })
  
}

// 上传文件
exports.doPost = (req, res, next) => {
  var form = new formidable.IncomingForm()
  form.uploadDir = path.normalize(__dirname + '/../uploads/')
  form.parse(req,(err, fileds, files) => {
    console.log(fileds)
    console.log(files)
    if(err) {
      next()
      return
    }
    var size = files.img.size
    if(size > 1024 * 2 * 1000) {
      fs.unlink(files.img.path, () => {
        
      })
      
      res.send('图片尺寸应小于2M')
      return
    } 
    var folder = fileds.folder
    var oldPath = files.img.path
    var ran = sd.format(new Date(), 'YYYYMMDDHHmm') + Math.round((Math.random() * 89999 + 10000))
    var extname = path.extname(files.img.name)
    var newPath = path.normalize(__dirname + '/../uploads/' + folder + '/' + ran + extname)
    fs.rename(oldPath, newPath,(err) => {
      if(err) {
        res.send('改名失败')
        return
      }
      res.send('上传成功')
    })
  })
}

// 新建文件夹
exports.createFodler = (req, res) => {
  var folderName = req.body.folderName
  fs.mkdir(path.normalize(__dirname + '/../uploads/' + folderName), (err) => {
    if(err) {
      res.send('创建文件夹失败')
      return
    }
    file.getAllAlbums((err, allAlbums) => {
      res.json(allAlbums)
    })
  })
}