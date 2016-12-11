'use strict'

const Value = require('../../').Value

module.exports = function () {
  const B = new Value(42)

  class A {
    static constitute () { return [ B ] }
    constructor (b) {
      this.b = b
    }
  }
  return { A, B }
}
