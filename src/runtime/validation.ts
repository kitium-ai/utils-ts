/**
 * Validation and type guard utilities
 */

/**
 * Check if value is a string
 *
 * @param value - The value to check
 * @returns True if value is a string
 *
 * @example
 * ```ts
 * isString('hello') // true
 * isString(123) // false
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Check if value is a number (and not NaN)
 *
 * @param value - The value to check
 * @returns True if value is a number
 *
 * @example
 * ```ts
 * isNumber(123) // true
 * isNumber(NaN) // false
 * isNumber('123') // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Check if value is a boolean
 *
 * @param value - The value to check
 * @returns True if value is a boolean
 *
 * @example
 * ```ts
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(0) // false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Check if value is an array
 *
 * @template T - The type of array elements
 * @param value - The value to check
 * @returns True if value is an array
 *
 * @example
 * ```ts
 * isArray([1, 2, 3]) // true
 * isArray('hello') // false
 * ```
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Check if value is a plain object (not array, not null)
 *
 * @param value - The value to check
 * @returns True if value is a plain object
 *
 * @example
 * ```ts
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 * ```
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Check if value is a function
 *
 * @param value - The value to check
 * @returns True if value is a function
 *
 * @example
 * ```ts
 * isFunction(() => {}) // true
 * isFunction('hello') // false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * Check if value is a Date instance
 *
 * @param value - The value to check
 * @returns True if value is a Date
 *
 * @example
 * ```ts
 * isDate(new Date()) // true
 * isDate('2024-01-01') // false
 * ```
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

/**
 * Check if value is a RegExp instance
 *
 * @param value - The value to check
 * @returns True if value is a RegExp
 *
 * @example
 * ```ts
 * isRegExp(/test/) // true
 * isRegExp('test') // false
 * ```
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/**
 * Check if value is an Error instance
 *
 * @param value - The value to check
 * @returns True if value is an Error
 *
 * @example
 * ```ts
 * isError(new Error('test')) // true
 * isError('error') // false
 * ```
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Check if value is null or undefined
 *
 * @param value - The value to check
 * @returns True if value is null or undefined
 *
 * @example
 * ```ts
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Check if value is empty (null, undefined, empty array, empty string, or empty object)
 *
 * @param value - The value to check
 * @returns True if value is empty
 *
 * @example
 * ```ts
 * isEmpty(null) // true
 * isEmpty([]) // true
 * isEmpty('') // true
 * isEmpty({}) // true
 * isEmpty([1]) // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
}

/**
 * Check if value is a finite number
 *
 * @param value - The value to check
 * @returns True if value is a finite number
 *
 * @example
 * ```ts
 * isFinite(123) // true
 * isFinite(Infinity) // false
 * isFinite(NaN) // false
 * ```
 */
export function isFinite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Check if value is an integer
 *
 * @param value - The value to check
 * @returns True if value is an integer
 *
 * @example
 * ```ts
 * isInteger(123) // true
 * isInteger(123.5) // false
 * ```
 */
export function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}
