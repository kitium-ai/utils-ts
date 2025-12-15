/**
 * Shared object utilities used across multiple modules.
 * Eliminates duplication of common object operation patterns.
 */

/**
 * Type for any object
 */
export type AnyObject = Record<string | number | symbol, unknown>;

/**
 * Check if a value is a plain object
 * Excludes null, arrays, dates, and other special objects
 *
 * @example
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * isPlainObject(null) // false
 * ```
 */
export function isPlainObject(value: unknown): value is AnyObject {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check for Array
  if (Array.isArray(value)) {
    return false;
  }

  // Check for built-in objects
  if (value instanceof Date || value instanceof RegExp || value instanceof Map || value instanceof Set) {
    return false;
  }

  // Check prototype chain
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * Check if an object has a property (own property, not inherited)
 *
 * @example
 * ```ts
 * const obj = { a: 1 };
 * hasProperty(obj, 'a') // true
 * hasProperty(obj, 'toString') // false
 * ```
 */
export function hasProperty<T extends AnyObject, K extends PropertyKey>(
  obj: T,
  key: K
): key is K & keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Check if an object has any properties
 *
 * @example
 * ```ts
 * hasProperties({}) // false
 * hasProperties({ a: 1 }) // true
 * ```
 */
export function hasProperties(obj: unknown): obj is AnyObject {
  if (!isPlainObject(obj)) {
    return false;
  }

  return Object.keys(obj).length > 0;
}

/**
 * Get property value with type safety
 *
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } };
 * getProperty(obj, 'a'); // { b: { c: 1 } }
 * ```
 */
export function getProperty<T extends AnyObject, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}

/**
 * Get a nested property using dot notation path
 *
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } };
 * getNestedProperty(obj, 'a.b.c'); // 1
 * getNestedProperty(obj, 'a.x', 'default'); // 'default'
 * ```
 */
export function getNestedProperty<T = unknown>(
  obj: unknown,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || typeof current !== 'object') {
      return defaultValue;
    }

    current = (current as AnyObject)[key];
  }

  return current as T | undefined;
}

/**
 * Get own property descriptor
 *
 * @example
 * ```ts
 * const obj = { a: 1 };
 * getPropertyDescriptor(obj, 'a');
 * // { value: 1, writable: true, enumerable: true, configurable: true }
 * ```
 */
export function getPropertyDescriptor<T extends AnyObject>(
  obj: T,
  key: keyof T
): PropertyDescriptor | undefined {
  return Object.getOwnPropertyDescriptor(obj, key);
}

/**
 * Check if a property is enumerable
 *
 * @example
 * ```ts
 * const obj = { a: 1 };
 * isEnumerable(obj, 'a'); // true
 * ```
 */
export function isEnumerable<T extends AnyObject>(
  obj: T,
  key: keyof T
): boolean {
  const descriptor = getPropertyDescriptor(obj, key);
  return descriptor?.enumerable === true;
}

/**
 * Get all own properties of an object
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * getAllProperties(obj); // ['a', 'b']
 * ```
 */
export function getAllProperties(obj: unknown): PropertyKey[] {
  if (!isPlainObject(obj)) {
    return [];
  }

  const names = Object.getOwnPropertyNames(obj);
  const symbols = Object.getOwnPropertySymbols(obj);
  return [...names, ...symbols];
}

/**
 * Check if two objects have the same structure
 * (not values, just keys)
 *
 * @example
 * ```ts
 * sameStructure({ a: 1 }, { a: 2 }); // true
 * sameStructure({ a: 1 }, { b: 1 }); // false
 * ```
 */
export function sameStructure(obj1: unknown, obj2: unknown): boolean {
  if (!isPlainObject(obj1) || !isPlainObject(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key, index) => key === keys2[index]);
}

/**
 * Safely merge multiple objects
 * Later objects take precedence
 *
 * @example
 * ```ts
 * mergeObjects({ a: 1 }, { b: 2 }, { a: 3 });
 * // { a: 3, b: 2 }
 * ```
 */
export function mergeObjects<T extends AnyObject = AnyObject>(
  ...objects: Array<Partial<T> | undefined>
): Partial<T> {
  const result: AnyObject = {};

  for (const obj of objects) {
    if (isPlainObject(obj)) {
      Object.assign(result, obj);
    }
  }

  return result as Partial<T>;
}

/**
 * Check if an object is empty
 *
 * @example
 * ```ts
 * isEmpty({}); // true
 * isEmpty({ a: 1 }); // false
 * ```
 */
export function isEmpty(obj: unknown): obj is AnyObject {
  if (!isPlainObject(obj)) {
    return false;
  }

  return Object.keys(obj).length === 0;
}

/**
 * Clone an object shallowly
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: { c: 2 } };
 * const cloned = shallowClone(obj);
 * cloned.a = 2; // Doesn't affect obj.a
 * cloned.b.c = 3; // Does affect obj.b.c
 * ```
 */
export function shallowClone<T extends AnyObject>(obj: T): T {
  if (Array.isArray(obj)) {
    return [...obj] as unknown as T;
  }

  return { ...obj };
}

/**
 * Exclude specified keys from an object
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * excludeKeys(obj, ['b']);
 * // { a: 1, c: 3 }
 * ```
 */
export function excludeKeys<T extends AnyObject, K extends keyof T>(
  obj: T,
  keysToExclude: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keysToExclude) {
    delete result[key];
  }
  return result;
}

/**
 * Include only specified keys from an object
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * includeKeys(obj, ['a', 'b']);
 * // { a: 1, b: 2 }
 * ```
 */
export function includeKeys<T extends AnyObject, K extends keyof T>(
  obj: T,
  keysToInclude: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keysToInclude) {
    if (hasProperty(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
