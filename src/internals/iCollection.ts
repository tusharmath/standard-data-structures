/**
 * Interface for all collections
 */
export interface ICollection<A> {
  /**
   * Converts the collection into an array
   */
  asArray: A[]

  /**
   * Checks if the collection is empty or not. Returns true if the collection is empty.
   */
  isEmpty: boolean

  /**
   * Filters out the values from the collection based on the passed predicate
   */
  filter(F: (A: A) => boolean): ICollection<A>

  /**
   * Converts a collection into a value
   */
  fold<B>(seed: B, ab: (a: A, b: B) => B): B

  /**
   * Converts an [[ICollection]] of type `A` to an [[ICollection]] of type `B`
   */
  map<B>(ab: (a: A) => B): ICollection<B>
}
