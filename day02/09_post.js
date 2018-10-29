var http = require('http')
var querystring = require('querystring')
var server = http.createServer((req,res) => {
  console.log(req.url)
  if(req.url === '/dopost' && req.method.toLowerCase() === 'post') {
    let alldata = ''
    // post请求的一个规范，node为了效率的极致，将post数据分为一段一段的接收
    req.addListener('data', (chunk) => {
      alldata += chunk
    })
    req.addListener('end', ()=>{
      console.log(alldata.toString())
      let data = alldata.toString()
      let dataobj = querystring.parse(data)
      console.log(dataobj)
      res.end('success')
    })
  }
})
server.listen(3000, '127.0.0.1')