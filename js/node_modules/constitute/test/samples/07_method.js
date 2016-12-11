'use strict'

const Method = require('../../').Method

module.exports = function () {
  class C { }

  const B = new Method(function (c) {
    return { c }
  }, [ C ])

  class A {
    static constitute () { return [ B ] }
    constructor (b) {
      this.b = b
    }
  }

  return { A, B, C }
}
