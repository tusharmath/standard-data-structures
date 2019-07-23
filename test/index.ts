import {assert} from 'chai'

import * as C from '../'
import {List} from '../src/immutable/list'
import {DoublyLinkedList} from '../src/mutable/doublyLinkedList'
import {MaxHeap} from '../src/mutable/maxHeap'

describe('index', () => {
  it('should export all DS', () => {
    assert.deepStrictEqual(C, {
      immutable: {List},
      mutable: {MaxHeap, DoublyLinkedList}
    })
  })
})
