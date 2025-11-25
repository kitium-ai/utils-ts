/**
 * Object utility functions
 */

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) {
    return target;
  }

  const result = { ...target };

  for (const source of sources) {
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as T;
  }

  if (obj instanceof Set) {
    return new Set(Array.from(obj).map((item) => deepClone(item))) as T;
  }

  if (obj instanceof Map) {
    return new Map(
      Array.from(obj.entries()).map(([key, value]) => [deepClone(key), deepClone(value)])
    ) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Pick specific properties from object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific properties from object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Safe deep property access with default value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<T = any>(obj: any, path: string | string[], defaultValue?: T): T {
  const keys = Array.isArray(path) ? path : path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue as T;
    }
    result = result[key];
  }

  return result === undefined ? (defaultValue as T) : result;
}

/**
 * Safe deep property set
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set<T>(obj: any, path: string | string[], value: T): void {
  const keys = Array.isArray(path) ? path : path.split('.');
  const lastKey = keys.pop();

  if (!lastKey) {
    return;
  }

  let current = obj;
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
}

/**
 * Deep strict equality check
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a !== 'object') {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => isEqual(a[key], b[key]));
}

/**
 * Transform object keys
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  fn: (key: string, value: T) => string
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[fn(key, value)] = value;
  }
  return result;
}

/**
 * Transform object values
 */
export function mapValues<T, R>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => R
): Record<string, R> {
  const result: Record<string, R> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value, key);
  }
  return result;
}

/**
 * Check if value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Check if object has property
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function has(obj: any, key: string | string[]): boolean {
  const keys = Array.isArray(key) ? key : [key];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;

  for (const k of keys) {
    if (current === null || current === undefined || !(k in current)) {
      return false;
    }
    current = current[k];
  }

  return true;
}

/**
 * Invert object keys and values
 */
export function invert<K extends string | number, V extends string | number>(
  obj: Record<K, V>
): Record<V, K> {
  const result = {} as Record<V, K>;
  for (const [key, value] of Object.entries(obj)) {
    result[value as V] = key as K;
  }
  return result;
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
  ...sources: Partial<T>[]
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
 * Fill missing properties with defaults (deep merge)
 *
 * @template T - The type of the target object
 * @param target - The target object
 * @param sources - Source objects with default values
 * @returns A new object with deep defaults applied
 *
 * @example
 * ```ts
 * defaultsDeep({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
 * ```
 */
export function defaultsDeep<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result = { ...target };
  for (const source of sources) {
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = result[key];
      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        result[key] = defaultsDeep(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else if (!(key in result)) {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }
  return result;
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
export function keys<T extends Record<string, unknown>>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
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
export function values<T extends Record<string, unknown>>(obj: T): Array<T[keyof T]> {
  return Object.values(obj) as Array<T[keyof T]>;
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
export function entries<T extends Record<string, unknown>>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
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
export function toPairs<T>(obj: Record<string, T>): Array<[string, T]> {
  return Object.entries(obj);
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
