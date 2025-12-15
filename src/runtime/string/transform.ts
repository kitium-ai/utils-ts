/**
 * String transformation utilities
 */

/**
 * Truncate string to length with suffix
 *
 * @param str - The string to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to append (default: '...')
 * @returns The truncated string
 *
 * @example
 * ```ts
 * truncate('hello world', 8) // 'hello...'
 * truncate('hello', 10) // 'hello'
 * ```
 */
export function truncate(string_: string, length: number, suffix = '...'): string {
  if (string_.length <= length) {
    return string_;
  }
  return string_.slice(0, length - suffix.length) + suffix;
}

/**
 * Pad string to length with character (centered)
 *
 * @param str - The string to pad
 * @param length - Target length
 * @param char - Character to use for padding (default: ' ')
 * @returns The padded string
 *
 * @example
 * ```ts
 * pad('hello', 10) // '  hello   '
 * pad('hello', 10, '*') // '**hello***'
 * ```
 */
export function pad(string_: string, length: number, char = ' '): string {
  const padLength = Math.max(0, length - string_.length);
  const padLeft = Math.floor(padLength / 2);
  const padRight = padLength - padLeft;
  return char.repeat(padLeft) + string_ + char.repeat(padRight);
}

/**
 * Pad start of string
 *
 * @param str - The string to pad
 * @param length - Target length
 * @param char - Character to use for padding (default: ' ')
 * @returns The padded string
 *
 * @example
 * ```ts
 * padStart('hello', 10) // '     hello'
 * padStart('5', 3, '0') // '005'
 * ```
 */
export function padStart(string_: string, length: number, char = ' '): string {
  return string_.padStart(length, char);
}

/**
 * Pad end of string
 *
 * @param str - The string to pad
 * @param length - Target length
 * @param char - Character to use for padding (default: ' ')
 * @returns The padded string
 *
 * @example
 * ```ts
 * padEnd('hello', 10) // 'hello     '
 * padEnd('5', 3, '0') // '500'
 * ```
 */
export function padEnd(string_: string, length: number, char = ' '): string {
  return string_.padEnd(length, char);
}

/**
 * Remove prefix from string
 *
 * @param str - The string
 * @param prefix - The prefix to remove
 * @returns The string without the prefix, or original if prefix not found
 *
 * @example
 * ```ts
 * removePrefix('hello world', 'hello ') // 'world'
 * removePrefix('hello', 'xyz') // 'hello'
 * ```
 */
export function removePrefix(string_: string, prefix: string): string {
  return string_.startsWith(prefix) ? string_.slice(prefix.length) : string_;
}

/**
 * Remove suffix from string
 *
 * @param str - The string
 * @param suffix - The suffix to remove
 * @returns The string without the suffix, or original if suffix not found
 *
 * @example
 * ```ts
 * removeSuffix('hello.txt', '.txt') // 'hello'
 * removeSuffix('hello', '.txt') // 'hello'
 * ```
 */
export function removeSuffix(string_: string, suffix: string): string {
  return string_.endsWith(suffix) ? string_.slice(0, -suffix.length) : string_;
}

/**
 * Reverse string
 *
 * @param str - The string to reverse
 * @returns The reversed string
 *
 * @example
 * ```ts
 * reverse('hello') // 'olleh'
 * reverse('123') // '321'
 * ```
 */
export function reverse(string_: string): string {
  return string_.split('').reverse().join('');
}
