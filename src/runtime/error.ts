import type { ErrorStrategy } from './result.js';

/**
 * Utility-specific error codes
 */
export type UtilsErrorCode =
  | 'INVALID_CHUNK_SIZE'
  | 'GROUP_BY_KEY_MISSING'
  | 'INVALID_ARGUMENT'
  | 'OPERATION_FAILED';

/**
 * Error initialization options for utility errors
 */
export interface UtilsErrorInit {
  code: UtilsErrorCode;
  message: string;
  details?: Record<string, unknown>;
  cause?: unknown;
}

/**
 * Base error class for utils-ts package
 */
export class UtilsError extends Error {
  readonly code: UtilsErrorCode;
  readonly details: Record<string, unknown> | undefined;

  constructor(init: UtilsErrorInit) {
    super(init.message);
    this.name = 'UtilsError';
    this.code = init.code;
    this.details = init.details;
    if (init.cause) {
      this.cause = init.cause;
    }
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      ...(this.details ? { details: this.details } : {}),
      ...(this.cause ? { cause: this.cause } : {}),
    };
  }
}

/**
 * Create a utility error
 */
export const createUtilsError = (init: UtilsErrorInit): UtilsError => {
  return new UtilsError(init);
};

/**
 * Error handling options for utilities
 */
export interface ErrorHandlingOptions {
  onError?: ErrorStrategy;
}

/**
 * Check if an error is a UtilsError
 */
export function isUtilsError(error: unknown): error is UtilsError {
  return error instanceof UtilsError;
}

/**
 * Extract error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error';
}

/**
 * Extract error stack from unknown error
 */
export function getErrorStack(error: unknown): string | undefined {
  if (error instanceof Error) {
    return error.stack;
  }
  return undefined;
}
