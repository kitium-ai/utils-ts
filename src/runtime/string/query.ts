/**
 * String query and validation utilities
 */

/**
 * Check if string is empty or only whitespace
 *
 * @param str - The string to check
 * @returns True if string is empty or only whitespace
 *
 * @example
 * ```ts
 * isEmptyString('') // true
 * isEmptyString('   ') // true
 * isEmptyString('hello') // false
 * ```
 */
export function isEmptyString(string_: string): boolean {
  return string_.trim().length === 0;
}

/**
 * Count occurrences of substring
 *
 * @param str - The string to search in
 * @param search - The substring to count
 * @returns Number of occurrences
 *
 * @example
 * ```ts
 * countOccurrences('hello hello', 'hello') // 2
 * countOccurrences('aaa', 'aa') // 2
 * ```
 */
export function countOccurrences(string_: string, search: string): number {
  if (search.length === 0) {
    return 0;
  }
  let count = 0;
  let pos = 0;
  while ((pos = string_.indexOf(search, pos)) !== -1) {
    count++;
    pos += search.length;
  }
  return count;
}

/**
 * Check if string contains only alphanumeric characters
 *
 * @param str - The string to check
 * @returns True if string contains only letters and numbers
 *
 * @example
 * ```ts
 * isAlphanumeric('abc123') // true
 * isAlphanumeric('abc-123') // false
 * ```
 */
export function isAlphanumeric(string_: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(string_);
}

/**
 * Check if string is a valid email
 *
 * @param str - The string to check
 * @returns True if string is a valid email address
 *
 * @example
 * ```ts
 * isEmail('user@example.com') // true
 * isEmail('invalid') // false
 * ```
 */
export function isEmail(string_: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string_);
}

/**
 * Check if string is a valid URL
 *
 * @param str - The string to check
 * @returns True if string is a valid URL
 *
 * @example
 * ```ts
 * isUrl('https://example.com') // true
 * isUrl('not a url') // false
 * ```
 */
export function isUrl(string_: string): boolean {
  try {
    new URL(string_);
    return true;
  } catch {
    return false;
  }
}
