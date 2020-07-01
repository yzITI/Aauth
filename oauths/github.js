/*
* [oauths] github
* Github Login
*/

const axios = require('axios')

const config = require('../config')
const c = config.oauths.github

module.exports = async function (code) {
  const accessToken = await axios // get access token
    .post('https://github.com/login/oauth/access_token', {
      client_id: c.id,
      client_secret: c.secret,
      code: code
    }, { headers: { Accept: 'application/json' } })
    .then(resp => resp.data.access_token)
    .catch(err => false)
  if (!accessToken) return false
  // generate authorization header
  const token = Buffer.from(`token:${accessToken}`, 'utf8').toString('base64')
  const info = await axios // get user info
    .get('https://api.github.com/user',{ headers: { Authorization: `Basic ${token}` } })
    .then(resp => resp.data)
    .catch(err => false)
  if (!info) return false
  return {
    _id: `github-${info.id}`,
    raw: info,
    identity: {
      virtual: false,
      name: info.name,
      username: info.login,
      email: info.email,
      avatar: info.avatar_url,
      company: info.company
    }
  }
}
