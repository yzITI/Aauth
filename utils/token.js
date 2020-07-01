/*
* [utils] token
* Redis connection
* Token Utilities
*/

const redis = require('redis')
const { promisify } = require('util')

const config = require('../config')

const client = redis.createClient({
  host: config.redis.host,
  port: String(config.redis.port),
  password: config.redis.password
})

client.on('ready', () => {
  console.log('# Redis ready')
})

exports.Set = async function (key, value, expire = 600) {
  return await promisify(client.set).bind(client)(key, value, 'EX', expire)
}

exports.Get = async function (key) {
  return await promisify(client.get).bind(client)(key)
}

exports.Del = async function (key) {
  return await promisify(client.del).bind(client)(key)
}
