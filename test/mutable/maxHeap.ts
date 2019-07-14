import * as assert from 'assert'

import {mutable} from '../..'

describe('maxHeap', () => {
  it('should maintain order', () => {
    const heap = mutable.MaxHeap.numbers
    heap.push(1)
    heap.push(10)
    assert.strictEqual(heap.pop(), 10)
  })

  it('should return length', () => {
    const heap = mutable.MaxHeap.numbers
    heap.push(1)
    heap.push(10)
    assert.strictEqual(heap.length, 2)
  })

  it('should return top element', () => {
    const heap = mutable.MaxHeap.numbers
    heap.push(1)
    heap.push(10)
    assert.strictEqual(heap.peek, 10)
  })
})
