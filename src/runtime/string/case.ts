/**
 * String case conversion utilities
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
export function camelCase(string_: string): string {
  return string_
    .replace(/[_\-\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (char) => char.toLowerCase());
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
export function capitalize(string_: string): string {
  return string_.charAt(0).toUpperCase() + string_.slice(1);
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
export function pascalCase(string_: string): string {
  return capitalize(camelCase(string_));
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
export function kebabCase(string_: string): string {
  return string_
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
export function snakeCase(string_: string): string {
  return string_
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
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
export function titleCase(string_: string): string {
  return string_.replace(/\w\S*/g, (word) => capitalize(word.toLowerCase()));
}
