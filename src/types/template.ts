/**
 * Template literal type utilities for string manipulation at the type level
 */

/**
 * Convert string to camelCase
 */
export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : S extends `${infer P1}-${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : S extends `${infer P1} ${infer P2}${infer P3}`
      ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
      : Lowercase<S>;

/**
 * Convert string to PascalCase
 */
export type PascalCase<S extends string> = Capitalize<CamelCase<S>>;

/**
 * Convert string to kebab-case
 */
export type KebabCase<S extends string> = S extends `${infer C}${infer T}`
  ? T extends Uncapitalize<T>
    ? `${Uncapitalize<C>}${KebabCase<T>}`
    : `${Uncapitalize<C>}-${KebabCase<T>}`
  : S;

/**
 * Convert string to snake_case
 */
export type SnakeCase<S extends string> = S extends `${infer C}${infer T}`
  ? T extends Uncapitalize<T>
    ? `${Uncapitalize<C>}${SnakeCase<T>}`
    : `${Uncapitalize<C>}_${SnakeCase<T>}`
  : S;

/**
 * Split string by delimiter
 */
export type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

/**
 * Join array of strings with delimiter
 */
export type Join<T extends string[], D extends string> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? R['length'] extends 0
        ? F
        : `${F}${D}${Join<R, D>}`
      : never
    : never
  : '';

/**
 * Trim whitespace from start and end
 */
export type Trim<S extends string> = S extends ` ${infer R}` | `${infer R} ` ? Trim<R> : S;

/**
 * Replace first occurrence of From with To
 */
export type Replace<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer L}${From}${infer R}` ? `${L}${To}${R}` : S;

/**
 * Replace all occurrences of From with To
 */
export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer L}${From}${infer R}` ? ReplaceAll<`${L}${To}${R}`, From, To> : S;

/**
 * Get length of string
 */
export type StringLength<S extends string> = Split<S, ''>['length'];

/**
 * Check if string starts with prefix
 */
export type StartsWith<S extends string, Prefix extends string> = S extends `${Prefix}${string}`
  ? true
  : false;

/**
 * Check if string ends with suffix
 */
export type EndsWith<S extends string, Suffix extends string> = S extends `${string}${Suffix}`
  ? true
  : false;

/**
 * Check if string includes substring
 */
export type Includes<S extends string, Sub extends string> = S extends `${string}${Sub}${string}`
  ? true
  : false;
