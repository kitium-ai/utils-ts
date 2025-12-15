/**
 * Generic curry helper for data-first/data-last function patterns.
 * Eliminates complex overload duplication across modules.
 */

/**
 * Data-first overload: function(data, options) => result
 */
export type DataFirst<TData, TOptions, TReturn> = (
  data: TData,
  options?: TOptions
) => TReturn;

/**
 * Data-last overload: function(options) => (data) => result
 * Also known as curried form
 */
export type DataLast<TData, TOptions, TReturn> = (
  options: TOptions
) => (data: TData) => TReturn;

/**
 * Dual API that supports both data-first and data-last
 */
export type DualAPI<TData, TOptions, TReturn> =
  | DataFirst<TData, TOptions, TReturn>
  | DataLast<TData, TOptions, TReturn>;

/**
 * Creates a function that can be called in both data-first and data-last patterns
 *
 * This eliminates the need for complex overload patterns and makes it easier
 * to maintain functions that support both calling styles.
 *
 * @template TData - Type of data being processed
 * @template TOptions - Type of options
 * @template TReturn - Return type
 * @param implementation - The core implementation function(data, options)
 * @returns A function supporting both calling styles
 *
 * @example
 * ```ts
 * // Implementation function
 * const chunkImpl = (array: number[], options: ChunkOptions): number[][] => {
 *   // core logic
 * };
 *
 * // Create dual API
 * export const chunk = createDualApi(chunkImpl);
 *
 * // Now supports both:
 * chunk([1,2,3,4], { size: 2 });  // data-first
 * chunk({ size: 2 })([1,2,3,4]);   // data-last
 * ```
 */
export function createDualApi<TData, TOptions, TReturn>(
  implementation: (data: TData, options: TOptions) => TReturn
): DualAPI<TData, TOptions, TReturn> {
  return ((
    dataOrOptions: TData | TOptions,
    optionsOrUndefined?: TOptions
  ): TReturn | ((data: TData) => TReturn) => {
    // If second argument is provided, it's data-first
    if (optionsOrUndefined !== undefined) {
      return implementation(dataOrOptions as TData, optionsOrUndefined);
    }

    // If first argument is array/object (data), treat as data-first with defaults
    if (
      Array.isArray(dataOrOptions) ||
      (typeof dataOrOptions === 'object' && dataOrOptions !== null && !isPlainObject(dataOrOptions))
    ) {
      // Ambiguous - could be data with default options
      // For array data, treat as data-first
      return implementation(
        dataOrOptions as TData,
        {} as TOptions
      );
    }

    // Otherwise, it's data-last/curried form
    return (data: TData) => implementation(data, dataOrOptions as TOptions);
  }) as DualAPI<TData, TOptions, TReturn>;
}

/**
 * Helper to detect if something is a plain object
 * Used to distinguish between options and data in ambiguous cases
 */
function isPlainObject(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check if it's a plain object (not Date, RegExp, etc.)
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * Type-safe dual API creator for cases where data and options are easily distinguishable
 * (e.g., array vs object, string vs object)
 *
 * @example
 * ```ts
 * // Works well when data type differs from options type
 * const pad = createDualApiStrict<string, PadOptions, string>(
 *   (str, opts) => str.padStart(opts.length, opts.char)
 * );
 *
 * // Now safe to call without ambiguity
 * pad("hello", { length: 10 });        // data-first
 * pad({ length: 10 })("hello");         // data-last
 * ```
 */
export function createDualApiStrict<TData, TOptions, TReturn>(
  implementation: (data: TData, options: TOptions) => TReturn,
  isDataCheck: (value: unknown) => value is TData
): DualAPI<TData, TOptions, TReturn> {
  return ((
    dataOrOptions: TData | TOptions,
    optionsOrUndefined?: TOptions
  ): TReturn | ((data: TData) => TReturn) => {
    // If second argument is provided, it's definitely data-first
    if (optionsOrUndefined !== undefined) {
      return implementation(dataOrOptions as TData, optionsOrUndefined);
    }

    // Use type check to disambiguate
    if (isDataCheck(dataOrOptions)) {
      // It's data - treat as data-first with default options
      return implementation(dataOrOptions, {} as TOptions);
    }

    // It's options - return curried function
    return (data: TData) => implementation(data, dataOrOptions as TOptions);
  }) as DualAPI<TData, TOptions, TReturn>;
}
