/**
 * Integration with @kitiumai/error package
 * Provides utilities to convert UtilsError to KitiumError format
 */

import {
  createUtilsError,
  isUtilsError,
  type UtilsError,
  type UtilsErrorInit,
} from '../runtime/error.js';

// Type-only imports from @kitiumai/error (peer dependency)
type KitiumErrorShape = {
  readonly code: string;
  readonly message: string;
  readonly statusCode?: number;
  readonly severity: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  readonly kind:
    | 'business'
    | 'validation'
    | 'auth'
    | 'rate_limit'
    | 'not_found'
    | 'conflict'
    | 'dependency'
    | 'internal';
  readonly retryable: boolean;
  readonly retryDelay?: number;
  readonly maxRetries?: number;
  readonly backoff?: 'linear' | 'exponential' | 'fixed';
  readonly help?: string;
  readonly docs?: string;
  readonly source?: string;
  readonly context?: Record<string, unknown>;
  readonly cause?: unknown;
};

/**
 * Check if @kitiumai/error package is available
 */
export async function isKitiumErrorAvailable(): Promise<boolean> {
  try {
    // Try to dynamically import the package
    await import('@kitiumai/error');
    return true;
  } catch {
    return false;
  }
}

/**
 * Convert UtilsError to KitiumError shape
 */
export function toKitiumErrorShape(error: UtilsError): KitiumErrorShape {
  const shape: KitiumErrorShape = {
    code: `utils/${error.code.toLowerCase()}`,
    message: error.message,
    statusCode: 400, // Bad request for utility errors
    severity: 'error',
    kind: 'validation',
    retryable: false,
    source: '@kitiumai/utils-ts',
  };

  // Only add optional properties if they have values
  if (error.details) {
    Object.assign(shape, { context: error.details });
  }
  if (error.cause) {
    Object.assign(shape, { cause: error.cause });
  }

  return shape;
}

/**
 * Create a KitiumError from UtilsError (requires @kitiumai/error as peer dependency)
 */
export async function toKitiumError(error: UtilsError): Promise<Error> {
  try {
    // Dynamically import @kitiumai/error
    const errorModule = await import('@kitiumai/error');
    const shape = toKitiumErrorShape(error);
    return new errorModule.KitiumError(shape);
  } catch {
    // Fallback to original error if import fails
    return error;
  }
}

/**
 * Create a utility error with optional KitiumError conversion
 */
export async function createUtilsErrorWithKitium(
  init: UtilsErrorInit,
  convertToKitium = false
): Promise<Error> {
  const utilsError = createUtilsError(init);

  if (convertToKitium) {
    try {
      return await toKitiumError(utilsError);
    } catch {
      return utilsError;
    }
  }

  return utilsError;
}

/**
 * Enrich a UtilsError with KitiumError context (if available)
 */
export async function enrichUtilsError(
  error: UtilsError,
  context: Record<string, unknown>
): Promise<Error> {
  try {
    // Try to use enrichError from @kitiumai/error
    const errorModule = await import('@kitiumai/error');
    const kitiumError = await toKitiumError(error);

    // Check if the converted error is a KitiumError instance
    if (kitiumError instanceof errorModule.KitiumError) {
      return errorModule.enrichError(kitiumError, context);
    }

    return kitiumError;
  } catch {
    // Fallback to local enrichment
    return createUtilsError({
      code: error.code,
      message: error.message,
      details: { ...(error.details ?? {}), ...context },
      cause: error.cause,
    });
  }
}

/**
 * Error mapper utilities
 */
export const errorMapper = {
  /**
   * Check if error is a UtilsError
   */
  isUtilsError,

  /**
   * Convert to KitiumError shape
   */
  toKitiumErrorShape,

  /**
   * Convert to KitiumError instance
   */
  toKitiumError,

  /**
   * Check if KitiumError package is available
   */
  isKitiumErrorAvailable,
};
