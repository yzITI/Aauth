/*
* [services] login
* Login handles
*/

const oauths = require('../oauths')

// central Login processing
exports.Login = async function (platform, code) {
  let res = await oauths(platform, code)
  if (!res) return false
  return res
}
