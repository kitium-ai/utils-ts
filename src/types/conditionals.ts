/**
 * Conditional type utilities
 */

/**
 * Conditional type helper: If-Then-Else
 */
export type If<Condition extends boolean, Then, Else> = Condition extends true ? Then : Else;

/**
 * Check if two types are equal
 */
export type IsEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

/**
 * Check if type is any
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;

/**
 * Check if type is never
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Check if type is unknown
 */
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

/**
 * Check if type is an array
 */
export type IsArray<T> = T extends readonly unknown[] ? true : false;

/**
 * Check if type is a tuple
 */
export type IsTuple<T> = T extends readonly unknown[]
  ? number extends T['length']
    ? false
    : true
  : false;

/**
 * Check if type is a function
 */
export type IsFunction<T> = T extends (...args: unknown[]) => unknown ? true : false;

/**
 * Check if type is a primitive
 */
export type IsPrimitive<T> = T extends
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  ? true
  : false;

/**
 * Check if type is an object (not array, not primitive)
 */
export type IsObject<T> = T extends object
  ? T extends unknown[]
    ? false
    : T extends (...args: unknown[]) => unknown
      ? false
      : true
  : false;

/**
 * Check if type extends another type
 */
export type Extends<A, B> = A extends B ? true : false;

/**
 * Check if property K exists in type T
 */
export type HasProperty<T, K extends PropertyKey> = K extends keyof T ? true : false;

/**
 * Returns true if T is a union type
 */
export type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : never;
