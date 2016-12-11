'use strict'

const BaseResolver = require('./base')

class InstanceResolver extends BaseResolver {
  constructor (key) {
    super()
    this.key = key
  }

  resolve (container) {
    return container.constitute(this.key)
  }
}

module.exports = InstanceResolver
