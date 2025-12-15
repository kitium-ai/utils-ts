/**
 * Centralized options normalization and handling.
 * Eliminates repetitive normalizeOptions patterns across modules.
 */

import type { ErrorHandlingOptions } from '../error.js';

/**
 * Normalize options by merging with defaults
 *
 * @example
 * ```ts
 * const defaults: ChunkOptions = { size: 1, onError: 'throw' };
 * const opts = normalizeOptions(
 *   { size: 5 },
 *   defaults
 * );
 * // { size: 5, onError: 'throw' }
 * ```
 */
export function normalizeOptions<T extends object>(
  input: Partial<T> | T | undefined,
  defaults: T
): T {
  if (!input) {
    return defaults;
  }

  return {
    ...defaults,
    ...input,
  } as T;
}

/**
 * Normalize simple values to options objects
 * Common pattern where size or selector can be passed directly
 *
 * @example
 * ```ts
 * normalizeSimpleOption(5, 'size', { size: 0 })
 * // { size: 5 }
 *
 * normalizeSimpleOption({ size: 5 }, 'size', { size: 0 })
 * // { size: 5 }
 * ```
 */
export function normalizeSimpleOption<T extends object, K extends keyof T>(
  input: T[K] | T | undefined,
  key: K,
  defaults: T
): T {
  // If input is a simple value (not an object or is explicit options)
  if (input === undefined || input === null || typeof input !== 'object' || Array.isArray(input)) {
    return {
      ...defaults,
      [key]: input,
    } as T;
  }

  // It's an options object, merge with defaults
  return normalizeOptions(input as Partial<T>, defaults);
}

/**
 * Create a normalizer function for reusable normalization logic
 *
 * @example
 * ```ts
 * const normalizeChunkOptions = createOptionNormalizer<ChunkOptions>(
 *   { size: 1, onError: 'throw' }
 * );
 *
 * const opts = normalizeChunkOptions({ size: 5 });
 * ```
 */
export function createOptionNormalizer<T extends object>(
  defaults: T
): (input: Partial<T> | T | undefined) => T {
  return (input) => normalizeOptions(input, defaults);
}

/**
 * Create a normalizer for simple value patterns
 *
 * @example
 * ```ts
 * const normalizeChunkSize = createSimpleOptionNormalizer<ChunkOptions, 'size'>(
 *   'size',
 *   { size: 1, onError: 'throw' }
 * );
 *
 * normalizeChunkSize(5);  // { size: 5, onError: 'throw' }
 * normalizeChunkSize({ size: 10 });  // { size: 10, onError: 'throw' }
 * ```
 */
export function createSimpleOptionNormalizer<T extends object, K extends keyof T>(
  key: K,
  defaults: T
): (input: T[K] | T | undefined) => T {
  return (input) => normalizeSimpleOption(input, key, defaults);
}

/**
 * Merge error handling options with priority given to explicit settings
 *
 * @example
 * ```ts
 * mergeErrorOptions(
 *   { onError: 'throw' },
 *   { onError: 'return' }
 * )
 * // { onError: 'return' } - explicit takes priority
 * ```
 */
export function mergeErrorOptions<T extends ErrorHandlingOptions>(
  defaults: T,
  explicit: Partial<T> | undefined
): T {
  if (!explicit) {
    return defaults;
  }

  const merged = { ...defaults, ...explicit } as T;

  // Ensure onError is properly set
  if (explicit.onError === undefined && defaults.onError === undefined) {
    merged.onError = 'throw';
  }

  return merged;
}

/**
 * Verify required options are present
 *
 * @example
 * ```ts
 * const options = validateRequired(
 *   { size: 5, selector: 'key' },
 *   ['selector'],
 *   'groupBy'
 * );
 * // Throws if selector is undefined
 * ```
 */
export function validateRequired<T extends object>(
  options: T,
  requiredKeys: Array<keyof T>,
  functionName: string
): asserts options is T {
  const missing: Array<keyof T> = [];

  for (const key of requiredKeys) {
    if (options[key] === undefined) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(`${functionName} requires options: ${missing.map(String).join(', ')}`);
  }
}
