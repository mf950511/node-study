var ejs = require('ejs')
var string = "好高兴啊，今天我买了<%= a %>s"
var data = {
  a: 'iphone6'
}
var html = ejs.render(string, data)
console.log(html)