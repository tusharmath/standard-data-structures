/* tslint:disable no-use-before-declare prefer-function-over-method */

/**
 * Used to represent an optional value
 */
export abstract class Option<A> {
  /**
   * Checks if the Option type is of [[None]] type
   */
  public static isNone<A>(A: Option<A>): A is None {
    return A.isNone
  }

  /**
   * Checks if the Option type is of [[Some]] type
   */
  public static isSome<A>(A: Option<A>): A is Some<A> {
    return A.isSome
  }

  /**
   * Creates a [[None]] object
   */
  public static none(): Option<never> {
    return new None()
  }

  /**
   * Creates a [[Some]] object
   */
  public static some<A>(A: A): Option<A> {
    return new Some(A)
  }

  /**
   * Returns `true` if the instance is [[None]]
   */
  public abstract isNone: boolean

  /**
   * Returns `true` if the instance is [[Some]]
   */
  public get isSome(): boolean {
    return !this.isNone
  }

  /**
   * Flattens the [[Option]] type
   */
  public abstract chain<B>(ab: (A: A) => Option<B>): Option<B>

  /**
   * Takes a seed `S` value and applies the FN if this is [[Some]]
   * Returns the seed `S` if this is [[None]]
   */

  public abstract fold<S>(S: S, FN: (r: A, s: S) => S): S

  /**
   * Gets the real value if this is of [[Some]] type.
   * If its not a [[Some]] type it returns the provided value.
   */
  public abstract getOrElse(A: A): A

  /**
   * Transforms the value inside the [[Option]] type.
   */
  public map<B>(ab: (A: A) => B): Option<B> {
    return this.chain(a => Option.some(ab(a)))
  }
}

/**
 * Is an [[Option]] type that represents existence of a value.
 */
export class Some<A> extends Option<A> {
  public constructor(public readonly value: A) {
    super()
  }

  /**
   * Refer [[Option.chain]]
   */
  public chain<B>(ab: (A: A) => Option<B>): Option<B> {
    return ab(this.value)
  }

  /**
   * Refer [[Option.fold]]
   */
  public fold<S>(S: S, some: (r: A, s: S) => S): S {
    return some(this.value, S)
  }

  /**
   * Refer [[Option.getOrElse]]
   */
  public getOrElse(a: A): A {
    return this.value
  }

  /**
   * Refer [[Option.isNone]]
   */
  public get isNone(): boolean {
    return false
  }
}

/**
 * Is an [[Option]] type that represents absence of any value.
 */
export class None extends Option<never> {
  /**
   * Refer [[Option.chain]]
   */
  public chain<B>(ab: (A: never) => Option<B>): Option<B> {
    return this
  }

  /**
   * Refer [[Option.fold]]
   */
  public fold<S>(S: S, some: (r: never, s: S) => S): S {
    return S
  }

  /**
   * Refer [[Option.getOrElse]]
   */
  public getOrElse(A: never): never {
    return A
  }

  /**
   * Refer [[Option.isNone]]
   */
  public get isNone(): boolean {
    return true
  }
}
