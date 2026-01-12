import { describe, it, expect, beforeEach } from 'vitest';

import { FabricObject } from '../../../canvas/models';
import { AccessibilityChecker, A11yIssue } from '../AccessibilityChecker';

describe('AccessibilityChecker', () => {
	let checker: AccessibilityChecker;

	beforeEach(() => {
		checker = new AccessibilityChecker();
	});

	describe('checkDesign', () => {
		it('should detect insufficient color contrast', () => {
			const objects: FabricObject[] = [
				{
					type: 'textbox',
					id: 'text-1',
					fill: '#999999',
					backgroundColor: '#ffffff',
					fontSize: 14,
				} as FabricObject,
			];

			const issues = checker.checkDesign(objects);

			const contrastIssue = issues.find(i => i.message.includes('color contrast'));
			expect(contrastIssue).toBeDefined();
			expect(contrastIssue?.type).toBe('error');
			expect(contrastIssue?.wcagCriteria).toContain('WCAG');
		});

		it('should detect small font size', () => {
			const objects: FabricObject[] = [
				{
					type: 'textbox',
					id: 'text-1',
					fill: '#000000',
					backgroundColor: '#ffffff',
					fontSize: 10,
				} as FabricObject,
			];

			const issues = checker.checkDesign(objects);

			const fontSizeIssue = issues.find(i => i.message.includes('Font size'));
			expect(fontSizeIssue).toBeDefined();
			expect(fontSizeIssue?.type).toBe('warning');
		});

		it('should detect missing alt text on images', () => {
			const objects: FabricObject[] = [
				{
					type: 'image',
					id: 'img-1',
				} as FabricObject,
			];

			const issues = checker.checkDesign(objects);

			const altTextIssue = issues.find(i => i.message.includes('alternative text'));
			expect(altTextIssue).toBeDefined();
			expect(altTextIssue?.wcagCriteria).toContain('1.1.1');
		});

		it('should detect small interactive elements', () => {
			const objects: FabricObject[] = [
				{
					type: 'rect',
					id: 'btn-1',
					link: 'https://example.com',
					width: 30,
					height: 30,
				} as FabricObject,
			];

			const issues = checker.checkDesign(objects);

			const sizeIssue = issues.find(i => i.message.includes('too small'));
			expect(sizeIssue).toBeDefined();
			expect(sizeIssue?.suggestion).toContain('44');
		});

		it('should detect decorative elements without aria-hidden', () => {
			const objects: FabricObject[] = [
				{
					type: 'rect',
					id: 'decor-1',
					decorative: true,
				} as FabricObject,
			];

			const issues = checker.checkDesign(objects);

			const ariaIssue = issues.find(i => i.message.includes('screen readers'));
			expect(ariaIssue).toBeDefined();
			expect(ariaIssue?.type).toBe('info');
		});

		it('should return empty array for accessible design', () => {
			const objects: FabricObject[] = [
				{
					type: 'textbox',
					id: 'text-1',
					fill: '#000000',
					backgroundColor: '#ffffff',
					fontSize: 16,
				} as FabricObject,
			];

			const issues = checker.checkDesign(objects);

			expect(issues.length).toBe(0);
		});

		it('should handle multiple objects', () => {
			const objects: FabricObject[] = [
				{
					type: 'textbox',
					id: 'text-1',
					fill: '#999999',
					backgroundColor: '#ffffff',
					fontSize: 10,
				} as FabricObject,
				{
					type: 'image',
					id: 'img-1',
				} as FabricObject,
			];

			const issues = checker.checkDesign(objects);

			expect(issues.length).toBeGreaterThan(0);
		});
	});

	describe('checkColorContrast', () => {
		it('should pass for high contrast', () => {
			const result = checker.checkColorContrast('#000000', '#ffffff');
			expect(result).toBe(true);
		});

		it('should fail for low contrast', () => {
			const result = checker.checkColorContrast('#999999', '#aaaaaa');
			expect(result).toBe(false);
		});

		it('should handle hex colors', () => {
			const result = checker.checkColorContrast('#005ea2', '#ffffff');
			expect(result).toBe(true);
		});
	});

	describe('suggestFixes', () => {
		it('should suggest fixes for contrast issues', async () => {
			const issues: A11yIssue[] = [
				{
					type: 'error',
					element: 'text-1',
					message: 'Text has insufficient color contrast with background',
					wcagCriteria: 'WCAG 2.1 Level AA',
					suggestion: 'Increase contrast ratio',
				},
			];

			const suggestions = await checker.suggestFixes(issues);

			expect(suggestions['text-1']).toBeDefined();
			expect(suggestions['text-1'][0].action).toBe('adjustColors');
			expect(suggestions['text-1'][0].params.targetRatio).toBe(4.5);
		});

		it('should suggest fixes for font size issues', async () => {
			const issues: A11yIssue[] = [
				{
					type: 'warning',
					element: 'text-1',
					message: 'Font size is too small',
					wcagCriteria: 'WCAG 2.1 Level AA',
					suggestion: 'Use minimum 12px',
				},
			];

			const suggestions = await checker.suggestFixes(issues);

			expect(suggestions['text-1'][0].action).toBe('adjustFontSize');
			expect(suggestions['text-1'][0].params.minSize).toBe(12);
		});

		it('should suggest fixes for missing alt text', async () => {
			const issues: A11yIssue[] = [
				{
					type: 'warning',
					element: 'img-1',
					message: 'Image is missing alternative text',
					wcagCriteria: 'WCAG 2.1 Level A',
					suggestion: 'Add alt text',
				},
			];

			const suggestions = await checker.suggestFixes(issues);

			expect(suggestions['img-1'][0].action).toBe('addAltText');
		});

		it('should suggest fixes for small interactive elements', async () => {
			const issues: A11yIssue[] = [
				{
					type: 'warning',
					element: 'btn-1',
					message: 'Interactive element is too small',
					wcagCriteria: 'WCAG 2.1 Level AAA',
					suggestion: 'Increase size',
				},
			];

			const suggestions = await checker.suggestFixes(issues);

			expect(suggestions['btn-1'][0].action).toBe('resizeElement');
			expect(suggestions['btn-1'][0].params.minWidth).toBe(44);
		});

		it('should handle multiple issues for same element', async () => {
			const issues: A11yIssue[] = [
				{
					type: 'error',
					element: 'text-1',
					message: 'Text has insufficient color contrast',
					wcagCriteria: 'WCAG 2.1',
					suggestion: 'Fix contrast',
				},
				{
					type: 'warning',
					element: 'text-1',
					message: 'Font size is too small',
					wcagCriteria: 'WCAG 2.1',
					suggestion: 'Fix size',
				},
			];

			const suggestions = await checker.suggestFixes(issues);

			expect(suggestions['text-1'].length).toBe(2);
		});
	});

	describe('getSummary', () => {
		it('should count issues by severity', () => {
			const issues: A11yIssue[] = [
				{
					type: 'error',
					element: 'text-1',
					message: 'Error',
					wcagCriteria: 'WCAG',
					suggestion: 'Fix',
				},
				{
					type: 'error',
					element: 'text-2',
					message: 'Error',
					wcagCriteria: 'WCAG',
					suggestion: 'Fix',
				},
				{
					type: 'warning',
					element: 'img-1',
					message: 'Warning',
					wcagCriteria: 'WCAG',
					suggestion: 'Fix',
				},
				{
					type: 'info',
					element: 'div-1',
					message: 'Info',
					wcagCriteria: 'WCAG',
					suggestion: 'Fix',
				},
			];

			const summary = checker.getSummary(issues);

			expect(summary.errors).toBe(2);
			expect(summary.warnings).toBe(1);
			expect(summary.info).toBe(1);
		});

		it('should handle empty issues array', () => {
			const summary = checker.getSummary([]);

			expect(summary.errors).toBe(0);
			expect(summary.warnings).toBe(0);
			expect(summary.info).toBe(0);
		});
	});

	describe('runAxeCheck', () => {
		it('should return report structure', async () => {
			const report = await checker.runAxeCheck();

			expect(report).toHaveProperty('issues');
			expect(report).toHaveProperty('summary');
			expect(report).toHaveProperty('wcag21AA');
			expect(report).toHaveProperty('section508');
			expect(report).toHaveProperty('timestamp');
			expect(report.issues).toBeInstanceOf(Array);
		});

		it('should indicate WCAG 2.1 AA compliance when no errors', async () => {
			const report = await checker.runAxeCheck();

			if (report.summary.errors === 0) {
				expect(report.wcag21AA).toBe(true);
			}
		});

		it('should indicate Section 508 compliance when no errors or warnings', async () => {
			const report = await checker.runAxeCheck();

			if (report.summary.errors === 0 && report.summary.warnings === 0) {
				expect(report.section508).toBe(true);
			}
		});

		it('should include timestamp', async () => {
			const report = await checker.runAxeCheck();

			expect(report.timestamp).toBeDefined();
			expect(new Date(report.timestamp)).toBeInstanceOf(Date);
		});
	});
});
