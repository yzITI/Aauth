/* 
* [index.js]
* Main Entrance
*/

const time = require('./utils/time')

async function main() {
  // initialize redis
  require('./utils/token')
  // initialize models
  const models = require('./models')
  // wait for models
  while (!models()) await time.Sleep(1000)
  console.log('# MongoDB ready')
  // initialize controllers
  require('./controllers')
  // debug
  require('./debug')
}

// start
main()
