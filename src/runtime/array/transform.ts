/**
 * Array transformation utilities (flatten, flatMap, compact)
 */

/**
 * Flatten nested array one level
 *
 * @template T - The type of array elements
 * @param array - The array of arrays to flatten
 * @returns A flattened array
 *
 * @example
 * ```ts
 * flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * ```
 */
export function flatten<T>(array: T[][]): T[] {
  return array.flat();
}

/**
 * Flatten nested array recursively
 *
 * @template T - The type of array elements
 * @param array - The array to flatten
 * @returns A deeply flattened array
 *
 * @example
 * ```ts
 * flattenDeep([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
 * ```
 */
export function flattenDeep<T>(array: T[]): T[] {
  return array.flat(Infinity) as T[];
}

/**
 * Map and flatten in one operation
 *
 * @template T - The type of input array elements
 * @template R - The type of output array elements
 * @param array - The array to map
 * @param fn - Function that returns a value or array
 * @returns A flattened array of mapped values
 *
 * @example
 * ```ts
 * flatMap([1, 2, 3], x => [x, x * 2]) // [1, 2, 2, 4, 3, 6]
 * ```
 */
export function flatMap<T, R>(
  array: T[],
  function_: (item: T, index: number) => R | R[]
): R[] {
  return array.flatMap(function_);
}

/**
 * Remove falsy values from array
 *
 * @template T - The type of array elements
 * @param array - The array to compact
 * @returns A new array with falsy values removed
 *
 * @example
 * ```ts
 * compact([0, 1, false, 2, '', 3]) // [1, 2, 3]
 * ```
 */
export function compact<T>(array: Array<T | null | undefined | false | 0 | ''>): T[] {
  return array.filter((item): item is T => Boolean(item));
}
