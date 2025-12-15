import { bench, describe } from 'vitest';
import { camelCase, kebabCase, snakeCase, capitalize } from '../src/runtime/string/index.js';

describe('string benchmarks', () => {
  const strings = Array.from({ length: 1000 }, (_, i) => `some_long_string_with_underscores_${i}`);

  bench('camelCase - 1000 strings', () => {
    strings.forEach((str) => camelCase(str));
  });

  bench('kebabCase - 1000 strings', () => {
    strings.forEach((str) => kebabCase(str));
  });

  bench('snakeCase - 1000 strings', () => {
    strings.forEach((str) => snakeCase(str));
  });

  bench('capitalize - 1000 strings', () => {
    strings.forEach((str) => capitalize(str));
  });
});
