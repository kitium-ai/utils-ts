/**
 * Array utility functions
 */

/**
 * Split array into chunks of specified size
 *
 * @template T - The type of array elements
 * @param array - The array to chunk
 * @param size - The size of each chunk
 * @returns An array of chunks
 * @throws {Error} If size is less than or equal to 0
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Group array items by a key or function
 *
 * @template T - The type of array elements
 * @param array - The array to group
 * @param keyOrFn - A key of T or a function that returns a grouping key
 * @returns An object with keys as grouping keys and values as arrays of elements
 *
 * @example
 * ```ts
 * groupBy([{ type: 'a', value: 1 }, { type: 'b', value: 2 }], 'type')
 * // { a: [{ type: 'a', value: 1 }], b: [{ type: 'b', value: 2 }] }
 * ```
 */
export function groupBy<T>(
  array: T[],
  keyOrFn: keyof T | ((item: T) => string | number)
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const item of array) {
    const key = typeof keyOrFn === 'function' ? String(keyOrFn(item)) : String(item[keyOrFn]);

    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}

/**
 * Remove duplicate values from array
 *
 * @template T - The type of array elements
 * @param array - The array to deduplicate
 * @returns A new array with unique values
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 * ```
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Remove duplicate values by a specific key
 *
 * @template T - The type of array elements
 * @param array - The array to deduplicate
 * @param key - The key to use for uniqueness comparison
 * @returns A new array with unique values based on the key
 *
 * @example
 * ```ts
 * uniqueBy([{ id: 1, name: 'a' }, { id: 1, name: 'b' }], 'id')
 * // [{ id: 1, name: 'a' }]
 * ```
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Split array into two arrays based on predicate
 *
 * @template T - The type of array elements
 * @param array - The array to partition
 * @param predicate - Function that returns true for items in the first array
 * @returns A tuple of [passed, failed] arrays
 *
 * @example
 * ```ts
 * partition([1, 2, 3, 4, 5], x => x % 2 === 0) // [[2, 4], [1, 3, 5]]
 * ```
 */
export function partition<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): [T[], T[]] {
  const passed: T[] = [];
  const failed: T[] = [];

  array.forEach((item, index) => {
    if (predicate(item, index)) {
      passed.push(item);
    } else {
      failed.push(item);
    }
  });

  return [passed, failed];
}

/**
 * Find common elements across all arrays
 *
 * @template T - The type of array elements
 * @param arrays - Arrays to find intersection of
 * @returns A new array with elements present in all arrays
 *
 * @example
 * ```ts
 * intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
 * ```
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) {
    return [];
  }
  if (arrays.length === 1) {
    return unique(arrays[0] || []);
  }

  const [first, ...rest] = arrays;
  if (!first) {
    return [];
  }
  const set = new Set(first);

  for (const arr of rest) {
    const arrSet = new Set(arr);
    for (const item of set) {
      if (!arrSet.has(item)) {
        set.delete(item);
      }
    }
  }

  return Array.from(set);
}

/**
 * Find elements in first array that are not in second array
 *
 * @template T - The type of array elements
 * @param a - The first array
 * @param b - The second array
 * @returns A new array with elements from a that are not in b
 *
 * @example
 * ```ts
 * difference([1, 2, 3, 4], [2, 4]) // [1, 3]
 * ```
 */
export function difference<T>(a: T[], b: T[]): T[] {
  const bSet = new Set(b);
  return a.filter((item) => !bSet.has(item));
}

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
 * Create array of numbers from start to end
 *
 * @param start - Start value (inclusive)
 * @param end - End value (exclusive)
 * @param step - Step size (default: 1)
 * @returns An array of numbers
 *
 * @example
 * ```ts
 * range(0, 5) // [0, 1, 2, 3, 4]
 * range(0, 10, 2) // [0, 2, 4, 6, 8]
 * ```
 */
export function range(start: number, end: number, step = 1): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Shuffle array randomly using Fisher-Yates algorithm
 *
 * @template T - The type of array elements
 * @param array - The array to shuffle
 * @returns A new shuffled array
 *
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random order)
 * ```
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Non-null assertions are safe here because we're within array bounds
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

/**
 * Get random sample from array
 *
 * @template T - The type of array elements
 * @param array - The array to sample from
 * @param count - Number of items to sample (default: 1)
 * @returns A new array with random samples
 *
 * @example
 * ```ts
 * sample([1, 2, 3, 4, 5], 2) // [3, 1] (random)
 * ```
 */
export function sample<T>(array: T[], count = 1): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
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
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter((item): item is T => Boolean(item));
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
  for (let i = 0; i < length; i++) {
    result.push([array1[i]!, array2[i]!]);
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
 * Combine multiple arrays and remove duplicates
 *
 * @template T - The type of array elements
 * @param arrays - Arrays to combine
 * @returns A new array with unique elements from all arrays
 *
 * @example
 * ```ts
 * union([1, 2], [2, 3], [3, 4]) // [1, 2, 3, 4]
 * ```
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat());
}

/**
 * Remove specified values from an array
 *
 * @template T - The type of array elements
 * @param array - The array to filter
 * @param values - Values to remove
 * @returns A new array without the specified values
 *
 * @example
 * ```ts
 * without([1, 2, 3, 4, 5], 2, 4) // [1, 3, 5]
 * ```
 */
export function without<T>(array: T[], ...values: T[]): T[] {
  const excludeSet = new Set(values);
  return array.filter((item) => !excludeSet.has(item));
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
export function flatMap<T, R>(array: T[], fn: (item: T, index: number) => R | R[]): R[] {
  return array.flatMap(fn);
}

/**
 * Count occurrences of items by a key or function
 *
 * @template T - The type of array elements
 * @param array - The array to count
 * @param keyOrFn - A key of T or a function that returns a grouping key
 * @returns An object with keys as grouping keys and values as counts
 *
 * @example
 * ```ts
 * countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
 * // { a: 2, b: 1 }
 * ```
 */
export function countBy<T>(
  array: T[],
  keyOrFn: keyof T | ((item: T) => string | number)
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const item of array) {
    const key = typeof keyOrFn === 'function' ? String(keyOrFn(item)) : String(item[keyOrFn]);
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

/**
 * Create an object from an array using a key
 *
 * @template T - The type of array elements
 * @param array - The array to convert
 * @param keyOrFn - A key of T or a function that returns a key
 * @returns An object with keys from the key function and values from the array
 *
 * @example
 * ```ts
 * keyBy([{ id: 1, name: 'a' }, { id: 2, name: 'b' }], 'id')
 * // { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' } }
 * ```
 */
export function keyBy<T>(
  array: T[],
  keyOrFn: keyof T | ((item: T) => string | number)
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const item of array) {
    const key = typeof keyOrFn === 'function' ? String(keyOrFn(item)) : String(item[keyOrFn]);
    result[key] = item;
  }
  return result;
}
