/**
 * DesignConverter Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { DesignConverter, convertToFabricObjects } from '../DesignConverter';
import type { DetectedElement, ScreenshotAnalysis } from '../types';

describe('DesignConverter', () => {
	let converter: DesignConverter;

	beforeEach(() => {
		converter = new DesignConverter();
	});

	describe('Constructor', () => {
		it('should create with default options', () => {
			const converter = new DesignConverter();
			expect(converter).toBeDefined();
		});

		it('should create with custom options', () => {
			const converter = new DesignConverter({
				framework: 'vue',
				useDesignSystem: false,
				fidelity: 'exact',
				scaleX: 0.5,
				scaleY: 0.5,
			});
			expect(converter).toBeDefined();
		});
	});

	describe('convertToFabricObjects', () => {
		it('should convert button elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'btn1',
					type: 'button',
					boundingBox: { x: 10, y: 10, width: 150, height: 40 },
					confidence: 1.0,
					text: 'Click me',
					color: '#3b82f6',
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			
			expect(Array.isArray(objects)).toBe(true);
			expect(objects.length).toBeGreaterThan(0);
		});

		it('should convert input elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'input1',
					type: 'input',
					boundingBox: { x: 10, y: 10, width: 300, height: 40 },
					confidence: 1.0,
					text: 'Enter text...',
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			expect(objects.length).toBeGreaterThan(0);
		});

		it('should convert text elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'text1',
					type: 'text',
					boundingBox: { x: 10, y: 10, width: 200, height: 20 },
					confidence: 1.0,
					text: 'Hello World',
					color: '#1f2937',
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			expect(objects.length).toBeGreaterThan(0);
			expect(objects[0].type).toBe('text');
		});

		it('should convert container elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'container1',
					type: 'container',
					boundingBox: { x: 0, y: 0, width: 500, height: 500 },
					confidence: 1.0,
					color: '#ffffff',
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			expect(objects.length).toBeGreaterThan(0);
		});

		it('should convert card elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'card1',
					type: 'card',
					boundingBox: { x: 10, y: 10, width: 300, height: 400 },
					confidence: 1.0,
					color: '#ffffff',
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			expect(objects.length).toBeGreaterThan(0);
		});

		it('should handle nested elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'parent',
					type: 'container',
					boundingBox: { x: 0, y: 0, width: 500, height: 500 },
					confidence: 1.0,
					children: [
						{
							id: 'child',
							type: 'button',
							boundingBox: { x: 10, y: 10, width: 150, height: 40 },
							confidence: 1.0,
							text: 'Click',
						},
					],
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			expect(objects.length).toBeGreaterThan(0);
		});

		it('should apply scale transformations', () => {
			const converter = new DesignConverter({
				scaleX: 0.5,
				scaleY: 0.5,
			});

			const elements: DetectedElement[] = [
				{
					id: 'btn1',
					type: 'button',
					boundingBox: { x: 100, y: 100, width: 200, height: 50 },
					confidence: 1.0,
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			const obj = objects[0];
			
			// Check if scaling is applied
			expect(obj.left).toBe(50);
			expect(obj.top).toBe(50);
			expect(obj.width).toBe(100);
			expect(obj.height).toBe(25);
		});
	});

	describe('inferStyles', () => {
		it('should infer button styles', () => {
			const element: DetectedElement = {
				id: 'btn1',
				type: 'button',
				boundingBox: { x: 0, y: 0, width: 150, height: 40 },
				confidence: 1.0,
			};

			const styles = converter.inferStyles(element);
			
			expect(styles).toHaveProperty('width');
			expect(styles).toHaveProperty('height');
			expect(styles.cursor).toBe('pointer');
		});

		it('should infer input styles', () => {
			const element: DetectedElement = {
				id: 'input1',
				type: 'input',
				boundingBox: { x: 0, y: 0, width: 300, height: 40 },
				confidence: 1.0,
			};

			const styles = converter.inferStyles(element);
			expect(styles).toHaveProperty('border');
			expect(styles).toHaveProperty('padding');
		});

		it('should infer card styles', () => {
			const element: DetectedElement = {
				id: 'card1',
				type: 'card',
				boundingBox: { x: 0, y: 0, width: 300, height: 400 },
				confidence: 1.0,
			};

			const styles = converter.inferStyles(element);
			expect(styles).toHaveProperty('boxShadow');
		});
	});

	describe('buildLayout', () => {
		it('should build layout structure', () => {
			const elements: DetectedElement[] = [
				{
					id: '1',
					type: 'button',
					boundingBox: { x: 0, y: 0, width: 100, height: 40 },
					confidence: 1.0,
				},
				{
					id: '2',
					type: 'text',
					boundingBox: { x: 0, y: 50, width: 200, height: 20 },
					confidence: 1.0,
				},
			];

			const layout = converter.buildLayout(elements);
			
			expect(layout).toHaveProperty('type');
			expect(layout).toHaveProperty('direction');
			expect(layout).toHaveProperty('gap');
			expect(layout).toHaveProperty('elements');
			expect(Array.isArray(layout.elements)).toBe(true);
		});

		it('should use analysis layout if provided', () => {
			const elements: DetectedElement[] = [
				{
					id: '1',
					type: 'button',
					boundingBox: { x: 0, y: 0, width: 100, height: 40 },
					confidence: 1.0,
				},
			];

			const analysis: ScreenshotAnalysis = {
				elements: [],
				colors: [],
				layout: {
					type: 'grid',
					direction: 'row',
					gap: 20,
				},
				typography: {
					fonts: [],
					sizes: [],
				},
				dimensions: {
					width: 1920,
					height: 1080,
				},
			};

			const layout = converter.buildLayout(elements, analysis);
			expect(layout.type).toBe('grid');
			expect(layout.direction).toBe('row');
			expect(layout.gap).toBe(20);
		});
	});

	describe('assignZIndices', () => {
		it('should assign z-indices to elements', () => {
			const elements: DetectedElement[] = [
				{
					id: '1',
					type: 'button',
					boundingBox: { x: 0, y: 0, width: 100, height: 40 },
					confidence: 1.0,
				},
				{
					id: '2',
					type: 'text',
					boundingBox: { x: 0, y: 50, width: 200, height: 20 },
					confidence: 1.0,
				},
			];

			const assigned = converter.assignZIndices(elements);
			
			assigned.forEach(element => {
				expect(element.styles).toHaveProperty('zIndex');
				expect(typeof element.styles!.zIndex).toBe('number');
			});
		});

		it('should handle nested elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'parent',
					type: 'container',
					boundingBox: { x: 0, y: 0, width: 500, height: 500 },
					confidence: 1.0,
					children: [
						{
							id: 'child',
							type: 'button',
							boundingBox: { x: 10, y: 10, width: 100, height: 40 },
							confidence: 1.0,
						},
					],
				},
			];

			const assigned = converter.assignZIndices(elements);
			expect(assigned[0].styles).toHaveProperty('zIndex');
			expect(assigned[0].children![0].styles).toHaveProperty('zIndex');
		});
	});

	describe('generateDesign', () => {
		it('should generate complete design object', () => {
			const elements: DetectedElement[] = [
				{
					id: 'btn1',
					type: 'button',
					boundingBox: { x: 10, y: 10, width: 150, height: 40 },
					confidence: 1.0,
					text: 'Click me',
				},
			];

			const design = converter.generateDesign(elements);
			
			expect(design).toHaveProperty('design');
			expect(design).toHaveProperty('layout');
			expect(design).toHaveProperty('styles');
			expect(design).toHaveProperty('metadata');
			expect(design.design).toHaveProperty('objects');
			expect(design.design).toHaveProperty('background');
		});

		it('should include metadata', () => {
			const elements: DetectedElement[] = [
				{
					id: 'btn1',
					type: 'button',
					boundingBox: { x: 10, y: 10, width: 150, height: 40 },
					confidence: 1.0,
				},
			];

			const design = converter.generateDesign(elements);
			
			expect(design.metadata.source).toBe('screenshot-to-code');
			expect(design.metadata).toHaveProperty('timestamp');
			expect(design.metadata).toHaveProperty('elementsCount');
		});

		it('should use analysis colors', () => {
			const elements: DetectedElement[] = [
				{
					id: 'btn1',
					type: 'button',
					boundingBox: { x: 10, y: 10, width: 150, height: 40 },
					confidence: 1.0,
				},
			];

			const analysis: ScreenshotAnalysis = {
				elements: [],
				colors: ['#ff0000', '#00ff00', '#0000ff'],
				layout: { type: 'flex' },
				typography: { fonts: [], sizes: [] },
				dimensions: { width: 1920, height: 1080 },
			};

			const design = converter.generateDesign(elements, analysis);
			expect(design.design.background).toBe('#0000ff');
		});
	});

	describe('Color Selection', () => {
		it('should use element color when available', () => {
			const converter = new DesignConverter();
			const elements: DetectedElement[] = [
				{
					id: 'btn1',
					type: 'button',
					boundingBox: { x: 10, y: 10, width: 150, height: 40 },
					confidence: 1.0,
					color: '#ff0000',
				},
			];

			const objects = converter.convertToFabricObjects(elements);
			// The button's background should use the element color
			expect(objects[0]).toBeDefined();
		});

		it('should use design system when enabled', () => {
			const converter = new DesignConverter({ useDesignSystem: true });
			expect(converter).toBeDefined();
		});
	});
});

describe('convertToFabricObjects helper', () => {
	it('should create converter and convert', () => {
		const elements: DetectedElement[] = [
			{
				id: 'btn1',
				type: 'button',
				boundingBox: { x: 10, y: 10, width: 150, height: 40 },
				confidence: 1.0,
			},
		];

		const objects = convertToFabricObjects(elements);
		expect(Array.isArray(objects)).toBe(true);
	});

	it('should accept custom options', () => {
		const elements: DetectedElement[] = [
			{
				id: 'btn1',
				type: 'button',
				boundingBox: { x: 10, y: 10, width: 150, height: 40 },
				confidence: 1.0,
			},
		];

		const objects = convertToFabricObjects(elements, undefined, {
			scaleX: 0.5,
			scaleY: 0.5,
		});

		expect(objects[0].left).toBe(5);
		expect(objects[0].top).toBe(5);
	});
});
