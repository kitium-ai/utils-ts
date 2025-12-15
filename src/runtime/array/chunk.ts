/**
 * Array chunking utilities
 * Refactored to use shared error handling and curry helpers
 */

import type { ErrorHandlingOptions } from '../error.js';
import { createErrorHandler } from '../internal/error-handler.js';
import { type Result } from '../result.js';

/**
 * Options for chunk function
 */
export type ChunkOptions = {
  size: number;
  label?: string;
} & ErrorHandlingOptions;

/**
 * Return type for chunk with error handling
 */
export type ChunkReturn<T, O> = O extends { onError: 'return' } ? Result<T[][]> : T[][];

/**
 * Create error handler for chunk function
 */
const chunkErrorHandler = createErrorHandler<ChunkOptions>(
  { size: 1, onError: 'throw' as const },
  (options) => ({
    code: 'INVALID_CHUNK_SIZE' as const,
    message: options.label
      ? `Chunk size must be greater than 0 for ${options.label}`
      : 'Chunk size must be greater than 0',
    details: {
      size: options.size,
      label: options.label,
    },
  })
);

/**
 * Normalize chunk options - handle simple number or full options object
 */
function normalizeChunkOptions(sizeOrOptions: number | ChunkOptions | undefined): ChunkOptions {
  if (typeof sizeOrOptions === 'number') {
    return { size: sizeOrOptions, onError: 'throw' as const };
  }

  return chunkErrorHandler.normalize(sizeOrOptions);
}

/**
 * Implementation of chunk function
 */
function chunkImpl<T>(array: T[], options: ChunkOptions): T[][] | Result<T[][]> {
  // Validate size
  if (typeof options.size !== 'number' || Number.isNaN(options.size)) {
    const errorResult = chunkErrorHandler.handleError({
      ...options,
      onError: (options.onError ?? 'throw') as 'throw' | 'return',
    });
    return errorResult as T[][] | Result<T[][]>;
  }

  if (options.size <= 0) {
    const errorResult = chunkErrorHandler.handleError({
      ...options,
      onError: (options.onError ?? 'throw') as 'throw' | 'return',
    });
    return errorResult as T[][] | Result<T[][]>;
  }

  // Core chunking logic
  const result: T[][] = [];
  for (let index = 0; index < array.length; index += options.size) {
    result.push(array.slice(index, index + options.size));
  }

  // Return based on error strategy
  return chunkErrorHandler.wrapResult(options, result) as T[][] | Result<T[][]>;
}

/**
 * Split array into chunks of specified size with unified error handling.
 *
 * Supports data-first usage (`chunk(items, options)`) and data-last/curried
 * usage (`chunk(options)(items)`). Set `onError: 'return'` to get a Result
 * instead of throwing.
 *
 * @template T - The type of array elements
 * @param arrayOrOptions - The array to chunk or options for curried usage
 * @param sizeOrOptions - Size or options bag controlling chunking and errors
 * @returns An array of chunks or a Result when `onError` is set to `return`
 *
 * @example
 * ```ts
 * // data-first
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 *
 * // data-last / curried
 * const byThree = chunk<number>({ size: 3 });
 * byThree([1, 2, 3, 4]); // [[1, 2, 3], [4]]
 *
 * // structured error channel
 * const result = chunk([1, 2], { size: 0, onError: 'return', label: 'example' });
 * if (!result.ok) console.log(result.error);
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][];
export function chunk<T, O extends ChunkOptions & { onError?: 'throw' | undefined }>(
  array: T[],
  options: O
): ChunkReturn<T, O>;
export function chunk<T>(options: number | ChunkOptions): (array: T[]) => T[][] | Result<T[][]>;
export function chunk<T>(
  arrayOrOptions: T[] | number | ChunkOptions,
  sizeOrOptions?: number | ChunkOptions
): T[][] | Result<T[][]> | ((array: T[]) => T[][] | Result<T[][]>) {
  // Handle data-last (curried) form
  if (!Array.isArray(arrayOrOptions)) {
    const normalized = normalizeChunkOptions(arrayOrOptions as number | ChunkOptions);
    return (array: T[]) => chunkImpl(array, normalized);
  }

  // Handle data-first form
  const normalized = normalizeChunkOptions(sizeOrOptions as number | ChunkOptions);
  return chunkImpl(arrayOrOptions, normalized);
}
