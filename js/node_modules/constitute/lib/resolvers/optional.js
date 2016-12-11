'use strict'

const InstanceResolver = require('./instance')

class OptionalResolver extends InstanceResolver {
  resolve (container) {
    return container.getCachedInstance(this.key)
  }
}

module.exports = OptionalResolver
