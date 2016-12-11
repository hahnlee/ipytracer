import B from './b'
import C from './c'

export default class A {
  static constitute () { return [ B, C ] }
  constructor (b, c) {
    this.b = b
    this.c = c
  }
}
