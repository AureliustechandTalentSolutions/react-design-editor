/**
 * Response Parsers
 * Parse and validate Claude AI responses for Fabric.js compatibility
 */

import { GeneratedDesign } from '../../types/aiui';

/**
 * Parse Claude response to extract JSON
 */
export const parseClaudeResponse = (response: string): any => {
	try {
		// Try direct JSON parse first
		return JSON.parse(response);
	} catch (e) {
		// Try to extract JSON from markdown code blocks
		const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
		if (jsonMatch) {
			try {
				return JSON.parse(jsonMatch[1]);
			} catch (innerE) {
				throw new Error('Failed to parse JSON from code block');
			}
		}

		// Try to find JSON object in the response
		const objectMatch = response.match(/\{[\s\S]*\}/);
		if (objectMatch) {
			try {
				return JSON.parse(objectMatch[0]);
			} catch (innerE) {
				throw new Error('Failed to parse JSON object from response');
			}
		}

		throw new Error('No valid JSON found in response');
	}
};

/**
 * Validate generated design structure
 */
export const validateGeneratedDesign = (data: any): GeneratedDesign => {
	if (!data || typeof data !== 'object') {
		throw new Error('Invalid design data: not an object');
	}

	if (!data.design || typeof data.design !== 'object') {
		throw new Error('Invalid design data: missing design property');
	}

	if (!Array.isArray(data.design.objects)) {
		throw new Error('Invalid design data: design.objects must be an array');
	}

	if (!Array.isArray(data.colorPalette)) {
		data.colorPalette = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
	}

	if (!data.metadata || typeof data.metadata !== 'object') {
		data.metadata = {
			screenName: 'Generated Design',
			description: 'AI generated UI design',
			components: [],
		};
	}

	if (!data.styles || typeof data.styles !== 'object') {
		data.styles = {};
	}

	return data as GeneratedDesign;
};

/**
 * Validate and fix Fabric.js object
 */
export const validateFabricObject = (obj: any): any => {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	// Ensure numeric values are numbers, not strings
	const numericProps = ['left', 'top', 'width', 'height', 'fontSize', 'strokeWidth', 'rx', 'ry'];
	numericProps.forEach(prop => {
		if (obj[prop] !== undefined) {
			const parsed = parseFloat(obj[prop]);
			obj[prop] = isNaN(parsed) ? 0 : parsed;
		}
	});

	// Ensure required properties exist
	if (obj.type === 'text' && !obj.text) {
		obj.text = 'Text';
	}

	if ((obj.type === 'rect' || obj.type === 'circle') && !obj.fill) {
		obj.fill = '#ffffff';
	}

	// Recursively validate grouped objects
	if (obj.type === 'group' && Array.isArray(obj.objects)) {
		obj.objects = obj.objects.map(validateFabricObject).filter(Boolean);
	}

	return obj;
};

/**
 * Parse and validate complete design
 */
export const parseAndValidateDesign = (response: string): GeneratedDesign => {
	const parsed = parseClaudeResponse(response);
	const validated = validateGeneratedDesign(parsed);

	// Validate all objects in the design
	validated.design.objects = validated.design.objects.map(validateFabricObject).filter(Boolean);

	return validated;
};

/**
 * Create a fallback/mock design for demo mode
 */
export const createMockDesign = (prompt: string): GeneratedDesign => {
	return {
		design: {
			objects: [
				{
					type: 'rect',
					left: 50,
					top: 50,
					width: 700,
					height: 500,
					fill: '#ffffff',
					stroke: '#e5e7eb',
					strokeWidth: 1,
					rx: 12,
					ry: 12,
					shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
				},
				{
					type: 'text',
					left: 100,
					top: 100,
					text: 'AI Generated Design',
					fontSize: 32,
					fontFamily: 'Inter, sans-serif',
					fontWeight: 700,
					fill: '#1f2937',
				},
				{
					type: 'text',
					left: 100,
					top: 150,
					text: 'This is a demo design. Connect an API key for full functionality.',
					fontSize: 16,
					fontFamily: 'Inter, sans-serif',
					fill: '#6b7280',
				},
				{
					type: 'text',
					left: 100,
					top: 200,
					text: `Prompt: ${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}`,
					fontSize: 14,
					fontFamily: 'Inter, sans-serif',
					fill: '#9ca3af',
				},
				{
					type: 'rect',
					left: 100,
					top: 250,
					width: 150,
					height: 45,
					fill: '#3b82f6',
					rx: 8,
					ry: 8,
				},
				{
					type: 'text',
					left: 135,
					top: 262,
					text: 'Get Started',
					fontSize: 16,
					fontFamily: 'Inter, sans-serif',
					fontWeight: 600,
					fill: '#ffffff',
				},
			],
			background: '#f9fafb',
		},
		styles: {
			primary: '#3b82f6',
			secondary: '#6366f1',
			text: '#1f2937',
		},
		colorPalette: ['#3b82f6', '#6366f1', '#8b5cf6', '#1f2937', '#f9fafb'],
		metadata: {
			screenName: 'Demo Design',
			description: 'Mock design for demonstration',
			components: ['container', 'heading', 'text', 'button'],
		},
	};
};

/**
 * Handle parse errors with fallback
 */
export const safeParseDesign = (response: string, prompt: string): GeneratedDesign => {
	try {
		return parseAndValidateDesign(response);
	} catch (error) {
		console.error('Failed to parse design:', error);
		return createMockDesign(prompt);
	}
};
