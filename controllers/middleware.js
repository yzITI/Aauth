/*
* [controllers] middleware
* Middlewares
*/

const token = require('../utils/token')

exports.User = async function (req, res, next) {
  const t = req.get('token')
  if (!t) {
    res.status(401).send('Unauthorized.')
    return
  }
  const user = await token.Get(t)
  if (!user) {
    res.status(403).send('Authentication Failed.')
    return
  }
  req.user = user
  next()
}
