/**
 * Array grouping utilities (groupBy, countBy, keyBy)
 * Refactored to use shared error handling
 */

import type { ErrorHandlingOptions } from '../error.js';
import { createErrorHandler } from '../internal/error-handler.js';
import { ok, type Result } from '../result.js';

/**
 * Options for groupBy function
 */
export type GroupByOptions<T> = {
  selector: keyof T | ((item: T) => string | number | undefined);
  allowUndefined?: boolean;
} & ErrorHandlingOptions;

/**
 * Return type for groupBy with error handling
 */
export type GroupByReturn<T, O> = O extends { onError: 'return' }
  ? Result<Record<string, T[]>>
  : Record<string, T[]>;

/**
 * Create error handler for groupBy function
 * Note: We use a generic handler since the specific type is determined at call time
 */
function createGroupByErrorHandler<T>(): ReturnType<typeof createErrorHandler<GroupByOptions<T>>> {
  // We need to use 'any' for the default selector since it's a placeholder
  return createErrorHandler<GroupByOptions<T>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { selector: '' as any, allowUndefined: false, onError: 'throw' as const },
    (options) => ({
      code: 'GROUP_BY_KEY_MISSING' as const,
      message: 'groupBy selector returned an undefined key',
      details: { allowUndefined: options.allowUndefined },
    })
  );
}

/**
 * Normalize groupBy options
 */
function normalizeGroupByOptions<T>(
  selectorOrOptions: keyof T | ((item: T) => string | number | undefined) | GroupByOptions<T>
): GroupByOptions<T> {
  if (
    typeof selectorOrOptions === 'function' ||
    typeof selectorOrOptions === 'string' ||
    typeof selectorOrOptions === 'number'
  ) {
    return { selector: selectorOrOptions, allowUndefined: false, onError: 'throw' as const };
  }

  const errorHandler = createGroupByErrorHandler<T>();
  return errorHandler.normalize(selectorOrOptions as GroupByOptions<T>);
}

/**
 * Implementation of groupBy
 */
function groupByImpl<T>(
  array: T[],
  options: GroupByOptions<T>
): Record<string, T[]> | Result<Record<string, T[]>> {
  const errorHandler = createGroupByErrorHandler<T>();
  const result: Record<string, T[]> = {};

  if (options.selector === undefined) {
    if (options.onError === 'return') {
      return errorHandler.handleError({
        ...options,
        onError: 'return',
      });
    }
    throw new Error('groupBy requires a selector or property key');
  }

  for (const item of array) {
    const keyOrValue = options.selector;
    const key = typeof keyOrValue === 'function' ? keyOrValue(item) : item[keyOrValue as keyof T];

    if ((key === undefined || key === null) && !options.allowUndefined) {
      if (options.onError === 'return') {
        return errorHandler.handleError({
          ...options,
          onError: 'return',
        });
      }
      throw new Error('groupBy selector returned an undefined key');
    }

    const keyAsString = String(key);

    (result[keyAsString] ??= []).push(item);
  }

  return options.onError === 'return' ? ok(result) : result;
}

/**
 * Group array items by a key or selector with predictable error semantics.
 *
 * Supports data-first (`groupBy(array, selector)`) and data-last/curried
 * (`groupBy(selector)(array)`) usage. When `onError` is set to `return`, a
 * `Result` is returned instead of throwing if a selector resolves to
 * `undefined` and `allowUndefined` is not enabled.
 *
 * @template T - The type of array elements
 * @param arrayOrSelector - The array to group or selector for curried usage
 * @param selectorOrOptions - The selector or options object
 * @returns Grouped object or Result
 *
 * @example
 * ```ts
 * groupBy([{ type: 'a', value: 1 }, { type: 'b', value: 2 }], 'type')
 * // { a: [{ type: 'a', value: 1 }], b: [{ type: 'b', value: 2 }] }
 *
 * // Data-last (curried)
 * const byType = groupBy<Item>('type');
 * byType(items);
 *
 * // With error handling
 * const result = groupBy(items, { selector: 'type', onError: 'return' });
 * ```
 */
export function groupBy<T>(
  array: T[],
  selector: keyof T | ((item: T) => string | number | undefined)
): Record<string, T[]>;
export function groupBy<T, O extends GroupByOptions<T> & { onError?: 'throw' | undefined }>(
  array: T[],
  options: O
): GroupByReturn<T, O>;
export function groupBy<T>(
  selector: keyof T | ((item: T) => string | number | undefined) | GroupByOptions<T>
): (array: T[]) => Record<string, T[]> | Result<Record<string, T[]>>;
export function groupBy<T>(
  arrayOrSelector: T[] | keyof T | ((item: T) => string | number | undefined) | GroupByOptions<T>,
  selectorOrOptions?: keyof T | ((item: T) => string | number | undefined) | GroupByOptions<T>
):
  | Record<string, T[]>
  | Result<Record<string, T[]>>
  | ((array: T[]) => Record<string, T[]> | Result<Record<string, T[]>>) {
  // Handle data-last (curried) form
  if (!Array.isArray(arrayOrSelector)) {
    const normalized = normalizeGroupByOptions<T>(arrayOrSelector);
    return (array: T[]) => groupByImpl(array, normalized);
  }

  // Handle data-first form
  const normalized = normalizeGroupByOptions<T>(selectorOrOptions as GroupByOptions<T>);
  return groupByImpl(arrayOrSelector, normalized);
}

/**
 * Count occurrences of items by a key or function
 *
 * @template T - The type of array elements
 * @param array - The array to count
 * @param keyOrFn - A key of T or a function that returns a grouping key
 * @returns An object with keys as grouping keys and values as counts
 *
 * @example
 * ```ts
 * countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
 * // { a: 2, b: 1 }
 * ```
 */
export function countBy<T>(
  array: T[],
  keyOrFunction: keyof T | ((item: T) => string | number)
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const item of array) {
    const key =
      typeof keyOrFunction === 'function'
        ? String(keyOrFunction(item))
        : String(item[keyOrFunction]);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

/**
 * Create an object from an array using a key
 *
 * @template T - The type of array elements
 * @param array - The array to convert
 * @param keyOrFn - A key of T or a function that returns a key
 * @returns An object with keys from the key function and values from the array
 *
 * @example
 * ```ts
 * keyBy([{ id: 1, name: 'a' }, { id: 2, name: 'b' }], 'id')
 * // { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' } }
 * ```
 */
export function keyBy<T>(
  array: T[],
  keyOrFunction: keyof T | ((item: T) => string | number)
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const item of array) {
    const key =
      typeof keyOrFunction === 'function'
        ? String(keyOrFunction(item))
        : String(item[keyOrFunction]);
    result[key] = item;
  }
  return result;
}
