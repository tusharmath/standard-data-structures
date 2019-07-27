import {List} from './src/immutable/list'
import {DoublyLinkedList} from './src/mutable/doublyLinkedList'
import {MaxHeap} from './src/mutable/maxHeap'

export {LinkedListNode} from './src/mutable/doublyLinkedList'

/**
 * Namespace for all immutable data-structures
 */
export const immutable = {
  List
}

/**
 * Namespace for all mutable data-structures
 */
export const mutable = {
  DoublyLinkedList,
  MaxHeap
}
