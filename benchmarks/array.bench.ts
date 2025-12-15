import { bench, describe } from 'vitest';
import { chunk, groupBy, unique, flattenDeep } from '../src/runtime/array/index.js';

describe('array benchmarks', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const groupedData = Array.from({ length: 1000 }, (_, i) => ({
    type: `type${i % 10}`,
    value: i,
  }));

  bench('chunk - 10000 elements', () => {
    chunk(largeArray, 100);
  });

  bench('groupBy - 1000 elements', () => {
    groupBy(groupedData, 'type');
  });

  bench('unique - 10000 elements', () => {
    unique([...largeArray, ...largeArray]);
  });

  bench('flattenDeep - nested arrays', () => {
    const nested = Array.from({ length: 100 }, () => [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    flattenDeep(nested);
  });
});
