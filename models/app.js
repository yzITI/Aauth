/*
* [models] app
* Manage storage of Apps
*/

const db = require('./index')
const collection = db().collection('app')

exports.Insert = async function (doc) {
  const res = await collection.insertOne(doc)
  return res.result.ok // 1 for success
}

exports.Delete = async function (filter) {
  const res = await collection.deleteMany(filter)
  return res.result.ok // 1 for success
}

exports.Find = async function (filter, opt = {}) {
  return await collection.find(filter, opt).toArray()
}

exports.Upsert = async function (filter, setting) {
  const res = await collection.updateOne(filter, { $set: setting }, { upsert: true })
  return res.result.ok
}