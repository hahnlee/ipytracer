'use strict'

const Singleton = require('./singleton')

class TransientConstitutor extends Singleton {
  static getCachedInstance () {
    // Instances are never cached in this constitutor
    return null
  }

  static setCachedInstance () {
    // Instances are never cached in this constitutor
  }
}

module.exports = TransientConstitutor
