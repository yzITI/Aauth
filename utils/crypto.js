/*
* [utils] crypto
* Cryptography Utilities
*/

const crypto = require('crypto')
const chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789']

// md5 function
exports.MD5 = function(msg) {
  return crypto.createHash('md5').update(msg).digest('hex');
}

// random string with length l
exports.RandomString = function (l) {
  return [...Array(l)].map(i => chars[Math.random()*chars.length|0]).join``
}
