/**
 * Function utility functions
 */

/**
 * Compose functions from right to left
 */
export function compose<T, R>(...fns: Array<(arg: unknown) => unknown>): (arg: T) => R {
  return (arg: T) => fns.reduceRight((result, fn) => fn(result), arg as unknown) as R;
}

/**
 * Pipe functions from left to right
 */
export function pipe<T, R>(...fns: Array<(arg: unknown) => unknown>): (arg: T) => R {
  return (arg: T) => fns.reduce((result, fn) => fn(result), arg as unknown) as R;
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= interval) {
      lastCall = now;
      fn.apply(this, args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        fn.apply(this, args);
        timeoutId = null;
      }, interval - timeSinceLastCall);
    }
  };
}

/**
 * Memoize function results
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  resolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T;
}

/**
 * Execute function only once
 */
export function once<T extends (...args: unknown[]) => unknown>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = fn.apply(this, args) as ReturnType<T>;
    }
    return result;
  } as T;
}

/**
 * Partial application (curry)
 * Note: Simple implementation for common use cases
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry<T extends (...args: any[]) => any>(fn: T, arity = fn.length): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function curried(this: unknown, ...args: any[]): any {
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...nextArgs: any[]) => curried.apply(this, [...args, ...nextArgs]);
  };
}

/**
 * Delay function execution
 */
export function delay<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args: Parameters<T>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn(...args) as ReturnType<T>);
      }, ms);
    });
  };
}

/**
 * Negate function result
 */
export function negate<T extends (...args: unknown[]) => boolean>(
  fn: T
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>) => !fn(...args);
}

/**
 * Call function with try-catch and return result or error
 */
export function attempt<T>(
  fn: () => T
): { success: true; value: T } | { success: false; error: Error } {
  try {
    return { success: true, value: fn() };
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
