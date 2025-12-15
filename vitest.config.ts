import baseConfig from '@kitiumai/config/vitest.config.base.js';
import { defineConfig } from 'vitest/config';

// Try to use vitest-helpers presets if available
let vitestHelpersPreset: Record<string, unknown> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const vitestHelpers = require('@kitiumai/vitest-helpers');
  if (vitestHelpers.setupPresets?.libraryPreset) {
    vitestHelpersPreset = vitestHelpers.setupPresets.libraryPreset;
  }
} catch {
  // Fallback if vitest-helpers is not available
  vitestHelpersPreset = null;
}

export default defineConfig({
  ...baseConfig,
  // Use library preset from @kitiumai/vitest-helpers for library packages if available
  ...(vitestHelpersPreset || {}),
  // Add your custom config here
});
