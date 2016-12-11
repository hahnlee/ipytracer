'use strict'

const expect = require('chai').expect
const Util = require('../').Util

describe('Util', function () {
  beforeEach(function () {
    this.minimal = require('./samples/01_minimal')()
  })

  describe('convertSetToArray', function () {
    it('should return elements in order', function () {
      const set = new Set()
      set.add('a')
      set.add(9)
      set.add('boo')
      set.add(Util)

      const arr = Util.convertSetToArray(set)

      expect(arr).to.deep.equal(['a', 9, 'boo', Util])
    })
  })

  describe('printPrettyKey', function () {
    it('should print classes by their name', function () {
      class A {}

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('A')
    })

    it('should print functions by their name', function () {
      function A () {}

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('A')
    })

    it('should print anonymous classes as [anonymous class]', function () {
      const A = class {}

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('[anonymous class]')
    })

    it('should print anonymous functions as [anonymous fn]', function () {
      const A = function () {}

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('[anonymous fn]')
    })

    it('should print numbers as the number itself', function () {
      const A = 1337

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('1337')
    })

    it('should print 0 as 0', function () {
      const A = 0

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('0')
    })

    it('should print null as [null]', function () {
      const A = null

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('[null]')
    })

    it('should print true as [true]', function () {
      const A = true

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('[true]')
    })

    it('should print false as [false]', function () {
      const A = false

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('[false]')
    })

    it('should print objects as {}', function () {
      const A = { foo: 'bar' }

      const pretty = Util.printPrettyKey(A)

      expect(pretty).to.be.a('string')
      expect(pretty).to.equal('{}')
    })
  })
})
