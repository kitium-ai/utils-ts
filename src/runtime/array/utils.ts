/**
 * Array utility functions (range, shuffle, sample)
 */

/**
 * Create array of numbers from start to end
 *
 * @param start - Start value (inclusive)
 * @param end - End value (exclusive)
 * @param step - Step size (default: 1)
 * @returns An array of numbers
 *
 * @example
 * ```ts
 * range(0, 5) // [0, 1, 2, 3, 4]
 * range(0, 10, 2) // [0, 2, 4, 6, 8]
 * ```
 */
export function range(start: number, end: number, step = 1): number[] {
  const result: number[] = [];
  for (let index = start; index < end; index += step) {
    result.push(index);
  }
  return result;
}

/**
 * Shuffle array randomly using Fisher-Yates algorithm
 *
 * @template T - The type of array elements
 * @param array - The array to shuffle
 * @returns A new shuffled array
 *
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random order)
 * ```
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let index = result.length - 1; index > 0; index--) {
    const index_ = Math.floor(Math.random() * (index + 1));
    // Non-null assertions are safe here because we're within array bounds
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [result[index], result[index_]] = [result[index_]!, result[index]!];
  }
  return result;
}

/**
 * Get random sample from array
 *
 * @template T - The type of array elements
 * @param array - The array to sample from
 * @param count - Number of items to sample (default: 1)
 * @returns A new array with random samples
 *
 * @example
 * ```ts
 * sample([1, 2, 3, 4, 5], 2) // [3, 1] (random)
 * ```
 */
export function sample<T>(array: T[], count = 1): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
}
