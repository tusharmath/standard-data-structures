import {assert} from 'chai'

import * as C from '../'
import {List} from '../src/immutable/list'

describe('index', () => {
  it('should export all DS', () => {
    assert.deepStrictEqual(C, {immutable: {List}})
  })
})
