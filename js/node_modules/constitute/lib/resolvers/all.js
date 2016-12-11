'use strict'

const InstanceResolver = require('./instance')

class AllResolver extends InstanceResolver {
  resolve (container) {
    return container.constituteAll(this.key)
  }
}

module.exports = AllResolver
