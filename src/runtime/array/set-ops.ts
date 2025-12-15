/**
 * Set operations for arrays (unique, intersection, difference, union, without)
 */

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
    return unique(arrays[0] ?? []);
  }

  const [first, ...rest] = arrays;
  if (!first) {
    return [];
  }
  const set = new Set(first);

  for (const array of rest) {
    const arraySet = new Set(array);
    for (const item of set) {
      if (!arraySet.has(item)) {
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
