import * as assert from 'assert'

import {mutable} from '../..'

describe('maxHeap', () => {
  it('should maintain order', () => {
    const heap = mutable.MaxHeap.of((a, b) => a > b)
    heap.push(1)
    heap.push(10)
    assert.strictEqual(heap.pop(), 10)
  })
})
