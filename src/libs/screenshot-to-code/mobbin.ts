/**
 * Mobbin Screenshot Import Utilities
 * Handles file upload, clipboard paste, and batch import
 */

import { convertScreenshotToCode } from './engine';
import {
	ScreenshotMetadata,
	ImageFormat,
	BatchImportResult,
	ConversionResult,
	ScreenshotImportRequest,
	ConversionOptions,
	MobbinConfig,
} from './types';

/**
 * Maximum file size in bytes (10MB)
 */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Supported MIME types
 */
const SUPPORTED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

/**
 * Validate image file
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
	// Check file size
	if (file.size > MAX_FILE_SIZE) {
		return {
			valid: false,
			error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
		};
	}

	// Check MIME type
	if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
		return {
			valid: false,
			error: `Unsupported file type. Supported types: PNG, JPG, JPEG, WebP`,
		};
	}

	return { valid: true };
};

/**
 * Read file as base64
 */
export const readFileAsBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				// Remove data URL prefix (e.g., "data:image/png;base64,")
				const base64 = reader.result.split(',')[1];
				resolve(base64);
			} else {
				reject(new Error('Failed to read file as base64'));
			}
		};
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
};

/**
 * Get image dimensions
 */
export const getImageDimensions = (base64: string, mimeType: string): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve({ width: img.width, height: img.height });
		};
		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = `data:${mimeType};base64,${base64}`;
	});
};

/**
 * Extract format from file type
 */
const extractFormat = (mimeType: string): ImageFormat => {
	const format = mimeType.split('/')[1];
	if (format === 'jpg') return 'jpeg';
	return format as ImageFormat;
};

/**
 * Import screenshot from file upload
 */
export const importFromFile = async (file: File, options: ConversionOptions): Promise<ConversionResult> => {
	// Validate file
	const validation = validateImageFile(file);
	if (!validation.valid) {
		throw new Error(validation.error);
	}

	// Read file as base64
	const base64 = await readFileAsBase64(file);

	// Get image dimensions
	const dimensions = await getImageDimensions(base64, file.type);

	// Create metadata
	const metadata: ScreenshotMetadata = {
		filename: file.name,
		size: file.size,
		dimensions,
		format: extractFormat(file.type),
		source: 'upload',
		timestamp: Date.now(),
	};

	// Create import request
	const request: ScreenshotImportRequest = {
		data: base64,
		metadata,
		options,
	};

	// Convert screenshot to code
	return convertScreenshotToCode(request);
};

/**
 * Import screenshot from clipboard
 */
export const importFromClipboard = async (
	clipboardData: DataTransfer,
	options: ConversionOptions,
): Promise<ConversionResult> => {
	// Get image from clipboard
	const { items } = clipboardData;
	let imageItem: DataTransferItem | null = null;

	for (let i = 0; i < items.length; i += 1) {
		if (items[i].type.indexOf('image') !== -1) {
			imageItem = items[i];
			break;
		}
	}

	if (!imageItem) {
		throw new Error('No image found in clipboard');
	}

	const file = imageItem.getAsFile();
	if (!file) {
		throw new Error('Failed to get image from clipboard');
	}

	// Read file as base64
	const base64 = await readFileAsBase64(file);

	// Get image dimensions
	const dimensions = await getImageDimensions(base64, file.type);

	// Create metadata
	const metadata: ScreenshotMetadata = {
		filename: `clipboard-${Date.now()}.png`,
		size: file.size,
		dimensions,
		format: extractFormat(file.type),
		source: 'clipboard',
		timestamp: Date.now(),
	};

	// Create import request
	const request: ScreenshotImportRequest = {
		data: base64,
		metadata,
		options,
	};

	// Convert screenshot to code
	return convertScreenshotToCode(request);
};

/**
 * Batch import multiple screenshots
 */
export const batchImport = async (
	files: File[],
	options: ConversionOptions,
	config: MobbinConfig = {},
): Promise<BatchImportResult> => {
	const { batchSize = 5 } = config;
	const results: BatchImportResult['results'] = [];

	// Process files in batches
	for (let i = 0; i < files.length; i += batchSize) {
		const batch = files.slice(i, i + batchSize);

		// Process batch in parallel
		// eslint-disable-next-line no-await-in-loop
		const batchResults = await Promise.allSettled(batch.map(file => importFromFile(file, options)));

		// Collect results
		batchResults.forEach((result, index) => {
			const file = batch[index];
			const metadata: ScreenshotMetadata = {
				filename: file.name,
				size: file.size,
				dimensions: { width: 0, height: 0 }, // Will be filled by importFromFile
				format: extractFormat(file.type),
				source: 'upload',
				timestamp: Date.now(),
			};

			if (result.status === 'fulfilled') {
				results.push({
					screenshot: metadata,
					result: result.value,
				});
			} else {
				results.push({
					screenshot: metadata,
					error: result.reason?.message || 'Unknown error',
				});
			}
		});
	}

	const successfulCount = results.filter(r => r.result).length;
	const failedCount = results.filter(r => r.error).length;

	return {
		total: files.length,
		successful: successfulCount,
		failed: failedCount,
		results,
	};
};

/**
 * Categorize screenshots by type
 */
export const categorizeScreenshots = (
	results: BatchImportResult['results'],
): Record<string, BatchImportResult['results']> => {
	const categories: Record<string, BatchImportResult['results']> = {
		forms: [],
		navigation: [],
		cards: [],
		ecommerce: [],
		dashboard: [],
		other: [],
	};

	results.forEach(result => {
		if (!result.result) {
			categories.other.push(result);
			return;
		}

		const { components } = result.result.metadata;

		// Categorize based on detected components
		if (components.includes('form') || components.includes('input')) {
			categories.forms.push(result);
		} else if (components.includes('navigation') || components.includes('menu')) {
			categories.navigation.push(result);
		} else if (components.includes('card')) {
			categories.cards.push(result);
		} else if (components.includes('product') || components.includes('cart')) {
			categories.ecommerce.push(result);
		} else if (components.includes('chart') || components.includes('table')) {
			categories.dashboard.push(result);
		} else {
			categories.other.push(result);
		}
	});

	return categories;
};

/**
 * Handle paste event from clipboard
 */
export const handlePasteEvent = async (
	event: ClipboardEvent,
	options: ConversionOptions,
): Promise<ConversionResult> => {
	if (!event.clipboardData) {
		throw new Error('No clipboard data available');
	}

	return importFromClipboard(event.clipboardData, options);
};
