var fs = require('fs')
exports.getAllAlbums = function(callback){
  fs.readdir('./uploads', (err, files) => {
    if(err) {
      callback('找不到uploads文件夹', null)
      return
    }
    var allAlbums = []
    function iterator(i){
      if(i === files.length) {
        console.log(allAlbums)
        callback(null, allAlbums)
        return
      }
      fs.stat(files[i], (err, stats) => {
        fs.stat('./uploads/' + files[i], (err, stats) => {
          if(err) {
            callback('找不到文件' + files[i], null)
          }
          if(stats.isDirectory()) {
            allAlbums.push(files[i])
          }
          iterator(i+1)
        })
      })
    }
    iterator(0)
    
  })
  // return ['小猫','小狗']
}

exports.getAllImagesByAlbumName = (albumName,callback) => {
  var allImages = []
  fs.readdir('./uploads/' + albumName, (err, files) => {
    if(err) {
      callback('未找到该文件夹',null)
      return
    }
    function iterator(i) {
      if(i === files.length) {
        callback(null, allImages)
        return
      }
      fs.stat('./uploads/' + albumName + '/' + files[i], (err, stats) => {
        if(err) {
          callback('找不到文件' + files[i], null)
          return
        }
        if(stats.isFile()) {
          allImages.push(files[i])
        }
        iterator(i+1)
      })
    }
    iterator(0)
  })
}