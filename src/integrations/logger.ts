/**
 * Logger Integration Utilities
 * Provides type-safe wrappers and utilities for @kitiumai/logger 3.0
 */

import { createLogger, getLogger, type ILogger } from '@kitiumai/logger';

// Import utilities from logger package
// Using dynamic import pattern to work with module resolution
let loggerUtils: {
  logFunctionCall?: <T extends (...args: any[]) => any>(function_: T, context?: string) => T;
  createTimer?: (name?: string) => { end: () => { duration: number; memoryUsed: number } };
  withErrorLogging?: <T>(
    function_: () => Promise<T>,
    context?: { operation?: string }
  ) => Promise<T>;
} | null = null;

function getLoggerUtils() {
  if (loggerUtils === null) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const utilsModule = require('@kitiumai/logger/utils');
      loggerUtils = {
        logFunctionCall: utilsModule.logFunctionCall,
        createTimer: utilsModule.createTimer,
        withErrorLogging: utilsModule.withErrorLogging,
      };
    } catch {
      loggerUtils = {};
    }
  }
  return loggerUtils;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/**
 * Creates a logger instance for utility functions
 */
export function createUtilLogger(_name: string): ILogger {
  return getLogger() || createLogger('production');
}

/**
 * Logger decorator for timing function execution
 * Uses @kitiumai/logger's logFunctionCall utility when available
 */
export function withLogging<T extends AnyFunction>(function_: T, loggerName: string): T {
  const logger = createUtilLogger(loggerName);
  const utils = getLoggerUtils();

  // Use logFunctionCall from @kitiumai/logger/utils if available
  if (utils?.logFunctionCall) {
    return utils.logFunctionCall(function_, loggerName);
  }

  // Fallback to manual implementation
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    logger.debug(`Calling ${function_.name || 'anonymous'}`, { args });

    try {
      const result = function_(...args);

      if (result instanceof Promise) {
        return result
          .then((value) => {
            const duration = performance.now() - start;
            logger.debug(`${function_.name || 'anonymous'} completed`, { duration });
            return value;
          })
          .catch((error) => {
            const duration = performance.now() - start;
            logger.error(`${function_.name || 'anonymous'} failed`, { error, duration });
            throw error;
          }) as ReturnType<T>;
      }

      const duration = performance.now() - start;
      logger.debug(`${function_.name || 'anonymous'} completed`, { duration });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger.error(`${function_.name || 'anonymous'} failed`, { error, duration });
      throw error;
    }
  }) as T;
}

/**
 * Creates a performance logger for monitoring utility performance
 * Uses @kitiumai/logger's createTimer utility when available
 */
export function createPerformanceLogger(utilityName: string): {
  start: (operation: string) => () => void;
  measure: <T>(operation: string, function_: () => T) => T;
} {
  const logger = createUtilLogger(`perf:${utilityName}`);
  const utils = getLoggerUtils();

  return {
    start: (operation: string) => {
      // Use createTimer from @kitiumai/logger/utils if available
      if (utils?.createTimer) {
        const timer = utils.createTimer(operation);
        return () => {
          const result = timer.end();
          logger.debug(`Performance: ${operation}`, {
            duration: result.duration,
            unit: 'ms',
            memoryUsed: result.memoryUsed,
          });
        };
      }

      // Fallback to manual implementation
      const startTime = performance.now();
      return () => {
        const duration = performance.now() - startTime;
        logger.debug(`Performance: ${operation}`, { duration, unit: 'ms' });
      };
    },
    measure: <T>(operation: string, function_: () => T): T => {
      // Use createTimer from @kitiumai/logger/utils if available
      if (utils?.createTimer) {
        const timer = utils.createTimer(operation);
        try {
          const result = function_();
          const timing = timer.end();
          logger.debug(`Performance: ${operation}`, {
            duration: timing.duration,
            unit: 'ms',
            memoryUsed: timing.memoryUsed,
          });
          return result;
        } catch (error) {
          const timing = timer.end();
          logger.error(`Performance: ${operation} failed`, {
            duration: timing.duration,
            error,
          });
          throw error;
        }
      }

      // Fallback to manual implementation
      const startTime = performance.now();
      try {
        const result = function_();
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

/**
 * Wrap async function with automatic error logging
 * Uses @kitiumai/logger's withErrorLogging utility when available
 */
export function withAsyncErrorLogging<T>(
  function_: () => Promise<T>,
  operation?: string
): Promise<T> {
  const utils = getLoggerUtils();

  // Use withErrorLogging from @kitiumai/logger/utils if available
  if (utils?.withErrorLogging) {
    return utils.withErrorLogging(function_, operation ? { operation } : undefined);
  }

  // Fallback to manual implementation
  const logger = createUtilLogger('error-handler');
  return function_().catch((error) => {
    logger.error(`Operation failed: ${operation || 'unknown'}`, { error, operation });
    throw error;
  });
}
