'use strict'

const NullFactory = require('./null')
const Transient = require('../constitutors/transient')

class ClassFactory extends NullFactory {
  constructor (key, constitutor0) {
    // Alias defaults to the transient constitutor
    const constitutor = constitutor0 || Transient.with([])

    super(constitutor)

    this.key = key
  }

  createInstance (container) {
    // TODO Prevent circular aliases
    return container.constitute(this.key)
  }
}

module.exports = ClassFactory
