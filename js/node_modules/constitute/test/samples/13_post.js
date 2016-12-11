'use strict'

const Container = require('../../').Container

module.exports = function () {
  // Example of using a post-constructor to resolve a cyclic dependency

  class A {
    static constitute () { return [ Container ] }
    constructor (container) {
      // Assigning b in a post-constructor allows both objects to be constructed
      // first, resolving the cyclic dependency.
      //
      // Note that the post-constructor still runs synchronously, before this
      // object is returned to any third-party consumers.
      container.schedulePostConstructor(function (b) {
        this.b = b
      }, [ B ])
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
