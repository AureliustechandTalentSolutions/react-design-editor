import { describe, it, expect } from 'vitest';

import {
	generateUSWDSReactCode,
	fabricObjectToDesignElement,
	generateUSWDSComponent,
	DesignElement,
} from '../react-generator';

describe('USWDS React Generator', () => {
	describe('generateUSWDSReactCode', () => {
		it('should generate React component with button', () => {
			const elements: DesignElement[] = [
				{
					type: 'button',
					text: 'Click Me',
					id: 'btn-1',
				},
			];

			const code = generateUSWDSReactCode(elements, 'TestComponent');

			expect(code).toContain("import React from 'react'");
			expect(code).toContain("import { Button } from '@trussworks/react-uswds'");
			expect(code).toContain('export const TestComponent');
			expect(code).toContain('<Button');
			expect(code).toContain('Click Me');
		});

		it('should generate React component with multiple elements', () => {
			const elements: DesignElement[] = [
				{
					type: 'button',
					text: 'Submit',
					id: 'submit-btn',
				},
				{
					type: 'input',
					placeholder: 'Enter text',
					id: 'text-input',
				},
			];

			const code = generateUSWDSReactCode(elements, 'FormComponent');

			expect(code).toContain('Button');
			expect(code).toContain('TextInput');
			expect(code).toContain('Submit');
			expect(code).toContain('Enter text');
		});

		it('should generate nested components', () => {
			const elements: DesignElement[] = [
				{
					type: 'container',
					children: [
						{
							type: 'heading',
							text: 'Title',
						},
						{
							type: 'text',
							text: 'Content',
						},
					],
				},
			];

			const code = generateUSWDSReactCode(elements);

			expect(code).toContain('GridContainer');
			expect(code).toContain('CardHeader');
			expect(code).toContain('CardBody');
			expect(code).toContain('Title');
			expect(code).toContain('Content');
		});

		it('should handle empty elements array', () => {
			const code = generateUSWDSReactCode([]);

			expect(code).toContain("import React from 'react'");
			expect(code).toContain('export const');
		});

		it('should generate unique imports', () => {
			const elements: DesignElement[] = [
				{ type: 'button', text: 'Button 1' },
				{ type: 'button', text: 'Button 2' },
				{ type: 'button', text: 'Button 3' },
			];

			const code = generateUSWDSReactCode(elements);

			const importMatches = code.match(/import \{ Button \}/g);
			expect(importMatches?.length).toBe(1);
		});

		it('should handle element with custom props', () => {
			const elements: DesignElement[] = [
				{
					type: 'button',
					text: 'Click Me',
					props: {
						disabled: true,
						size: 'big',
					},
				},
			];

			const code = generateUSWDSReactCode(elements);

			expect(code).toContain('disabled');
			expect(code).toContain('size="big"');
		});

		it('should handle checkbox with label', () => {
			const elements: DesignElement[] = [
				{
					type: 'checkbox',
					text: 'Accept terms',
					checked: true,
					id: 'terms',
				},
			];

			const code = generateUSWDSReactCode(elements);

			expect(code).toContain('Checkbox');
			expect(code).toContain('label="Accept terms"');
			expect(code).toContain('defaultChecked');
		});

		it('should handle link with href', () => {
			const elements: DesignElement[] = [
				{
					type: 'link',
					text: 'Learn more',
					href: 'https://example.com',
				},
			];

			const code = generateUSWDSReactCode(elements);

			expect(code).toContain('Link');
			expect(code).toContain('href="https://example.com"');
		});
	});

	describe('fabricObjectToDesignElement', () => {
		it('should convert text object', () => {
			const fabricObj = {
				type: 'textbox',
				id: 'text-1',
				text: 'Hello World',
				fontSize: 16,
				fontWeight: 'bold',
				fill: '#000000',
			};

			const element = fabricObjectToDesignElement(fabricObj);

			expect(element.type).toBe('text');
			expect(element.text).toBe('Hello World');
			expect(element.fontSize).toBe(16);
			expect(element.fontWeight).toBe('bold');
			expect(element.color).toBe('#000000');
		});

		it('should convert rect with text to button', () => {
			const fabricObj = {
				type: 'rect',
				id: 'btn-1',
				text: 'Click Me',
				fill: '#005ea2',
			};

			const element = fabricObjectToDesignElement(fabricObj);

			expect(element.type).toBe('button');
			expect(element.text).toBe('Click Me');
			expect(element.backgroundColor).toBe('#005ea2');
		});

		it('should convert group with children', () => {
			const fabricObj = {
				type: 'group',
				id: 'group-1',
				objects: [
					{
						type: 'textbox',
						text: 'Title',
						fontSize: 20,
					},
					{
						type: 'textbox',
						text: 'Content',
						fontSize: 14,
					},
				],
			};

			const element = fabricObjectToDesignElement(fabricObj);

			expect(element.type).toBe('container');
			expect(element.children).toBeDefined();
			expect(element.children?.length).toBe(2);
		});

		it('should handle object without id', () => {
			const fabricObj = {
				type: 'textbox',
				text: 'Text',
			};

			const element = fabricObjectToDesignElement(fabricObj);

			expect(element.id).toBeUndefined();
		});
	});

	describe('generateUSWDSComponent', () => {
		it('should generate button component from description', () => {
			const code = generateUSWDSComponent('create a button');

			expect(code).toContain('Button');
			expect(code).toContain('Click Me');
			expect(code).toContain('ButtonComponent');
		});

		it('should generate form component from description', () => {
			const code = generateUSWDSComponent('create a form with input');

			expect(code).toContain('TextInput');
			expect(code).toContain('Button');
			expect(code).toContain('FormComponent');
		});

		it('should generate card component from description', () => {
			const code = generateUSWDSComponent('create a card');

			expect(code).toContain('Card');
			expect(code).toContain('CardHeader');
			expect(code).toContain('CardBody');
			expect(code).toContain('CardComponent');
		});

		it('should generate alert component from description', () => {
			const code = generateUSWDSComponent('create an alert');

			expect(code).toContain('Alert');
			expect(code).toContain('AlertComponent');
		});

		it('should generate default component for unknown description', () => {
			const code = generateUSWDSComponent('something random');

			expect(code).toContain('GridContainer');
			expect(code).toContain('DefaultComponent');
		});

		it('should be case-insensitive', () => {
			const code1 = generateUSWDSComponent('CREATE A BUTTON');
			const code2 = generateUSWDSComponent('create a button');

			expect(code1).toContain('Button');
			expect(code2).toContain('Button');
		});
	});

	describe('Code Quality', () => {
		it('should generate valid JSX structure', () => {
			const elements: DesignElement[] = [
				{
					type: 'container',
					children: [
						{
							type: 'button',
							text: 'Click',
						},
					],
				},
			];

			const code = generateUSWDSReactCode(elements);

			expect(code).toContain('<GridContainer>');
			expect(code).toContain('</GridContainer>');
			expect(code).toContain('<Button>');
			expect(code).toContain('</Button>');
		});

		it('should use proper indentation', () => {
			const elements: DesignElement[] = [
				{
					type: 'container',
					children: [
						{
							type: 'button',
							text: 'Click',
						},
					],
				},
			];

			const code = generateUSWDSReactCode(elements);

			expect(code).toContain('  <GridContainer>');
			expect(code).toContain('    <Button>');
		});

		it('should generate self-closing tags when appropriate', () => {
			const elements: DesignElement[] = [
				{
					type: 'input',
					id: 'input-1',
				},
			];

			const code = generateUSWDSReactCode(elements);

			expect(code).toContain('<TextInput');
			expect(code).toContain('/>');
		});
	});
});
