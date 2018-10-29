exports.showIndex = showIndex
exports.show404 = show404
exports.showStudent = showStudent
function showIndex(req, res){
  res.writeHead(200, {'Content-type': 'text/html;charset=UTF8'})
  res.end('我是首页')
}
function show404(req, res){
  res.writeHead(404, {'Content-type': 'text/html;charset=UTF8'})
  res.end('该页面找不到了')
}
function showStudent(req, res){
  let id = req.url.substr(9)
  res.writeHead(200, {'Content-type': 'text/html;charset=UTF8'})
  res.end(`学生编号为${id}`)
}