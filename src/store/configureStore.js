console.log("NODE_ENV = " + process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}