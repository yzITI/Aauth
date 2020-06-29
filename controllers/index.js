/*
* [controllers]
* API Server
* Routers
*/

const express = require('express')

const moduleList = []
let modules = {}

// load all modules
for (let m of moduleList) {
  modules[m] = require(`./${m}`)
}

const app = express()
app.use(express.json())
app.disable('x-powered-by') // hide express identity
const api = express.Router() // router
app.use('/api', api) // register with middleware

app.listen(6666, () => {
  console.log('# API server started!')
})
