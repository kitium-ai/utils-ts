import { createRequire } from 'module';
import type { ErrorStrategy } from './result.js';

const require = createRequire(import.meta.url);

export type UtilsErrorCode = 'INVALID_CHUNK_SIZE' | 'GROUP_BY_KEY_MISSING';

export interface UtilsErrorInit {
  code: UtilsErrorCode;
  message: string;
  details?: Record<string, unknown>;
  cause?: unknown;
}

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
}

type ErrorFactory = (init: UtilsErrorInit) => Error;

let externalFactory: ErrorFactory | null = null;

try {
  // Dynamically wire the optional @kitiumai/error package if present.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { createError } = require('@kitiumai/error') as any;
  if (createError) {
    externalFactory = (init) =>
      createError({
        name: 'UtilsError',
        code: init.code,
        message: init.message,
        cause: init.cause,
        meta: init.details,
      });
  }
} catch {
  // Ignore if the optional dependency is not installed.
}

export const setErrorFactory = (factory: ErrorFactory): void => {
  externalFactory = factory;
};

export const createUtilsError = (init: UtilsErrorInit): Error => {
  if (externalFactory) {
    return externalFactory(init);
  }
  return new UtilsError(init);
};

export interface ErrorHandlingOptions {
  onError?: ErrorStrategy;
}
