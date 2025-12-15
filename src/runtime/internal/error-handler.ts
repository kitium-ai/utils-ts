/**
 * Generic error handling abstraction that eliminates code duplication
 * across modules while providing extensible error strategies.
 */

import {
  createUtilsError,
  type ErrorHandlingOptions,
  type UtilsErrorCode,
  type UtilsErrorInit,
} from '../error.js';
import { err as error, ok, type Result } from '../result.js';

/**
 * Strategy for deciding how to handle errors
 */
export type ErrorStrategy = 'throw' | 'return';

/**
 * Error handling context information
 */
export type ErrorContext = {
  code: UtilsErrorCode;
  message: string;
  details?: Record<string, unknown>;
  cause?: Error;
};

/**
 * Creates a UtilsErrorInit from context
 */
function createErrorInit(context: ErrorContext): UtilsErrorInit {
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

  return init;
}

/**
 * Unified error handling that works with both throw and return strategies
 * Eliminates the repetition of normalizeOptions and handleError patterns
 *
 * @template TOptions - Type of options object being normalized
 * @template TValue - Type of successful return value
 *
 * @example
 * ```ts
 * const handler = new StandardErrorHandler(
 *   { size: 0, onError: 'throw' as const },
 *   (size) => ({
 *     code: 'INVALID_CHUNK_SIZE',
 *     message: `Size must be positive, got ${size}`,
 *     details: { size },
 *   })
 * );
 *
 * const options = handler.normalize({ size: 5 });
 * // If size is 0, handle it:
 * const result = handler.handleError({ size: 0 });
 * ```
 */
export class StandardErrorHandler<TOptions extends ErrorHandlingOptions, TValue = unknown> {
  constructor(
    private readonly defaultOptions: TOptions,
    private readonly errorFactory: (options: TOptions) => ErrorContext
  ) {}

  /**
   * Normalize partial options with defaults
   */
  normalize(options: Partial<TOptions> | undefined): TOptions {
    return {
      ...this.defaultOptions,
      ...(options ?? {}),
    } as TOptions;
  }

  /**
   * Validate options and handle errors using the configured strategy
   * Returns the result value or throws/returns error based on onError strategy
   */
  handleError(options: TOptions & { onError: ErrorStrategy }): Result<never> | never {
    const errorContext = this.errorFactory(options);
    const utilsError = createUtilsError(createErrorInit(errorContext));

    if (options.onError === 'return') {
      return error(utilsError);
    }

    throw utilsError;
  }

  /**
   * Type-safe result wrapper that handles both success and error strategies
   *
   * @example
   * ```ts
   * const handler = new StandardErrorHandler(...);
   * const options = handler.normalize(opts);
   *
   * if (isInvalid) {
   *   return handler.handleError(options as TOptions & { onError: 'throw' | 'return' });
   * }
   *
   * const value = computeValue();
   * return handler.wrapResult(options, value);
   * ```
   */
  wrapResult(
    options: TOptions & { onError?: ErrorStrategy },
    value: TValue
  ): TValue | Result<TValue> {
    if (options.onError === 'return') {
      return ok(value);
    }
    return value;
  }
}

/**
 * Create a simple error handler for common patterns
 *
 * @example
 * ```ts
 * const handler = createErrorHandler(
 *   { size: 1, onError: 'throw' as const },
 *   (options) => ({
 *     code: 'INVALID_CHUNK_SIZE',
 *     message: `Invalid size: ${options.size}`,
 *     details: { size: options.size },
 *   })
 * );
 * ```
 */
export function createErrorHandler<TOptions extends ErrorHandlingOptions, TValue = unknown>(
  defaultOptions: TOptions,
  errorFactory: (options: TOptions) => ErrorContext
): StandardErrorHandler<TOptions, TValue> {
  return new StandardErrorHandler(defaultOptions, errorFactory);
}
