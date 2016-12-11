'use strict'

const assert = require('assert')

const Factory = require('./factories/base')
const NullFactory = require('./factories/null')
const AliasFactory = require('./factories/alias')
const ClassFactory = require('./factories/class')
const ValueFactory = require('./factories/value')
const MethodFactory = require('./factories/method')
const Singleton = require('./constitutors/singleton')
const Util = require('./util')

const ERROR_ADDED_DEBUG_INFO = Symbol('constitute/ERROR_ADDED_DEBUG_INFO')

class Container {
  constructor () {
    this._factories = new Map()
    this._parent = null
    this._stack = new Set()
    this._postConstructors = new Set()

    // Cache ourselves as the Container instance in our own cache
    Singleton.setCachedInstance(this, Container, this)
  }

  _getOrCreateEntry (key) {
    let entry = this._factories.get(key)
    if (!entry) {
      this._factories.set(key, entry = new Set())
    }
    return entry
  }

  bindNull (key) {
    return this.bindCustom(key, new NullFactory())
  }

  bindAlias (key, destinationKey) {
    return this.bindCustom(key, new AliasFactory(destinationKey))
  }

  bindClass (key, Class, constitutor) {
    return this.bindCustom(key, new ClassFactory(Class, constitutor))
  }

  bindValue (key, value) {
    return this.bindCustom(key, new ValueFactory(value))
  }

  bindMethod (key, fn, constitutor) {
    return this.bindCustom(key, new MethodFactory(fn, constitutor))
  }

  bindCustom (key, factory) {
    const entry = this._getOrCreateEntry(key)
    if (!(factory instanceof Factory)) {
      throw new Error('Container#bindCustom expects a Factory object')
    }
    entry.add(factory)
    entry.mostRecent = factory
    return this
  }

  findBestFactory (key) {
    const entry = this._factories.get(key)
    if (!entry && this._parent) {
      return this._parent.findBestFactory(key)
    }
    return entry ? entry.mostRecent : null
  }

  findAllFactories (key) {
    const parentEntries = this._parent ? this._parent.findAllFactories(key) : []

    const entry = this._factories.get(key)
    if (entry) {
      const array = parentEntries
      for (let v of entry) {
        array.push(v)
      }
      return array
    }

    return parentEntries
    // TODO With new ES6 array methods we can just do this
    // return entry ? Array.from(entry) : []
  }

  resolveFactory (key) {
    // First, try to find a local binding
    let binding = this.findBestFactory(key)

    if (binding) return binding

    // Next, try the parent container
    // TODO: Implement container hierarchy

    // Finally, default to the key itself
    if (key instanceof Factory) {
      // Nothing to do
      return key
    } else if (typeof key === 'function') {
      // Key is a function, we'll assume it's a class constructor
      return new ClassFactory(key)
    } else {
      throw new Error('Cannot constitute a value of type ' + typeof key)
    }
  }

  constitute (key) {
    // Detect circular dependencies by tracking the stack of requested instantiations
    // TODO: Should the pretty printing show the key, the factory or both?
    if (this._stack.has(key)) {
      const stackArray = Util.convertSetToArray(this._stack)
      stackArray.push(key)
      const prettyStack = stackArray.map(Util.printPrettyKey).join(' => ')
      throw new Error('Circular dependency detected: ' + prettyStack)
    }

    this._stack.add(key)
    try {
      const factory = this.resolveFactory(key)
      let instance
      try {
        instance = factory.instantiate(this)
      } catch (err) {
        if (err && typeof err === 'object' && typeof err.message === 'string' &&
            !err[ERROR_ADDED_DEBUG_INFO]) {
          err.message += ' (while constituting ' + Util.printPrettyKey(key) + ')'
          err[ERROR_ADDED_DEBUG_INFO] = true
        }
        throw err
      }
      this._stack.delete(key)

      if (this._postConstructors.size) {
        // We need to copy the post constructors to a local variable so that any
        // instantiations that happen inside of them don't retrigger our's
        const postConstructors = this._postConstructors
        this._postConstructors = new Set()

        // The post-constructors should be run on a separate stack since
        // B => A (post => B) is actually ok
        const stack = this._stack
        this._stack = new Set()
        for (let postConstructor of postConstructors) {
          // Set this in the post constructor to the instance being built
          postConstructor.fn = postConstructor.fn.bind(instance)

          try {
            postConstructor.instantiate(this)
          } catch (err) {
            if (err && typeof err === 'object' && typeof err.message === 'string' &&
                !err[ERROR_ADDED_DEBUG_INFO]) {
              err.message += ' (while constituting post constructor for ' + Util.printPrettyKey(key) + ')'
              err[ERROR_ADDED_DEBUG_INFO] = true
            }
            throw err
          }

          assert.equal(this._stack.size, 0)
        }
        this._stack = stack
      }

      return instance
    } catch (err) {
      // We need to catch errors to unwind the circular dependency stack
      this._stack.delete(key)
      throw err
    }
  }

  constituteAll (key) {
    const self = this
    let factories = this.findAllFactories(key)

    return factories.map(function (factory) {
      return factory.instantiate(self)
    })
  }

  getCachedInstance (key) {
    const factory = this.resolveFactory(key)
    return factory.getCachedInstance(this)
  }

  createChild () {
    const container = new Container()
    container._parent = this
    return container
  }

  schedulePostConstructor (callback, constitutor) {
    const postConstructor = new MethodFactory(callback, constitutor)

    this._postConstructors.add(postConstructor)
  }
}

module.exports = Container
