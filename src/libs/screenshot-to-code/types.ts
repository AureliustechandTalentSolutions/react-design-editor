/**
 * Type definitions for Screenshot-to-Code module
 */

import { GeneratedDesign, ExportFramework, StylingOption } from '../../types/aiui';

/**
 * Supported image formats for screenshot import
 */
export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp';

/**
 * Source of the screenshot
 */
export type ScreenshotSource = 'upload' | 'clipboard' | 'url';

/**
 * Design system to use for code generation
 */
export type DesignSystem = 'uswds' | 'va-gov' | 'cms' | 'tailwind' | 'shadcn' | 'none';

/**
 * Screenshot metadata
 */
export interface ScreenshotMetadata {
	filename?: string;
	size: number;
	dimensions: {
		width: number;
		height: number;
	};
	format: ImageFormat;
	source: ScreenshotSource;
	timestamp: number;
}

/**
 * Options for screenshot analysis
 */
export interface AnalysisOptions {
	designSystem?: DesignSystem;
	extractColors?: boolean;
	extractTypography?: boolean;
	detectComponents?: boolean;
	accessibility?: boolean;
}

/**
 * Detected UI element from screenshot
 */
export interface DetectedElement {
	type: string;
	bounds: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	properties: Record<string, any>;
	text?: string;
	confidence: number;
}

/**
 * Screenshot analysis result
 */
export interface AnalysisResult {
	elements: DetectedElement[];
	colorPalette: string[];
	typography: {
		fontFamilies: string[];
		fontSizes: number[];
	};
	layout: {
		type: string;
		columns?: number;
		rows?: number;
	};
	accessibility: {
		score: number;
		issues: string[];
	};
}

/**
 * Screenshot conversion options
 */
export interface ConversionOptions extends AnalysisOptions {
	framework: ExportFramework;
	styling: StylingOption;
	typescript: boolean;
	includeResponsive: boolean;
	federalCompliance?: boolean;
}

/**
 * Screenshot import request
 */
export interface ScreenshotImportRequest {
	data: string; // Base64 encoded image data
	metadata: ScreenshotMetadata;
	options: ConversionOptions;
}

/**
 * Screenshot conversion result
 */
export interface ConversionResult extends GeneratedDesign {
	analysis: AnalysisResult;
	code: {
		files: {
			path: string;
			content: string;
			language: string;
		}[];
		dependencies: Record<string, string>;
	};
}

/**
 * Batch import result
 */
export interface BatchImportResult {
	total: number;
	successful: number;
	failed: number;
	results: Array<{
		screenshot: ScreenshotMetadata;
		result?: ConversionResult;
		error?: string;
	}>;
}

/**
 * Mobbin import configuration
 */
export interface MobbinConfig {
	batchSize?: number;
	autoDetectScreens?: boolean;
	categorizeByType?: boolean;
}
