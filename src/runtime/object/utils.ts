/**
 * Object utility functions (keys, values, entries, etc.)
 */

/**
 * Check if value is a plain object
 *
 * @param value - The value to check
 * @returns True if value is a plain object
 *
 * @example
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject({ a: 1 }) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Get all keys of an object (type-safe)
 *
 * @template T - The type of the object
 * @param obj - The object
 * @returns An array of keys
 *
 * @example
 * ```ts
 * keys({ a: 1, b: 2 }) // ['a', 'b']
 * ```
 */
export function keys<T extends Record<string, unknown>>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>;
}

/**
 * Get all values of an object (type-safe)
 *
 * @template T - The type of the object
 * @param obj - The object
 * @returns An array of values
 *
 * @example
 * ```ts
 * values({ a: 1, b: 2 }) // [1, 2]
 * ```
 */
export function values<T extends Record<string, unknown>>(object: T): Array<T[keyof T]> {
  return Object.values(object) as Array<T[keyof T]>;
}

/**
 * Get all entries of an object (type-safe)
 *
 * @template T - The type of the object
 * @param obj - The object
 * @returns An array of [key, value] pairs
 *
 * @example
 * ```ts
 * entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 * ```
 */
export function entries<T extends Record<string, unknown>>(
  object: T
): Array<[keyof T, T[keyof T]]> {
  return Object.entries(object) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Create an object from an array of [key, value] pairs
 *
 * @template T - The type of values
 * @param pairs - Array of [key, value] pairs
 * @returns An object created from the pairs
 *
 * @example
 * ```ts
 * fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
 * ```
 */
export function fromPairs<T>(pairs: Array<[string, T]>): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of pairs) {
    result[key] = value;
  }
  return result;
}

/**
 * Convert an object to an array of [key, value] pairs
 *
 * @template T - The type of values
 * @param obj - The object to convert
 * @returns An array of [key, value] pairs
 *
 * @example
 * ```ts
 * toPairs({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 * ```
 */
export function toPairs<T>(object: Record<string, T>): Array<[string, T]> {
  return Object.entries(object);
}

/**
 * Fill missing properties with defaults
 *
 * @template T - The type of the target object
 * @param target - The target object
 * @param sources - Source objects with default values
 * @returns A new object with defaults applied
 *
 * @example
 * ```ts
 * defaults({ a: 1 }, { b: 2, c: 3 }) // { a: 1, b: 2, c: 3 }
 * ```
 */
export function defaults<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T>>
): T {
  const result = { ...target };
  for (const source of sources) {
    for (const key in source) {
      if (!(key in result)) {
        result[key] = source[key] as T[Extract<keyof T, string>];
      }
    }
  }
  return result;
}

/**
 * Get the size of a collection (array, string, or object)
 *
 * @param value - The value to get size of
 * @returns The size of the collection
 *
 * @example
 * ```ts
 * size([1, 2, 3]) // 3
 * size('hello') // 5
 * size({ a: 1, b: 2 }) // 2
 * ```
 */
export function size(value: unknown): number {
  if (value === null || value === undefined) {
    return 0;
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length;
  }
  return 0;
}
