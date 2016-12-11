'use strict'

const Container = require('../../').Container

module.exports = function () {
  // Example of an instantiation that fails. We want to use this to test and make
  // sure that constitute produces stack traces that enable easy debugging.

  // This tries to instantiate an object, which will fail
  class FaultyClass {
    static constitute () { return [ {} ] }
  }

  class ExampleClass {
    static constitute () { return [ FaultyClass ] }
    constructor (b) {
      this.b = b
    }
  }

  FaultyFactory.constitute = [ {} ]
  function FaultyFactory () {
  }

  class FaultyPostClass {
    static constitute () { return [ Container ] }
    constructor (container) {
      container.schedulePostConstructor(function () {

      }, [ {} ])
    }
  }

  return { FaultyClass, ExampleClass, FaultyFactory, FaultyPostClass }
}
