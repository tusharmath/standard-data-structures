import {List} from './src/immutable/list'
import {DoublyLinkedList} from './src/mutable/doublyLinkedList'
import {MaxHeap} from './src/mutable/maxHeap'

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
