import { bench, describe } from 'vitest';
import { deepMerge, deepClone, isEqual } from '../src/runtime/object/index.js';

describe('object benchmarks', () => {
  const largeObj = Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [`key${i}`, `value${i}`])
  );
  const nestedObj = {
    a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 1 } } } } } } } } },
  };

  bench('deepMerge - large objects', () => {
    deepMerge(largeObj, { newKey: 'newValue' });
  });

  bench('deepClone - nested object', () => {
    deepClone(nestedObj);
  });

  bench('isEqual - large objects', () => {
    isEqual(largeObj, { ...largeObj });
  });
});
