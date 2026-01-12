/**
 * Parse Claude AI response and extract design JSON
 */
export function parseClaudeResponse(response: string): any {
	// Try to extract JSON from response text
	const jsonMatch = response.match(/\{[\s\S]*\}/);
	if (!jsonMatch) {
		throw new Error('No valid JSON found in response');
	}

	try {
		return JSON.parse(jsonMatch[0]);
	} catch (error) {
		throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

/**
 * Validate design structure
 */
export function validateDesign(design: any): void {
	if (!design || typeof design !== 'object') {
		throw new Error('Design must be an object');
	}

	if (!Array.isArray(design.objects)) {
		throw new Error('Design must have an objects array');
	}

	// Validate each object has required properties
	design.objects.forEach((obj: any, index: number) => {
		if (!obj.type) {
			throw new Error(`Object at index ${index} must have a type`);
		}
	});
}

/**
 * Sanitize fabric objects by removing potentially dangerous properties
 */
export function sanitizeObjects(objects: any[]): any[] {
	const allowedProps = [
		'type',
		'left',
		'top',
		'width',
		'height',
		'fill',
		'stroke',
		'strokeWidth',
		'opacity',
		'angle',
		'scaleX',
		'scaleY',
		'flipX',
		'flipY',
		'originX',
		'originY',
		'rx',
		'ry',
		'text',
		'fontSize',
		'fontFamily',
		'fontWeight',
		'fontStyle',
		'textAlign',
		'lineHeight',
		'charSpacing',
		'src',
		'filters',
		'shadow',
		'visible',
		'selectable',
		'evented',
		'hasControls',
		'hasBorders',
		'radius',
		'startAngle',
		'endAngle',
		'points',
		'path',
		'pathOffset',
		'objects', // for groups
	];

	return objects.map(obj => {
		const sanitized: any = {};
		Object.keys(obj).forEach(key => {
			if (allowedProps.includes(key)) {
				sanitized[key] = obj[key];
			}
		});
		return sanitized;
	});
}
