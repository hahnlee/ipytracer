'use strict'

const InstanceResolver = require('./instance')

class LazyResolver extends InstanceResolver {
  resolve (container) {
    const key = this.key
    return function () {
      return container.constitute(key)
    }
  }
}

module.exports = LazyResolver
