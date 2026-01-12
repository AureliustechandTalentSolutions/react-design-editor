/**
 * Type definitions for Vision API module
 */

/**
 * Supported image formats
 */
export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

/**
 * AI model options for vision processing
 */
export type VisionModel = 'claude-3-5-sonnet-20241022' | 'claude-3-opus-20240229';

/**
 * Image preprocessing options
 */
export interface PreprocessingOptions {
	maxWidth?: number;
	maxHeight?: number;
	quality?: number;
	format?: ImageFormat;
}

/**
 * Image data structure
 */
export interface ImageData {
	base64: string;
	format: ImageFormat;
	width: number;
	height: number;
	size: number;
}

/**
 * UI element types detected from screenshots
 */
export type UIElementType = 
	| 'button'
	| 'input'
	| 'textarea'
	| 'select'
	| 'checkbox'
	| 'radio'
	| 'card'
	| 'modal'
	| 'nav'
	| 'header'
	| 'footer'
	| 'sidebar'
	| 'text'
	| 'image'
	| 'icon'
	| 'divider'
	| 'container';

/**
 * Bounding box coordinates
 */
export interface BoundingBox {
	x: number;
	y: number;
	width: number;
	height: number;
}

/**
 * Detected UI element
 */
export interface DetectedElement {
	id: string;
	type: UIElementType;
	boundingBox: BoundingBox;
	confidence: number;
	text?: string;
	color?: string;
	styles?: Record<string, any>;
	children?: DetectedElement[];
}

/**
 * Screenshot analysis result
 */
export interface ScreenshotAnalysis {
	elements: DetectedElement[];
	colors: string[];
	layout: {
		type: 'flex' | 'grid' | 'absolute';
		direction?: 'row' | 'column';
		gap?: number;
	};
	typography: {
		fonts: string[];
		sizes: number[];
	};
	dimensions: {
		width: number;
		height: number;
	};
}

/**
 * Vision API request options
 */
export interface VisionRequestOptions {
	model?: VisionModel;
	maxTokens?: number;
	temperature?: number;
	extractColors?: boolean;
	extractText?: boolean;
	detectComponents?: boolean;
}

/**
 * Vision API response
 */
export interface VisionResponse {
	analysis: ScreenshotAnalysis;
	rawResponse: string;
	metadata: {
		model: string;
		tokensUsed: number;
		processingTime: number;
	};
}

/**
 * Design conversion options
 */
export interface ConversionOptions {
	framework?: 'react' | 'vue' | 'html';
	useDesignSystem?: boolean;
	fidelity?: 'exact' | 'approximate' | 'design-system';
	scaleX?: number;
	scaleY?: number;
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
	maxRequestsPerMinute: number;
	maxRequestsPerHour: number;
	retryAttempts: number;
	retryDelay: number;
}

/**
 * Error types for vision processing
 */
export enum VisionErrorType {
	INVALID_IMAGE = 'INVALID_IMAGE',
	IMAGE_TOO_LARGE = 'IMAGE_TOO_LARGE',
	UNSUPPORTED_FORMAT = 'UNSUPPORTED_FORMAT',
	API_ERROR = 'API_ERROR',
	RATE_LIMIT = 'RATE_LIMIT',
	PREPROCESSING_ERROR = 'PREPROCESSING_ERROR',
	DETECTION_ERROR = 'DETECTION_ERROR',
	CONVERSION_ERROR = 'CONVERSION_ERROR',
}

/**
 * Vision error
 */
export class VisionError extends Error {
	constructor(
		public type: VisionErrorType,
		message: string,
		public details?: any
	) {
		super(message);
		this.name = 'VisionError';
	}
}
