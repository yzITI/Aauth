/*
* [services] login
* Login handles
*/

const oauths = require('../oauths')
// models
const oauth = require('../models/oauth')
const user = require('../models/user')
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
  setting[`identity.${crypto.MD5(source.id).slice(0, 16)}`] = source.identity
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
