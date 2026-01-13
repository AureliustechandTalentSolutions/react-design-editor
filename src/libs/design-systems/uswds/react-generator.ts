/**
 * USWDS React Code Generator
 * Converts design elements to USWDS React components
 */

import { getComponentByName, generateUSWDSImport } from './components';

/**
 * Design element interface
 */
export interface DesignElement {
	type: string;
	id?: string;
	text?: string;
	backgroundColor?: string;
	color?: string;
	fontSize?: number;
	fontWeight?: string;
	width?: number;
	height?: number;
	padding?: number;
	margin?: number;
	borderRadius?: number;
	onClick?: boolean;
	href?: string;
	disabled?: boolean;
	placeholder?: string;
	value?: string;
	checked?: boolean;
	children?: DesignElement[];
	props?: Record<string, any>;
}

/**
 * Element type to USWDS component mapping
 */
const elementTypeMapping: Record<string, string> = {
	button: 'Button',
	input: 'TextInput',
	textarea: 'Textarea',
	checkbox: 'Checkbox',
	radio: 'Radio',
	select: 'Dropdown',
	heading: 'CardHeader',
	text: 'CardBody',
	link: 'Link',
	container: 'GridContainer',
	card: 'Card',
	alert: 'Alert',
	modal: 'Modal',
	table: 'Table',
	tag: 'Tag',
	accordion: 'Accordion',
	breadcrumb: 'Breadcrumb',
	pagination: 'Pagination',
	search: 'Search',
};

/**
 * Generate props string for a component
 */
function generatePropsString(element: DesignElement, componentName: string): string {
	const props: string[] = [];

	// Add id if available
	if (element.id) {
		props.push(`id="${element.id}"`);
	}

	// Component-specific props
	if (componentName === 'Button') {
		if (element.onClick) {
			props.push('type="button"');
		}
		if (element.disabled) {
			props.push('disabled');
		}
	}

	if (componentName === 'TextInput' || componentName === 'Textarea') {
		if (element.placeholder) {
			props.push(`placeholder="${element.placeholder}"`);
		}
		if (element.value) {
			props.push(`defaultValue="${element.value}"`);
		}
	}

	if (componentName === 'Checkbox' || componentName === 'Radio') {
		if (element.checked) {
			props.push('defaultChecked');
		}
		if (element.text) {
			props.push(`label="${element.text}"`);
		}
	}

	if (componentName === 'Link') {
		if (element.href) {
			props.push(`href="${element.href}"`);
		}
	}

	// Add custom props if provided
	if (element.props) {
		Object.entries(element.props).forEach(([key, value]) => {
			if (typeof value === 'boolean' && value) {
				props.push(key);
			} else if (typeof value === 'string') {
				props.push(`${key}="${value}"`);
			} else if (typeof value === 'number') {
				props.push(`${key}={${value}}`);
			}
		});
	}

	return props.length > 0 ? ` ${props.join(' ')}` : '';
}

/**
 * Generate JSX for a single element
 */
function generateElementJSX(element: DesignElement, indent: number = 0): string {
	const indentation = '  '.repeat(indent);
	const componentName = elementTypeMapping[element.type] || 'div';
	const component = getComponentByName(componentName);

	if (!component) {
		// Fallback to div
		return `${indentation}<div>${element.text || ''}</div>`;
	}

	const propsString = generatePropsString(element, componentName);
	const hasChildren = element.children && element.children.length > 0;
	const hasText = element.text && element.text.trim() !== '';

	// Self-closing tag if no children or text
	if (!hasChildren && !hasText) {
		return `${indentation}<${componentName}${propsString} />`;
	}

	// Opening tag
	let jsx = `${indentation}<${componentName}${propsString}>`;

	// Add text content
	if (hasText) {
		if (hasChildren) {
			jsx += `\n${indentation}  ${element.text}`;
		} else {
			jsx += element.text;
		}
	}

	// Add children
	if (hasChildren) {
		if (hasText) {
			jsx += '\n';
		} else {
			jsx += '\n';
		}
		element.children!.forEach(child => {
			jsx += `${generateElementJSX(child, indent + 1)}\n`;
		});
		jsx += indentation;
	}

	// Closing tag
	jsx += `</${componentName}>`;

	return jsx;
}

/**
 * Generate complete React component code
 */
export function generateUSWDSReactCode(elements: DesignElement[], componentName: string = 'USWDSComponent'): string {
	// Collect all component names used
	const usedComponents = new Set<string>();

	function collectComponents(element: DesignElement): void {
		const mappedComponent = elementTypeMapping[element.type];
		if (mappedComponent) {
			usedComponents.add(mappedComponent);
		}
		if (element.children) {
			element.children.forEach(collectComponents);
		}
	}

	elements.forEach(collectComponents);

	// Generate imports
	const imports: string[] = [];
	imports.push("import React from 'react';");
	if (usedComponents.size > 0) {
		imports.push(generateUSWDSImport(Array.from(usedComponents)));
	}

	// Generate component JSX
	const jsxBody = elements.map(element => generateElementJSX(element, 1)).join('\n');

	// Generate complete component
	const code = `${imports.join('\n')}

export const ${componentName} = () => {
  return (
${jsxBody}
  );
};
`;

	return code;
}

/**
 * Convert fabric.js object to design element
 */
export function fabricObjectToDesignElement(obj: any): DesignElement {
	const element: DesignElement = {
		type: 'container',
		id: obj.id,
	};

	// Map fabric types to element types
	if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
		element.type = 'text';
		element.text = obj.text;
		element.fontSize = obj.fontSize;
		element.fontWeight = obj.fontWeight;
		element.color = obj.fill;
	} else if (obj.type === 'rect' && obj.text) {
		element.type = 'button';
		element.text = obj.text;
		element.backgroundColor = obj.fill;
	} else if (obj.type === 'group') {
		element.type = 'container';
		element.children = obj.objects?.map(fabricObjectToDesignElement) || [];
	}

	return element;
}

/**
 * Generate USWDS component from simple description
 */
export function generateUSWDSComponent(description: string): string {
	const lowerDesc = description.toLowerCase();

	// Detect component type from description
	if (lowerDesc.includes('button')) {
		return generateUSWDSReactCode(
			[
				{
					type: 'button',
					text: 'Click Me',
					props: { type: 'button' },
				},
			],
			'ButtonComponent',
		);
	}

	if (lowerDesc.includes('form') || lowerDesc.includes('input')) {
		return generateUSWDSReactCode(
			[
				{
					type: 'container',
					children: [
						{
							type: 'input',
							placeholder: 'Enter text',
							props: { type: 'text' },
						},
						{
							type: 'button',
							text: 'Submit',
						},
					],
				},
			],
			'FormComponent',
		);
	}

	if (lowerDesc.includes('card')) {
		return generateUSWDSReactCode(
			[
				{
					type: 'card',
					children: [
						{
							type: 'heading',
							text: 'Card Title',
						},
						{
							type: 'text',
							text: 'Card content goes here.',
						},
					],
				},
			],
			'CardComponent',
		);
	}

	if (lowerDesc.includes('alert')) {
		return generateUSWDSReactCode(
			[
				{
					type: 'alert',
					text: 'This is an alert message.',
					props: { type: 'info' },
				},
			],
			'AlertComponent',
		);
	}

	// Default: simple container
	return generateUSWDSReactCode(
		[
			{
				type: 'container',
				children: [
					{
						type: 'text',
						text: 'Component content',
					},
				],
			},
		],
		'DefaultComponent',
	);
}
