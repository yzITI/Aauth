/*
* [oauths]
* Main Interface
*/

const moduleList = ['github']
let modules = {}

// load all modules
for (let m of moduleList) {
  modules[m] = require(`./${m}`)
}

module.exports = async function (platform, code) {
  if (!modules[platform]) return false // platform not exists
  else return await modules[platform](code)
}
