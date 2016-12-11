'use strict'

const Alias = require('../../').Alias

module.exports = function () {
  class C {}

  const B = new Alias(C)

  class A {
    static constitute () { return [ B ] }
    constructor (b) {
      this.b = b
    }
  }
  return { A, B, C }
}
