/**
 * Number utility functions
 */

/**
 * Clamp a number between min and max values
 *
 * @param value - The number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns The clamped value
 *
 * @example
 * ```ts
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random number between min (inclusive) and max (exclusive)
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns A random number
 *
 * @example
 * ```ts
 * random(0, 10) // A number between 0 and 10
 * ```
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer between min (inclusive) and max (inclusive)
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns A random integer
 *
 * @example
 * ```ts
 * randomInt(0, 10) // An integer between 0 and 10
 * ```
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

/**
 * Check if a number is within a range
 *
 * @param value - The number to check
 * @param start - Start of range (or end if end is not provided)
 * @param end - End of range (optional)
 * @returns True if value is in range
 *
 * @example
 * ```ts
 * inRange(5, 0, 10) // true
 * inRange(15, 0, 10) // false
 * inRange(3, 5) // true (checks if 3 is in [0, 5))
 * ```
 */
export function inRange(value: number, start: number, end?: number): boolean {
  if (end === undefined) {
    return value >= 0 && value < start;
  }
  return value >= Math.min(start, end) && value < Math.max(start, end);
}

/**
 * Calculate the sum of numbers
 *
 * @param numbers - Array of numbers to sum
 * @returns The sum of all numbers
 *
 * @example
 * ```ts
 * sum([1, 2, 3, 4]) // 10
 * ```
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

/**
 * Calculate the mean (average) of numbers
 *
 * @param numbers - Array of numbers
 * @returns The mean, or NaN if array is empty
 *
 * @example
 * ```ts
 * mean([1, 2, 3, 4]) // 2.5
 * mean([]) // NaN
 * ```
 */
export function mean(numbers: number[]): number {
  if (numbers.length === 0) {
    return Number.NaN;
  }
  return sum(numbers) / numbers.length;
}

/**
 * Find the minimum value in an array
 *
 * @param numbers - Array of numbers
 * @returns The minimum value, or undefined if array is empty
 *
 * @example
 * ```ts
 * min([1, 5, 3, 2]) // 1
 * min([]) // undefined
 * ```
 */
export function min(numbers: number[]): number | undefined {
  if (numbers.length === 0) {
    return undefined;
  }
  return Math.min(...numbers);
}

/**
 * Find the maximum value in an array
 *
 * @param numbers - Array of numbers
 * @returns The maximum value, or undefined if array is empty
 *
 * @example
 * ```ts
 * max([1, 5, 3, 2]) // 5
 * max([]) // undefined
 * ```
 */
export function max(numbers: number[]): number | undefined {
  if (numbers.length === 0) {
    return undefined;
  }
  return Math.max(...numbers);
}

/**
 * Find the item with the minimum value according to a function
 *
 * @template T - The type of array elements
 * @param array - Array of items
 * @param fn - Function that returns a number for each item
 * @returns The item with minimum value, or undefined if array is empty
 *
 * @example
 * ```ts
 * minBy([{ age: 20 }, { age: 30 }], x => x.age) // { age: 20 }
 * ```
 */
export function minBy<T>(array: T[], fn: (item: T) => number): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  let minValue = fn(array[0]!);
  let minItem = array[0]!;
  for (let i = 1; i < array.length; i++) {
    const value = fn(array[i]!);
    if (value < minValue) {
      minValue = value;
      minItem = array[i]!;
    }
  }
  return minItem;
}

/**
 * Find the item with the maximum value according to a function
 *
 * @template T - The type of array elements
 * @param array - Array of items
 * @param fn - Function that returns a number for each item
 * @returns The item with maximum value, or undefined if array is empty
 *
 * @example
 * ```ts
 * maxBy([{ age: 20 }, { age: 30 }], x => x.age) // { age: 30 }
 * ```
 */
export function maxBy<T>(array: T[], fn: (item: T) => number): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  let maxValue = fn(array[0]!);
  let maxItem = array[0]!;
  for (let i = 1; i < array.length; i++) {
    const value = fn(array[i]!);
    if (value > maxValue) {
      maxValue = value;
      maxItem = array[i]!;
    }
  }
  return maxItem;
}
