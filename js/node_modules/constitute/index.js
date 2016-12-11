'use strict'

const Container = require('./lib/container')

module.exports = constitute

function constitute (Class) {
  const container = new Container()
  return container.constitute(Class)
}

// TODO Separate main exports from shorthand exports

// Constitutors
constitute.BaseConstitutor = require('./lib/constitutors/base')
constitute.GlobalConstitutor = require('./lib/constitutors/global')
constitute.SingletonConstitutor = require('./lib/constitutors/singleton')
constitute.TransientConstitutor = require('./lib/constitutors/transient')

// Factories
constitute.BaseFactory = require('./lib/factories/base')
constitute.NullFactory = require('./lib/factories/null')
constitute.ValueFactory = require('./lib/factories/value')
constitute.CloneFactory = require('./lib/factories/clone')
constitute.AliasFactory = require('./lib/factories/alias')
constitute.ClassFactory = require('./lib/factories/class')
constitute.MethodFactory = require('./lib/factories/method')

// Resolvers
constitute.BaseResolver = require('./lib/resolvers/base')
constitute.InstanceResolver = require('./lib/resolvers/instance')
constitute.AllResolver = require('./lib/resolvers/all')
constitute.LazyResolver = require('./lib/resolvers/lazy')
constitute.OptionalResolver = require('./lib/resolvers/optional')

// Decorators
constitute.Dependencies = require('./lib/decorators/dependencies')

// Constitutors shorthand
constitute.Constitutor = constitute.BaseConstitutor
constitute.Global = constitute.GlobalConstitutor
constitute.Singleton = constitute.SingletonConstitutor
constitute.Transient = constitute.TransientConstitutor

// Factories shorthand
constitute.Factory = constitute.BaseFactory
constitute.Null = constitute.NullFactory
constitute.Value = constitute.ValueFactory
constitute.Clone = constitute.CloneFactory
constitute.Alias = constitute.AliasFactory
constitute.Class = constitute.ClassFactory
constitute.Method = constitute.MethodFactory

// Resolvers shorthand
constitute.Resolver = constitute.BaseResolver
constitute.Instance = constitute.InstanceResolver
constitute.All = constitute.AllResolver
constitute.Lazy = constitute.LazyResolver
constitute.Optional = constitute.OptionalResolver

// Other classes
constitute.Container = Container
constitute.Util = require('./lib/util')
