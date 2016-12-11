'use strict'

const expect = require('chai').expect
const Transient = require('../../').Transient

module.exports = function () {
  class B {}

  class A {
    static constitute () { return Transient.with([ B ]) }
    constructor (b) {
      expect(b).to.be.instanceOf(B)
      this.b = b
    }
  }
  return { A, B }
}
