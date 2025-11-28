/**
 * Logger Integration Utilities
 * Provides type-safe wrappers and utilities for @kitiumai/logger 2.0
 */

import { createLogger, getLogger, type ILogger } from '@kitiumai/logger';

/**
 * Creates a logger instance for utility functions
 */
export function createUtilLogger(_name: string): ILogger {
  return getLogger() || createLogger('production');
}

/**
 * Logger decorator for timing function execution
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withLogging<T extends (...args: any[]) => any>(fn: T, loggerName: string): T {
  const logger = createUtilLogger(loggerName);

  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    logger.debug(`Calling ${fn.name || 'anonymous'}`, { args });

    try {
      const result = fn(...args);

      if (result instanceof Promise) {
        return result
          .then((value) => {
            const duration = performance.now() - start;
            logger.debug(`${fn.name || 'anonymous'} completed`, { duration });
            return value;
          })
          .catch((error) => {
            const duration = performance.now() - start;
            logger.error(`${fn.name || 'anonymous'} failed`, { error, duration });
            throw error;
          }) as ReturnType<T>;
      }

      const duration = performance.now() - start;
      logger.debug(`${fn.name || 'anonymous'} completed`, { duration });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger.error(`${fn.name || 'anonymous'} failed`, { error, duration });
      throw error;
    }
  }) as T;
}

/**
 * Creates a performance logger for monitoring utility performance
 */
export function createPerformanceLogger(utilityName: string): {
  start: (operation: string) => () => void;
  measure: <T>(operation: string, fn: () => T) => T;
} {
  const logger = createUtilLogger(`perf:${utilityName}`);

  return {
    start: (operation: string) => {
      const startTime = performance.now();
      return () => {
        const duration = performance.now() - startTime;
        logger.debug(`Performance: ${operation}`, { duration, unit: 'ms' });
      };
    },
    measure: <T>(operation: string, fn: () => T): T => {
      const startTime = performance.now();
      try {
        const result = fn();
        const duration = performance.now() - startTime;
        logger.debug(`Performance: ${operation}`, { duration, unit: 'ms' });
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        logger.error(`Performance: ${operation} failed`, { duration, error });
        throw error;
      }
    },
  };
}
