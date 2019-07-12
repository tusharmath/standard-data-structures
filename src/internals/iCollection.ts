/**
 * Interface for all collections
 */
export interface ICollection<A> {
  /**
   * Converts a collection into a value
   */
  fold<B>(seed: B, ab: (a: A, b: B) => B): B

  /**
   * Converts an [[ICollection]] of type `A` to an [[ICollection]] of type `B`
   */
  map<B>(ab: (a: A) => B): ICollection<B>

  /**
   * Like `fold` but does not require a seed value
   */
  reduce(ab: (a: A, b: A) => A): A
}