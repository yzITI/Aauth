/*
* [controllers]
* API Server
* Routers
*/

const express = require('express')

// modules
const login = require('./login')

// middleware
const middleware = require('./middleware')

// express server
const app = express()
app.use(express.json())
app.disable('x-powered-by') // hide express identity
// API
const api = express.Router() // router
app.use('/api', api) // register with middleware
// static files
app.use(express.static('public'))

// start server
app.listen(7777, () => {
  console.log('# Server started!')
})

// API routers

// login
api.get('/login/:id', login.Prepare)
api.post('/login/:platform', login.Login)
api.put('/login', middleware.User, login.Generate)
api.post('/login', login.Verify)