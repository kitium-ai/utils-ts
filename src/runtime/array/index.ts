/**
 * Array utility functions
 * Organized into focused submodules while maintaining public API compatibility
 */

export {
  chunk,
  type ChunkOptions,
  type ChunkReturn,
} from './chunk.js';

export {
  countBy,
  groupBy,
  keyBy,
  type GroupByOptions,
  type GroupByReturn,
} from './group.js';

export {
  difference,
  intersection,
  partition,
  unique,
  uniqueBy,
  union,
  without,
} from './set-ops.js';

export {
  compact,
  flatten,
  flattenDeep,
  flatMap,
} from './transform.js';

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
  range,
  sample,
  shuffle,
} from './utils.js';
