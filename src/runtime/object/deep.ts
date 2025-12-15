/**
 * Object deep operations (merge, clone, equality, defaults)
 */

import { isPlainObject } from './utils.js';

/**
 * Deep merge objects
 *
 * @template T - The type of the target object
 * @param target - The target object to merge into
 * @param sources - Source objects to merge from (rightmost takes precedence)
 * @returns A new merged object
 *
 * @example
 * ```ts
 * deepMerge({ a: { b: 1 } }, { a: { c: 2 } })
 * // { a: { b: 1, c: 2 } }
 * ```
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T>>
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
 *
 * @template T - The type of the object
 * @param object - The object to clone
 * @returns A deep clone of the object
 *
 * @example
 * ```ts
 * deepClone({ a: { b: [1, 2] } })
 * // { a: { b: [1, 2] } } (new instances)
 * ```
 */
export function deepClone<T>(object: T): T {
  if (object === null || typeof object !== 'object') {
    return object;
  }

  if (object instanceof Date) {
    return new Date(object.getTime()) as T;
  }

  if (object instanceof Array) {
    return object.map((item) => deepClone(item)) as T;
  }

  if (object instanceof Set) {
    return new Set(Array.from(object).map((item) => deepClone(item))) as T;
  }

  if (object instanceof Map) {
    return new Map(
      Array.from(object.entries()).map(([key, value]) => [deepClone(key), deepClone(value)])
    ) as T;
  }

  const cloned = {} as T;
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      cloned[key] = deepClone(object[key]);
    }
  }
  return cloned;
}

/**
 * Deep strict equality check
 *
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns True if values are deeply equal
 *
 * @example
 * ```ts
 * isEqual({ a: [1, 2] }, { a: [1, 2] }) // true
 * isEqual({ a: 1 }, { a: 2 }) // false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEqual(a: any, b: any): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  if (!isObjectLike(a) || !isObjectLike(b)) {
    return false;
  }

  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);
  if (isArrayA || isArrayB) {
    if (!isArrayA || !isArrayB) {
      return false;
    }
    return isEqualArrays(a as unknown[], b as unknown[]);
  }

  return isEqualObjects(a as Record<string, unknown>, b as Record<string, unknown>);
}

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isEqualArrays(arrayA: readonly unknown[], arrayB: readonly unknown[]): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let index = 0; index < arrayA.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    if (!isEqual(arrayA[index], arrayB[index])) {
      return false;
    }
  }

  return true;
}

function isEqualObjects(
  objectA: Record<string, unknown>,
  objectB: Record<string, unknown>
): boolean {
  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objectB, key)) {
      return false;
    }
    // eslint-disable-next-line security/detect-object-injection
    if (!isEqual(objectA[key], objectB[key])) {
      return false;
    }
  }

  return true;
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
 * defaultsDeep({ a: { b: 1 } }, { a: { c: 2 } })
 * // { a: { b: 1, c: 2 } }
 * ```
 */
export function defaultsDeep<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T>>
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
