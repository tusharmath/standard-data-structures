/**
 * Pipeline that can take only one argument.
 */
class Pipeline1<T> {
  public constructor(public readonly drain: T) {}

  /**
   * Refer [[Into.into]]
   */
  public into<S>(F: (T: T) => S): Pipeline1<S> {
    return new Pipeline1(F(this.drain))
  }
}

/**
 * Pipeline class that takes in any number of arguments
 */
class PipelineN<T extends unknown[]> {
  public constructor(private readonly TT: T) {}

  /**
   * Refer [[Into.into]]
   */
  public into<S>(F: (...T: T) => S): Pipeline1<S> {
    return new Pipeline1(F(...this.TT))
  }
}

/**
 * Takes in any number of values that can be piped into a function.
 * Returns a pipeline that can be used recursively to pipe to other functions.
 *
 * **Example:**
 * ```ts
 * import {pipe} from 'standard-data-structures'
 *
 * pipe(1, 2).into((A, B) => A + B).into(A => [A, A * A]).drain // [3, 9]
 * ```
 */
export const pipe = <T extends unknown[]>(...T: T): PipelineN<T> =>
  new PipelineN(T)
