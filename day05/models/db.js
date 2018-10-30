var MongoClient = require('mongodb').MongoClient


function _connectDB(callback) {
  var url = 'mongodb://47.104.71.163:27017'
  MongoClient.connect(url, (err, db) => {
    db = db.db('itcase')
    console.log('连接成功了')
    callback(err, db)
  })
}

// 插入数据
exports.insertOne = (collectionName, json, callback) => {
  _connectDB((err, db) => {
    db.collection(collectionName).insertOne(json, (err ,result) => {
      callback(err,result)
      db.close()
    })
  })
}
