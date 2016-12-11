'use strict'

const expect = require('chai').expect

const BaseConstitutor = require('../').Constitutor
const BaseFactory = require('../').Factory
const BaseResolver = require('../').Resolver

describe('BaseConstitutor', function () {
  it('cannot be instantiated', function () {
    expect(function () {
      this.constitutor = new BaseConstitutor()
    }).to.throw(/BaseConstitutor cannot be instantiated directly/)
  })
})

describe('BaseFactory', function () {
  it('cannot be instantiated', function () {
    expect(function () {
      this.factory = new BaseFactory()
    }).to.throw(/BaseFactory cannot be instantiated directly/)
  })
})

describe('BaseResolver', function () {
  it('cannot be instantiated', function () {
    expect(function () {
      this.resolver = new BaseResolver()
    }).to.throw(/BaseResolver cannot be instantiated directly/)
  })
})
