'use strict'

const BaseConstitutor = require('./base')
const BaseResolver = require('../resolvers/base')
const InstanceResolver = require('../resolvers/instance')

const INSTANCE_MAP = Symbol('constitute:instance_map')

class SingletonConstitutor extends BaseConstitutor {
  constructor (constituents) {
    super()
    this.constituents = constituents.map(function (constituent) {
      if (constituent instanceof BaseResolver) {
        return constituent
      }

      return InstanceResolver.of(constituent)
    })
  }

  /**
   * Create a constitutor from the value the caller provided.
   *
   * When passed an array, we create a new SingletonConstitutor using provided
   * array as the dependencies.
   *
   * When passed an existing constitutor, we simply pass it through..
   *
   * When passed a falsy value, we create a default constitutor which is a
   * singleton with no dependencies.
   *
   * Otherwise, we assume something has gone horribly wrong and throw an Error.
   */
  static create (constitutor, contextHint) {
    if (typeof constitutor === 'function') {
      constitutor = constitutor()

      if (Array.isArray(constitutor)) {
        return SingletonConstitutor.with(constitutor)
      } else if (constitutor instanceof BaseConstitutor) {
        return constitutor
      }

      // Not a valid return value
      const context = contextHint
        ? 'The constitute annotation in ' + contextHint
        : 'A constitute annotation'
      throw new Error(
        context + ' returned an invalid value ' +
        'of type ' + (typeof constitutor) + ' (should have been an ' +
        'array or a constitutor function)')
    } else if (Array.isArray(constitutor)) {
      // Use default constitutor
      return SingletonConstitutor.with(constitutor)
    } else if (constitutor instanceof BaseConstitutor) {
      return constitutor
    } else if (!constitutor) {
      return SingletonConstitutor.with([])
    } else {
      throw new Error('Invalid constitutor of type ' + typeof constitutor)
    }
  }

  static getInstanceCache (container) {
    if (!container[INSTANCE_MAP]) {
      container[INSTANCE_MAP] = new Map()
    }
    return container[INSTANCE_MAP]
  }

  static getCachedInstance (container, key) {
    const cachedInstance = this.getInstanceCache(container).get(key)

    // Check parent's cache
    if (!cachedInstance && container._parent) {
      return this.getCachedInstance(container._parent, key)
    }

    return cachedInstance
  }

  static setCachedInstance (container, key, instance) {
    return this.getInstanceCache(container).set(key, instance)
  }

  static with (constituents) {
    return new this(constituents)
  }

  constitute (container, key, fn) {
    let instance = this.constructor.getCachedInstance(container, key)
    if (instance) {
      return instance
    }

    const params = this.constituents.map(function (constituent) {
      return constituent.resolve(container)
    })
    instance = Function.prototype.call.call(fn, null, params)

    this.constructor.setCachedInstance(container, key, instance)

    return instance
  }

  getCachedInstance (container, key) {
    return this.constructor.getCachedInstance(container, key)
  }
}

module.exports = SingletonConstitutor
