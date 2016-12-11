'use strict'

const B = require('./b')
const C = require('./c')

class A {
  static constitute () { return [ B, C ] }
  constructor (b, c) {
    this.b = b
    this.c = c
  }
}

module.exports = A
