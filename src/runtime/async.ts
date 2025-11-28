/**
 * Async/Promise utility functions
 */

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry options
 */
export interface RetryOptions {
  retries?: number;
  delay?: number;
  backoff?: number;
  onRetry?: (error: Error, attempt: number) => void;
}

/**
 * Retry async function with exponential backoff
 */
export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { retries = 3, delay = 1000, backoff = 2, onRetry } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < retries) {
        const waitTime = delay * Math.pow(backoff, attempt);
        onRetry?.(lastError, attempt + 1);
        await sleep(waitTime);
      }
    }
  }

  throw lastError!;
}

/**
 * Add timeout to promise
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

/**
 * Run promises in parallel
 */
export async function parallel<T>(fns: Array<() => Promise<T>>): Promise<T[]> {
  return Promise.all(fns.map((fn) => fn()));
}

/**
 * Run promises in series (one after another)
 */
export async function series<T>(fns: Array<() => Promise<T>>): Promise<T[]> {
  const results: T[] = [];
  for (const fn of fns) {
    results.push(await fn());
  }
  return results;
}

/**
 * Run async function with concurrency limit
 */
export async function concurrency<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  limit: number
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  const executing: Promise<void>[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item === undefined) {
      continue;
    }
    const promise = fn(item).then((result) => {
      results[i] = result;
    });

    executing.push(promise);

    if (executing.length >= limit) {
      await Promise.race(executing);
      const index = executing.findIndex((p) => p === promise);
      if (index !== -1) {
        executing.splice(index, 1);
      }
    }
  }

  await Promise.all(executing);
  return results;
}

/**
 * Promisify callback-based function
 */
export function promisify<TArgs extends unknown[], R>(
  fn: (...args: [...TArgs, (error: Error | null, result?: R) => void]) => void
): (...args: TArgs) => Promise<R> {
  return (...args: TArgs) => {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!);
        }
      });
    });
  };
}

/**
 * Wrap promise to never reject
 */
export async function settled<T>(
  promise: Promise<T>
): Promise<{ success: true; value: T } | { success: false; error: Error }> {
  try {
    const value = await promise;
    return { success: true, value };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

/**
 * Race promises, return first to complete (success or failure)
 */
export function race<T>(promises: Array<Promise<T>>): Promise<T> {
  return Promise.race(promises);
}

/**
 * Wait for all promises to settle (fulfilled or rejected)
 */
export function allSettled<T>(
  promises: Array<Promise<T>>
): Promise<Array<PromiseSettledResult<T>>> {
  return Promise.allSettled(promises);
}

/**
 * Defer promise creation
 */
export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
}

export function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
