/*
* [services] login
* Login handles
*/

const oauths = require('../oauths')

// login to a platform
exports.Oauth = async function(platform, code) {
  if (!oauths[platform]) return false // platform not exists
  else return await oauths[platform](code)
}
