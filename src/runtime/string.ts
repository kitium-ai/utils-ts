/**
 * String utility functions
 */

/**
 * Convert string to camelCase
 *
 * @param str - The string to convert
 * @returns The camelCase string
 *
 * @example
 * ```ts
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello world') // 'helloWorld'
 * ```
 */
export function camelCase(str: string): string {
  return str
    .replace(/[_\-\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (char) => char.toLowerCase());
}

/**
 * Convert string to PascalCase
 *
 * @param str - The string to convert
 * @returns The PascalCase string
 *
 * @example
 * ```ts
 * pascalCase('hello_world') // 'HelloWorld'
 * pascalCase('hello-world') // 'HelloWorld'
 * ```
 */
export function pascalCase(str: string): string {
  return capitalize(camelCase(str));
}

/**
 * Convert string to kebab-case
 *
 * @param str - The string to convert
 * @returns The kebab-case string
 *
 * @example
 * ```ts
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('Hello World') // 'hello-world'
 * ```
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to snake_case
 *
 * @param str - The string to convert
 * @returns The snake_case string
 *
 * @example
 * ```ts
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('Hello World') // 'hello_world'
 * ```
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Capitalize first letter
 *
 * @param str - The string to capitalize
 * @returns The string with first letter capitalized
 *
 * @example
 * ```ts
 * capitalize('hello') // 'Hello'
 * capitalize('HELLO') // 'HELLO'
 * ```
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize first letter of each word
 *
 * @param str - The string to convert
 * @returns The title case string
 *
 * @example
 * ```ts
 * titleCase('hello world') // 'Hello World'
 * titleCase('hello WORLD') // 'Hello World'
 * ```
 */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (word) => capitalize(word.toLowerCase()));
}

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
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length - suffix.length) + suffix;
}

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
export function isEmptyString(str: string): boolean {
  return str.trim().length === 0;
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
export function pad(str: string, length: number, char = ' '): string {
  const padLength = Math.max(0, length - str.length);
  const padLeft = Math.floor(padLength / 2);
  const padRight = padLength - padLeft;
  return char.repeat(padLeft) + str + char.repeat(padRight);
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
export function padStart(str: string, length: number, char = ' '): string {
  return str.padStart(length, char);
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
export function padEnd(str: string, length: number, char = ' '): string {
  return str.padEnd(length, char);
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
export function removePrefix(str: string, prefix: string): string {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str;
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
export function removeSuffix(str: string, suffix: string): string {
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
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
export function reverse(str: string): string {
  return str.split('').reverse().join('');
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
export function countOccurrences(str: string, search: string): number {
  if (search.length === 0) {
    return 0;
  }
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(search, pos)) !== -1) {
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
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
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
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
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
export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

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
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Escape HTML special characters
 *
 * @param str - The string to escape
 * @returns The escaped string
 *
 * @example
 * ```ts
 * escapeHtml('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
 * escapeHtml('& "quotes"') // '&amp; &quot;quotes&quot;'
 * ```
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&': '&amp;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '<': '&lt;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '>': '&gt;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '"': '&quot;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Unescape HTML entities
 *
 * @param str - The string to unescape
 * @returns The unescaped string
 *
 * @example
 * ```ts
 * unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
 * unescapeHtml('&amp; &quot;quotes&quot;') // '& "quotes"'
 * ```
 */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&amp;': '&',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&lt;': '<',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&gt;': '>',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&quot;': '"',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&#39;': "'",
  };
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => map[entity] || entity);
}
