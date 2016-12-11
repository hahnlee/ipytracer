'use strict'

const Constitutor = require('../constitutors/base')
const Singleton = require('../constitutors/singleton')

/**
 * Constitute decorator for classes.
 */
module.exports = function Dependencies (constitutor0) {
  let constitutor
  if (constitutor0 instanceof Constitutor) {
    constitutor = constitutor0
  } else {
    const dependencies = Array.prototype.slice.call(arguments)
    constitutor = Singleton.create(dependencies)
  }
  return function (Class) {
    Class.constitute = constitutor
  }
}
