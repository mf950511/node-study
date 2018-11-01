var MongoClient = require('mongodb').MongoClient
var settings = require('../settings')

function _connectDB(callback) {
  var url = settings.dbUrl
  MongoClient.connect(url, (err, client) => {
    db = client.db('shuoshuo')
    console.log('连接成功了')
    callback(err, db, client)
  })
}

// 插入数据
exports.insertOne = (collectionName, json, callback) => {
  _connectDB((err, db, client) => {
    if(err) {
      callback(err, db)
      return
    }
    db.collection(collectionName).insertOne(json, (err ,result) => {
      callback(err,result)
      client.close()
    })
  })
}

// 查找数据
exports.findSome = function(collectionName, json, C, D){
  var args,callback
  if(arguments.length === 3) {
    args = {
      pageSize: 0,
      page: 0,
      sort: {}
    }
    callback = C
  } else if(arguments.length === 4) {
    args = C
    callback = D
  } else {
    throw new Error('find函数参数异常')
  }
  var pageSize = args.pageSize || 0
  var page = args.page || 0
  var sort = args.sort || {}
  var result = []
  _connectDB((err, db, client) => {
    if(err) {
      callback(err, db)
      return
    }
    db.collection(collectionName).count(json).then(count => {
      var cursor = db.collection(collectionName).find(json).limit(pageSize).skip(page * pageSize).sort(sort)
    
      cursor.each((err, doc) => {
        if(err) {
          callback(err, null)
        }
        if(doc != null) {
          result.push(doc)
        } else {
          // 没有更多文档了
          callback(null, result, count)
          client.close()
        }
      })
    })
    
  })
}

// 删除
exports.deleteMany = function(collectionName, json, callback){
  _connectDB((err, db, client) => {
    db.collection(collectionName).deleteMany(json, (err, results) => {
      callback(err, results)
      client.close()
    })
  })
}



// 修改
exports.updateMany = function(collectionName, json1, json2, callback){
  _connectDB((err, db, client) => {
    db.collection(collectionName).updateMany(json1, json2,(err, results) => {
      callback(err, results)
      client.close()
    })
  })
}