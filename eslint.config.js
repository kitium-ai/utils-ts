/**
 * ESLint configuration for @kitiumai/utils-ts
 * Using the latest @kitiumai/lint 2.0 and @kitiumai/config 2.0 APIs
 */
import baseConfig from '@kitiumai/config/eslint.config.base.js';
import { createKitiumConfig } from '@kitiumai/lint';

export default createKitiumConfig({
  baseConfig: baseConfig,
  additionalRules: {
    // Utils package specific rules
    '@typescript-eslint/no-explicit-any': 'error',
    complexity: ['warn', 15],
  },
  overrides: [
    // Test files
    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/*.bench.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    // Type definition files
    {
      files: ['src/types/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Type utilities may use any
      },
    },
    // Integration files
    {
      files: ['src/integrations/**/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off', // Integrations might re-export
        'no-restricted-imports': 'off', // Integrations need to import from runtime
      },
    },
  ],
});
