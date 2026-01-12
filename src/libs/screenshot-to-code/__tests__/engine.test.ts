/**
 * Screenshot-to-Code Engine Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeScreenshot, convertScreenshotToCode, isScreenshotToCodeAvailable } from '../engine';
import { AnalysisOptions, ConversionOptions, ScreenshotImportRequest } from '../types';

describe('Screenshot-to-Code Engine', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('isScreenshotToCodeAvailable', () => {
		it('should return false when no API key is available', () => {
			const result = isScreenshotToCodeAvailable();
			expect(typeof result).toBe('boolean');
		});
	});

	describe('analyzeScreenshot', () => {
		it('should analyze screenshot and return mock analysis when no API key', async () => {
			const imageBase64 = 'base64string';
			const options: AnalysisOptions = {
				designSystem: 'uswds',
				extractColors: true,
				extractTypography: true,
				detectComponents: true,
				accessibility: true,
			};

			const result = await analyzeScreenshot(imageBase64, options);

			expect(result).toHaveProperty('elements');
			expect(result).toHaveProperty('colorPalette');
			expect(result).toHaveProperty('typography');
			expect(result).toHaveProperty('layout');
			expect(result).toHaveProperty('accessibility');

			expect(Array.isArray(result.elements)).toBe(true);
			expect(Array.isArray(result.colorPalette)).toBe(true);
		});

		it('should return valid analysis structure', async () => {
			const result = await analyzeScreenshot('base64', {});

			expect(result.elements).toBeDefined();
			expect(result.colorPalette).toBeDefined();
			expect(result.typography).toHaveProperty('fontFamilies');
			expect(result.typography).toHaveProperty('fontSizes');
			expect(result.layout).toHaveProperty('type');
			expect(result.accessibility).toHaveProperty('score');
			expect(result.accessibility).toHaveProperty('issues');
		});

		it('should detect UI elements in mock mode', async () => {
			const result = await analyzeScreenshot('base64', { detectComponents: true });

			expect(result.elements.length).toBeGreaterThan(0);
			result.elements.forEach(element => {
				expect(element).toHaveProperty('type');
				expect(element).toHaveProperty('bounds');
				expect(element).toHaveProperty('properties');
				expect(element).toHaveProperty('confidence');
			});
		});

		it('should extract colors in mock mode', async () => {
			const result = await analyzeScreenshot('base64', { extractColors: true });

			expect(Array.isArray(result.colorPalette)).toBe(true);
			expect(result.colorPalette.length).toBeGreaterThan(0);
		});

		it('should extract typography in mock mode', async () => {
			const result = await analyzeScreenshot('base64', { extractTypography: true });

			expect(result.typography.fontFamilies).toBeDefined();
			expect(result.typography.fontSizes).toBeDefined();
			expect(Array.isArray(result.typography.fontFamilies)).toBe(true);
			expect(Array.isArray(result.typography.fontSizes)).toBe(true);
		});

		it('should detect accessibility issues in mock mode', async () => {
			const result = await analyzeScreenshot('base64', { accessibility: true });

			expect(result.accessibility.score).toBeGreaterThanOrEqual(0);
			expect(result.accessibility.score).toBeLessThanOrEqual(100);
			expect(Array.isArray(result.accessibility.issues)).toBe(true);
		});

		it('should handle design system option', async () => {
			const result = await analyzeScreenshot('base64', { designSystem: 'uswds' });

			expect(result).toHaveProperty('elements');
			expect(result).toHaveProperty('colorPalette');
		});
	});

	describe('convertScreenshotToCode', () => {
		it('should convert screenshot to code structure', async () => {
			const request: ScreenshotImportRequest = {
				data: 'base64string',
				metadata: {
					filename: 'test.png',
					size: 1024,
					dimensions: { width: 800, height: 600 },
					format: 'png',
					source: 'upload',
					timestamp: Date.now(),
				},
				options: {
					framework: 'react',
					styling: 'tailwind',
					typescript: true,
					includeResponsive: true,
					designSystem: 'uswds',
					extractColors: true,
					extractTypography: true,
					detectComponents: true,
					accessibility: true,
				},
			};

			const result = await convertScreenshotToCode(request);

			expect(result).toHaveProperty('design');
			expect(result).toHaveProperty('styles');
			expect(result).toHaveProperty('colorPalette');
			expect(result).toHaveProperty('metadata');
			expect(result).toHaveProperty('analysis');
			expect(result).toHaveProperty('code');
		});

		it('should include analysis in result', async () => {
			const request: ScreenshotImportRequest = {
				data: 'base64',
				metadata: {
					size: 1024,
					dimensions: { width: 800, height: 600 },
					format: 'png',
					source: 'upload',
					timestamp: Date.now(),
				},
				options: {
					framework: 'react',
					styling: 'tailwind',
					typescript: true,
					includeResponsive: false,
				},
			};

			const result = await convertScreenshotToCode(request);

			expect(result.analysis).toHaveProperty('elements');
			expect(result.analysis).toHaveProperty('colorPalette');
			expect(result.analysis).toHaveProperty('typography');
		});

		it('should generate code files', async () => {
			const request: ScreenshotImportRequest = {
				data: 'base64',
				metadata: {
					size: 1024,
					dimensions: { width: 800, height: 600 },
					format: 'png',
					source: 'upload',
					timestamp: Date.now(),
				},
				options: {
					framework: 'react',
					styling: 'tailwind',
					typescript: true,
					includeResponsive: false,
				},
			};

			const result = await convertScreenshotToCode(request);

			expect(result.code).toHaveProperty('files');
			expect(result.code).toHaveProperty('dependencies');
			expect(Array.isArray(result.code.files)).toBe(true);
			expect(result.code.files.length).toBeGreaterThan(0);
		});

		it('should include USWDS dependency when design system is uswds', async () => {
			const request: ScreenshotImportRequest = {
				data: 'base64',
				metadata: {
					size: 1024,
					dimensions: { width: 800, height: 600 },
					format: 'png',
					source: 'upload',
					timestamp: Date.now(),
				},
				options: {
					framework: 'react',
					styling: 'tailwind',
					typescript: true,
					includeResponsive: false,
					designSystem: 'uswds',
				},
			};

			const result = await convertScreenshotToCode(request);

			expect(result.code.dependencies).toHaveProperty('@trussworks/react-uswds');
		});
	});
});
