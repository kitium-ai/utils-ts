/**
 * Integration with @kitiumai/error package
 * Provides utilities to convert UtilsError to KitiumError format
 * and adapter pattern for extensible error handling
 */

import { isIntegrationsEnabled } from '../config.js';
import {
  createUtilsError,
  isUtilsError,
  type UtilsError,
  type UtilsErrorInit,
} from '../runtime/error.js';
import { getErrorFactory, setErrorFactory } from '../runtime/internal/error-factory.js';

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
  readonly context?: {
    readonly correlationId: string;
    readonly requestId: string;
    readonly [key: string]: unknown;
  };
  readonly cause?: unknown;
};

function generateCorrelationId(): string {
  return `corr_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Check if @kitiumai/error package is available
 */
export async function isKitiumErrorAvailable(): Promise<boolean> {
  if (!isIntegrationsEnabled()) {
    return false;
  }

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
    Object.assign(shape, {
      context: {
        correlationId: generateCorrelationId(),
        requestId: generateRequestId(),
        ...error.details,
      },
    });
  }
  if (error.cause !== undefined) {
    Object.assign(shape, { cause: error.cause });
  }

  return shape;
}

/**
 * Create a KitiumError from UtilsError (requires @kitiumai/error as peer dependency)
 */
export async function toKitiumError(error: UtilsError): Promise<Error> {
  if (!isIntegrationsEnabled()) {
    return error;
  }

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

  if (convertToKitium && isIntegrationsEnabled()) {
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
  if (!isIntegrationsEnabled()) {
    return error;
  }

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
 * Integration adapter interface for custom error handling
 * Allows framework-specific error creation strategies
 */
export type IntegrationAdapter = {
  /**
   * Create an error from utils context
   */
  createError(context: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    cause?: unknown;
  }): Error;

  /**
   * Check if error is managed by this adapter
   */
  isAdapterError(error: unknown): boolean;

  /**
   * Get the name of this adapter
   */
  getName(): string;
};

/**
 * Adapter for integrating with @kitiumai/error
 */
export class KitiumErrorAdapter implements IntegrationAdapter {
  async initializeFactory(): Promise<void> {
    try {
      const isAvailable = await isKitiumErrorAvailable();
      if (isAvailable) {
        // Factory will be set after initialization
        // Users should call setErrorFactory(new KitiumErrorAdapter()) manually
      }
    } catch {
      // Silently fail if @kitiumai/error is not available
    }
  }

  createError(context: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    cause?: unknown;
  }): Error {
    // Create UtilsError as the base
    // We need to cast context.code (string) to UtilsErrorCode
    const init: UtilsErrorInit = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      code: context.code as any,
      message: context.message,
    };

    if (context.details !== undefined) {
      init.details = context.details;
    }

    if (context.cause !== undefined) {
      init.cause = context.cause;
    }

    const utilsError = createUtilsError(init);
    return utilsError;
  }

  isAdapterError(error: unknown): error is UtilsError {
    return isUtilsError(error);
  }

  getName(): string {
    return 'KitiumErrorAdapter';
  }
}

/**
 * Initialize KitiumError integration
 * Call this to enable KitiumError integration for utils-ts errors
 *
 * @example
 * ```ts
 * import { initializeKitiumIntegration } from '@kitiumai/utils-ts/integrations/error';
 * await initializeKitiumIntegration();
 * ```
 */
export async function initializeKitiumIntegration(): Promise<void> {
  const adapter = new KitiumErrorAdapter();
  await adapter.initializeFactory();
  // Note: Actual factory replacement should be done by the user
  // if they have @kitiumai/error available
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

  /**
   * Get the current error factory
   */
  getErrorFactory,

  /**
   * Set custom error factory for dependency injection
   */
  setErrorFactory,
};
