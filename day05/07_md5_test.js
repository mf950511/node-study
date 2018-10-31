var crypto = require('crypto')
console.log(getMd5('123123'))

function getMd5(mingma) {
  var md5 = crypto.createHash('md5')
  var password = md5.update(mingma).digest('base64')
  return password
}