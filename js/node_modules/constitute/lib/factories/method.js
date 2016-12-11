'use strict'

const NullFactory = require('./null')
const Singleton = require('../constitutors/singleton')

class MethodFactory extends NullFactory {
  constructor (fn, constitutor) {
    // Find method annotation
    if (fn.constitute && !constitutor) {
      const className = fn.name || '[anonymous]'
      constitutor = Singleton.create(fn.constitute, 'factory ' + className)
    }

    super(constitutor)

    this.fn = fn
  }

  createInstance (container, params) {
    return this.fn.apply(container, params)
  }
}

module.exports = MethodFactory
