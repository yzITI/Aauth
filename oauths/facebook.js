/*
* [oauths] facebook
* Facebook Login
*/

const axios = require('axios')

const config = require('../config')
const c = config.oauths.facebook

module.exports = async function (code) {
  const accessToken = await axios
    .get('https://graph.facebook.com/v7.0/oauth/access_token?', {
    params: {
      client_id: c.id,
      client_secret: c.secret,
      code: code,
      redirect_uri: 'https://aauth.link/callback'
    }})
    .then(resp => resp.data.access_token)
    .catch(err => false)
  if (!accessToken) return false

  const info = await axios // get user info
    .get('https://graph.facebook.com/v7.0/me',{ 
      params:{
        fields: 'id,name,picture,email',
        access_token: accessToken
      }
    })
    .then(resp => resp.data)
    .catch(err => false)
  if (!info) return false
  return {
    id: `facebook-${info.id}`,
    raw: info,
    identity: {
      virtual: false,
      name: info.name,
      email: (info.email ? info.email : null),
      avatar: (info.picture ? info.picture.data.url : null)
    }
  }
}