'use strict'

module.exports = function () {
  class E {}
  class F {}

  class B {}
  class C {
    static constitute () { return [ E ] }
    constructor (e) {
      this.e = e
    }
  }
  class D {
    static constitute () { return [ E, F ] }
    constructor (e, f) {
      this.e = e
      this.f = f
    }
  }

  class A {
    static constitute () { return [ B, C, D ] }
    constructor (b, c, d) {
      this.b = b
      this.c = c
      this.d = d
    }
  }
  return { A, B, C, D, E, F }
}
