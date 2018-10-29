var http = require('http')
var url = require('url')
var server = http.createServer((req,res)=>{
  // url.parse可将地址分为很多部分： host,port,path,query,pathname
  let path = url.parse(req.url).pathname
  let query = url.parse(req.url,true).query //第二个参数为true时会将搜索内容转为对象，否则为字符串 query:a=123&b=c&d=e
  console.log(req.url)
  console.log('pathname:'+path)
  console.log(query)
  res.end()
})
server.listen(3000,'127.0.0.1')