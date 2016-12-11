'use strict'

const Clone = require('../../').Clone
const Transient = require('../../').Transient

module.exports = function () {
  const data = { foo: 'bar' }
  const B = new Clone(data)

  class A {
    static constitute () { return Transient.with([ B ]) }
    constructor (b) {
      this.b = b
    }
  }
  return { data, A, B }
}
