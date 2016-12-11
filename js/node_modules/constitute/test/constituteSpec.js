'use strict'

const expect = require('chai').expect
const constitute = require('../')

describe('constitute', function () {
  beforeEach(function () {
    this.minimal = require('./samples/01_minimal')()
  })

  it('should instantiate classes when called', function () {
    const a = constitute(this.minimal.A)

    expect(a).to.be.instanceOf(this.minimal.A)
  })
})
