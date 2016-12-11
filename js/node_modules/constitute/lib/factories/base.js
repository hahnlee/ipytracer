'use strict'

class BaseFactory {
  constructor () {
    if (this.constructor === BaseFactory) {
      throw new Error('BaseFactory cannot be instantiated directly')
    }
  }
}

module.exports = BaseFactory
