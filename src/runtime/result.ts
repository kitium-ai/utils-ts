/**
 * Simple Result helper to provide standardized return semantics.
 */
export type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

export type ErrorStrategy = 'throw' | 'return';

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });

export const err = (error: Error): Result<never> => ({ ok: false, error });

export const isOk = <T>(result: Result<T>): result is { ok: true; value: T } => result.ok;

export const isErr = <T>(result: Result<T>): result is { ok: false; error: Error } => !result.ok;
