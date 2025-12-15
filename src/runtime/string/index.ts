/**
 * String utility functions
 * Organized into focused submodules while maintaining public API compatibility
 */

export {
  camelCase,
  capitalize,
  kebabCase,
  pascalCase,
  snakeCase,
  titleCase,
} from './case.js';

export { padEnd, padStart, pad, removePrefix, removeSuffix, reverse, truncate } from './transform.js';

export { countOccurrences, isAlphanumeric, isEmail, isEmptyString, isUrl } from './query.js';

export { escapeHtml, unescapeHtml } from './escape.js';

export { randomString } from './utils.js';
