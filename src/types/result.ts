/**
 * Result type to mirror runtime helpers.
 */
export type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

export type AsyncResult<T> = Promise<Result<T>>;
