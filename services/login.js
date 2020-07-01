/*
* [services] login
* Login handles
*/

const oauths = require('../oauths')
// models
const oauth = require('../models/oauth')
const user = require('../models/user')
const app = require('../models/app')
// utils
const crypto = require('../utils/crypto')
const time = require('../utils/time')
const token = require('../utils/token')

// central Login processing
exports.Login = async function (platform, code) {
  const source = await oauths(platform, code)
  if (!source) return false
  // find and upsert oauth
  const res = await oauth.Find({ _id: source.id })
  let u = crypto.RandomString(32)
  if (res.length) { // exist
    u = res[0].user
  }
  await oauth.Upsert({ _id: source.id }, { user: u, raw: source.raw })
  // upsert and find user
  let setting = { latest: time.Timestamp() }
  setting[`identity.${crypto.MD5(source.id)}`] = source.identity
  await user.Upsert({ _id: u }, setting)
  const users = await user.Find({ _id: u })
  if (!users.length) return false
  // generate token
  const t = crypto.RandomString(32)
  token.Set(t, u)
  return {
    token: t,
    user: users[0]
  }
}

exports.Generate = async function (appId, userId, identityId) {
  // check app
  let res = app.Find({ _id: appId })
  if (!res.length) return false
  const callback = res[0].callback
  // check user and identity
  res = user.Find({ _id: userId })
  if (!res.length || !res[0].identity[identityId]) return false
  // generate code
  const code = crypto.RandomString(32)
  token.Set('#' + code, `${appId}-${userId}-${identityId}`)
  return callback + '?code=' + code
}

exports.Verify = async function (appId, appSecret, code) {
  // check code
  const keyString = await token.Get('#' + code)
  if (!keyString) return false
  token.Del('#' + code) // one time code
  const keys = keyString.split('-')
  // check app
  if (appId !== keys[0]) return false
  let res = app.Find({ _id: appId })
  if (!res.length || res[0].secret !== appSecret) return false
  // check and retrieve identity
  res = user.Find({ _id: keys[1] })
  if (!res.length || !res[0].identity[keys[2]]) return false
  // modify
  let r = res[0].identity[keys[2]]
  r.virtual = undefined // hide virtual to apps
  r.id = keys[2]
  return r
}
