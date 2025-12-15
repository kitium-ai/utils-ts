/**
 * Object utility functions
 * Organized into focused submodules while maintaining public API compatibility
 */

export { deepClone, deepMerge, defaultsDeep, isEqual } from './deep.js';

export { invert, mapKeys, mapValues } from './transform.js';

export { get, has, omit, pick, set } from './query.js';

export {
  defaults,
  entries,
  fromPairs,
  isPlainObject,
  keys,
  size,
  toPairs,
  values,
} from './utils.js';
