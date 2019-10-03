/**
 * Created by tushar on 07/09/19
 */

/* tslint:disable no-use-before-declare prefer-function-over-method */

import {NoSuchValueException} from '../internals/noSuchValueException'

import {Option} from './option'

/**
 * A data structure that represents Success/Failure & optional types
 * @typeparam L1 Represents Left case that can be used to depict failures.
 * @typeparam R1 Represents Right case that can be used to depict success.
 */
export abstract class Either<L1, R1> {
  /**
   * Converts an [[Either]] to an [[Option]]
   */
  public get asOption(): Option<R1> {
    return this.fold(Option.none(), L => Option.none(), R => Option.some(R))
  }
  /**
   * Creates an [[Either]] from [[Option]]
   */
  public static fromOption<R>(
    option: Option<R>
  ): Either<NoSuchValueException, R> {
    return option.asEither
  }

  /**
   * Converts an [[Either]] to an [[Option]]
   */
  public get asOption(): Option<R1> {
    return this.fold(Option.none(), L => Option.none(), R => Option.some(R))
  }

  /**
   * Creates an object of [[Left]] type.
   */
  public static left<L>(left: L): Either<L, never> {
    return new Left(left)
  }

  /**
   * Creates an object of [[Neither]] type.
   */
  public static neither(): Either<never, never> {
    return new Neither()
  }

  /**
   * Creates an object of [[Right]] type.
   */
  public static right<R>(right: R): Either<never, R> {
    return new Right(right)
  }

  /**
   * Creates a new [[Either]] type from a function that could fail with an error.
   */
  public static try<E1 = Error, A1 = unknown>(cb: () => A1): Either<E1, A1> {
    try {
      return Either.right(cb())
    } catch (e) {
      return Either.left(e)
    }
  }

  /**
   * Like [[Either.map]] it uses the left function to chain over object of [[Left]] type
   * and the right function to chain over an object of [[Right]] type.
   */

  public abstract biChain<L2, R2>(
    LL: (l: L1) => Either<L2, R2>,
    RR: (r: R1) => Either<L2, R2>
  ): Either<L2, R2>

  /**
   * It uses the left function to chain over object of [[Left]] type
   * and the right function to chain over an object of [[Right]] type.
   */
  public biMap<L2, R2>(LL: (l: L1) => L2, RR: (r: R1) => R2): Either<L2, R2> {
    return this.mapL(LL).mapR(RR)
  }

  /**
   * Alias for [[Either.chainR]]
   */
  public chain<R2>(ab: (r: R1) => Either<L1, R2>): Either<L1, R2> {
    return this.chainR(ab)
  }

  /**
   * Sequentially converts a [[Left]] type to another [[Left]] type.
   */
  public chainL<L2>(ab: (l: L1) => Either<L2, R1>): Either<L2, R1> {
    return this.biChain(ab, Either.right)
  }

  /**
   * Sequentially converts a [[Right]] type to another [[Right]] type.
   */
  public chainR<R2>(ab: (r: R1) => Either<L1, R2>): Either<L1, R2> {
    return this.biChain(Either.left, ab)
  }

  /**
   * Reduces an [[Either]] to a value of type S.
   */
  public abstract fold<S>(
    seed: S,
    LL: (l: L1, s: S) => S,
    RR: (r: R1, s: S) => S
  ): S

  /**
   * Gets the left value if available or else returns the provided default value
   */
  public abstract getLeftOrElse(left: L1): L1

  /**
   * Gets the right value if available or else returns the provided default value
   */
  public abstract getRightOrElse(right: R1): R1

  /**
   * Alias for [[Either.mapR]]
   */
  public map<R2>(ab: (r: R1) => R2): Either<L1, R2> {
    return this.mapR(ab)
  }

  /**
   * Transforms the left value
   */
  public mapL<L2>(ab: (r: L1) => L2): Either<L2, R1> {
    return this.chainL(r => Either.left(ab(r)))
  }

  /**
   * Transforms the right value
   */
  public mapR<R2>(ab: (r: R1) => R2): Either<L1, R2> {
    return this.chainR(r => Either.right(ab(r)))
  }
}

/**
 * Data structure that represents a left value
 */
export class Left<L1> extends Either<L1, never> {
  public constructor(public readonly left: L1) {
    super()
  }

  /**
   * Refer [[Either.biChain]]
   */
  public biChain<L2, R2>(
    LL: (l: L1) => Either<L2, R2>,
    RR: (r: never) => Either<L2, R2>
  ): Either<L2, R2> {
    return LL(this.left)
  }

  /**
   * Refer [[Either.fold]]
   */
  public fold<S>(S: S, LL: (l: L1, s: S) => S, RR: (r: never, s: S) => S): S {
    return LL(this.left, S)
  }

  /**
   * Refer [[Either.getLeftOrElse]]
   */
  public getLeftOrElse(left: L1): L1 {
    return this.left
  }

  /**
   * Refer [[Either.getRightOrElse]]
   */
  public getRightOrElse(right: never): never {
    return right
  }
}

/**
 * Data structure that represents a right value
 */
export class Right<R1> extends Either<never, R1> {
  public constructor(public readonly right: R1) {
    super()
  }

  /**
   * Refer [[Either.biChain]]
   */
  public biChain<L2, R2>(
    LL: (l: never) => Either<L2, R2>,
    RR: (r: R1) => Either<L2, R2>
  ): Either<L2, R2> {
    return RR(this.right)
  }

  /**
   * Refer [[Either.fold]]
   */
  public fold<S>(S: S, LL: (l: never, s: S) => S, RR: (r: R1, s: S) => S): S {
    return RR(this.right, S)
  }

  /**
   * Refer [[Either.getLeftOrElse]]
   */
  public getLeftOrElse(left: never): never {
    return left
  }

  /**
   * Refer [[Either.getRightOrElse]]
   */
  public getRightOrElse(right: R1): R1 {
    return this.right
  }
}

/**
 * Data structure that represents that its neither Left nor Right.
 */
export class Neither extends Either<never, never> {
  /**
   * Refer [[Either.biChain]]
   */
  public biChain<L2, R2>(
    LL: (l: never) => Either<L2, R2>,
    RR: (r: never) => Either<L2, R2>
  ): Either<L2, R2> {
    return this
  }

  /**
   * Refer [[Either.fold]]
   */
  public fold<S>(
    S: S,
    LL: (l: never, s: S) => S,
    RR: (r: never, s: S) => S
  ): S {
    return S
  }

  /**
   * Refer [[Either.getLeftOrElse]]
   */
  public getLeftOrElse(left: never): never {
    return left
  }

  /**
   * Refer [[Either.getRightOrElse]]
   */
  public getRightOrElse(right: never): never {
    return right
  }
}
