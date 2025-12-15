/**
 * String utility functions
 */

/**
 * Generate random string
 *
 * @param length - Length of the random string
 * @param chars - Character set to use (default: alphanumeric)
 * @returns A random string
 *
 * @example
 * ```ts
 * randomString(10) // 'aB3dEf9GhI'
 * randomString(5, '0123456789') // '12345'
 * ```
 */
export function randomString(
  length: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let index = 0; index < length; index++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
