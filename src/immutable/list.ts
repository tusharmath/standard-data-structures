/* tslint:disable no-use-before-declare */

import {ICollection} from '../internals/iCollection'

/**
 * An immutable singly linked list data-structure
 */
export abstract class List<A> implements ICollection<A> {
  /**
   * Converts a list into an Array
   */
  public get asArray(): A[] {
    return this.fold<A[]>([], (a, b) => {
      b.push(a)

      return b
    })
  }
  /**
   * Creates an empty [[List]]
   */
  public static empty<A>(): List<A> {
    return new Empty()
  }

  /**
   * Creates a new [[List]] with the provided elements.
   */
  public static of<A>(...element: A[]): List<A> {
    let result: List<A> = List.empty()
    for (let i = element.length - 1; i >= 0; i--) {
      result = result.prepend(element[i])
    }

    return result
  }

  /**
   * Returns the head of a [[List]]
   */
  public abstract readonly head: A

  /**
   * Returns true if the list is empty
   */
  public abstract readonly isEmpty: boolean

  /**
   * Returns the complete list without the first element
   */
  public abstract readonly tail: List<A>

  /**
   * Refer [[ICollection.filter]]
   */
  public filter(F: (A: A) => boolean): List<A> {
    return this.reverse.fold(List.empty(), (a, l) => (F(a) ? l.prepend(a) : l))
  }

  /**
   * Reverses the List.
   */
  public get reverse(): List<A> {
    return this.fold(List.empty(), (a, l) => l.prepend(a))
  }

  /**
   * Transforms the [[List]] into a value
   */
  public fold<B>(seed: B, ab: (a: A, b: B) => B): B {
    let n: List<A> = this
    let r: B = seed

    while (!n.isEmpty) {
      r = ab(n.head, r)
      n = n.tail
    }

    return r
  }

  /**
   * Transforms the values of the linked list
   */
  public map<B>(ab: (a: A) => B): List<B> {
    let n: List<A> = this
    let r: List<B> = List.empty()
    while (!n.isEmpty) {
      r = r.prepend(ab(n.head))
      n = n.tail
    }

    return r
  }
  /**
   * Creates a new [[List]] with the provided element in its head.
   */
  public prepend(element: A): List<A> {
    return new Cons(element, this)
  }

  /**
   * Folds the original list into a value of the same type
   */
  public reduce(ab: (a: A, b: A) => A): A {
    return this.tail.fold<A>(this.head, ab)
  }
}

/**
 * Represents an empty list
 */
class Empty<A> extends List<A> {
  /**
   * Returns the head of the list
   */
  public get head(): A {
    throw new Error('Head of an empty list')
  }

  /**
   * Is always true
   */
  public readonly isEmpty = true

  /**
   * Returns the tail of the list
   */
  public get tail(): List<A> {
    throw new Error('Tail of an empty list')
  }
}

/**
 * A non-empty list
 */
class Cons<A> extends List<A> {
  /**
   * Is always false
   */
  public readonly isEmpty = false
  public constructor(public readonly head: A, public readonly tail: List<A>) {
    super()
  }
}
