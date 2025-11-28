declare module '@kitiumai/error' {
  export interface CreateErrorOptions {
    name?: string;
    code?: string;
    message: string;
    cause?: unknown;
    meta?: Record<string, unknown>;
  }

  export function createError(options: CreateErrorOptions): Error;
}
