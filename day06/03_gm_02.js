var fs = require('fs')
var gm = require('gm')

// crop参数(宽，高，x坐标，y坐标)
gm('./404.jpg').crop(300, 300, 400, 400).write('./crop.jpg',(err) => {
  console.log(err)
})