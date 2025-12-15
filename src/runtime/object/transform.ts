/**
 * Object transformation utilities (mapKeys, mapValues, invert)
 */

/**
 * Transform object keys
 *
 * @template T - The type of values
 * @param object - The object to transform
 * @param function_ - Function to transform each key
 * @returns A new object with transformed keys
 *
 * @example
 * ```ts
 * mapKeys({ a: 1, b: 2 }, (key) => key.toUpperCase())
 * // { A: 1, B: 2 }
 * ```
 */
export function mapKeys<T>(
  object: Record<string, T>,
  function_: (key: string, value: T) => string
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(object)) {
    result[function_(key, value)] = value;
  }
  return result;
}

/**
 * Transform object values
 *
 * @template T - The type of input values
 * @template R - The type of output values
 * @param object - The object to transform
 * @param function_ - Function to transform each value
 * @returns A new object with transformed values
 *
 * @example
 * ```ts
 * mapValues({ a: 1, b: 2 }, (val) => val * 2)
 * // { a: 2, b: 4 }
 * ```
 */
export function mapValues<T, R>(
  object: Record<string, T>,
  function_: (value: T, key: string) => R
): Record<string, R> {
  const result: Record<string, R> = {};
  for (const [key, value] of Object.entries(object)) {
    result[key] = function_(value, key);
  }
  return result;
}

/**
 * Invert object keys and values
 *
 * @template K - The type of keys (must be string or number)
 * @template V - The type of values (must be string or number)
 * @param object - The object to invert
 * @returns A new object with keys and values swapped
 *
 * @example
 * ```ts
 * invert({ a: 'x', b: 'y' })
 * // { x: 'a', y: 'b' }
 * ```
 */
export function invert<K extends string | number, V extends string | number>(
  object: Record<K, V>
): Record<V, K> {
  const result = {} as Record<V, K>;
  for (const [key, value] of Object.entries(object)) {
    result[value as V] = key as K;
  }
  return result;
}
