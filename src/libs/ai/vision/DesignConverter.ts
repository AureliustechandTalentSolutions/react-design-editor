/**
 * Design Converter
 * Converts detected UI elements to Fabric.js objects
 */

import { nanoid } from 'nanoid';
import {
	DetectedElement,
	UIElementType,
	ConversionOptions,
	VisionError,
	VisionErrorType,
	ScreenshotAnalysis,
} from './types';
import { tokens } from '../../design-system/tokens';

/**
 * Default conversion options
 */
const DEFAULT_OPTIONS: Required<ConversionOptions> = {
	framework: 'react',
	useDesignSystem: true,
	fidelity: 'approximate',
	scaleX: 1,
	scaleY: 1,
};

/**
 * Design Converter
 */
export class DesignConverter {
	private options: Required<ConversionOptions>;

	constructor(options: ConversionOptions = {}) {
		this.options = { ...DEFAULT_OPTIONS, ...options };
	}

	/**
	 * Convert detected elements to Fabric.js objects
	 */
	convertToFabricObjects(
		elements: DetectedElement[],
		analysis?: ScreenshotAnalysis
	): any[] {
		try {
			const fabricObjects: any[] = [];
			let zIndex = 0;

			for (const element of elements) {
				const obj = this.convertElement(element, zIndex++, analysis);
				if (obj) {
					fabricObjects.push(obj);
				}
			}

			return fabricObjects;
		} catch (error) {
			throw new VisionError(
				VisionErrorType.CONVERSION_ERROR,
				'Failed to convert elements to Fabric.js objects',
				error
			);
		}
	}

	/**
	 * Convert single element
	 */
	private convertElement(
		element: DetectedElement,
		zIndex: number,
		analysis?: ScreenshotAnalysis
	): any {
		const { boundingBox, type } = element;
		const baseProps = {
			id: element.id,
			left: boundingBox.x * this.options.scaleX,
			top: boundingBox.y * this.options.scaleY,
			width: boundingBox.width * this.options.scaleX,
			height: boundingBox.height * this.options.scaleY,
			originX: 'left',
			originY: 'top',
		};

		// Convert based on element type
		switch (type) {
			case 'button':
				return this.convertButton(element, baseProps, analysis);
			case 'input':
			case 'textarea':
				return this.convertInput(element, baseProps, analysis);
			case 'text':
				return this.convertText(element, baseProps, analysis);
			case 'card':
			case 'container':
				return this.convertContainer(element, baseProps, analysis);
			case 'image':
				return this.convertImage(element, baseProps, analysis);
			case 'divider':
				return this.convertDivider(element, baseProps, analysis);
			default:
				return this.convertGeneric(element, baseProps, analysis);
		}
	}

	/**
	 * Convert button element
	 */
	private convertButton(
		element: DetectedElement,
		baseProps: any,
		analysis?: ScreenshotAnalysis
	): any {
		const color = this.getColor(element, 'primary', analysis);
		const borderRadius = this.getBorderRadius(element, 'md');

		// Create button as group
		const background = {
			type: 'rect',
			...baseProps,
			fill: color,
			rx: borderRadius,
			ry: borderRadius,
			shadow: tokens.shadows.md,
		};

		if (element.text) {
			const text = {
				type: 'text',
				left: baseProps.left + baseProps.width / 2,
				top: baseProps.top + baseProps.height / 2,
				text: element.text,
				fontSize: this.getFontSize(element, 'base'),
				fontFamily: 'Inter, sans-serif',
				fontWeight: 600,
				fill: '#ffffff',
				textAlign: 'center',
				originX: 'center',
				originY: 'center',
			};

			return {
				type: 'group',
				...baseProps,
				objects: [background, text],
			};
		}

		return background;
	}

	/**
	 * Convert input element
	 */
	private convertInput(
		element: DetectedElement,
		baseProps: any,
		analysis?: ScreenshotAnalysis
	): any {
		const borderRadius = this.getBorderRadius(element, 'sm');

		const background = {
			type: 'rect',
			...baseProps,
			fill: '#ffffff',
			stroke: '#d1d5db',
			strokeWidth: 1,
			rx: borderRadius,
			ry: borderRadius,
		};

		if (element.text) {
			const text = {
				type: 'text',
				left: baseProps.left + 12,
				top: baseProps.top + baseProps.height / 2,
				text: element.text,
				fontSize: this.getFontSize(element, 'base'),
				fontFamily: 'Inter, sans-serif',
				fill: '#6b7280',
				originY: 'center',
			};

			return {
				type: 'group',
				...baseProps,
				objects: [background, text],
			};
		}

		return background;
	}

	/**
	 * Convert text element
	 */
	private convertText(
		element: DetectedElement,
		baseProps: any,
		analysis?: ScreenshotAnalysis
	): any {
		const fontSize = this.getFontSize(element, 'base');
		const color = this.getColor(element, 'text', analysis);

		return {
			type: 'text',
			left: baseProps.left,
			top: baseProps.top,
			text: element.text || 'Text',
			fontSize,
			fontFamily: this.getFontFamily(analysis),
			fill: color,
			width: baseProps.width,
			...this.getTextStyles(element),
		};
	}

	/**
	 * Convert container/card element
	 */
	private convertContainer(
		element: DetectedElement,
		baseProps: any,
		analysis?: ScreenshotAnalysis
	): any {
		const color = this.getColor(element, 'background', analysis);
		const borderRadius = this.getBorderRadius(element, 'lg');

		const background = {
			type: 'rect',
			...baseProps,
			fill: color,
			stroke: '#e5e7eb',
			strokeWidth: 1,
			rx: borderRadius,
			ry: borderRadius,
			shadow: element.type === 'card' ? tokens.shadows.lg : undefined,
		};

		// Convert children
		const children: any[] = [];
		if (element.children) {
			let childZIndex = 0;
			for (const child of element.children) {
				const childObj = this.convertElement(child, childZIndex++, analysis);
				if (childObj) {
					children.push(childObj);
				}
			}
		}

		if (children.length > 0) {
			return {
				type: 'group',
				...baseProps,
				objects: [background, ...children],
			};
		}

		return background;
	}

	/**
	 * Convert image element
	 */
	private convertImage(
		element: DetectedElement,
		baseProps: any,
		analysis?: ScreenshotAnalysis
	): any {
		const borderRadius = this.getBorderRadius(element, 'md');

		return {
			type: 'rect',
			...baseProps,
			fill: '#f3f4f6',
			stroke: '#e5e7eb',
			strokeWidth: 1,
			rx: borderRadius,
			ry: borderRadius,
		};
	}

	/**
	 * Convert divider element
	 */
	private convertDivider(
		element: DetectedElement,
		baseProps: any,
		analysis?: ScreenshotAnalysis
	): any {
		return {
			type: 'line',
			left: baseProps.left,
			top: baseProps.top + baseProps.height / 2,
			x1: 0,
			y1: 0,
			x2: baseProps.width,
			y2: 0,
			stroke: '#e5e7eb',
			strokeWidth: 1,
		};
	}

	/**
	 * Convert generic element
	 */
	private convertGeneric(
		element: DetectedElement,
		baseProps: any,
		analysis?: ScreenshotAnalysis
	): any {
		const color = this.getColor(element, 'background', analysis);

		return {
			type: 'rect',
			...baseProps,
			fill: color,
			stroke: '#e5e7eb',
			strokeWidth: 1,
		};
	}

	/**
	 * Get color for element
	 */
	private getColor(
		element: DetectedElement,
		role: 'primary' | 'secondary' | 'text' | 'background',
		analysis?: ScreenshotAnalysis
	): string {
		// Use element color if available
		if (element.color) {
			return element.color;
		}

		// Use analysis colors if available
		if (analysis?.colors && analysis.colors.length > 0) {
			const colorMap = {
				primary: 0,
				secondary: 1,
				text: analysis.colors.length - 1,
				background: Math.min(2, analysis.colors.length - 1),
			};
			return analysis.colors[colorMap[role]] || analysis.colors[0];
		}

		// Use design system tokens
		if (this.options.useDesignSystem) {
			const colorTokens = tokens.colors.modern;
			const roleMap = {
				primary: colorTokens.primary,
				secondary: colorTokens.secondary,
				text: colorTokens.text,
				background: colorTokens.background,
			};
			return roleMap[role];
		}

		// Fallback colors
		const fallbacks = {
			primary: '#3b82f6',
			secondary: '#6366f1',
			text: '#1f2937',
			background: '#ffffff',
		};
		return fallbacks[role];
	}

	/**
	 * Get font size
	 */
	private getFontSize(element: DetectedElement, defaultSize: keyof typeof tokens.fontSize): number {
		if (element.styles?.fontSize) {
			const parsed = parseInt(element.styles.fontSize, 10);
			if (!isNaN(parsed)) return parsed;
		}

		return tokens.fontSize[defaultSize];
	}

	/**
	 * Get font family
	 */
	private getFontFamily(analysis?: ScreenshotAnalysis): string {
		if (analysis?.typography?.fonts && analysis.typography.fonts.length > 0) {
			return analysis.typography.fonts.join(', ');
		}
		return 'Inter, sans-serif';
	}

	/**
	 * Get border radius
	 */
	private getBorderRadius(
		element: DetectedElement,
		defaultRadius: keyof typeof tokens.borderRadius
	): number {
		if (element.styles?.borderRadius) {
			const parsed = parseInt(element.styles.borderRadius, 10);
			if (!isNaN(parsed)) return parsed;
		}

		return tokens.borderRadius[defaultRadius];
	}

	/**
	 * Get text styles
	 */
	private getTextStyles(element: DetectedElement): any {
		const styles: any = {};

		if (element.styles?.fontWeight) {
			styles.fontWeight = element.styles.fontWeight;
		}

		if (element.styles?.textAlign) {
			styles.textAlign = element.styles.textAlign;
		}

		if (element.styles?.lineHeight) {
			styles.lineHeight = element.styles.lineHeight;
		}

		return styles;
	}

	/**
	 * Infer styles from element
	 */
	inferStyles(element: DetectedElement, analysis?: ScreenshotAnalysis): Record<string, any> {
		const styles: Record<string, any> = {};

		// Infer from bounding box
		styles.width = element.boundingBox.width;
		styles.height = element.boundingBox.height;

		// Infer from type
		switch (element.type) {
			case 'button':
				styles.cursor = 'pointer';
				styles.padding = '12px 24px';
				break;
			case 'input':
			case 'textarea':
				styles.border = '1px solid #d1d5db';
				styles.padding = '8px 12px';
				break;
			case 'card':
				styles.boxShadow = tokens.shadows.lg;
				break;
		}

		// Merge with existing styles
		return { ...styles, ...element.styles };
	}

	/**
	 * Build layout structure
	 */
	buildLayout(elements: DetectedElement[], analysis?: ScreenshotAnalysis): any {
		const layout = {
			type: analysis?.layout?.type || 'flex',
			direction: analysis?.layout?.direction || 'column',
			gap: analysis?.layout?.gap || tokens.spacing.md,
			elements: elements.map(el => ({
				id: el.id,
				type: el.type,
				position: el.boundingBox,
			})),
		};

		return layout;
	}

	/**
	 * Assign z-index based on hierarchy
	 */
	assignZIndices(elements: DetectedElement[]): DetectedElement[] {
		let zIndex = 0;

		const assign = (element: DetectedElement): DetectedElement => {
			const updated = { ...element };
			
			if (updated.children) {
				updated.children = updated.children.map(assign);
				zIndex += updated.children.length;
			}

			if (!updated.styles) {
				updated.styles = {};
			}
			updated.styles.zIndex = zIndex++;

			return updated;
		};

		return elements.map(assign);
	}

	/**
	 * Generate complete design object
	 */
	generateDesign(
		elements: DetectedElement[],
		analysis?: ScreenshotAnalysis
	): any {
		const fabricObjects = this.convertToFabricObjects(elements, analysis);
		const layout = this.buildLayout(elements, analysis);

		return {
			design: {
				objects: fabricObjects,
				background: analysis?.colors?.[analysis.colors.length - 1] || '#f9fafb',
			},
			layout,
			styles: this.generateStyleSheet(elements, analysis),
			metadata: {
				source: 'screenshot-to-code',
				timestamp: Date.now(),
				elementsCount: fabricObjects.length,
			},
		};
	}

	/**
	 * Generate CSS stylesheet
	 */
	private generateStyleSheet(
		elements: DetectedElement[],
		analysis?: ScreenshotAnalysis
	): Record<string, any> {
		const styles: Record<string, any> = {};

		elements.forEach(element => {
			styles[element.id] = this.inferStyles(element, analysis);
		});

		return styles;
	}
}

/**
 * Create converter instance
 */
export const createDesignConverter = (options?: ConversionOptions): DesignConverter => {
	return new DesignConverter(options);
};

/**
 * Quick convert helper
 */
export const convertToFabricObjects = (
	elements: DetectedElement[],
	analysis?: ScreenshotAnalysis,
	options?: ConversionOptions
): any[] => {
	const converter = new DesignConverter(options);
	return converter.convertToFabricObjects(elements, analysis);
};
