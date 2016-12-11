'use strict'

const BaseFactory = require('./base')
const Singleton = require('../constitutors/singleton')

class NullFactory extends BaseFactory {
  constructor (constitutor) {
    super()
    this.constitutor = Singleton.create(constitutor)
  }

  createInstance () {
    return null
  }

  getCacheKey () {
    return this
  }

  instantiate (container) {
    return this.constitutor.constitute(container, this.getCacheKey(), this.createInstance.bind(this, container))
  }

  getCachedInstance (container) {
    return this.constitutor.getCachedInstance(container, this.getCacheKey())
  }
}

module.exports = NullFactory
