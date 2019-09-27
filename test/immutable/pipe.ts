import {assert} from 'chai'

import {pipe} from '../..'

describe('pipe', () => {
  it('should pipe values through functions', () => {
    const actual = pipe(0)
      .into(_ => _ + 1)
      .into(_ => [_, _ + 1]).drain

    const expected = [1, 2]
    assert.deepStrictEqual(actual, expected)
  })

  context('multiple args', () => {
    it('should pass all args', () => {
      const actual = pipe(
        1,
        2,
        3
      )
        .into((A, B, C) => A + B + C)
        .into(A => A * A).drain

      const expected = 36
      assert.deepStrictEqual(actual, expected)
    })
  })
})
