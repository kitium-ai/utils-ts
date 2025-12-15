/**
 * Internal utilities for utils-ts package
 * These are not part of the public API and are subject to change
 */

export {
  createDualApi,
  createDualApiStrict,
  type DataFirst,
  type DataLast,
  type DualAPI,
} from './curry-helper.js';
export {
  createError,
  type ErrorFactory,
  getErrorFactory,
  resetErrorFactory,
  setErrorFactory,
  UtilsErrorFactory,
} from './error-factory.js';
export {
  createErrorHandler,
  type ErrorContext,
  type ErrorStrategy,
  StandardErrorHandler,
} from './error-handler.js';
export {
  type AnyObject,
  excludeKeys,
  getAllProperties,
  getNestedProperty,
  getProperty,
  getPropertyDescriptor,
  hasProperties,
  hasProperty,
  includeKeys,
  isEmpty,
  isEnumerable,
  isPlainObject,
  mergeObjects,
  sameStructure,
  shallowClone,
} from './object-utils.js';
export {
  createOptionNormalizer,
  createSimpleOptionNormalizer,
  mergeErrorOptions,
  normalizeOptions,
  normalizeSimpleOption,
  validateRequired,
} from './options.js';
