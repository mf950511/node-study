var fs = require('fs')
fs.readFile(__dirname + '/01_require.js',(err,data) => {
  if(err){
    throw err
  }
  console.log(data.toString())
})