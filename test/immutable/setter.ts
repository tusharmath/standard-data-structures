import {assert} from 'chai'

import {Setter} from '../../src/immutable/setter'

describe('Setter', () => {
  it('should return the object as is if the path is empty', () => {
    // Throws compile time error
    // Setter.of().set(10, {count: 20})
  })
  it('should throw error if the path is invalid', () => {
    // Throws compile time error
    // Setter.of('count', 'boys').set(20, {count: 20})
  })
  it('should not mutate the original object', () => {
    const state = {a: {b: 10}, b: 'string'}
    const actual = Setter.of('a', 'b').set(10, state)
    assert.notStrictEqual(actual, state)
  })

  it('should update the primitive on the specified path', () => {
    const state = {a: {b: 10}, b: 'string'}
    const actual = Setter.of('a', 'b').set(20, state)
    const expected = {a: {b: 20}, b: 'string'}
    assert.deepEqual(actual, expected)
  })

  it('should update the object on the specified path', () => {
    const state = {a: {b: {c: 10, d: 10}}, b: 'string'}
    const actual = Setter.of('a', 'b').set({d: 20, c: 30}, state)
    const expected = {a: {b: {c: 30, d: 20}}, b: 'string'}
    assert.deepEqual(actual, expected)
  })
  it('should make a shallow clone of an object, overriding only what is necessary for the path', () => {
    const state = {a: {b: {c: 10, d: 10}, d: {a: 10}}, b: {a: 10}}
    const actual = Setter.of('a', 'b', 'c').set(30, state)
    const expected = {a: {b: {c: 30, d: 10}, d: {a: 10}}, b: {a: 10}}
    assert.strictEqual(actual.a.b.d, expected.a.b.d)
    assert.strictEqual(actual.b.a, expected.b.a)
  })
  it('should throw an error when trying to update particular index of an array', () => {
    // Throws compilation error
    // Const state = {a: {b: {c: [10, 20, 30], d: 10}}, b: 'string'}
    // Const actual = Setter.of('a', 'b', 'c', '1').set(30, state)
  })
  it('should update the array on the specified path', () => {
    const state = {a: {b: {c: [10, 20]}}, b: 'string'}
    const actual = Setter.of('a', 'b', 'c').set([20, 40], state)
    const expected = {a: {b: {c: [20, 40]}}, b: 'string'}
    assert.deepEqual(actual, expected)
  })
})
