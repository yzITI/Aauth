/*
* [controllers] login
* Login flow handles
*/

const login = require('../services/login')

// GET
exports.Prepare = async function (req, res) {
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
}

// POST
exports.Verify = async function (req, res) {
}
