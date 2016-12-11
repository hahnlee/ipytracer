'use strict'

const clone = require('clone')

const NullFactory = require('./null')
const Transient = require('../constitutors/transient')

class CloneFactory extends NullFactory {
  constructor (value, constitutor0) {
    // Alias defaults to the transient constitutor
    const constitutor = constitutor0 || Transient.with([])

    super(constitutor)

    this.value = value
  }

  createInstance () {
    return clone(this.value)
  }
}

module.exports = CloneFactory
