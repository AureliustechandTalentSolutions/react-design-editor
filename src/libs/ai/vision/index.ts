/**
 * Vision API Module
 * Screenshot-to-code conversion using Claude Vision API
 */

export * from './types';
export * from './prompts';
export * from './VisionClient';
export * from './ScreenshotProcessor';
export * from './UIElementDetector';
export * from './DesignConverter';

// Re-export commonly used functions
export { getVisionClient, isVisionAPIAvailable } from './VisionClient';
export { processScreenshot, createScreenshotProcessor } from './ScreenshotProcessor';
export { detectElements, createUIElementDetector } from './UIElementDetector';
export { convertToFabricObjects, createDesignConverter } from './DesignConverter';
