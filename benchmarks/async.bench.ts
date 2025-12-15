import { bench, describe } from 'vitest';
import { sleep, parallel, series } from '../src/runtime/async.js';

describe('async benchmarks', () => {
  const tasks = Array.from({ length: 100 }, (_, i) => async () => {
    await sleep(1);
    return i * 2;
  });

  bench('parallel - 100 tasks', async () => {
    await parallel(tasks, { concurrency: 10 });
  });

  bench('series - 100 tasks', async () => {
    await series(tasks);
  });

  bench('sleep - 1ms', async () => {
    await sleep(1);
  });
});
