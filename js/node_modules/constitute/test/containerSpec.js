'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const Container = require('../').Container
const ValueFactory = require('../').Value
const ClassFactory = require('../').Class

describe('Container', function () {
  beforeEach(function () {
    this.container = new Container()
  })

  describe('findBestFactory', function () {
    it('should find a bound item', function () {
      const container = new Container()
      const symbol = Symbol()
      container.bindValue(Container, symbol)
      const value = container.findBestFactory(Container)

      expect(value).to.be.instanceOf(ValueFactory)
      expect(value.value).to.equal(symbol)
    })

    it('should find the most recently bound item', function () {
      const container = new Container()
      const symbol = Symbol()
      container.bindValue(Container, symbol)
      const symbol2 = Symbol()
      container.bindValue(Container, symbol2)
      const value = container.findBestFactory(Container)

      expect(value).to.be.instanceOf(ValueFactory)
      expect(value.value).to.equal(symbol2)
    })
  })

  describe('findAllFactories', function () {
    it('should find all factories in insertion order', function () {
      const container = new Container()
      class A {}
      const facA = new ValueFactory(10)
      const facB = new ValueFactory(20)
      container.bindCustom(A, facA)
      container.bindCustom(A, facB)

      const factories = container.findAllFactories(A)
      expect(factories).to.deep.equal([facA, facB])
    })

    it('should return an empty array if there are no factories', function () {
      class A {}
      const container = new Container()
      const factories = container.findAllFactories(A)
      expect(factories).to.be.instanceOf(Array)
      expect(factories).to.be.empty
    })
  })

  describe('constitute', function () {
    beforeEach(function () {
      this.container = new Container()
      this.container2 = new Container()
    })

    it('should instantiate classes when called', function () {
      this.env = require('./samples/01_minimal')()
      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.be.instanceOf(this.env.B)
    })

    it('should instantiate classes when called on classes with multiple dependencies', function () {
      this.env = require('./samples/08_multiple')()
      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.be.instanceOf(this.env.B)
      expect(a.c).to.be.instanceOf(this.env.C)
      expect(a.d).to.be.instanceOf(this.env.D)
      expect(a.c.e).to.be.instanceOf(this.env.E)
      expect(a.d.e).to.be.instanceOf(this.env.E)
      expect(a.d.f).to.be.instanceOf(this.env.F)
    })

    it('should instantiate only one singleton when called twice', function () {
      this.env = require('./samples/01_minimal')()
      const a1 = this.container.constitute(this.env.A)
      const a2 = this.container.constitute(this.env.A)

      expect(a1).to.be.instanceOf(this.env.A)
      expect(a1.b).to.be.instanceOf(this.env.B)
      expect(a1).to.equal(a2)
      expect(a1.b).to.equal(a2.b)
    })

    it('should instantiate different singletons when called twice on different containers', function () {
      this.env = require('./samples/01_minimal')()
      const a1 = this.container.constitute(this.env.A)
      const a2 = this.container2.constitute(this.env.A)

      expect(a1).to.be.instanceOf(this.env.A)
      expect(a2).to.be.instanceOf(this.env.A)
      expect(a1.b).to.be.instanceOf(this.env.B)
      expect(a2.b).to.be.instanceOf(this.env.B)
      expect(a1).to.not.equal(a2)
      expect(a1.b).to.not.equal(a2.b)
    })

    it('should instantiate new instances of transient classes when called twice', function () {
      this.env = require('./samples/02_transient')()
      const a1 = this.container.constitute(this.env.A)
      const a2 = this.container.constitute(this.env.A)

      expect(a1).to.not.equal(a2)
      expect(a1).to.be.instanceOf(this.env.A)
      expect(a2).to.be.instanceOf(this.env.A)
      expect(a1.b).to.be.instanceOf(this.env.B)
      expect(a1.b).to.equal(a2.b)
    })

    it('should always use the same instance on global classes', function () {
      this.env = require('./samples/03_global')()
      const a1 = this.container.constitute(this.env.A)
      const a2 = this.container2.constitute(this.env.A)

      expect(a1).to.be.instanceOf(this.env.A)
      expect(a2).to.be.instanceOf(this.env.A)
      expect(a1).to.equal(a2)
      expect(a1.b).to.equal(a2.b)
    })

    it('should be able to resolve a value factory', function () {
      this.env = require('./samples/04_value')()
      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.equal(42)
    })

    it('should follow aliases when using an alias factory', function () {
      this.env = require('./samples/05_alias')()
      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.be.instanceOf(this.env.C)
    })

    it('should return a copy of the data when using the clone factory', function () {
      this.env = require('./samples/06_clone')()

      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.deep.equal(this.env.data)
      expect(a.b).to.not.equal(this.env.data)
    })

    it('should return independent instances when using the clone factory', function () {
      this.env = require('./samples/06_clone')()

      const a1 = this.container.constitute(this.env.A)
      const a2 = this.container.constitute(this.env.A)

      a2.b.foo = 'baz'

      expect(a1.b).to.not.equal(a2.b)
      expect(a1).to.be.instanceOf(this.env.A)
      // Check against static data also in case we somehow modified the original object
      expect(a1.b).to.deep.equal({ foo: 'bar' })
      expect(a1.b).to.deep.equal(this.env.data)
      expect(a2).to.be.instanceOf(this.env.A)
      expect(a2.b).to.deep.equal({ foo: 'baz' })
    })

    it('should call factory method when using a method factory', function () {
      this.env = require('./samples/07_method')()
      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b.c).to.be.instanceOf(this.env.C)
    })

    it('should automatically detect annotations on method factories', function () {
      class B {}
      A.constitute = [ B ]
      function A (b) {
        return { b }
      }

      this.container.bindMethod(A, A)
      const a = this.container.constitute(A)

      expect(a).to.be.an('object')
      expect(a.b).to.be.instanceOf(B)
    })

    it('should throw when an anonymous method factory has an invalid annotation', function () {
      const container = this.container
      expect(function () {
        var A = function (b) {
          return { b }
        }
        A.constitute = function () { return 'bleh' }

        container.bindMethod(A, A)
        container.constitute(A)
      }).to.throw(Error, /The constitute annotation in factory \[anonymous\] returned an invalid value of type string \(should have been an array or a constitutor function\)/)
    })

    it('should let you mock a class via binding', function () {
      class MockB {}

      const env = require('./samples/01_minimal')()
      this.container.bindClass(env.B, MockB)
      const a = this.container.constitute(env.A)

      expect(a).to.be.instanceOf(env.A)
      expect(a.b).to.be.instanceOf(MockB)
    })

    it('should instantiate all classes when using the All resolver', function () {
      this.env = require('./samples/09_plugin')()
      this.container.bindClass(this.env.Plugin, this.env.A)
      this.container.bindClass(this.env.Plugin, this.env.B)

      const app = this.container.constitute(this.env.App)

      expect(app).to.be.instanceOf(this.env.App)
      expect(app.plugins).to.have.length(2)
      expect(app.plugins[0]).to.be.instanceOf(this.env.A)
      expect(app.plugins[1]).to.be.instanceOf(this.env.B)
    })

    it('should create lazy resolver methods when using the Lazy resolver', function () {
      this.env = require('./samples/10_lazy')()

      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.be.a('function')
      expect(a.b()).to.be.instanceOf(this.env.B)
    })

    it('should return undefined for uncached instances when using the Optional resolver', function () {
      this.env = require('./samples/11_optional')()

      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.be.undefined
    })

    it('should return cached instances when using the Optional resolver', function () {
      this.env = require('./samples/11_optional')()

      this.container.constitute(this.env.B)
      const a = this.container.constitute(this.env.A)

      expect(a).to.be.instanceOf(this.env.A)
      expect(a.b).to.be.instanceOf(this.env.B)
    })

    it('should return itself when asking for a Container', function () {
      const container = this.container.constitute(Container)

      expect(container).to.equal(this.container)
    })

    it('should throw when detecting a circular dependency', function () {
      const self = this
      this.env = require('./samples/12_circular')()

      expect(function () {
        self.container.constitute(self.env.A)
      }).to.throw(Error, /Circular dependency detected: A => B => A/)
    })

    it('should unwind circular dependency stack when a constructor throws', function () {
      const self = this

      expect(function () {
        class A {
          constructor () {
            throw new Error('test')
          }
        }
        self.container.constitute(A)
      }).to.throw(Error, /test/)

      expect(this.container._stack.size).to.equal(0)
    })

    it('should produce a useful error message when a class instantiation fails', function () {
      const env = require('./samples/14_debug')()
      const self = this

      expect(function () {
        self.container.constitute(env.ExampleClass)
      }).to.throw(Error, /Cannot constitute a value of type object \(while constituting FaultyClass\)/)
    })

    it('should produce a useful error message when a factory instantiation fails', function () {
      const env = require('./samples/14_debug')()
      const self = this

      expect(function () {
        self.container.constitute(env.FaultyFactory)
      }).to.throw(Error, /Cannot constitute a value of type object \(while constituting FaultyFactory\)/)
    })

    it('should produce a useful error message when a post constructor instantiation fails', function () {
      const env = require('./samples/14_debug')()
      const self = this

      expect(function () {
        self.container.constitute(env.FaultyPostClass)
      }).to.throw(Error, /Cannot constitute a value of type object \(while constituting post constructor for FaultyPostClass\)/)
    })
  })

  describe('bindNull', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should create a null factory', function () {
      class A {}
      this.container.bindNull(A)

      const a = this.container.constitute(A)
      expect(a).to.equal(null)
    })
  })

  describe('bindAlias', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should redirect a key to another key', function () {
      class A {}
      class B {}
      this.container.bindAlias(A, B)

      const a = this.container.constitute(A)
      expect(a).to.be.instanceOf(B)
    })

    it('should redirect through several levels', function () {
      class A {}
      class B {}
      class C {}
      this.container.bindAlias(A, B)
      this.container.bindAlias(B, C)

      const a = this.container.constitute(A)
      expect(a).to.be.instanceOf(C)
    })

    it('should follow remaps', function () {
      class A {}
      class B {}
      class C {}
      this.container.bindAlias(A, B)
      this.container.bindClass(B, C)

      const a = this.container.constitute(A)
      expect(a).to.be.instanceOf(C)
    })
  })

  describe('bindValue', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should create a value factory', function () {
      class A {}
      this.container.bindValue(A, 42)

      const a = this.container.constitute(A)
      expect(a).to.equal(42)
    })
  })

  describe('bindMethod', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should create a method factory', function () {
      class A {}
      class B {}
      this.container.bindMethod(A, function () {
        return new B()
      })

      const a = this.container.constitute(A)
      expect(a).to.be.instanceOf(B)
    })

    it('should throw when given an invalid constitutor', function () {
      class A {}
      class B {}

      const container = this.container
      expect(function () {
        container.bindMethod(A, function () {
          return new B()
        }, {})
      }).to.throw(/Invalid constitutor of type object/)
    })
  })

  describe('bindClass', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should create a class factory', function () {
      class A {}
      class B {}
      this.container.bindClass(A, B)

      const a = this.container.constitute(A)
      expect(a).to.be.instanceOf(B)
    })

    it('should throw when the class exports invalid metadata', function () {
      class A {}
      class B {
        static constitute () { return {} }
      }

      const container = this.container
      expect(function () {
        container.bindClass(A, B)
      }).to.throw(/The constitute annotation in class B returned an invalid value of type object \(should have been an array or a constitutor function\)/)
    })

    it('should throw when an anonymous class exports invalid metadata', function () {
      class A {}
      const B = function () {}
      B.constitute = function () { return {} }

      const container = this.container
      expect(function () {
        container.bindClass(A, B)
      }).to.throw(/The constitute annotation in class \[anonymous\] returned an invalid value of type object \(should have been an array or a constitutor function\)/)
    })
  })

  describe('bindCustom', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should use a custom factory', function () {
      class A {}

      let counter = 0
      class IncrementFactory extends ValueFactory {
        instantiate () {
          return counter++
        }
      }
      this.container.bindCustom(A, new IncrementFactory())

      const a1 = this.container.constitute(A)
      expect(a1).to.equal(0)

      const a2 = this.container.constitute(A)
      expect(a2).to.equal(1)
    })

    it('should throw when the factory is not a subclass of BaseFactory', function () {
      class A {}
      const container = this.container
      expect(function () {
        container.bindCustom(A, new A())
      }).to.throw(/Container#bindCustom expects a Factory object/)
    })
  })

  describe('resolveFactory', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should default to the key itself', function () {
      const fac = new ValueFactory(10)
      const a = this.container.resolveFactory(fac)
      expect(a).to.equal(fac)
    })

    it('should create a class factory automatically', function () {
      class A {}
      const a = this.container.resolveFactory(A)
      expect(a).to.be.instanceOf(ClassFactory)
    })

    it('should resolve to the most recent binding', function () {
      class A {}
      const facA = new ValueFactory(10)
      const facB = new ValueFactory(20)
      this.container.bindCustom(A, facA)
      this.container.bindCustom(A, facB)
      const a = this.container.resolveFactory(A)
      expect(a).to.equal(facB)
    })

    it('should throw when the key is undefined and invalid as a default', function () {
      const A = {}
      const container = this.container
      expect(function () {
        container.resolveFactory(A)
      }).to.throw(/Cannot constitute a value of type object/)
      this.container.resolveFactory
    })

    it('should not throw when the key is defined even when it is invalid as a default', function () {
      const A = {}
      this.container.bindNull(A)
      const a = this.container.resolveFactory(A)
      expect(a).to.be.a('object')
    })
  })

  describe('createChild', function () {
    it('should return a valid container', function () {
      const masterContainer = new Container()
      const subContainer = masterContainer.createChild()

      expect(subContainer).to.be.instanceOf(Container)
    })

    it('should inherit mapping from the parent', function () {
      const masterContainer = new Container()
      const subContainer = masterContainer.createChild()

      class A {}
      class B {}

      masterContainer.bindClass(A, B)

      expect(masterContainer.constitute(A)).to.be.instanceOf(B)
      expect(subContainer.constitute(A)).to.be.instanceOf(B)
    })

    it('should not propagate mappings to the parent', function () {
      const masterContainer = new Container()
      const subContainer = masterContainer.createChild()

      class A {}
      class B {}

      subContainer.bindClass(A, B)

      expect(masterContainer.constitute(A)).to.be.instanceOf(A)
      expect(subContainer.constitute(A)).to.be.instanceOf(B)
    })

    it('should accumulate All resolvers with the parent', function () {
      const masterContainer = new Container()
      const subContainer = masterContainer.createChild()

      this.env = require('./samples/09_plugin')()
      masterContainer.bindClass(this.env.Plugin, this.env.A)
      masterContainer.bindClass(this.env.Plugin, this.env.B)
      class C extends this.env.Plugin {}
      subContainer.bindClass(this.env.Plugin, C)

      const app = subContainer.constitute(this.env.App)

      expect(app).to.be.instanceOf(this.env.App)
      expect(app.plugins).to.have.length(3)
      expect(app.plugins[0]).to.be.instanceOf(this.env.A)
      expect(app.plugins[1]).to.be.instanceOf(this.env.B)
      expect(app.plugins[2]).to.be.instanceOf(C)
    })

    it('should use parent cache', function () {
      class A {}

      const masterContainer = new Container()
      const subContainer = masterContainer.createChild()

      const a1 = masterContainer.constitute(A)
      const a2 = subContainer.constitute(A)

      expect(a1).to.equal(a2)
    })

    it('should not influence parent cache, but should stick to own if already populated', function () {
      class A {}

      const masterContainer = new Container()
      const subContainer = masterContainer.createChild()

      const a2 = subContainer.constitute(A)
      const a1 = masterContainer.constitute(A)
      const a3 = subContainer.constitute(A)

      expect(a1).to.not.equal(a2)
      expect(a2).to.equal(a3)
    })
  })

  describe('schedulePostConstructor', function () {
    beforeEach(function () {
      this.container = new Container()
    })

    it('should run the post-constructor before finishing constitution', function () {
      const postConstructor = sinon.spy()
      class A {
        static constitute () { return [ Container ] }
        constructor (container) {
          container.schedulePostConstructor(postConstructor)
        }
      }

      const a = this.container.constitute(A)

      expect(postConstructor).to.have.been.calledOnce
      expect(postConstructor).to.have.been.calledOn(a)
      expect(postConstructor).to.have.been.calledWithExactly()
    })

    it('should run the post-constructor with dependencies', function () {
      const postConstructor = sinon.spy()
      class A {
        static constitute () { return [ Container ] }
        constructor (container) {
          container.schedulePostConstructor(postConstructor, [ Container ])
        }
      }

      const a = this.container.constitute(A)

      expect(postConstructor).to.have.been.calledOnce
      expect(postConstructor).to.have.been.calledOn(a)
      expect(postConstructor).to.have.been.calledWithExactly(this.container)
    })

    it('should run the post-constructor even if class depends on itself', function () {
      const postConstructor = sinon.spy()
      class A {
        static constitute () { return [ Container ] }
        constructor (container) {
          container.schedulePostConstructor(postConstructor, [ A ])
        }
      }

      const a = this.container.constitute(A)

      expect(postConstructor).to.have.been.calledOnce
      expect(postConstructor).to.have.been.calledOn(a)
      expect(postConstructor).to.have.been.calledWithExactly(a)
    })

    it('should solve circular dependencies forward', function () {
      const env = require('./samples/13_post')()

      const a = this.container.constitute(env.A)

      expect(a).to.be.instanceOf(env.A)
      expect(a.b).to.be.instanceOf(env.B)
    })

    it('should solve circular dependencies backward', function () {
      const env = require('./samples/13_post')()

      const b = this.container.constitute(env.B)

      expect(b).to.be.instanceOf(env.B)
      expect(b.a).to.be.instanceOf(env.A)
    })
  })
})
