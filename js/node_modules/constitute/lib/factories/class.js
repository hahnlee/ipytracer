'use strict'

const NullFactory = require('./null')
const Singleton = require('../constitutors/singleton')

class ClassFactory extends NullFactory {
  constructor (Class, constitutor) {
    // Find class annotation
    if (Class.constitute && !constitutor) {
      const className = Class.name || '[anonymous]'
      constitutor = Singleton.create(Class.constitute, 'class ' + className)
    }

    super(constitutor)

    this.Class = Class
  }

  createInstance (container, params) {
    // Provide the dependencies to the constructor
    return new (Function.prototype.bind.apply(this.Class, [null].concat(params)))
  }

  getCacheKey () {
    // Classes are cached per class (even if there are multiple factories for the same class)
    return this.Class
  }
}

module.exports = ClassFactory
