/**
 * Global configuration for @kitiumai/utils-ts
 */

export type UtilsConfig = {
  /** Whether to enable integrations with other KitiumAI packages */
  enableIntegrations?: boolean;
  /** Whether to use standalone mode (no external dependencies) */
  standalone?: boolean;
};

let globalConfig: UtilsConfig = {
  enableIntegrations: true,
  standalone: false,
};

/**
 * Set global configuration
 */
export function setUtilsConfig(config: UtilsConfig): void {
  globalConfig = { ...globalConfig, ...config };
}

/**
 * Get current global configuration
 */
export function getUtilsConfig(): UtilsConfig {
  return { ...globalConfig };
}

/**
 * Check if integrations are enabled
 */
export function isIntegrationsEnabled(): boolean {
  return globalConfig.enableIntegrations !== false && globalConfig.standalone !== true;
}
