/**
 * Error factory pattern for extensible error creation
 * Enables dependency injection and custom error handling strategies
 */

import { UtilsError, type UtilsErrorInit } from '../error.js';
import type { ErrorContext } from './error-handler.js';

/**
 * Factory interface for creating errors
 * Allows for different implementations (e.g., KitiumErrorFactory)
 */
export type ErrorFactory = {
  /**
   * Create an error from context
   */
  create(context: ErrorContext): Error;

  /**
   * Check if an error was created by this factory
   */
  isFactoryError(error: unknown): boolean;
};

/**
 * Default error factory for utils-ts package
 * Creates standard UtilsError instances
 */
export class UtilsErrorFactory implements ErrorFactory {
  create(context: ErrorContext): UtilsError {
    const init: UtilsErrorInit = {
      code: context.code,
      message: context.message,
    };

    if (context.details !== undefined) {
      init.details = context.details;
    }

    if (context.cause !== undefined) {
      init.cause = context.cause;
    }

    return new UtilsError(init);
  }

  isFactoryError(error: unknown): error is UtilsError {
    return error instanceof UtilsError;
  }
}

/**
 * Global error factory instance
 * Can be replaced to use custom error implementations
 */
let globalErrorFactory: ErrorFactory = new UtilsErrorFactory();

/**
 * Get the current error factory
 */
export function getErrorFactory(): ErrorFactory {
  return globalErrorFactory;
}

/**
 * Set the global error factory
 * Useful for integration with custom error handling systems (e.g., @kitiumai/error)
 *
 * @param factory - The factory to use globally
 *
 * @example
 * ```ts
 * // Integrate with custom error system
 * import { KitiumErrorFactory } from '@kitiumai/error';
 * setErrorFactory(new KitiumErrorFactory());
 * ```
 */
export function setErrorFactory(factory: ErrorFactory): void {
  globalErrorFactory = factory;
}

/**
 * Reset to default error factory
 */
export function resetErrorFactory(): void {
  globalErrorFactory = new UtilsErrorFactory();
}

/**
 * Create error using current global factory
 */
export function createError(context: ErrorContext): Error {
  return globalErrorFactory.create(context);
}
