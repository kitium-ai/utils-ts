/**
 * Branded type utilities for creating distinct types from primitives
 */

/**
 * Create a branded type from a base type
 *
 * @template T - The base type
 * @template B - The brand identifier
 *
 * @example
 * ```ts
 * type UserId = Brand<number, 'UserId'>;
 * type ProductId = Brand<number, 'ProductId'>;
 * // UserId and ProductId are now distinct types
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type Brand<T, B> = T & { readonly __brand: B };

/**
 * Create an opaque type alias (similar to branded but without exposing the base type)
 *
 * @template T - The base type
 * @template B - The brand identifier
 *
 * @example
 * ```ts
 * type Email = Opaque<string, 'Email'>;
 * type Password = Opaque<string, 'Password'>;
 * // Email and Password are distinct even though both are strings
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type Opaque<T, B> = T & { readonly __opaque: B };

/**
 * Unwrap a branded or opaque type to its base type
 *
 * @template T - The branded/opaque type
 *
 * @example
 * ```ts
 * type UserId = Brand<number, 'UserId'>;
 * type Base = Unbrand<UserId>; // number
 * ```
 */
export type Unbrand<T> =
  T extends Brand<infer U, unknown> ? U : T extends Opaque<infer U, unknown> ? U : T;
