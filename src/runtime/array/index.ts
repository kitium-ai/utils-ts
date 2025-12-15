/**
 * Array utility functions
 * Organized into focused submodules while maintaining public API compatibility
 */

export { chunk, type ChunkOptions, type ChunkReturn } from './chunk.js';
export { countBy, groupBy, type GroupByOptions, type GroupByReturn, keyBy } from './group.js';
export {
  arraysEqual,
  drop,
  dropRight,
  head,
  initial,
  last,
  tail,
  take,
  takeRight,
  unzip,
  zip,
} from './query.js';
export {
  difference,
  intersection,
  partition,
  union,
  unique,
  uniqueBy,
  without,
} from './set-ops.js';
export { compact, flatMap, flatten, flattenDeep } from './transform.js';
export { range, sample, shuffle } from './utils.js';
