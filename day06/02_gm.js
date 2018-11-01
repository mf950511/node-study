var fs = require('fs')
// var gm = require('gm').subClass({imageMagick: true})
var gm = require('gm')

gm('./404.jpg')
.resize(240, 240)
.noProfile()
.write('./405.jpg', function (err) {
  if (err) console.log(err);
});
// gm('./public/image/test.png')
// .resize(300, 300)
// .write('./public/image/test2.png', (err) => {
//   if(err) {
//     console.log(err)
//   }
// })