/* eslint-disable import/no-default-export */
import { library } from '@kitiumai/lint';

export default [
  ...library.flat(),
  {
    name: 'utils-ts/eslint9-rule-compat',
    rules: {
      // ESLint 9 schema compatibility for lint preset
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../../*', '../../../*'],
              message: 'Prefer module aliases over deep relative imports for maintainability.',
            },
          ],
        },
      ],
      // Disabled temporarily due to eslint-plugin-import relying on CJS-only minimatch.
      'import/order': 'off',
      // Disable object injection sink warnings - false positives in utility functions
      'security/detect-object-injection': 'off',
    },
  },
];
