/**
 * Array type utilities
 */

/**
 * Extract the element type from an array type
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Element = ArrayElement<string[]>; // string
 * type Element = ArrayElement<number[]>; // number
 * ```
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Get the length of an array type
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Len = ArrayLength<[1, 2, 3]>; // 3
 * ```
 */
export type ArrayLength<T extends readonly unknown[]> = T['length'];

/**
 * Get the first element of an array type
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type First = Head<[1, 2, 3]>; // 1
 * ```
 */
export type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]]
  ? H
  : never;

/**
 * Get all elements except the first
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Rest = Tail<[1, 2, 3]>; // [2, 3]
 * ```
 */
export type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : [];

/**
 * Get the last element of an array type
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Last = Last<[1, 2, 3]>; // 3
 * ```
 */
export type Last<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L]
  ? L
  : never;

/**
 * Get all elements except the last
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Initial = Initial<[1, 2, 3]>; // [1, 2]
 * ```
 */
export type Initial<T extends readonly unknown[]> = T extends readonly [...infer I, unknown]
  ? I
  : [];

/**
 * Concatenate two array types
 *
 * @template A - First array
 * @template B - Second array
 *
 * @example
 * ```ts
 * type Concat = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]
 * ```
 */
export type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];

/**
 * Push an element to the end of an array type
 *
 * @template T - The array type
 * @template U - The element to push
 *
 * @example
 * ```ts
 * type Pushed = Push<[1, 2], 3>; // [1, 2, 3]
 * ```
 */
export type Push<T extends readonly unknown[], U> = [...T, U];

/**
 * Pop the last element from an array type
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Popped = Pop<[1, 2, 3]>; // [1, 2]
 * ```
 */
export type Pop<T extends readonly unknown[]> = T extends readonly [...infer R, unknown] ? R : [];

/**
 * Remove the first element from an array type
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Shifted = Shift<[1, 2, 3]>; // [2, 3]
 * ```
 */
export type Shift<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : [];

/**
 * Add an element to the beginning of an array type
 *
 * @template T - The array type
 * @template U - The element to add
 *
 * @example
 * ```ts
 * type Unshifted = Unshift<[2, 3], 1>; // [1, 2, 3]
 * ```
 */
export type Unshift<T extends readonly unknown[], U> = [U, ...T];

/**
 * Extract a slice of an array type (simplified - returns array type)
 * Note: Full implementation requires complex tuple manipulation
 *
 * @template T - The array type
 *
 * @example
 * ```ts
 * type Slice = Slice<string[]>; // string[]
 * ```
 */
export type Slice<T extends readonly unknown[]> = T;
