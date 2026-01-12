/**
 * UIElementDetector Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { UIElementDetector, detectElements } from '../UIElementDetector';
import { VisionClient } from '../VisionClient';
import type { ImageData, DetectedElement, UIElementType } from '../types';

describe('UIElementDetector', () => {
	let detector: UIElementDetector;
	const mockImageData: ImageData = {
		base64: 'mock-base64',
		format: 'image/png',
		width: 1920,
		height: 1080,
		size: 1024,
	};

	beforeEach(() => {
		detector = new UIElementDetector();
	});

	describe('Constructor', () => {
		it('should create with default vision client', () => {
			const detector = new UIElementDetector();
			expect(detector).toBeDefined();
		});

		it('should create with custom vision client', () => {
			const customClient = new VisionClient('test-key');
			const detector = new UIElementDetector(customClient);
			expect(detector).toBeDefined();
		});
	});

	describe('detectElements', () => {
		it('should return mock elements in demo mode', async () => {
			const elements = await detector.detectElements(mockImageData);
			
			expect(Array.isArray(elements)).toBe(true);
			expect(elements.length).toBeGreaterThan(0);
		});

		it('should return elements with required properties', async () => {
			const elements = await detector.detectElements(mockImageData);
			
			elements.forEach(element => {
				expect(element).toHaveProperty('id');
				expect(element).toHaveProperty('type');
				expect(element).toHaveProperty('boundingBox');
				expect(element).toHaveProperty('confidence');
				expect(element.boundingBox).toHaveProperty('x');
				expect(element.boundingBox).toHaveProperty('y');
				expect(element.boundingBox).toHaveProperty('width');
				expect(element.boundingBox).toHaveProperty('height');
			});
		});

		it('should return valid element types', async () => {
			const elements = await detector.detectElements(mockImageData);
			
			const validTypes: UIElementType[] = [
				'button', 'input', 'textarea', 'select', 'checkbox', 'radio',
				'card', 'modal', 'nav', 'header', 'footer', 'sidebar',
				'text', 'image', 'icon', 'divider', 'container'
			];
			
			elements.forEach(element => {
				expect(validTypes).toContain(element.type);
			});
		});
	});

	describe('classifyElement', () => {
		it('should classify button elements', () => {
			const element: DetectedElement = {
				id: '1',
				type: 'container',
				boundingBox: { x: 0, y: 0, width: 150, height: 40 },
				confidence: 0.7,
				text: 'Click me',
			};

			const type = detector.classifyElement(element);
			expect(type).toBe('button');
		});

		it('should classify input elements', () => {
			const element: DetectedElement = {
				id: '2',
				type: 'container',
				boundingBox: { x: 0, y: 0, width: 300, height: 40 },
				confidence: 0.7,
				styles: { border: '1px solid' },
			};

			const type = detector.classifyElement(element);
			expect(type).toBe('input');
		});

		it('should classify card elements', () => {
			const element: DetectedElement = {
				id: '3',
				type: 'container',
				boundingBox: { x: 0, y: 0, width: 300, height: 400 },
				confidence: 0.7,
				styles: { border: '1px solid', shadow: '0 2px 4px' },
			};

			const type = detector.classifyElement(element);
			expect(type).toBe('card');
		});

		it('should keep high confidence classifications', () => {
			const element: DetectedElement = {
				id: '4',
				type: 'button',
				boundingBox: { x: 0, y: 0, width: 100, height: 100 },
				confidence: 0.95,
			};

			const type = detector.classifyElement(element);
			expect(type).toBe('button');
		});
	});

	describe('buildHierarchy', () => {
		it('should build component hierarchy', () => {
			const elements: DetectedElement[] = [
				{
					id: 'parent',
					type: 'container',
					boundingBox: { x: 0, y: 0, width: 500, height: 500 },
					confidence: 1.0,
				},
				{
					id: 'child1',
					type: 'button',
					boundingBox: { x: 10, y: 10, width: 100, height: 40 },
					confidence: 1.0,
				},
				{
					id: 'child2',
					type: 'text',
					boundingBox: { x: 10, y: 60, width: 200, height: 20 },
					confidence: 1.0,
				},
			];

			const hierarchy = detector.buildHierarchy(elements);
			
			expect(hierarchy.length).toBeGreaterThan(0);
			expect(hierarchy[0].children).toBeDefined();
			expect(hierarchy[0].children!.length).toBe(2);
		});

		it('should handle flat structures', () => {
			const elements: DetectedElement[] = [
				{
					id: '1',
					type: 'button',
					boundingBox: { x: 0, y: 0, width: 100, height: 40 },
					confidence: 1.0,
				},
				{
					id: '2',
					type: 'button',
					boundingBox: { x: 120, y: 0, width: 100, height: 40 },
					confidence: 1.0,
				},
			];

			const hierarchy = detector.buildHierarchy(elements);
			
			expect(hierarchy.length).toBe(2);
			hierarchy.forEach(element => {
				expect(element.children).toBeUndefined();
			});
		});
	});

	describe('filterByType', () => {
		it('should filter elements by type', async () => {
			const elements = await detector.detectElements(mockImageData);
			const buttons = detector.filterByType(elements, 'button');
			
			expect(Array.isArray(buttons)).toBe(true);
			buttons.forEach(element => {
				expect(element.type).toBe('button');
			});
		});

		it('should return empty array when no matches', async () => {
			const elements = await detector.detectElements(mockImageData);
			const modals = detector.filterByType(elements, 'modal');
			
			expect(Array.isArray(modals)).toBe(true);
		});

		it('should search nested children', () => {
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

			const buttons = detector.filterByType(elements, 'button');
			expect(buttons.length).toBe(1);
			expect(buttons[0].id).toBe('child');
		});
	});

	describe('getStatistics', () => {
		it('should count elements by type', async () => {
			const elements = await detector.detectElements(mockImageData);
			const stats = detector.getStatistics(elements);
			
			expect(typeof stats).toBe('object');
			Object.values(stats).forEach(count => {
				expect(typeof count).toBe('number');
				expect(count).toBeGreaterThanOrEqual(0);
			});
		});

		it('should include nested elements', () => {
			const elements: DetectedElement[] = [
				{
					id: 'parent',
					type: 'container',
					boundingBox: { x: 0, y: 0, width: 500, height: 500 },
					confidence: 1.0,
					children: [
						{
							id: 'child1',
							type: 'button',
							boundingBox: { x: 10, y: 10, width: 100, height: 40 },
							confidence: 1.0,
						},
						{
							id: 'child2',
							type: 'button',
							boundingBox: { x: 120, y: 10, width: 100, height: 40 },
							confidence: 1.0,
						},
					],
				},
			];

			const stats = detector.getStatistics(elements);
			expect(stats.container).toBe(1);
			expect(stats.button).toBe(2);
		});
	});

	describe('extractText', () => {
		it('should extract text from element', async () => {
			const element: DetectedElement = {
				id: '1',
				type: 'text',
				boundingBox: { x: 0, y: 0, width: 200, height: 20 },
				confidence: 1.0,
				text: 'Hello World',
			};

			const text = await detector.extractText(mockImageData, element);
			expect(typeof text).toBe('string');
		});

		it('should return empty string for elements without text', async () => {
			const element: DetectedElement = {
				id: '1',
				type: 'image',
				boundingBox: { x: 0, y: 0, width: 200, height: 200 },
				confidence: 1.0,
			};

			const text = await detector.extractText(mockImageData, element);
			expect(text).toBe('');
		});
	});

	describe('extractColors', () => {
		it('should extract colors from region', async () => {
			const boundingBox = { x: 0, y: 0, width: 100, height: 100 };
			const colors = await detector.extractColors(mockImageData, boundingBox);
			
			expect(Array.isArray(colors)).toBe(true);
			colors.forEach(color => {
				expect(color).toMatch(/^#[0-9a-f]{6}$/i);
			});
		});
	});
});

describe('detectElements helper', () => {
	it('should create detector and detect', async () => {
		const mockImageData: ImageData = {
			base64: 'mock-base64',
			format: 'image/png',
			width: 1920,
			height: 1080,
			size: 1024,
		};

		const elements = await detectElements(mockImageData);
		expect(Array.isArray(elements)).toBe(true);
	});
});
