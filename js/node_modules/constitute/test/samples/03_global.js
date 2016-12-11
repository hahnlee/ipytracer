'use strict'

const expect = require('chai').expect
const Global = require('../../').Global

module.exports = function () {
  class B {}

  class A {
    static constitute () { return Global.with([ B ]) }
    constructor (b) {
      expect(b).to.be.instanceOf(B)
      this.b = b
    }
  }
  return { A, B }
}
