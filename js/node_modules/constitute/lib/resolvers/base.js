'use strict'

class BaseResolver {
  constructor () {
    if (this.constructor === BaseResolver) {
      throw new Error('BaseResolver cannot be instantiated directly')
    }
  }
  static of (key) {
    return new this(key)
  }
}

module.exports = BaseResolver
