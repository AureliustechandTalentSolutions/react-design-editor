/**
 * UI Element Detector
 * Detects and classifies UI components from screenshots
 */

import { nanoid } from 'nanoid';

import { VisionClient, getVisionClient } from './VisionClient';
import {
	DetectedElement,
	UIElementType,
	BoundingBox,
	ScreenshotAnalysis,
	ImageData,
	VisionError,
	VisionErrorType,
} from './types';

/**
 * Element detection confidence threshold
 */
const CONFIDENCE_THRESHOLD = 0.5;

/**
 * UI Element Detector
 */
export class UIElementDetector {
	private visionClient: VisionClient;

	constructor(visionClient?: VisionClient) {
		this.visionClient = visionClient || getVisionClient();
	}

	/**
	 * Detect UI elements from screenshot
	 */
	async detectElements(imageData: ImageData): Promise<DetectedElement[]> {
		if (!this.visionClient.isAvailable()) {
			// Return mock elements for demo mode
			return this.getMockElements(imageData);
		}

		try {
			const response = await this.visionClient.analyzeScreenshot(imageData, {
				detectComponents: true,
				extractColors: true,
				extractText: true,
			});

			return this.processDetectedElements(response.analysis);
		} catch (error) {
			if (error instanceof VisionError) {
				throw error;
			}

			throw new VisionError(VisionErrorType.DETECTION_ERROR, 'Failed to detect UI elements', error);
		}
	}

	/**
	 * Process and normalize detected elements
	 */
	private processDetectedElements(analysis: ScreenshotAnalysis): DetectedElement[] {
		const elements = analysis.elements || [];

		return elements
			.filter(element => element.confidence >= CONFIDENCE_THRESHOLD)
			.map(element => this.normalizeElement(element))
			.filter(element => this.validateElement(element));
	}

	/**
	 * Normalize element data
	 */
	private normalizeElement(element: any): DetectedElement {
		return {
			id: element.id || nanoid(),
			type: this.normalizeElementType(element.type),
			boundingBox: this.normalizeBoundingBox(element.boundingBox),
			confidence: element.confidence || 0.8,
			text: element.text,
			color: element.color,
			styles: element.styles || {},
			children: element.children?.map((child: any) => this.normalizeElement(child)) || [],
		};
	}

	/**
	 * Normalize element type
	 */
	private normalizeElementType(type: string): UIElementType {
		const normalized = type.toLowerCase().trim();

		const typeMap: Record<string, UIElementType> = {
			btn: 'button',
			'text-input': 'input',
			'text-field': 'input',
			dropdown: 'select',
			'check-box': 'checkbox',
			'radio-button': 'radio',
			panel: 'card',
			dialog: 'modal',
			navigation: 'nav',
			heading: 'text',
			paragraph: 'text',
			label: 'text',
			img: 'image',
			separator: 'divider',
			div: 'container',
			section: 'container',
		};

		return typeMap[normalized] || (normalized as UIElementType) || 'container';
	}

	/**
	 * Normalize bounding box
	 */
	private normalizeBoundingBox(box: any): BoundingBox {
		return {
			x: Math.max(0, Number(box.x) || 0),
			y: Math.max(0, Number(box.y) || 0),
			width: Math.max(0, Number(box.width) || 0),
			height: Math.max(0, Number(box.height) || 0),
		};
	}

	/**
	 * Validate element
	 */
	private validateElement(element: DetectedElement): boolean {
		const { boundingBox } = element;

		// Check if bounding box is valid
		if (boundingBox.width <= 0 || boundingBox.height <= 0 || boundingBox.x < 0 || boundingBox.y < 0) {
			return false;
		}

		// Check if element is too small (likely noise)
		if (boundingBox.width < 5 || boundingBox.height < 5) {
			return false;
		}

		return true;
	}

	/**
	 * Classify element type
	 */
	classifyElement(element: DetectedElement): UIElementType {
		// Use existing type if confidence is high
		if (element.confidence > 0.8) {
			return element.type;
		}

		// Heuristic classification based on properties
		const { boundingBox, text, styles } = element;
		const aspectRatio = boundingBox.width / boundingBox.height;

		// Button detection
		if (text && text.length < 30 && aspectRatio > 1.5 && aspectRatio < 5 && boundingBox.height < 60) {
			return 'button';
		}

		// Input field detection
		if (aspectRatio > 3 && boundingBox.height < 50 && boundingBox.height > 25 && styles?.border) {
			return 'input';
		}

		// Card detection
		if (
			aspectRatio > 0.5 &&
			aspectRatio < 2 &&
			boundingBox.width > 200 &&
			boundingBox.height > 150 &&
			(styles?.border || styles?.shadow)
		) {
			return 'card';
		}

		// Text detection
		if (text && !styles?.interactive) {
			return 'text';
		}

		return element.type;
	}

	/**
	 * Extract text using OCR
	 */
	async extractText(imageData: ImageData, element: DetectedElement): Promise<string> {
		// In a real implementation, this would use OCR
		// For now, return existing text or placeholder
		return element.text || '';
	}

	/**
	 * Extract colors from element region
	 */
	async extractColors(imageData: ImageData, boundingBox: BoundingBox): Promise<string[]> {
		// In a real implementation, this would analyze the image region
		// For now, return default colors
		return ['#3b82f6', '#ffffff'];
	}

	/**
	 * Build component hierarchy
	 */
	buildHierarchy(elements: DetectedElement[]): DetectedElement[] {
		// Sort by area (larger elements first)
		const sorted = [...elements].sort((a, b) => {
			const areaA = a.boundingBox.width * a.boundingBox.height;
			const areaB = b.boundingBox.width * b.boundingBox.height;
			return areaB - areaA;
		});

		const roots: DetectedElement[] = [];
		const processed = new Set<string>();

		for (const element of sorted) {
			if (processed.has(element.id)) continue;

			// Find children (elements contained within this element)
			const children = sorted.filter(child => {
				if (child.id === element.id || processed.has(child.id)) {
					return false;
				}
				return this.isContained(child.boundingBox, element.boundingBox);
			});

			// Mark children as processed
			children.forEach(child => processed.add(child.id));

			// Create element with children
			const elementWithChildren: DetectedElement = {
				...element,
				children: children.length > 0 ? children : undefined,
			};

			roots.push(elementWithChildren);
			processed.add(element.id);
		}

		return roots;
	}

	/**
	 * Check if box A is contained within box B
	 */
	private isContained(a: BoundingBox, b: BoundingBox): boolean {
		return a.x >= b.x && a.y >= b.y && a.x + a.width <= b.x + b.width && a.y + a.height <= b.y + b.height;
	}

	/**
	 * Get mock elements for demo mode
	 */
	private getMockElements(imageData: ImageData): DetectedElement[] {
		const centerX = imageData.width / 2;
		const centerY = imageData.height / 2;

		return [
			{
				id: nanoid(),
				type: 'container',
				boundingBox: {
					x: centerX - 350,
					y: centerY - 250,
					width: 700,
					height: 500,
				},
				confidence: 1.0,
				color: '#ffffff',
				styles: {
					borderRadius: '12px',
					border: '1px solid #e5e7eb',
					shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
				},
				children: [
					{
						id: nanoid(),
						type: 'text',
						boundingBox: {
							x: centerX - 300,
							y: centerY - 200,
							width: 600,
							height: 40,
						},
						confidence: 1.0,
						text: 'Demo Mode',
						color: '#1f2937',
						styles: {
							fontSize: '32px',
							fontWeight: 'bold',
						},
					},
					{
						id: nanoid(),
						type: 'text',
						boundingBox: {
							x: centerX - 300,
							y: centerY - 140,
							width: 600,
							height: 24,
						},
						confidence: 1.0,
						text: 'Connect an API key to analyze real screenshots',
						color: '#6b7280',
						styles: {
							fontSize: '16px',
						},
					},
					{
						id: nanoid(),
						type: 'button',
						boundingBox: {
							x: centerX - 75,
							y: centerY - 20,
							width: 150,
							height: 45,
						},
						confidence: 1.0,
						text: 'Get Started',
						color: '#3b82f6',
						styles: {
							borderRadius: '8px',
							padding: '12px 24px',
						},
					},
				],
			},
		];
	}

	/**
	 * Filter elements by type
	 */
	filterByType(elements: DetectedElement[], type: UIElementType): DetectedElement[] {
		const results: DetectedElement[] = [];

		const traverse = (element: DetectedElement) => {
			if (element.type === type) {
				results.push(element);
			}
			element.children?.forEach(traverse);
		};

		elements.forEach(traverse);
		return results;
	}

	/**
	 * Get element statistics
	 */
	getStatistics(elements: DetectedElement[]): Record<UIElementType, number> {
		const stats: Record<string, number> = {};

		const traverse = (element: DetectedElement) => {
			stats[element.type] = (stats[element.type] || 0) + 1;
			element.children?.forEach(traverse);
		};

		elements.forEach(traverse);
		return stats as Record<UIElementType, number>;
	}
}

/**
 * Create detector instance
 */
export const createUIElementDetector = (visionClient?: VisionClient): UIElementDetector => {
	return new UIElementDetector(visionClient);
};

/**
 * Quick detect helper
 */
export const detectElements = async (imageData: ImageData): Promise<DetectedElement[]> => {
	const detector = new UIElementDetector();
	return detector.detectElements(imageData);
};
