'use strict'

class BaseConstitutor {
  constructor () {
    if (this.constructor === BaseConstitutor) {
      throw new Error('BaseConstitutor cannot be instantiated directly')
    }
  }
}

module.exports = BaseConstitutor
