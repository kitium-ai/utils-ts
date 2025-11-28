/**
 * Types Integration Utilities
 * Re-exports and utilities for @kitiumai/types 2.0
 */

// Re-export commonly used types from @kitiumai/types
export type { IsoDateTimeString } from '@kitiumai/types/primitives';

// Local Brand type definition (mirrors @kitiumai/types/branded)
type Brand<T, B extends string> = T & { readonly $brand: B };

/**
 * Type guard to check if a value is branded
 */
export function isBranded<T, B extends string>(value: unknown): value is Brand<T, B> {
  return value !== null && value !== undefined;
}

/**
 * Safely brand a value
 */
export function brandValue<T, B extends string>(value: T, _brand: B): Brand<T, B> {
  return value as Brand<T, B>;
}

/**
 * Remove brand from a value
 */
export function unbrand<T, B extends string>(value: Brand<T, B>): T {
  return value as T;
}

/**
 * Type-safe ID utilities using branded types
 */
export const idUtils = {
  /**
   * Create a branded ID from a string
   */
  create: <B extends string>(id: string, _brand: B): Brand<string, B> => {
    return id as Brand<string, B>;
  },

  /**
   * Check if an ID is valid (non-empty string)
   */
  isValid: (id: unknown): id is string => {
    return typeof id === 'string' && id.length > 0;
  },

  /**
   * Compare two branded IDs
   */
  equals: <B extends string>(id1: Brand<string, B>, id2: Brand<string, B>): boolean => {
    return (id1 as string) === (id2 as string);
  },
};

/**
 * Email validation utilities using @kitiumai/types
 */
export const emailUtils = {
  /**
   * Basic email validation regex
   */
  isValid: (email: unknown): email is string => {
    if (typeof email !== 'string') {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Normalize email (lowercase, trim)
   */
  normalize: (email: string): string => {
    return email.toLowerCase().trim();
  },
};
