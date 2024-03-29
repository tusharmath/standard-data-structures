import {Option} from '../immutable/option'
import {ICollection} from '../internals/iCollection'

/* tslint:disable strict-comparisons */
/**
 * A node for the linked list
 */
export class LinkedListNode<T> {
  /**
   * Left Node
   */
  public left: LinkedListNode<T> | undefined

  /**
   * Right Node
   */
  public right: LinkedListNode<T> | undefined

  public constructor(public readonly value: T) {
    this.right = undefined
    this.left = undefined
  }
}

/**
 * Type for a node + no node
 */
type Node<T> = LinkedListNode<T> | undefined

/**
 * A doubly linked list
 */
export class DoublyLinkedList<T> implements ICollection<T> {
  /**
   * Converts the doubly linked list into an array
   */
  public get asArray(): T[] {
    return this.fold(new Array<T>(), (a, b) => {
      b.push(a)

      return b
    })
  }

  /**
   * Returns the first element of the list
   */
  public get head(): T | undefined {
    return this.headN === undefined ? undefined : this.headN.value
  }

  /**
   * Returns true if the list is empty
   */
  public get isEmpty(): boolean {
    return this.length === 0
  }

  /**
   * Returns the last element in the list
   */
  public get tail(): T | undefined {
    return this.tailN === undefined ? undefined : this.tailN.value
  }

  /**
   * Creates a new DoublyLinkedList with the provided values.
   */
  public static of<A = never>(...t: A[]): DoublyLinkedList<A> {
    return new DoublyLinkedList(t)
  }
  /**
   * Returns the size of the linked list
   */
  public length = 0
  private headN: Node<T> = undefined
  private tailN: Node<T> = undefined

  private constructor(values: T[]) {
    for (const i of values) {
      this.add(i)
    }
  }

  /**
   * Adds a new value to the list
   */
  public add(val: T): LinkedListNode<T> {
    const node = new LinkedListNode(val)
    if (this.length === 0) {
      this.headN = node
    }
    if (this.tailN === undefined) {
      this.tailN = node
    } else {
      this.tailN.right = node
      node.left = this.tailN
      this.tailN = node
    }
    this.length += 1

    return node
  }

  /**
   * Cleans removes all the elements from the list
   */
  public empty(): void {
    this.length = 0
    this.headN = this.tailN = undefined
  }

  /**
   * Refer [[ICollection.filter]]
   */
  public filter(F: (A: T) => boolean): ICollection<T> {
    const elm = DoublyLinkedList.of<T>()

    this.fold(true, A => {
      elm.add(A)

      return false
    })

    return elm
  }

  /**
   * Converts the linked list into a value
   */
  public fold<C>(seed: C, f: (value: T, seed: C) => C): C {
    let node = this.headN
    let result = seed
    while (node !== undefined) {
      result = f(node.value, result)
      node = node.right
    }

    return result
  }

  /**
   * Tests if the provided node is a part of the list or not in O(n) time complexity.
   */
  public isConnected(n: LinkedListNode<T>): boolean {
    return (
      n === this.headN ||
      ((n.left !== undefined && n.left.right === n) ||
        (n.right !== undefined && n.right.left === n))
    )
  }

  /**
   * Transforms the values inside the list using the transformer function, creating a new list.
   */
  public map<B>(ab: (a: T) => B): ICollection<B> {
    return this.fold(DoublyLinkedList.of<B>(), (a, l) => {
      l.add(ab(a))

      return l
    })
  }

  /**
   * Removes the last inserted element
   */
  public pop(): Option<T> {
    const h = this.tailN
    if (h !== undefined) {
      this.remove(h)

      return Option.some(h.value)
    }

    return Option.none()
  }

  /**
   * Removes the provided node from the list.
   */
  public remove(n: LinkedListNode<T>): void {
    if (!this.isConnected(n)) {
      return
    }

    if (n.left !== undefined && n.right !== undefined) {
      n.left.right = n.right
      n.right.left = n.left
    } else if (n.left !== undefined) {
      this.tailN = n.left
      n.left.right = undefined
    } else if (n.right !== undefined) {
      this.headN = n.right
      n.right.left = undefined
    } else {
      this.tailN = undefined
      this.headN = undefined
    }

    if (this.length > 0) {
      this.length -= 1
    }
  }

  /**
   * Remove the first element from the list
   */
  public shift(): Option<T> {
    const h = this.headN
    if (h !== undefined) {
      this.remove(h)

      return Option.some(h.value)
    }

    return Option.none()
  }
}
