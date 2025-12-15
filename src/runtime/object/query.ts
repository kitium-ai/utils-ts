/**
 * Object query utilities (pick, omit, get, set, has)
 */

/**
 * Pick specific properties from object
 *
 * @template T - The type of the object
 * @template K - The keys to pick (must be keyof T)
 * @param object - The object to pick from
 * @param propertyKeys - Keys to include in result
 * @returns A new object with only specified keys
 *
 * @example
 * ```ts
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])
 * // { a: 1, b: 2 }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  object: T,
  propertyKeys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of propertyKeys) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

/**
 * Omit specific properties from object
 *
 * @template T - The type of the object
 * @template K - The keys to omit (must be keyof T)
 * @param object - The object to omit from
 * @param propertyKeys - Keys to exclude from result
 * @returns A new object without specified keys
 *
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: 3 }, ['a'])
 * // { b: 2, c: 3 }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
  object: T,
  propertyKeys: K[]
): Omit<T, K> {
  const result = { ...object };
  for (const key of propertyKeys) {
    delete result[key];
  }
  return result;
}

/**
 * Safe deep property access with default value
 *
 * @template T - The type of the value
 * @param object - The object to access
 * @param path - Property path (dot-separated string or array of keys)
 * @param defaultValue - Value to return if path not found
 * @returns The value at path or defaultValue
 *
 * @example
 * ```ts
 * get({ a: { b: { c: 1 } } }, 'a.b.c') // 1
 * get({ a: 1 }, 'x.y', 42) // 42
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<T = any>(object: any, path: string | string[], defaultValue?: T): T {
  const pathKeys = Array.isArray(path) ? path : path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = object;

  for (const key of pathKeys) {
    if (result === null || result === undefined) {
      return defaultValue as T;
    }
    result = result[key];
  }

  return result === undefined ? (defaultValue as T) : result;
}

/**
 * Safe deep property set
 *
 * @template T - The type of the value
 * @param object - The object to mutate
 * @param path - Property path (dot-separated string or array of keys)
 * @param value - Value to set
 *
 * @example
 * ```ts
 * set({}, 'a.b.c', 1) // { a: { b: { c: 1 } } }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set<T>(object: any, path: string | string[], value: T): void {
  const pathKeys = Array.isArray(path) ? path : path.split('.');
  const lastKey = pathKeys.pop();

  if (!lastKey) {
    return;
  }

  let current = object;
  for (const key of pathKeys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
}

/**
 * Check if object has property at path
 *
 * @param object - The object to check
 * @param key - Property path (single key or array of keys)
 * @returns True if property exists at path
 *
 * @example
 * ```ts
 * has({ a: { b: 1 } }, 'a.b') // true
 * has({ a: 1 }, 'a.b') // false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function has(object: any, key: string | string[]): boolean {
  const pathKeys = Array.isArray(key) ? key : [key];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = object;

  for (const k of pathKeys) {
    if (current === null || current === undefined || !(k in current)) {
      return false;
    }
    current = current[k];
  }

  return true;
}
