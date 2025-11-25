/**
 * Advanced utility types for TypeScript
 * Inspired by type-fest and industry best practices
 */

/**
 * Make all properties in T optional, recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Make all properties in T readonly, recursively
 */
export type DeepReadonly<T> = T extends object
  ? {
      readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
  : T;

/**
 * Make all properties in T required, recursively
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

/**
 * Remove readonly modifier from all properties
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Merge two types, with B overriding A
 */
export type Merge<A, B> = Omit<A, keyof B> & B;

/**
 * Deep merge two types
 */
export type MergeDeep<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? K extends keyof A
      ? A[K] extends object
        ? B[K] extends object
          ? MergeDeep<A[K], B[K]>
          : B[K]
        : B[K]
      : B[K]
    : K extends keyof A
      ? A[K]
      : never;
};

/**
 * Simplify complex types for better IDE hints
 */
export type Simplify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Get union of all values in an object type
 */
export type ValueOf<T> = T[keyof T];

/**
 * Make specific keys optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific keys required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Make type nullable (T | null | undefined)
 */
export type Nullable<T> = T | null | undefined;

/**
 * Remove null and undefined from all properties
 */
export type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

/**
 * Extract keys of T where value type extends U
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Make the type writable (removes readonly)
 */
export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Make the type deeply writable
 */
export type WritableDeep<T> = T extends object
  ? {
      -readonly [P in keyof T]: WritableDeep<T[P]>;
    }
  : T;

/**
 * Strict version of Omit that errors if keys don't exist
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Strict version of Pick that errors if keys don't exist
 */
export type StrictPick<T, K extends keyof T> = Pick<T, K>;

/**
 * Extract optional keys from type
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Extract required keys from type
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Literal union that preserves autocomplete
 */
export type LiteralUnion<T extends U, U = string> = T | (U & { _?: never });

/**
 * Get the keys that are different between two types
 */
export type DiffKeys<A, B> = Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>;

/**
 * Extract properties that exist in both types
 */
export type Intersection<A, B> = Pick<A, Extract<keyof A, keyof B>>;
