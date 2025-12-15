import { bench, describe } from 'vitest';
import { formatDate, parseDate, addDays, differenceInDays } from '../src/runtime/date.js';

describe('date benchmarks', () => {
  const dates = Array.from({ length: 1000 }, () => new Date());

  bench('formatDate - 1000 dates', () => {
    dates.forEach((date) => formatDate(date, 'yyyy-MM-dd'));
  });

  bench('parseDate - 1000 strings', () => {
    Array.from(
      { length: 1000 },
      (_, i) => `2025-01-${String((i % 28) + 1).padStart(2, '0')}`
    ).forEach((str) => parseDate(str, 'yyyy-MM-dd'));
  });

  bench('addDays - 1000 operations', () => {
    dates.forEach((date) => addDays(date, 30));
  });

  bench('differenceInDays - 1000 operations', () => {
    dates.forEach((date) => differenceInDays(date, new Date()));
  });
});
