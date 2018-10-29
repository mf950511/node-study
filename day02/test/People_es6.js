class People {
  constructor(name, sex, age){
    this.name = name
    this.sex = sex
    this.age = age
  }
  sayHello(){
    console.log(`姓名：${this.name}性别：${this.sex}年龄:${this.age}`)
  }
}
module.exports = People