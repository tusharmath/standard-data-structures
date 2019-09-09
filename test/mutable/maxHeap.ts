import * as assert from 'assert'

import {MaxHeap} from '../../src/mutable/maxHeap'

describe('maxHeap', () => {
  it('should maintain order', () => {
    const heap = MaxHeap.numbers
    heap.push(1)
    heap.push(10)
    assert.strictEqual(heap.pop(), 10)
  })

  it('should return length', () => {
    const heap = MaxHeap.numbers
    heap.push(1)
    heap.push(10)
    assert.strictEqual(heap.length, 2)
  })

  it('should return top element', () => {
    const heap = MaxHeap.numbers
    heap.push(1)
    heap.push(10)
    assert.strictEqual(heap.peek, 10)
  })
})
