/**
 * USWDS Mapper
 * Maps detected UI elements to USWDS components
 */

import { DetectedElement } from '../../screenshot-to-code/types';
import { uswdsComponents, USWDSComponent, getUSWDSComponent } from './components';
import { uswdsTokens } from './tokens';

/**
 * Mapping result
 */
export interface MappingResult {
	component: USWDSComponent;
	variant?: string;
	props: Record<string, any>;
	styles: Record<string, any>;
	a11y: Record<string, any>;
}

/**
 * Map element type to USWDS component
 */
const mapElementTypeToUSWDS = (elementType: string): string | null => {
	const mapping: Record<string, string> = {
		button: 'button',
		'submit-button': 'button',
		'primary-button': 'button',
		'secondary-button': 'button',
		input: 'input',
		'text-input': 'input',
		'email-input': 'input',
		'password-input': 'input',
		textbox: 'input',
		card: 'card',
		container: 'card',
		alert: 'alert',
		notification: 'alert',
		message: 'alert',
		header: 'header',
		navigation: 'nav',
		navbar: 'nav',
		menu: 'nav',
		form: 'form',
		label: 'label',
		checkbox: 'checkbox',
		radio: 'radio',
		table: 'table',
		'data-table': 'table',
		banner: 'banner',
		footer: 'footer',
		accordion: 'accordion',
		breadcrumb: 'breadcrumb',
	};

	return mapping[elementType.toLowerCase()] || null;
};

/**
 * Determine variant based on element properties
 */
const determineVariant = (
	componentName: string,
	element: DetectedElement
): string | undefined => {
	const { properties, text } = element;

	switch (componentName) {
		case 'button':
			if (properties.variant === 'secondary' || text?.toLowerCase().includes('cancel')) {
				return 'secondary';
			}
			if (properties.variant === 'outline') {
				return 'outline';
			}
			if (properties.size === 'large' || properties.size === 'big') {
				return 'big';
			}
			return 'primary';

		case 'alert':
			if (properties.type === 'success' || text?.toLowerCase().includes('success')) {
				return 'success';
			}
			if (properties.type === 'warning' || text?.toLowerCase().includes('warning')) {
				return 'warning';
			}
			if (properties.type === 'error' || text?.toLowerCase().includes('error')) {
				return 'error';
			}
			return 'info';

		case 'card':
			if (properties.layout === 'flag') {
				return 'flag';
			}
			if (properties.headerFirst) {
				return 'headerFirst';
			}
			return 'default';

		case 'header':
			if (properties.extended) {
				return 'extended';
			}
			return 'basic';

		case 'footer':
			if (properties.size === 'large') {
				return 'big';
			}
			if (properties.size === 'small') {
				return 'slim';
			}
			return 'medium';

		default:
			return undefined;
	}
};

/**
 * Apply USWDS design tokens to element properties
 */
const applyUSWDSTokens = (properties: Record<string, any>): Record<string, any> => {
	const styles: Record<string, any> = {};

	// Map colors
	if (properties.backgroundColor) {
		const color = findClosestUSWDSColor(properties.backgroundColor);
		if (color) {
			styles.backgroundColor = color;
		}
	}

	if (properties.color || properties.textColor) {
		const color = findClosestUSWDSColor(properties.color || properties.textColor);
		if (color) {
			styles.color = color;
		}
	}

	// Map spacing
	if (properties.padding) {
		const spacing = findClosestUSWDSSpacing(properties.padding);
		if (spacing) {
			styles.padding = spacing;
		}
	}

	if (properties.margin) {
		const spacing = findClosestUSWDSSpacing(properties.margin);
		if (spacing) {
			styles.margin = spacing;
		}
	}

	// Map border radius
	if (properties.borderRadius) {
		const radius = findClosestUSWDSBorderRadius(properties.borderRadius);
		if (radius !== undefined) {
			styles.borderRadius = radius;
		}
	}

	// Map font size
	if (properties.fontSize) {
		const fontSize = findClosestUSWDSFontSize(properties.fontSize);
		if (fontSize) {
			styles.fontSize = fontSize;
		}
	}

	// Map font weight
	if (properties.fontWeight) {
		const fontWeight = mapFontWeight(properties.fontWeight);
		if (fontWeight) {
			styles.fontWeight = fontWeight;
		}
	}

	return styles;
};

/**
 * Find closest USWDS color
 */
const findClosestUSWDSColor = (color: string): string | null => {
	// For simplicity, return the input color
	// In a real implementation, you would calculate color distance
	// and return the closest USWDS color
	return color;
};

/**
 * Find closest USWDS spacing value
 */
const findClosestUSWDSSpacing = (value: number): number | null => {
	const spacingValues = Object.values(uswdsTokens.spacing);
	return spacingValues.reduce((prev, curr) =>
		Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
	);
};

/**
 * Find closest USWDS border radius
 */
const findClosestUSWDSBorderRadius = (value: number): number | string | null => {
	if (value >= 9999) return uswdsTokens.borderRadius.pill;
	const radiusValues = Object.values(uswdsTokens.borderRadius).filter(
		(v) => typeof v === 'number'
	) as number[];
	return radiusValues.reduce((prev, curr) =>
		Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
	);
};

/**
 * Find closest USWDS font size
 */
const findClosestUSWDSFontSize = (value: number): number | null => {
	const fontSizes = Object.values(uswdsTokens.typography.fontSize);
	return fontSizes.reduce((prev, curr) =>
		Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
	);
};

/**
 * Map font weight to USWDS token
 */
const mapFontWeight = (weight: string | number): number | null => {
	if (typeof weight === 'number') {
		const weights = Object.values(uswdsTokens.typography.fontWeight);
		return weights.reduce((prev, curr) =>
			Math.abs(curr - weight) < Math.abs(prev - weight) ? curr : prev
		);
	}

	const mapping: Record<string, number> = {
		light: uswdsTokens.typography.fontWeight.light,
		normal: uswdsTokens.typography.fontWeight.normal,
		medium: uswdsTokens.typography.fontWeight.medium,
		semibold: uswdsTokens.typography.fontWeight.semibold,
		bold: uswdsTokens.typography.fontWeight.bold,
	};

	return mapping[weight.toLowerCase()] || null;
};

/**
 * Generate accessibility attributes
 */
const generateA11yAttributes = (
	component: USWDSComponent,
	element: DetectedElement
): Record<string, any> => {
	const a11y: Record<string, any> = {};

	// Apply component's default a11y attributes
	if (component.a11y) {
		if (component.a11y.role) {
			a11y.role = component.a11y.role;
		}
		if (component.a11y.ariaLabel) {
			a11y['aria-label'] = component.a11y.ariaLabel;
		}
		if (component.a11y.ariaRequired) {
			a11y['aria-required'] = 'true';
		}
	}

	// Add aria-label if text is provided
	if (element.text && !a11y['aria-label']) {
		a11y['aria-label'] = element.text;
	}

	return a11y;
};

/**
 * Map detected element to USWDS component
 */
export const mapElementToUSWDS = (element: DetectedElement): MappingResult | null => {
	// Get USWDS component name
	const componentName = mapElementTypeToUSWDS(element.type);
	if (!componentName) {
		return null;
	}

	// Get USWDS component definition
	const component = getUSWDSComponent(componentName);
	if (!component) {
		return null;
	}

	// Determine variant
	const variant = determineVariant(componentName, element);

	// Apply USWDS tokens
	const styles = applyUSWDSTokens(element.properties);

	// Generate props
	const props: Record<string, any> = {
		...element.properties,
	};

	if (element.text) {
		props.children = element.text;
	}

	// Generate accessibility attributes
	const a11y = generateA11yAttributes(component, element);

	return {
		component,
		variant,
		props,
		styles,
		a11y,
	};
};

/**
 * Map multiple elements to USWDS components
 */
export const mapElementsToUSWDS = (
	elements: DetectedElement[]
): Array<MappingResult | null> => {
	return elements.map((element) => mapElementToUSWDS(element));
};

/**
 * Get USWDS component class name with variant
 */
export const getUSWDSClassName = (component: USWDSComponent, variant?: string): string => {
	if (variant && component.variants) {
		return component.variants[variant] || component.className;
	}
	return component.className;
};
