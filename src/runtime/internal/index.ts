/**
 * Internal utilities for utils-ts package
 * These are not part of the public API and are subject to change
 */

export {
  createErrorHandler,
  type ErrorContext,
  type ErrorStrategy,
  StandardErrorHandler,
} from './error-handler.js';

export {
  createDualApi,
  createDualApiStrict,
  type DataFirst,
  type DataLast,
  type DualAPI,
} from './curry-helper.js';

export {
  createOptionNormalizer,
  createSimpleOptionNormalizer,
  mergeErrorOptions,
  normalizeOptions,
  normalizeSimpleOption,
  validateRequired,
} from './options.js';

export {
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
  type AnyObject,
} from './object-utils.js';

export {
  createError,
  getErrorFactory,
  resetErrorFactory,
  setErrorFactory,
  UtilsErrorFactory,
  type ErrorFactory,
} from './error-factory.js';
