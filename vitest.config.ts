/**
 * Vitest Configuration for @kitiumai/utils-ts
 * Using latest @kitiumai/vitest-helpers 2.0 APIs
 */
import { defineConfig } from 'vitest/config';
import { createKitiumVitestConfig } from '@kitiumai/vitest-helpers/config';

export default defineConfig(
  createKitiumVitestConfig({
    preset: 'library',
    projectName: '@kitiumai/utils-ts',
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.test-d.ts',
        '**/*.bench.ts',
        '**/index.ts', // Re-export files
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
    overrides: {
      test: {
        // Include test files
        include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
        // Benchmark configuration
        benchmark: {
          include: ['benchmarks/**/*.bench.ts'],
        },
      },
    },
  })
);
