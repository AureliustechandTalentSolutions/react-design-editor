/**
 * Screenshot Processor
 * Handles image preprocessing, validation, and optimization
 */

import { ImageData, ImageFormat, PreprocessingOptions, VisionError, VisionErrorType } from './types';

/**
 * Default preprocessing options
 */
const DEFAULT_OPTIONS: Required<PreprocessingOptions> = {
	maxWidth: 1920,
	maxHeight: 1080,
	quality: 0.9,
	format: 'image/jpeg',
};

/**
 * Supported image formats
 */
const SUPPORTED_FORMATS: ImageFormat[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/**
 * Max file size (5MB in bytes)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Screenshot Processor
 */
export class ScreenshotProcessor {
	private options: Required<PreprocessingOptions>;

	constructor(options: PreprocessingOptions = {}) {
		this.options = { ...DEFAULT_OPTIONS, ...options };
	}

	/**
	 * Process screenshot from various sources
	 */
	async processScreenshot(source: File | Blob | string, options?: PreprocessingOptions): Promise<ImageData> {
		const opts = { ...this.options, ...options };

		// Handle different source types
		if (typeof source === 'string') {
			// URL or base64 string
			if (source.startsWith('http://') || source.startsWith('https://')) {
				return this.processFromURL(source, opts);
			} else if (source.startsWith('data:')) {
				return this.processFromDataURL(source, opts);
			} else {
				return this.processFromBase64(source, opts);
			}
		} else {
			// File or Blob
			return this.processFromFile(source, opts);
		}
	}

	/**
	 * Process from File or Blob
	 */
	private async processFromFile(file: File | Blob, options: Required<PreprocessingOptions>): Promise<ImageData> {
		// Validate file size
		if (file.size > MAX_FILE_SIZE) {
			throw new VisionError(
				VisionErrorType.IMAGE_TOO_LARGE,
				`Image size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
			);
		}

		// Validate format
		const format = file.type as ImageFormat;
		if (!SUPPORTED_FORMATS.includes(format)) {
			throw new VisionError(
				VisionErrorType.UNSUPPORTED_FORMAT,
				`Format ${file.type} is not supported. Use: ${SUPPORTED_FORMATS.join(', ')}`,
			);
		}

		try {
			// Create image element
			const imageUrl = URL.createObjectURL(file);
			const img = await this.loadImage(imageUrl);
			URL.revokeObjectURL(imageUrl);

			// Process and resize
			return this.processImage(img, options);
		} catch (error) {
			throw new VisionError(VisionErrorType.PREPROCESSING_ERROR, 'Failed to process image file', error);
		}
	}

	/**
	 * Process from URL
	 */
	private async processFromURL(url: string, options: Required<PreprocessingOptions>): Promise<ImageData> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Failed to fetch image: ${response.statusText}`);
			}

			const blob = await response.blob();
			return this.processFromFile(blob, options);
		} catch (error) {
			throw new VisionError(VisionErrorType.PREPROCESSING_ERROR, 'Failed to load image from URL', error);
		}
	}

	/**
	 * Process from data URL
	 */
	private async processFromDataURL(dataUrl: string, options: Required<PreprocessingOptions>): Promise<ImageData> {
		try {
			const [metadata, base64] = dataUrl.split(',');
			const formatMatch = metadata.match(/data:(image\/\w+);base64/);

			if (!formatMatch) {
				throw new Error('Invalid data URL format');
			}

			const format = formatMatch[1] as ImageFormat;
			if (!SUPPORTED_FORMATS.includes(format)) {
				throw new VisionError(VisionErrorType.UNSUPPORTED_FORMAT, `Format ${format} is not supported`);
			}

			// Decode base64 to check size
			const binary = atob(base64);
			if (binary.length > MAX_FILE_SIZE) {
				throw new VisionError(VisionErrorType.IMAGE_TOO_LARGE, 'Image size exceeds maximum');
			}

			const img = await this.loadImage(dataUrl);
			return this.processImage(img, options);
		} catch (error) {
			if (error instanceof VisionError) throw error;

			throw new VisionError(VisionErrorType.PREPROCESSING_ERROR, 'Failed to process data URL', error);
		}
	}

	/**
	 * Process from base64 string
	 */
	private async processFromBase64(base64: string, options: Required<PreprocessingOptions>): Promise<ImageData> {
		// Assume JPEG if no format specified
		const dataUrl = `data:image/jpeg;base64,${base64}`;
		return this.processFromDataURL(dataUrl, options);
	}

	/**
	 * Load image element
	 */
	private loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'anonymous';

			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error('Failed to load image'));

			img.src = src;
		});
	}

	/**
	 * Process and optimize image
	 */
	private processImage(img: HTMLImageElement, options: Required<PreprocessingOptions>): ImageData {
		const { maxWidth, maxHeight, quality, format } = options;

		// Calculate new dimensions
		let { width, height } = img;

		if (width > maxWidth || height > maxHeight) {
			const aspectRatio = width / height;

			if (width > height) {
				width = maxWidth;
				height = Math.round(width / aspectRatio);
			} else {
				height = maxHeight;
				width = Math.round(height * aspectRatio);
			}
		}

		// Create canvas and resize
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new VisionError(VisionErrorType.PREPROCESSING_ERROR, 'Failed to get canvas context');
		}

		// Use high-quality scaling
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = 'high';
		ctx.drawImage(img, 0, 0, width, height);

		// Convert to base64
		const mimeType = format;
		const dataUrl = canvas.toDataURL(mimeType, quality);
		const base64 = dataUrl.split(',')[1];

		// Calculate size
		const size = Math.ceil((base64.length * 3) / 4);

		return {
			base64,
			format: mimeType,
			width,
			height,
			size,
		};
	}

	/**
	 * Validate image dimensions
	 */
	validateDimensions(width: number, height: number): boolean {
		return width > 0 && height > 0 && width <= 4096 && height <= 4096;
	}

	/**
	 * Auto crop to content
	 */
	async autoCrop(imageData: ImageData, padding: number = 20): Promise<ImageData> {
		try {
			const img = await this.loadImage(`data:${imageData.format};base64,${imageData.base64}`);

			const canvas = document.createElement('canvas');
			canvas.width = imageData.width;
			canvas.height = imageData.height;

			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('Cannot get context');

			ctx.drawImage(img, 0, 0);

			// Get image data
			const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const { data } = imgData;

			// Find bounds
			let top = 0;
			let bottom = canvas.height;
			let left = 0;
			let right = canvas.width;
			let found = false;

			// Find top
			for (let y = 0; y < canvas.height; y++) {
				for (let x = 0; x < canvas.width; x++) {
					const i = (y * canvas.width + x) * 4;
					if (data[i + 3] > 0) {
						// Alpha channel
						top = y;
						found = true;
						break;
					}
				}
				if (found) break;
			}

			// Find bottom
			found = false;
			for (let y = canvas.height - 1; y >= 0; y--) {
				for (let x = 0; x < canvas.width; x++) {
					const i = (y * canvas.width + x) * 4;
					if (data[i + 3] > 0) {
						bottom = y + 1;
						found = true;
						break;
					}
				}
				if (found) break;
			}

			// Find left
			found = false;
			for (let x = 0; x < canvas.width; x++) {
				for (let y = 0; y < canvas.height; y++) {
					const i = (y * canvas.width + x) * 4;
					if (data[i + 3] > 0) {
						left = x;
						found = true;
						break;
					}
				}
				if (found) break;
			}

			// Find right
			found = false;
			for (let x = canvas.width - 1; x >= 0; x--) {
				for (let y = 0; y < canvas.height; y++) {
					const i = (y * canvas.width + x) * 4;
					if (data[i + 3] > 0) {
						right = x + 1;
						found = true;
						break;
					}
				}
				if (found) break;
			}

			// Add padding
			top = Math.max(0, top - padding);
			bottom = Math.min(canvas.height, bottom + padding);
			left = Math.max(0, left - padding);
			right = Math.min(canvas.width, right + padding);

			const cropWidth = right - left;
			const cropHeight = bottom - top;

			// Create cropped canvas
			const croppedCanvas = document.createElement('canvas');
			croppedCanvas.width = cropWidth;
			croppedCanvas.height = cropHeight;

			const croppedCtx = croppedCanvas.getContext('2d');
			if (!croppedCtx) throw new Error('Cannot get context');

			croppedCtx.drawImage(canvas, left, top, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

			const dataUrl = croppedCanvas.toDataURL(imageData.format, this.options.quality);
			const base64 = dataUrl.split(',')[1];

			return {
				base64,
				format: imageData.format,
				width: cropWidth,
				height: cropHeight,
				size: Math.ceil((base64.length * 3) / 4),
			};
		} catch (error) {
			// Return original if cropping fails
			return imageData;
		}
	}

	/**
	 * Batch process multiple screenshots
	 */
	async batchProcess(sources: (File | Blob | string)[], options?: PreprocessingOptions): Promise<ImageData[]> {
		const results: ImageData[] = [];
		const errors: Error[] = [];

		for (const source of sources) {
			try {
				const result = await this.processScreenshot(source, options);
				results.push(result);
			} catch (error) {
				errors.push(error as Error);
			}
		}

		if (results.length === 0 && errors.length > 0) {
			throw new VisionError(VisionErrorType.PREPROCESSING_ERROR, 'All images failed to process', errors);
		}

		return results;
	}
}

/**
 * Create default processor instance
 */
export const createScreenshotProcessor = (options?: PreprocessingOptions): ScreenshotProcessor => {
	return new ScreenshotProcessor(options);
};

/**
 * Quick process helper
 */
export const processScreenshot = async (
	source: File | Blob | string,
	options?: PreprocessingOptions,
): Promise<ImageData> => {
	const processor = new ScreenshotProcessor(options);
	return processor.processScreenshot(source, options);
};
