/**
 * USWDS Mapper Tests
 */

import { describe, it, expect } from 'vitest';
import { mapElementToUSWDS, mapElementsToUSWDS, getUSWDSClassName } from '../mapper';
import { DetectedElement } from '../../../screenshot-to-code/types';
import { usaButton, usaCard, usaInput, usaAlert } from '../components';

describe('USWDS Mapper', () => {
	describe('mapElementToUSWDS', () => {
		it('should map button element to USWDS button component', () => {
			const element: DetectedElement = {
				type: 'button',
				bounds: { x: 100, y: 100, width: 120, height: 40 },
				properties: {
					backgroundColor: '#3b82f6',
					color: '#ffffff',
				},
				text: 'Submit',
				confidence: 0.95,
			};

			const result = mapElementToUSWDS(element);

			expect(result).not.toBeNull();
			expect(result?.component.name).toBe('Button');
			expect(result?.props.children).toBe('Submit');
		});

		it('should map input element to USWDS input component', () => {
			const element: DetectedElement = {
				type: 'input',
				bounds: { x: 100, y: 50, width: 200, height: 40 },
				properties: {
					backgroundColor: '#ffffff',
					border: '1px solid #d1d5db',
				},
				confidence: 0.92,
			};

			const result = mapElementToUSWDS(element);

			expect(result).not.toBeNull();
			expect(result?.component.name).toBe('Input');
		});

		it('should map card element to USWDS card component', () => {
			const element: DetectedElement = {
				type: 'card',
				bounds: { x: 0, y: 0, width: 300, height: 200 },
				properties: {
					backgroundColor: '#ffffff',
					borderRadius: 8,
				},
				confidence: 0.9,
			};

			const result = mapElementToUSWDS(element);

			expect(result).not.toBeNull();
			expect(result?.component.name).toBe('Card');
		});

		it('should determine button variant based on properties', () => {
			const secondaryButton: DetectedElement = {
				type: 'button',
				bounds: { x: 0, y: 0, width: 120, height: 40 },
				properties: { variant: 'secondary' },
				text: 'Cancel',
				confidence: 0.95,
			};

			const result = mapElementToUSWDS(secondaryButton);

			expect(result?.variant).toBe('secondary');
		});

		it('should determine alert variant based on text content', () => {
			const successAlert: DetectedElement = {
				type: 'alert',
				bounds: { x: 0, y: 0, width: 400, height: 60 },
				properties: {},
				text: 'Success! Your changes have been saved.',
				confidence: 0.9,
			};

			const result = mapElementToUSWDS(successAlert);

			expect(result?.variant).toBe('success');
		});

		it('should apply USWDS design tokens', () => {
			const element: DetectedElement = {
				type: 'button',
				bounds: { x: 0, y: 0, width: 120, height: 40 },
				properties: {
					padding: 16,
					borderRadius: 8,
					fontSize: 16,
				},
				confidence: 0.95,
			};

			const result = mapElementToUSWDS(element);

			expect(result?.styles).toBeDefined();
			expect(result?.styles.padding).toBeDefined();
			expect(result?.styles.borderRadius).toBeDefined();
			expect(result?.styles.fontSize).toBeDefined();
		});

		it('should generate accessibility attributes', () => {
			const button: DetectedElement = {
				type: 'button',
				bounds: { x: 0, y: 0, width: 120, height: 40 },
				properties: {},
				text: 'Click me',
				confidence: 0.95,
			};

			const result = mapElementToUSWDS(button);

			expect(result?.a11y).toBeDefined();
			expect(result?.a11y.role).toBe('button');
			expect(result?.a11y['aria-label']).toBe('Click me');
		});

		it('should return null for unmapped element types', () => {
			const element: DetectedElement = {
				type: 'unknown-element',
				bounds: { x: 0, y: 0, width: 100, height: 100 },
				properties: {},
				confidence: 0.5,
			};

			const result = mapElementToUSWDS(element);

			expect(result).toBeNull();
		});

		it('should map text input variants', () => {
			const emailInput: DetectedElement = {
				type: 'email-input',
				bounds: { x: 0, y: 0, width: 200, height: 40 },
				properties: {},
				confidence: 0.9,
			};

			const result = mapElementToUSWDS(emailInput);

			expect(result).not.toBeNull();
			expect(result?.component.name).toBe('Input');
		});

		it('should map navigation elements', () => {
			const nav: DetectedElement = {
				type: 'navigation',
				bounds: { x: 0, y: 0, width: 1200, height: 60 },
				properties: {},
				confidence: 0.95,
			};

			const result = mapElementToUSWDS(nav);

			expect(result).not.toBeNull();
			expect(result?.component.name).toBe('Navigation');
			expect(result?.a11y.role).toBe('navigation');
		});
	});

	describe('mapElementsToUSWDS', () => {
		it('should map multiple elements', () => {
			const elements: DetectedElement[] = [
				{
					type: 'button',
					bounds: { x: 0, y: 0, width: 120, height: 40 },
					properties: {},
					text: 'Submit',
					confidence: 0.95,
				},
				{
					type: 'input',
					bounds: { x: 0, y: 50, width: 200, height: 40 },
					properties: {},
					confidence: 0.9,
				},
			];

			const results = mapElementsToUSWDS(elements);

			expect(results).toHaveLength(2);
			expect(results[0]?.component.name).toBe('Button');
			expect(results[1]?.component.name).toBe('Input');
		});

		it('should handle mixed valid and invalid elements', () => {
			const elements: DetectedElement[] = [
				{
					type: 'button',
					bounds: { x: 0, y: 0, width: 120, height: 40 },
					properties: {},
					confidence: 0.95,
				},
				{
					type: 'unknown',
					bounds: { x: 0, y: 0, width: 100, height: 100 },
					properties: {},
					confidence: 0.5,
				},
			];

			const results = mapElementsToUSWDS(elements);

			expect(results).toHaveLength(2);
			expect(results[0]).not.toBeNull();
			expect(results[1]).toBeNull();
		});

		it('should return empty array for empty input', () => {
			const results = mapElementsToUSWDS([]);

			expect(results).toHaveLength(0);
		});
	});

	describe('getUSWDSClassName', () => {
		it('should return base className when no variant', () => {
			const className = getUSWDSClassName(usaButton);

			expect(className).toBe('usa-button');
		});

		it('should return variant className when variant provided', () => {
			const className = getUSWDSClassName(usaButton, 'secondary');

			expect(className).toBe('usa-button usa-button--secondary');
		});

		it('should return base className when invalid variant', () => {
			const className = getUSWDSClassName(usaButton, 'invalid-variant');

			expect(className).toBe('usa-button');
		});

		it('should handle card variants', () => {
			const className = getUSWDSClassName(usaCard, 'flag');

			expect(className).toBe('usa-card usa-card--flag');
		});

		it('should handle input variants', () => {
			const className = getUSWDSClassName(usaInput, 'error');

			expect(className).toBe('usa-input usa-input--error');
		});

		it('should handle alert variants', () => {
			const className = getUSWDSClassName(usaAlert, 'success');

			expect(className).toBe('usa-alert usa-alert--success');
		});
	});
});
