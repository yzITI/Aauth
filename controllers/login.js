/*
* [controllers] login
* Login flow handles
*/

// services
const login = require('../services/login')
// models
const app = require('../models/app')

// GET
exports.Prepare = async function (req, res) {
  const id = req.params.id
  const result = await app.Find({ _id: id })
  if (!result.length) {
    res.status(404).send('App not found.')
    return
  }
  res.send({
    name: result[0].name,
    description: result[0].description,
    logo: result[0].logo
  })
}

// POST
exports.Login = async function (req, res) {
  const platform = req.params.platform
  const code = req.body.code
  if (!code) {
    res.status(400).send('Parameters Error: \"code\" required.')
    return
  }
  const result = await login.Login(platform, code)
  if (!result) {
    res.status(403).send('Login Failed.')
    return
  }
  res.header('token', result.token)
  res.send(result.user)
}

// PUT
exports.Generate = async function (req, res) {
  const appId = req.body.app
  const identityId = req.body.identity
  if (!appId || !identityId) {
    res.status(400).send('Parameters Error: \"app\", \"identity\" required.')
    return
  }
  const result = await login.Generate(appId, req.user, identityId)
  if (!result) {
    res.status(400).send('Error.')
    return
  }
  res.send(result)
}

// POST
exports.Verify = async function (req, res) {
  const appId = req.body.app
  const appSecret = req.body.secret
  const code = req.body.code
  if (!appId || !appSecret || code) {
    res.status(400).send('Parameters Error: \"app\", \"secret\", \"code\" required.')
    return
  }
  const result = await login.Verify(appId, appSecret, code)
  if (!result) {
    res.status(403).send('Error. (reason is not available due to security requirement)')
    return
  }
  res.send(result)
}
