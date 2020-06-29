/*
* [oauths]
* Main Interface
*/

const moduleList = []
let modules = {}

// load all modules
for (let m of moduleList) {
  modules[m] = require(`./${m}`)
}

module.exports = modules