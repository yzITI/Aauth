/*
* [models]
* Main Interface
*/

const mongodb = require('mongodb')

const config = require('../config')

const c = config.mongodb

const url = `mongodb://${c.username}:${c.password}@${c.host}:${String(c.port)}/?authSource=${c.authSource}`

const client = new mongodb.MongoClient(url, { useUnifiedTopology: true })

let DB

client.connect(err => {
  if (err) throw err
  DB = client.db(c.db)
})

module.exports = () => {
  return DB
}