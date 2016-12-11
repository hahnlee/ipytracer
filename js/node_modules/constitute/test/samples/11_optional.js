'use strict'

const Optional = require('../../').Optional

module.exports = function () {
  class B {}

  class A {
    static constitute () { return [ Optional.of(B) ] }
    constructor (b) {
      this.b = b
    }
  }
  return { A, B }
}
