'use strict'

const Lazy = require('../../').Lazy

module.exports = function () {
  class B {}

  class A {
    static constitute () { return [ Lazy.of(B) ] }
    constructor (b) {
      this.b = b
    }
  }
  return { A, B }
}
