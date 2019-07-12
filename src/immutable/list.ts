/* tslint:disable no-use-before-declare */

import {ICollection} from '../internals/iCollection'

/**
 * An immutable singly linked list data-structure
 */
export abstract class List<A> implements ICollection<A> {
  /**
   * Creates an empty [[List]]
   */
  public static get empty(): List<never> {
    return new Empty()
  }

  /**
   * Creates a new [[List]] of one element
   */
  public static of<A>(element: A): List<A> {
    return new Cons(element, List.empty)
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
   * Transforms the values of the linked list
   */
  public map<B>(ab: (a: A) => B): List<B> {
    // tslint:disable-next-line: no-this-assignment
    let n: List<A> = this
    let r: List<B> = List.empty
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
