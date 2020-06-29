/* 
* [index.js]
* Main Entrance
*/

const time = require('./utils/time')

async function main() {
  // initialize models
  let models = require('./models')
  // wait for models
  while (!models()) await time.Sleep(1000)
  console.log('# MongoDB ready (Main Thread)')
  // initialize controllers
  require('./controllers')
  // debug
  require('./debug')
}

// start
main()
