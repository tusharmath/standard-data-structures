/* tslint:disable strict-comparisons */

import {ICollection} from '../internals/iCollection'

import {Option} from './option'

/**
 * An immutable HashMap
 */
export class HashMap<K, V> implements ICollection<V> {
  /**
   * Refer [[ICollection.asArray]]
   */
  public get asArray(): V[] {
    return this.fold0(new Array<V>(), (v, k, s) => {
      s.push(v)

      return s
    })
  }

  /**
   * Refer [[ICollection.isEmpty]]
   */
  public get isEmpty(): boolean {
    return this.dict.size === 0
  }

  /**
   * Creates a new instance of [[HashMap]]
   */
  public static of<K, V>(
    entries?: ReadonlyArray<readonly [K, V]>
  ): HashMap<K, V> {
    return new HashMap(new Map(entries))
  }

  private constructor(private readonly dict: Map<K, V>) {}

  /**
   * Deletes the provided key from the HashMap
   */
  public delete(k: K): HashMap<K, V> {
    return this.has(k)
      ? new HashMap(
          this.fold0(new Map(), (v0, k0, s) => (k0 === k ? s : s.set(k0, v0)))
        )
      : this
  }

  /**
   * Refer [[ICollection.filter]]
   */
  public filter(fn: (kv: V) => boolean): HashMap<K, V> {
    return this.fold0(HashMap.of(), (v, k, s) => (fn(v) ? s.set(k, v) : s))
  }

  /**
   * Refer [[ICollection.fold]]
   * Use `HasMap.fold0` to fold with keys.
   */
  public fold<S>(S: S, fn: (kv: V, S: S) => S): S {
    return this.fold0(S, (v, k, s) => fn(v, s))
  }

  /**
   * Folds a [[HasMap]] into a value, by calling the function on each key value pair.
   */
  public fold0<S>(S: S, fn: (V: V, K: K, S: S) => S): S {
    let s = S
    for (const [k, v] of this.dict) {
      s = fn(v, k, s)
    }

    return s
  }

  /**
   * Returns value for the provided key
   */
  public get(k: K): Option<V> {
    return this.dict.has(k) ? Option.some(this.dict.get(k) as V) : Option.none()
  }

  /**
   * Returns true if the value exists in the HashMap
   */
  public has(k: K): boolean {
    return this.dict.has(k)
  }

  /**
   * Refer [[ICollection.map]]
   */
  public map<B>(ab: (V: V) => B): HashMap<K, B> {
    return this.fold0(HashMap.of<K, B>(), (v, k, S) => S.set(k, ab(v)))
  }

  /**
   * Sets a key value pair and returns a new [[HashMap]].
   */
  public set(k: K, v: V): HashMap<K, V> {
    return new HashMap(
      this.fold0(new Map([[k, v]]), (v0, k0, s) =>
        k0 === k ? s : s.set(k0, v0)
      )
    )
  }
}
