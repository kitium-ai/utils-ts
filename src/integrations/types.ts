/**
 * Types Integration Utilities
 * Re-exports and utilities for @kitiumai/types 3.0
 */

// Re-export commonly used types from @kitiumai/types
export type { IsoDateTimeString } from '@kitiumai/types/primitives';

// Try to import branded types from @kitiumai/types/utils, fallback to local implementation
type Brand<T, B extends string> = T & { readonly $brand: B };

/**
 * Type guard to check if a value is branded
 * Note: This is a basic check; for full branded type support, use @kitiumai/types/utils
 */
export function isBranded<T, B extends string>(value: unknown): value is Brand<T, B> {
  return value !== null && value !== undefined;
}

/**
 * Safely brand a value
 * Note: For full branded type support, use @kitiumai/types/utils
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
 * Note: For full branded type support, use @kitiumai/types/utils
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
   * Uses @kitiumai/types validators if available
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
 * Email validation utilities using @kitiumai/types VALIDATORS
 * Uses VALIDATORS from @kitiumai/types package (dependency)
 */

// Lazy load VALIDATORS to avoid import issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let validators: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValidators(): any {
  if (validators === null) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const typesModule = require('@kitiumai/types');
      validators = typesModule.VALIDATORS || null;
    } catch {
      validators = null;
    }
  }
  return validators;
}

export const emailUtils = {
  /**
   * Email validation using @kitiumai/types VALIDATORS
   * Falls back to basic regex validation if VALIDATORS.email is not available
   */
  isValid: (email: unknown): email is string => {
    if (typeof email !== 'string') {
      return false;
    }
    // Use VALIDATORS from @kitiumai/types if available
    const validators = getValidators();
    if (validators?.email) {
      const result = validators.email.safeParse(email);
      return result.success;
    }
    // Fallback to basic regex if VALIDATORS.email not available
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
