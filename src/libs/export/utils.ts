/**
 * Export Utilities
 * Shared utilities for code export
 */

/**
 * Convert Fabric.js object to CSS properties
 */
export const fabricToCSS = (obj: any): Record<string, string> => {
	const css: Record<string, string> = {};

	if (obj.width) css.width = `${obj.width}px`;
	if (obj.height) css.height = `${obj.height}px`;
	if (obj.fill) css.backgroundColor = obj.fill;
	if (obj.stroke) css.border = `${obj.strokeWidth || 1}px solid ${obj.stroke}`;
	if (obj.rx || obj.ry) css.borderRadius = `${obj.rx || obj.ry || 0}px`;
	if (obj.shadow) css.boxShadow = obj.shadow;
	if (obj.fontSize) css.fontSize = `${obj.fontSize}px`;
	if (obj.fontFamily) css.fontFamily = obj.fontFamily;
	if (obj.fontWeight) css.fontWeight = `${obj.fontWeight}`;

	return css;
};

/**
 * Convert CSS object to string
 */
export const cssObjectToString = (css: Record<string, string>, indent: string = '  '): string => {
	return Object.entries(css)
		.map(([key, value]) => `${indent}${camelToKebab(key)}: ${value};`)
		.join('\n');
};

/**
 * Convert camelCase to kebab-case
 */
export const camelToKebab = (str: string): string => {
	return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Convert kebab-case to camelCase
 */
export const kebabToCamel = (str: string): string => {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

/**
 * Convert kebab-case to PascalCase
 */
export const kebabToPascal = (str: string): string => {
	const camel = kebabToCamel(str);
	return camel.charAt(0).toUpperCase() + camel.slice(1);
};

/**
 * Sanitize component name
 */
export const sanitizeComponentName = (name: string): string => {
	return name
		.replace(/[^a-zA-Z0-9-_]/g, '')
		.replace(/^[0-9]/, '_$&')
		.replace(/^-/, '_');
};

/**
 * Generate unique ID
 */
export const generateId = (prefix: string = 'el'): string => {
	return `${prefix}_${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Indent text
 */
export const indent = (text: string, level: number, char: string = '  '): string => {
	const indentation = char.repeat(level);
	return text
		.split('\n')
		.map(line => (line.trim() ? indentation + line : line))
		.join('\n');
};

/**
 * Get Tailwind class for color
 */
export const colorToTailwind = (color: string): string => {
	const colorMap: Record<string, string> = {
		'#3b82f6': 'blue-500',
		'#6366f1': 'indigo-500',
		'#8b5cf6': 'violet-500',
		'#ec4899': 'pink-500',
		'#f59e0b': 'amber-500',
		'#10b981': 'emerald-500',
		'#ffffff': 'white',
		'#000000': 'black',
		'#f9fafb': 'gray-50',
		'#1f2937': 'gray-800',
	};

	return colorMap[color.toLowerCase()] || 'gray-500';
};

/**
 * Get Tailwind classes from Fabric object
 */
export const fabricToTailwind = (obj: any): string[] => {
	const classes: string[] = [];

	// Spacing
	if (obj.width) classes.push(`w-[${obj.width}px]`);
	if (obj.height) classes.push(`h-[${obj.height}px]`);

	// Colors
	if (obj.fill) classes.push(`bg-${colorToTailwind(obj.fill)}`);
	if (obj.stroke) classes.push(`border-${colorToTailwind(obj.stroke)}`);

	// Border
	if (obj.strokeWidth) classes.push(`border-${obj.strokeWidth}`);
	if (obj.rx || obj.ry) {
		const radius = obj.rx || obj.ry;
		if (radius <= 4) classes.push('rounded-sm');
		else if (radius <= 8) classes.push('rounded');
		else if (radius <= 12) classes.push('rounded-lg');
		else if (radius <= 16) classes.push('rounded-xl');
		else classes.push('rounded-2xl');
	}

	// Shadow
	if (obj.shadow) {
		if (obj.shadow.includes('2px')) classes.push('shadow-sm');
		else if (obj.shadow.includes('4px')) classes.push('shadow');
		else if (obj.shadow.includes('10px')) classes.push('shadow-md');
		else if (obj.shadow.includes('20px')) classes.push('shadow-lg');
		else classes.push('shadow-xl');
	}

	// Typography
	if (obj.fontSize) {
		if (obj.fontSize <= 12) classes.push('text-xs');
		else if (obj.fontSize <= 14) classes.push('text-sm');
		else if (obj.fontSize <= 16) classes.push('text-base');
		else if (obj.fontSize <= 18) classes.push('text-lg');
		else if (obj.fontSize <= 20) classes.push('text-xl');
		else if (obj.fontSize <= 24) classes.push('text-2xl');
		else if (obj.fontSize <= 30) classes.push('text-3xl');
		else classes.push('text-4xl');
	}

	if (obj.fontWeight) {
		if (obj.fontWeight <= 300) classes.push('font-light');
		else if (obj.fontWeight <= 400) classes.push('font-normal');
		else if (obj.fontWeight <= 500) classes.push('font-medium');
		else if (obj.fontWeight <= 600) classes.push('font-semibold');
		else classes.push('font-bold');
	}

	return classes;
};

/**
 * Clean and format code
 */
export const formatCode = (code: string): string => {
	// Basic code formatting
	return code
		.replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
		.replace(/\t/g, '  ') // Convert tabs to spaces
		.trim();
};
