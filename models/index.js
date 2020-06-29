/*
* [models]
* Main Interface
*/

const mongodb = require('mongodb')

const { db } = require('../config')

const url = `mongodb://${db.username}:${db.password}@${db.host}:${String(db.port)}/?authSource=${db.authSource}`

const client = new mongodb.MongoClient(url, { useUnifiedTopology: true })

let DB

client.connect(err => {
  if (err) throw err
  DB = client.db(db.db)
})

module.exports = () => {
  return DB
}