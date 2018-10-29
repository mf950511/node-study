var http = require('http')
var ejs = require('ejs')
var fs = require('fs')
var server = http.createServer((req, res) =>{
  fs.readFile('./views/index_for.ejs',(err, data) => {
    var template = data.toString()
    var directory = {
      name: '李四',
      news: [
        {
          count: 16,
          news: '啊哈哈哈'
        },
        {
          count: 14,
          news: '九点上班了'
        },
        {
          count: 18,
          news: '六点下班了'
        }
      ]
    }
    var html = ejs.render(template, directory)
    res.writeHead(200, {'Content-type': 'text/html;charset=UTF8'})
    res.end(html)
  })
})
server.listen(3000, '127.0.0.1')