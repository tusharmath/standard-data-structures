import {hasOwnProperty} from '../internals/hasOwnProperty'
import {isObject} from '../internals/isObject'

/**
 * The ReadonlyArray type describes Arrays that can only be read from
 */
type iRString = ReadonlyArray<string>

/**
 * Pick the first element from the readonly array
 */
type iHead<T extends iRString> = T[0]

/**
 * Return sub array removing the first element from the array
 */
type iTail<T extends ReadonlyArray<unknown>> = ((...args: T) => void) extends ((
  _: never,
  ...s: infer S
) => void)
  ? S
  : unknown

/**
 * Create object type from given path `P` and value `V`
 */
type iAssocPath<P, V> = P extends ReadonlyArray<never>
  ? V
  : P extends iRString
  ? {[k in iHead<P>]: iAssocPath<iTail<P>, V>}
  : never

/**
 * Data structure to store reference of each level of object
 */
interface IStackItem {
  /**
   * key of object to be updated
   */
  key: string | number
  /**
   * Object to be updated
   */
  partialObject: unknown
}

/**
 * Add ability to modify immutable nested object in type safe and less verbose way.
 */
export class Setter<P extends iRString> {
  /**
   * create new instance of setter with specified path
   */
  public static of<T extends iRString>(...path: T): Setter<T> {
    return new Setter(path)
  }

  private constructor(private readonly path: P) {}
  /**
   * Update the the value at a given path in input object and return new object
   * @param value new value to be set on the path
   * @param input Original object to be updated
   */
  public set<V, O extends iAssocPath<P, V>>(value: V, input: O): O {
    if (this.path.length === 0 || input === null) {
      return input
    }
    let iter = 0
    let key: string | number = ''
    let lens: unknown = input
    const stack = [] as IStackItem[]
    while (iter < this.path.length) {
      key = this.path[iter]
      if (isObject(lens) && hasOwnProperty(lens, key)) {
        stack.push({partialObject: lens, key})
        lens = lens[key]
      } else {
        throw new Error('Invalid path')
      }
      iter++
    }

    return stack.reduceRight(
      (acc, currentVal) => ({
        ...currentVal.partialObject,
        [currentVal.key]: acc
      }),
      value as unknown
    ) as O
  }
}
