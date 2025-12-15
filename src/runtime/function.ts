/**
 * Function utility functions
 */

type UnknownFunction = (...args: unknown[]) => unknown;
type BooleanFunction = (...args: unknown[]) => boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/**
 * Compose functions from right to left
 */
export function compose<T, R>(...fns: Array<(argument: unknown) => unknown>): (argument: T) => R {
  return (argument: T) =>
    fns.reduceRight((result, function_) => function_(result), argument as unknown) as R;
}

/**
 * Pipe functions from left to right
 */
export function pipe<T, R>(...fns: Array<(argument: unknown) => unknown>): (argument: T) => R {
  return (argument: T) =>
    fns.reduce((result, function_) => function_(result), argument as unknown) as R;
}

/**
 * Debounce function execution
 */
export function debounce<T extends UnknownFunction>(
  function_: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      function_.apply(this, args);
      timeoutId = null;
    }, delayMs);
  };
}

/**
 * Throttle function execution
 */
export function throttle<T extends UnknownFunction>(
  function_: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= interval) {
      lastCall = now;
      function_.apply(this, args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        function_.apply(this, args);
        timeoutId = null;
      }, interval - timeSinceLastCall);
    }
  };
}

/**
 * Memoize function results
 */
export function memoize<T extends UnknownFunction>(
  function_: T,
  resolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return cache.get(key)!;
    }

    const result = function_.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T;
}

/**
 * Execute function only once
 */
export function once<T extends UnknownFunction>(function_: T): T {
  let hasCalled = false;
  let result: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (!hasCalled) {
      hasCalled = true;
      result = function_.apply(this, args) as ReturnType<T>;
    }
    return result;
  } as T;
}

/**
 * Partial application (curry)
 * Note: Simple implementation for common use cases
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry<T extends AnyFunction>(function_: T, arity = function_.length): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function curried(this: unknown, ...args: any[]): any {
    if (args.length >= arity) {
      return function_.apply(this, args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...nextArguments: any[]) => curried.apply(this, [...args, ...nextArguments]);
  };
}

/**
 * Delay function execution
 */
export function delay<T extends UnknownFunction>(
  function_: T,
  ms: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args: Parameters<T>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(function_(...args) as ReturnType<T>);
      }, ms);
    });
  };
}

/**
 * Negate function result
 */
export function negate<T extends BooleanFunction>(
  function_: T
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>) => !function_(...args);
}

/**
 * Call function with try-catch and return result or error
 */
export function attempt<T>(
  function_: () => T
): { success: true; value: T } | { success: false; error: Error } {
  try {
    return { success: true, value: function_() };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

/**
 * Create function that always returns same value
 */
export function constant<T>(value: T): () => T {
  return () => value;
}

/**
 * Identity function (returns its argument)
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * No-op function (does nothing)
 */
export function noop(): void {
  // Do nothing
}
