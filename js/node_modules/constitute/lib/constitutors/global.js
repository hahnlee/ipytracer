'use strict'

const Singleton = require('./singleton')

class GlobalConstitutor extends Singleton {
  static getCachedInstance (container, Class) {
    return GlobalConstitutor._instances.get(Class)
  }

  static setCachedInstance (container, Class, instance) {
    return GlobalConstitutor._instances.set(Class, instance)
  }
}

GlobalConstitutor._instances = new Map()

module.exports = GlobalConstitutor
