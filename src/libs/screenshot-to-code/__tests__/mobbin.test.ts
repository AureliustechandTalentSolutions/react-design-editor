/**
 * Mobbin File Handling Tests
 */

import { describe, it, expect } from 'vitest';

import { validateImageFile, categorizeScreenshots } from '../mobbin';

describe('Mobbin File Handling', () => {
	describe('validateImageFile', () => {
		it('should validate PNG files', () => {
			const file = new File([''], 'test.png', { type: 'image/png' });
			Object.defineProperty(file, 'size', { value: 1024 });

			const result = validateImageFile(file);

			expect(result.valid).toBe(true);
			expect(result.error).toBeUndefined();
		});

		it('should validate JPEG files', () => {
			const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
			Object.defineProperty(file, 'size', { value: 1024 });

			const result = validateImageFile(file);

			expect(result.valid).toBe(true);
		});

		it('should validate WebP files', () => {
			const file = new File([''], 'test.webp', { type: 'image/webp' });
			Object.defineProperty(file, 'size', { value: 1024 });

			const result = validateImageFile(file);

			expect(result.valid).toBe(true);
		});

		it('should reject files that are too large', () => {
			const file = new File([''], 'test.png', { type: 'image/png' });
			Object.defineProperty(file, 'size', { value: 11 * 1024 * 1024 }); // 11MB

			const result = validateImageFile(file);

			expect(result.valid).toBe(false);
			expect(result.error).toContain('exceeds maximum');
		});

		it('should reject unsupported file types', () => {
			const file = new File([''], 'test.gif', { type: 'image/gif' });
			Object.defineProperty(file, 'size', { value: 1024 });

			const result = validateImageFile(file);

			expect(result.valid).toBe(false);
			expect(result.error).toContain('Unsupported file type');
		});

		it('should reject SVG files', () => {
			const file = new File([''], 'test.svg', { type: 'image/svg+xml' });
			Object.defineProperty(file, 'size', { value: 1024 });

			const result = validateImageFile(file);

			expect(result.valid).toBe(false);
		});
	});

	describe('categorizeScreenshots', () => {
		it('should categorize screenshots by type', () => {
			const results = [
				{
					screenshot: {
						filename: 'form.png',
						size: 1024,
						dimensions: { width: 800, height: 600 },
						format: 'png' as const,
						source: 'upload' as const,
						timestamp: Date.now(),
					},
					result: {
						design: { objects: [], background: '#fff' },
						styles: {},
						colorPalette: [],
						metadata: {
							screenName: 'Form',
							description: 'Login form',
							components: ['form', 'input', 'button'],
							timestamp: Date.now(),
						},
						analysis: {
							elements: [],
							colorPalette: [],
							typography: { fontFamilies: [], fontSizes: [] },
							layout: { type: 'flex' },
							accessibility: { score: 85, issues: [] },
						},
						code: {
							files: [],
							dependencies: {},
						},
					},
				},
				{
					screenshot: {
						filename: 'nav.png',
						size: 1024,
						dimensions: { width: 800, height: 600 },
						format: 'png' as const,
						source: 'upload' as const,
						timestamp: Date.now(),
					},
					result: {
						design: { objects: [], background: '#fff' },
						styles: {},
						colorPalette: [],
						metadata: {
							screenName: 'Navigation',
							description: 'Main navigation',
							components: ['navigation', 'menu'],
							timestamp: Date.now(),
						},
						analysis: {
							elements: [],
							colorPalette: [],
							typography: { fontFamilies: [], fontSizes: [] },
							layout: { type: 'flex' },
							accessibility: { score: 85, issues: [] },
						},
						code: {
							files: [],
							dependencies: {},
						},
					},
				},
			];

			const categories = categorizeScreenshots(results);

			expect(categories).toHaveProperty('forms');
			expect(categories).toHaveProperty('navigation');
			expect(categories).toHaveProperty('cards');
			expect(categories).toHaveProperty('ecommerce');
			expect(categories).toHaveProperty('dashboard');
			expect(categories).toHaveProperty('other');

			expect(categories.forms.length).toBe(1);
			expect(categories.navigation.length).toBe(1);
		});

		it('should categorize card screenshots', () => {
			const results = [
				{
					screenshot: {
						filename: 'card.png',
						size: 1024,
						dimensions: { width: 800, height: 600 },
						format: 'png' as const,
						source: 'upload' as const,
						timestamp: Date.now(),
					},
					result: {
						design: { objects: [], background: '#fff' },
						styles: {},
						colorPalette: [],
						metadata: {
							screenName: 'Card',
							description: 'Product card',
							components: ['card'],
							timestamp: Date.now(),
						},
						analysis: {
							elements: [],
							colorPalette: [],
							typography: { fontFamilies: [], fontSizes: [] },
							layout: { type: 'flex' },
							accessibility: { score: 85, issues: [] },
						},
						code: {
							files: [],
							dependencies: {},
						},
					},
				},
			];

			const categories = categorizeScreenshots(results);

			expect(categories.cards.length).toBe(1);
		});

		it('should categorize ecommerce screenshots', () => {
			const results = [
				{
					screenshot: {
						filename: 'product.png',
						size: 1024,
						dimensions: { width: 800, height: 600 },
						format: 'png' as const,
						source: 'upload' as const,
						timestamp: Date.now(),
					},
					result: {
						design: { objects: [], background: '#fff' },
						styles: {},
						colorPalette: [],
						metadata: {
							screenName: 'Product',
							description: 'Product page',
							components: ['product', 'cart'],
							timestamp: Date.now(),
						},
						analysis: {
							elements: [],
							colorPalette: [],
							typography: { fontFamilies: [], fontSizes: [] },
							layout: { type: 'flex' },
							accessibility: { score: 85, issues: [] },
						},
						code: {
							files: [],
							dependencies: {},
						},
					},
				},
			];

			const categories = categorizeScreenshots(results);

			expect(categories.ecommerce.length).toBe(1);
		});

		it('should categorize dashboard screenshots', () => {
			const results = [
				{
					screenshot: {
						filename: 'dashboard.png',
						size: 1024,
						dimensions: { width: 800, height: 600 },
						format: 'png' as const,
						source: 'upload' as const,
						timestamp: Date.now(),
					},
					result: {
						design: { objects: [], background: '#fff' },
						styles: {},
						colorPalette: [],
						metadata: {
							screenName: 'Dashboard',
							description: 'Analytics dashboard',
							components: ['chart', 'table'],
							timestamp: Date.now(),
						},
						analysis: {
							elements: [],
							colorPalette: [],
							typography: { fontFamilies: [], fontSizes: [] },
							layout: { type: 'flex' },
							accessibility: { score: 85, issues: [] },
						},
						code: {
							files: [],
							dependencies: {},
						},
					},
				},
			];

			const categories = categorizeScreenshots(results);

			expect(categories.dashboard.length).toBe(1);
		});

		it('should handle screenshots without results', () => {
			const results = [
				{
					screenshot: {
						filename: 'failed.png',
						size: 1024,
						dimensions: { width: 800, height: 600 },
						format: 'png' as const,
						source: 'upload' as const,
						timestamp: Date.now(),
					},
					error: 'Failed to process',
				},
			];

			const categories = categorizeScreenshots(results);

			expect(categories.other.length).toBe(1);
		});

		it('should categorize uncategorized screenshots to other', () => {
			const results = [
				{
					screenshot: {
						filename: 'unknown.png',
						size: 1024,
						dimensions: { width: 800, height: 600 },
						format: 'png' as const,
						source: 'upload' as const,
						timestamp: Date.now(),
					},
					result: {
						design: { objects: [], background: '#fff' },
						styles: {},
						colorPalette: [],
						metadata: {
							screenName: 'Unknown',
							description: 'Unknown component',
							components: ['unknown'],
							timestamp: Date.now(),
						},
						analysis: {
							elements: [],
							colorPalette: [],
							typography: { fontFamilies: [], fontSizes: [] },
							layout: { type: 'flex' },
							accessibility: { score: 85, issues: [] },
						},
						code: {
							files: [],
							dependencies: {},
						},
					},
				},
			];

			const categories = categorizeScreenshots(results);

			expect(categories.other.length).toBe(1);
		});
	});
});
