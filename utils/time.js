/*
* [utils] time
* Time Utilities
*/

// Sleep in async function
exports.Sleep = function(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Timestamp with lag
exports.Timestamp = () => Math.floor(Date.now() / 1000)
