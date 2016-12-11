import B from './b'
import C from './c'
import { Dependencies } from 'constitute'

@Dependencies(B, C)
export default class A {
  constructor (b, c) {
    this.b = b
    this.c = c
  }
}
