/**
 * Logger Integration Utilities
 * Provides type-safe wrappers and utilities for @kitiumai/logger 3.0
 */

import { isIntegrationsEnabled } from '../config.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoggerMeta = Record<string, any>;

type ILogger = {
  debug: (message: string, meta?: LoggerMeta) => void;
  info: (message: string, meta?: LoggerMeta) => void;
  warn: (message: string, meta?: LoggerMeta) => void;
  error: (message: string, meta?: LoggerMeta) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCallable = (...args: any[]) => any;

let loggerUtils: {
  logFunctionCall?: <T extends AnyCallable>(function_: T, context?: string) => T;
  createTimer?: (name?: string) => { end: () => { duration: number; memoryUsed: number } };
  withErrorLogging?: <T>(
    function_: () => Promise<T>,
    context?: { operation?: string }
  ) => Promise<T>;
} | null = null;

function getLoggerUtils(): typeof loggerUtils {
  if (!isIntegrationsEnabled()) {
    return {};
  }

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

/**
 * Creates a logger instance for utility functions
 */
export function createUtilLogger(_name: string): ILogger | null {
  if (!isIntegrationsEnabled()) {
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const loggerModule = require('@kitiumai/logger');
    return loggerModule.getLogger() ?? loggerModule.createLogger('production');
  } catch {
    return null;
  }
}

/**
 * Logger decorator for timing function execution
 * Uses @kitiumai/logger's logFunctionCall utility when available
 */
export function withLogging<T extends AnyCallable>(function_: T, loggerName: string): T {
  const logger = createUtilLogger(loggerName);
  const utils = getLoggerUtils();

  // Use logFunctionCall from @kitiumai/logger/utils if available
  if (utils?.logFunctionCall) {
    return utils.logFunctionCall(function_, loggerName);
  }

  // Fallback to manual implementation
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    logger?.debug(`Calling ${function_.name ?? 'anonymous'}`, { args });

    try {
      const result = function_(...args);

      // Handle async results
      if (result instanceof Promise) {
        return (async (): Promise<ReturnType<T>> => {
          try {
            const value = await result;
            const duration = performance.now() - start;
            logger?.debug(`${function_.name ?? 'anonymous'} completed`, { duration });
            return value;
          } catch (error) {
            const duration = performance.now() - start;
            logger?.error(`${function_.name ?? 'anonymous'} failed`, { error, duration });
            throw error;
          }
        })() as ReturnType<T>;
      }

      const duration = performance.now() - start;
      logger?.debug(`${function_.name ?? 'anonymous'} completed`, { duration });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger?.error(`${function_.name ?? 'anonymous'} failed`, { error, duration });
      throw error;
    }
  }) as T;
}

/**
 * Helper: Create a timer end function using @kitiumai/logger's createTimer
 */
function createTimerEndFunction(
  utils: typeof loggerUtils,
  logger: ILogger | null,
  operation: string
): () => void {
  if (utils?.createTimer) {
    const timer = utils.createTimer(operation);
    return () => {
      const result = timer.end();
      logger?.debug(`Performance: ${operation}`, {
        duration: result.duration,
        unit: 'ms',
        memoryUsed: result.memoryUsed,
      });
    };
  }

  const startTime = performance.now();
  return () => {
    const duration = performance.now() - startTime;
    logger?.debug(`Performance: ${operation}`, { duration, unit: 'ms' });
  };
}

/**
 * Helper: Measure execution with error handling
 */
function measureExecution<T>(
  utils: typeof loggerUtils,
  logger: ILogger | null,
  operation: string,
  function_: () => T
): T {
  if (utils?.createTimer) {
    const timer = utils.createTimer(operation);
    try {
      const result = function_();
      const timing = timer.end();
      logger?.debug(`Performance: ${operation}`, {
        duration: timing.duration,
        unit: 'ms',
        memoryUsed: timing.memoryUsed,
      });
      return result;
    } catch (error) {
      const timing = timer.end();
      logger?.error(`Performance: ${operation} failed`, {
        duration: timing.duration,
        error,
      });
      throw error;
    }
  }

  const startTime = performance.now();
  try {
    const result = function_();
    const duration = performance.now() - startTime;
    logger?.debug(`Performance: ${operation}`, { duration, unit: 'ms' });
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    logger?.error(`Performance: ${operation} failed`, { duration, error });
    throw error;
  }
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
    start: (operation: string) => createTimerEndFunction(utils, logger, operation),
    measure: <T>(operation: string, function_: () => T): T =>
      measureExecution(utils, logger, operation, function_),
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
  return (async () => {
    try {
      return await function_();
    } catch (error) {
      logger?.error(`Operation failed: ${operation ?? 'unknown'}`, { error, operation });
      throw error;
    }
  })();
}
