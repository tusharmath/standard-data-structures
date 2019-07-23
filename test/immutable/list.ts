import {assert} from 'chai'

import {List} from '../../src/immutable/list'

describe('list', () => {
  describe('of', () => {
    it('should create an instance of list', () => {
      const i = List.of(1, 2, 3)
      assert.ok(i instanceof List)
    })
  })

  describe('reduce', () => {
    it('should reduce the list to a value', () => {
      const actual = List.of(1, 2, 3).reduce((a, b) => a + b)
      const expected = 6
      assert.strictEqual(actual, expected)
    })
  })

  describe('fold', () => {
    it('should reduce the list to a value', () => {
      const actual = List.of(1, 2, 3).fold(100, (a, b) => a + b)
      const expected = 106
      assert.strictEqual(actual, expected)
    })
  })

  describe('map', () => {
    it('should update internal values', () => {
      const actual = List.of(1, 2, 3)
        .map(_ => _ * 10)
        .reduce((a, b) => a + b)
      const expected = 60
      assert.strictEqual(actual, expected)
    })
  })

  describe('asArray', () => {
    it('should return an array', () => {
      const actual = List.of(1, 2, 3, 4).asArray
      const expected = [1, 2, 3, 4]
      assert.deepStrictEqual(actual, expected)
    })
  })
})
