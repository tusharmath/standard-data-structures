import {id} from '../internals/id'

/**
 * A tuple data-structure that can carry two values viz _0 and _1.
 */
export class Tuple<A0, A1> {
  /**
   * Creates a new instance of [[Tuple]]
   */
  public static of<A0, A1>(_0: A0, _1: A1): Tuple<A0, A1> {
    return new Tuple(_0, _1)
  }

  private constructor(public readonly _0: A0, public readonly _1: A1) {}

  /**
   * Maps over both the first and the second value.
   */
  public biMap<B0, B1>(LL: (L: A0) => B0, RR: (R: A1) => B1): Tuple<B0, B1> {
    return new Tuple(LL(this._0), RR(this._1))
  }

  /**
   * Maps over the zeroth value
   */
  public map0<LL>(_0: (R: A0) => LL): Tuple<LL, A1> {
    return this.biMap(_0, id)
  }

  /**
   * Maps over the first value
   */
  public map1<RR>(RR: (R: A1) => RR): Tuple<A0, RR> {
    return this.biMap(id, RR)
  }
}
