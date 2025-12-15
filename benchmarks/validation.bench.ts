import { bench, describe } from 'vitest';
import { isString, isNumber, isArray, isObject, isEmail } from '../src/runtime/validation.js';

describe('validation benchmarks', () => {
  const testValues = Array.from({ length: 1000 }, (_, i) => {
    switch (i % 5) {
      case 0:
        return 'string';
      case 1:
        return 42;
      case 2:
        return [1, 2, 3];
      case 3:
        return { key: 'value' };
      case 4:
        return `test${i}@example.com`;
    }
  });

  bench('isString - 1000 values', () => {
    testValues.forEach((val) => isString(val));
  });

  bench('isNumber - 1000 values', () => {
    testValues.forEach((val) => isNumber(val));
  });

  bench('isArray - 1000 values', () => {
    testValues.forEach((val) => isArray(val));
  });

  bench('isObject - 1000 values', () => {
    testValues.forEach((val) => isObject(val));
  });

  bench('isEmail - 1000 values', () => {
    testValues.forEach((val) => isEmail(val));
  });
});
