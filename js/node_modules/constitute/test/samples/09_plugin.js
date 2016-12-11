'use strict'

const All = require('../../').All

module.exports = function () {
  class Plugin {}
  class A extends Plugin {}
  class B extends Plugin {}

  // Note that we also have to call container.bindClass(Plugin, A), but we'll
  // do that in the test case since it is running the code to be tested.

  class App {
    static constitute () { return [ All.of(Plugin) ] }
    constructor (plugins) {
      this.plugins = plugins
    }
  }
  return { Plugin, A, B, App }
}
