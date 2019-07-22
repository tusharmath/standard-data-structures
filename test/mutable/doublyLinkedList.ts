import * as assert from 'assert'

import {DoublyLinkedList} from '../../src/mutable/doublyLinkedList'

describe('DoublyLinkedList', () => {
  describe('add()', () => {
    it('should add()', () => {
      const q = DoublyLinkedList.of<string>()
      q.add('A')
      q.add('B')
      q.add('C')
      q.add('D')
      assert.strictEqual(q.head, 'A')
      assert.strictEqual(q.tail, 'D')
      assert.deepStrictEqual(q.asArray, ['A', 'B', 'C', 'D'])
      assert.strictEqual(q.length, 4)
    })
  })

  describe('isEmpty', () => {
    it('should return true', () => {
      const Q = DoublyLinkedList.of<number>()
      assert.ok(Q.isEmpty)
    })

    it('should return false', () => {
      const Q = DoublyLinkedList.of<number>(1, 2, 3)
      assert.ok(!Q.isEmpty)
    })
  })
  describe('remove()', () => {
    context('when is non empty', () => {
      it('should remove the first element', () => {
        const q = DoublyLinkedList.of<string>()
        const a = q.add('A')
        q.add('B')
        q.add('C')
        q.remove(a)

        assert.strictEqual(q.head, 'B')
        assert.strictEqual(q.tail, 'C')
        assert.deepStrictEqual(q.asArray, ['B', 'C'])
        assert.strictEqual(q.length, 2)
      })

      it('should remove the last element', () => {
        const q = DoublyLinkedList.of<string>()
        q.add('A')
        q.add('B')
        const c = q.add('C')
        q.remove(c)

        assert.strictEqual(q.head, 'A')
        assert.strictEqual(q.tail, 'B')
        assert.deepStrictEqual(q.asArray, ['A', 'B'])
        assert.strictEqual(q.length, 2)
      })

      it('should remove any middle element', () => {
        const q = DoublyLinkedList.of<string>()
        q.add('A')
        const b = q.add('B')
        q.add('C')

        q.remove(b)
        assert.strictEqual(q.head, 'A')
        assert.strictEqual(q.tail, 'C')
        assert.deepStrictEqual(q.asArray, ['A', 'C'])
        assert.strictEqual(q.length, 2)
      })
    })
    context('when has one element', () => {
      it('should remove that element', () => {
        const q = DoublyLinkedList.of<string>()
        const a = q.add('A')
        q.remove(a)

        assert.strictEqual(q.head, undefined)
        assert.strictEqual(q.tail, undefined)
        assert.deepStrictEqual(q.asArray, [])
        assert.strictEqual(q.length, 0)
      })
    })
    context('when is empty', () => {
      it('should remove only than once', () => {
        const q = DoublyLinkedList.of<string>()
        const a = q.add('A')
        q.remove(a)
        q.remove(a)
        assert.strictEqual(q.length, 0)
      })
    })
  })
  describe('forEach()', () => {
    it('should iterate over the list ', () => {
      const q = DoublyLinkedList.of<number>()
      q.add(1)
      q.add(2)
      q.add(3)
      q.add(4)
      const results = q.fold(new Array<number>(), (i, arr) => [...arr, i * 100])
      assert.deepStrictEqual(results, [100, 200, 300, 400])
    })
  })

  describe('constructor()', () => {
    it('should add values passed to the constructor', () => {
      const q = DoublyLinkedList.of(1, 2, 3, 4, 5)
      const results = q.fold(new Array<number>(), (i, arr) => [...arr, i])

      const expected = [1, 2, 3, 4, 5]
      assert.deepStrictEqual(results, expected)
    })
  })

  describe('shift()', () => {
    it('should return the head', () => {
      const q = DoublyLinkedList.of(1, 2, 3, 4, 5)
      const actual = q.shift()
      const expected = 1
      assert.strictEqual(actual, expected)
    })

    it('should return undefined', () => {
      const q = DoublyLinkedList.of<number>()
      const actual = q.shift()
      const expected = undefined
      assert.strictEqual(actual, expected)
    })
  })

  describe('pop()', () => {
    it('should return the head', () => {
      const q = DoublyLinkedList.of(1, 2, 3, 4, 5)
      const actual = q.pop()
      const expected = 5
      assert.strictEqual(actual, expected)
    })

    it('should return undefined', () => {
      const q = DoublyLinkedList.of<number>()
      const actual = q.pop()
      const expected = undefined
      assert.strictEqual(actual, expected)
    })
  })
})
