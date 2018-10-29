const msg = 'hello'
const name = '张三'
const sayHello = function (){
  console.log(name)
}
const obj = {
  msg,
  name,
  sayHello
}
exports.msg = msg    // 也可以这样挨个导出
exports.name = name
exports.sayHello = sayHello