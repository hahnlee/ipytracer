'use strict'

const expect = require('chai').expect
const constitute = require('../')
const Singleton = constitute.Singleton
const Transient = constitute.Transient

describe('Singleton', function () {
  describe('create', function () {
    it('should pass existing constitutors straight through', function () {
      const constitutor = Transient.with([])
      const result = Singleton.create(constitutor)
      expect(result).to.be.instanceOf(Transient)
      expect(result).to.equal(constitutor)
    })

    it('should create a Singleton constitutor when passed an array of dependencies', function () {
      class A {}
      const result = Singleton.create([ A ])
      expect(result).to.be.instanceOf(Singleton)
    })

    it('should execute a constitutor function and use the returned constitutor', function () {
      const constitutor = Transient.with([])
      const constitutorFn = function () { return constitutor }
      const result = Singleton.create(constitutorFn)
      expect(result).to.be.instanceOf(Transient)
      expect(result).to.equal(constitutor)
    })

    it('should execute a constitutor function and create a Singleton constitutor when that function returns an array of dependencies', function () {
      class A {}
      const constitutorFn = function () { return [ A ] }
      const result = Singleton.create(constitutorFn)
      expect(result).to.be.instanceOf(Singleton)
    })

    it('should throw when a constitutor factory returns invalid results', function () {
      expect(function () {
        Singleton.create(function () {
          return 'blah'
        })
      }).to.throw(Error, /A constitute annotation returned an invalid value of type string \(should have been an array or a constitutor function\)/)
    })
  })
})
