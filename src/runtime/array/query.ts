/**
 * Array query utilities (head, tail, last, initial, take, drop, zip, arraysEqual)
 */

/**
 * Get the first element of an array
 *
 * @template T - The type of array elements
 * @param array - The array
 * @returns The first element, or undefined if array is empty
 *
 * @example
 * ```ts
 * head([1, 2, 3]) // 1
 * head([]) // undefined
 * ```
 */
export function head<T>(array: T[]): T | undefined {
  return array[0];
}

/**
 * Get all elements except the first
 *
 * @template T - The type of array elements
 * @param array - The array
 * @returns A new array without the first element
 *
 * @example
 * ```ts
 * tail([1, 2, 3, 4]) // [2, 3, 4]
 * ```
 */
export function tail<T>(array: T[]): T[] {
  return array.slice(1);
}

/**
 * Get the last element of an array
 *
 * @template T - The type of array elements
 * @param array - The array
 * @returns The last element, or undefined if array is empty
 *
 * @example
 * ```ts
 * last([1, 2, 3]) // 3
 * last([]) // undefined
 * ```
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Get all elements except the last
 *
 * @template T - The type of array elements
 * @param array - The array
 * @returns A new array without the last element
 *
 * @example
 * ```ts
 * initial([1, 2, 3, 4]) // [1, 2, 3]
 * ```
 */
export function initial<T>(array: T[]): T[] {
  return array.slice(0, -1);
}

/**
 * Get the first n elements of an array
 *
 * @template T - The type of array elements
 * @param array - The array to take from
 * @param n - Number of elements to take
 * @returns A new array with the first n elements
 *
 * @example
 * ```ts
 * take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
 * ```
 */
export function take<T>(array: T[], n: number): T[] {
  return array.slice(0, n);
}

/**
 * Get the last n elements of an array
 *
 * @template T - The type of array elements
 * @param array - The array to take from
 * @param n - Number of elements to take
 * @returns A new array with the last n elements
 *
 * @example
 * ```ts
 * takeRight([1, 2, 3, 4, 5], 3) // [3, 4, 5]
 * ```
 */
export function takeRight<T>(array: T[], n: number): T[] {
  return array.slice(-n);
}

/**
 * Remove the first n elements from an array
 *
 * @template T - The type of array elements
 * @param array - The array to drop from
 * @param n - Number of elements to drop
 * @returns A new array with the first n elements removed
 *
 * @example
 * ```ts
 * drop([1, 2, 3, 4, 5], 2) // [3, 4, 5]
 * ```
 */
export function drop<T>(array: T[], n: number): T[] {
  return array.slice(n);
}

/**
 * Remove the last n elements from an array
 *
 * @template T - The type of array elements
 * @param array - The array to drop from
 * @param n - Number of elements to drop
 * @returns A new array with the last n elements removed
 *
 * @example
 * ```ts
 * dropRight([1, 2, 3, 4, 5], 2) // [1, 2, 3]
 * ```
 */
export function dropRight<T>(array: T[], n: number): T[] {
  return array.slice(0, -n);
}

/**
 * Combine two arrays into pairs
 *
 * @template T - The type of first array elements
 * @template U - The type of second array elements
 * @param array1 - First array
 * @param array2 - Second array
 * @returns An array of pairs
 *
 * @example
 * ```ts
 * zip([1, 2, 3], ['a', 'b', 'c']) // [[1, 'a'], [2, 'b'], [3, 'c']]
 * ```
 */
export function zip<T, U>(array1: T[], array2: U[]): Array<[T, U]> {
  const length = Math.min(array1.length, array2.length);
  const result: Array<[T, U]> = [];
  for (let index = 0; index < length; index++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result.push([array1[index]!, array2[index]!]);
  }
  return result;
}

/**
 * Separate pairs into two arrays
 *
 * @template T - The type of first element in pairs
 * @template U - The type of second element in pairs
 * @param pairs - Array of pairs
 * @returns A tuple of two arrays
 *
 * @example
 * ```ts
 * unzip([[1, 'a'], [2, 'b']]) // [[1, 2], ['a', 'b']]
 * ```
 */
export function unzip<T, U>(pairs: Array<[T, U]>): [T[], U[]] {
  const result: [T[], U[]] = [[], []];
  for (const [first, second] of pairs) {
    result[0].push(first);
    result[1].push(second);
  }
  return result;
}

/**
 * Check if arrays are equal (shallow comparison)
 *
 * @template T - The type of array elements
 * @param a - First array
 * @param b - Second array
 * @returns True if arrays have the same length and elements
 *
 * @example
 * ```ts
 * arraysEqual([1, 2, 3], [1, 2, 3]) // true
 * arraysEqual([1, 2], [1, 2, 3]) // false
 * ```
 */
export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => item === b[index]);
}
