var file = require('../models/file')
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