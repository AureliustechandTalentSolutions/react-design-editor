/**
 * Feature flags for enabling/disabling features in the AI UI Generator
 */
export const featureFlags = {
	enableImageToUI: false,
	enableVoiceCommands: false,
	enableCollaboration: false,
	enableAdvancedExport: true,
	enableTemplateLibrary: true,
	enableA11yChecker: true,
	enableDesignSystemTokens: true,
	enableHistoryManager: true,
	enableKeyboardShortcuts: true,
};

export type FeatureFlagKey = keyof typeof featureFlags;

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: FeatureFlagKey): boolean {
	return featureFlags[feature] === true;
}

/**
 * Enable a feature flag
 */
export function enableFeature(feature: FeatureFlagKey): void {
	featureFlags[feature] = true;
}

/**
 * Disable a feature flag
 */
export function disableFeature(feature: FeatureFlagKey): void {
	featureFlags[feature] = false;
}

/**
 * Toggle a feature flag
 */
export function toggleFeature(feature: FeatureFlagKey): boolean {
	featureFlags[feature] = !featureFlags[feature];
	return featureFlags[feature];
}

/**
 * Get all feature flags
 */
export function getAllFeatureFlags(): typeof featureFlags {
	return { ...featureFlags };
}

/**
 * Set multiple feature flags at once
 */
export function setFeatureFlags(flags: Partial<typeof featureFlags>): void {
	Object.keys(flags).forEach(key => {
		const flagKey = key as FeatureFlagKey;
		if (flagKey in featureFlags) {
			featureFlags[flagKey] = flags[flagKey]!;
		}
	});
}

/**
 * Reset all feature flags to default values
 */
export function resetFeatureFlags(): void {
	featureFlags.enableImageToUI = false;
	featureFlags.enableVoiceCommands = false;
	featureFlags.enableCollaboration = false;
	featureFlags.enableAdvancedExport = true;
	featureFlags.enableTemplateLibrary = true;
	featureFlags.enableA11yChecker = true;
	featureFlags.enableDesignSystemTokens = true;
	featureFlags.enableHistoryManager = true;
	featureFlags.enableKeyboardShortcuts = true;
}
