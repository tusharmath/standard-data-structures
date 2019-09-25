import {assert} from 'chai'

import {None, Option, Some} from '../../src/immutable/option'

describe('option', () => {
  describe('none', () => {
    it('should return an instance of None', () => {
      assert.instanceOf(Option.none(), None)
    })
  })

  describe('some', () => {
    it('should return an instance of Some', () => {
      assert.instanceOf(Option.some(10), Some)
    })
  })

  describe('isSome', () => {
    it('should return true', () => {
      assert.isTrue(Option.some(10).isSome)
    })

    it('should return false', () => {
      assert.isFalse(Option.none().isSome)
    })
  })

  describe('isNone', () => {
    it('should return true', () => {
      assert.isTrue(Option.none().isNone)
    })

    it('should return false', () => {
      assert.isFalse(Option.some(0).isNone)
    })
  })

  describe('Option.isSome', () => {
    it('should return true', () => {
      assert.isTrue(Option.isSome(Option.some(10)))
    })

    it('should return false', () => {
      assert.isFalse(Option.isSome(Option.none()))
    })
  })

  describe('Option.isNone', () => {
    it('should return true', () => {
      assert.isTrue(Option.isNone(Option.none()))
    })

    it('should return false', () => {
      assert.isFalse(Option.isNone(Option.some(0)))
    })
  })
})
