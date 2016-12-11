'use strict'

module.exports = function () {
  class A {
    static constitute () { return [ B ] }
    constructor (b) {
      this.b = b
    }
  }

  class B {
    static constitute () { return [ A ] }
    constructor (a) {
      this.a = a
    }
  }

  return { A, B }
}
