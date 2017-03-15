require('babel-polyfill')

const { runQuickTransactionxClientServer } = require('../lib/tests')

runQuickTransactionxClientServer()
  .then(() => {
    console.log('allez')
  })
