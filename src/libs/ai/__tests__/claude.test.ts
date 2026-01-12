import { describe, it, expect, vi, beforeEach } from 'vitest';

import { generateUIFromPrompt, refineDesign, generateStyleVariations } from '../claude';

describe('Claude AI Integration', () => {
	describe('generateUIFromPrompt', () => {
		it('should generate a valid design from a simple prompt', async () => {
			const result = await generateUIFromPrompt('Create a login form', {
				style: 'modern',
				platform: 'web',
				complexity: 'simple',
				colorScheme: 'auto',
				clearCanvas: true,
			});

			expect(result).toHaveProperty('design');
			expect(result).toHaveProperty('styles');
			expect(result).toHaveProperty('colorPalette');
			expect(result.colorPalette).toBeInstanceOf(Array);
			expect(result.design.objects).toBeInstanceOf(Array);
		});

		it('should handle empty prompts gracefully', async () => {
			await expect(
				generateUIFromPrompt('', {
					style: 'modern',
					platform: 'web',
					complexity: 'simple',
					colorScheme: 'auto',
					clearCanvas: true,
				}),
			).rejects.toThrow('Prompt cannot be empty');
		});

		it('should handle whitespace-only prompts', async () => {
			await expect(
				generateUIFromPrompt('   ', {
					style: 'modern',
					platform: 'web',
					complexity: 'simple',
					colorScheme: 'auto',
					clearCanvas: true,
				}),
			).rejects.toThrow('Prompt cannot be empty');
		});

		it('should respect platform dimensions', async () => {
			const mobileResult = await generateUIFromPrompt('Create a button', {
				style: 'modern',
				platform: 'mobile',
				complexity: 'simple',
				colorScheme: 'auto',
				clearCanvas: true,
			});

			expect(mobileResult.metadata).toHaveProperty('platform', 'mobile');
		});

		it('should generate button components for button prompts', async () => {
			const result = await generateUIFromPrompt('Create a button', {
				style: 'modern',
				platform: 'web',
				complexity: 'simple',
				colorScheme: 'auto',
				clearCanvas: true,
			});

			expect(result.metadata.components).toContain('button');
			expect(result.design.objects.length).toBeGreaterThan(0);
		});

		it('should generate form components for form prompts', async () => {
			const result = await generateUIFromPrompt('Create a login form', {
				style: 'modern',
				platform: 'web',
				complexity: 'simple',
				colorScheme: 'auto',
				clearCanvas: true,
			});

			expect(result.metadata.components).toContain('form');
			expect(result.design.objects.length).toBeGreaterThan(0);
		});

		it('should include color palette', async () => {
			const result = await generateUIFromPrompt('Create a button', {
				style: 'modern',
				platform: 'web',
				complexity: 'simple',
				colorScheme: 'auto',
				clearCanvas: true,
			});

			expect(result.colorPalette).toBeInstanceOf(Array);
			expect(result.colorPalette.length).toBeGreaterThan(0);
		});

		it('should include metadata with description', async () => {
			const prompt = 'Create a modern login form';
			const result = await generateUIFromPrompt(prompt, {
				style: 'modern',
				platform: 'web',
				complexity: 'simple',
				colorScheme: 'auto',
				clearCanvas: true,
			});

			expect(result.metadata.description).toBe(prompt);
			expect(result.metadata.screenName).toBeDefined();
		});
	});

	describe('refineDesign', () => {
		it('should modify specific properties based on instruction', async () => {
			const result = await refineDesign({
				instruction: 'Make it blue',
				targetObject: { type: 'rect', fill: 'red' },
				context: {},
			});

			expect(result.properties).toHaveProperty('fill');
			expect(result.properties.fill).toContain('#');
		});

		it('should handle empty instructions', async () => {
			await expect(
				refineDesign({
					instruction: '',
					targetObject: { type: 'rect' },
					context: {},
				}),
			).rejects.toThrow('Instruction cannot be empty');
		});

		it('should handle color change instructions', async () => {
			const blueResult = await refineDesign({
				instruction: 'Change to blue',
				targetObject: { type: 'rect', fill: 'red' },
				context: {},
			});

			expect(blueResult.properties.fill).toBe('#3B82F6');
		});

		it('should handle size change instructions', async () => {
			const result = await refineDesign({
				instruction: 'Make it larger',
				targetObject: { type: 'rect', width: 100, height: 100 },
				context: {},
			});

			expect(result.properties).toHaveProperty('scaleX');
			expect(result.properties).toHaveProperty('scaleY');
			expect(result.properties.scaleX).toBeGreaterThan(1);
		});

		it('should handle make smaller instructions', async () => {
			const result = await refineDesign({
				instruction: 'Make it smaller',
				targetObject: { type: 'rect', width: 100, height: 100 },
				context: {},
			});

			expect(result.properties.scaleX).toBeLessThan(1);
		});

		it('should return properties object even if no changes detected', async () => {
			const result = await refineDesign({
				instruction: 'Random instruction',
				targetObject: { type: 'rect' },
				context: {},
			});

			expect(result).toHaveProperty('properties');
			expect(typeof result.properties).toBe('object');
		});
	});

	describe('generateStyleVariations', () => {
		it('should generate the requested number of variations', async () => {
			const variations = await generateStyleVariations({}, 4);
			expect(variations).toHaveLength(4);
		});

		it('should generate default 3 variations when count not specified', async () => {
			const variations = await generateStyleVariations({});
			expect(variations).toHaveLength(3);
		});

		it('should throw error for invalid count', async () => {
			await expect(generateStyleVariations({}, 0)).rejects.toThrow('Count must be between 1 and 10');
			await expect(generateStyleVariations({}, 11)).rejects.toThrow('Count must be between 1 and 10');
		});

		it('should include color palettes in variations', async () => {
			const variations = await generateStyleVariations({}, 3);

			variations.forEach(variation => {
				expect(variation).toHaveProperty('colorPalette');
				expect(variation.colorPalette).toBeInstanceOf(Array);
			});
		});

		it('should have different color palettes for each variation', async () => {
			const variations = await generateStyleVariations({}, 3);

			const palettes = variations.map(v => JSON.stringify(v.colorPalette));
			const uniquePalettes = new Set(palettes);

			// Should have at least 2 unique palettes
			expect(uniquePalettes.size).toBeGreaterThanOrEqual(2);
		});

		it('should include variation number', async () => {
			const variations = await generateStyleVariations({}, 3);

			variations.forEach((variation, index) => {
				expect(variation.variation).toBe(index + 1);
			});
		});

		it('should preserve original design properties', async () => {
			const originalDesign = {
				objects: [{ type: 'rect' }],
				metadata: { name: 'Test' },
			};

			const variations = await generateStyleVariations(originalDesign, 2);

			variations.forEach(variation => {
				expect(variation.objects).toEqual(originalDesign.objects);
				expect(variation.metadata).toEqual(originalDesign.metadata);
			});
		});
	});
});
