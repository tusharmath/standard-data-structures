/**
 * Interface for all collections
 */
export interface ICollection<A> {
  /**
   * Converts an [[ICollection]] of type `A` to an [[ICollection]] of type `B`
   */
  map<B>(ab: (a: A) => B): ICollection<B>
}
