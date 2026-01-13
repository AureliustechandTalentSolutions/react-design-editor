import { describe, it, expect } from 'vitest';

import { parseClaudeResponse, validateDesign, sanitizeObjects } from '../parsers';

describe('Response Parsers', () => {
	describe('parseClaudeResponse', () => {
		it('should extract JSON from Claude response text', () => {
			const response = 'Here is the design: {"objects": []}';
			const result = parseClaudeResponse(response);
			expect(result).toEqual({ objects: [] });
		});

		it('should handle complex JSON with nested objects', () => {
			const response = 'Design: {"objects": [{"type": "rect"}], "styles": {"color": "red"}}';
			const result = parseClaudeResponse(response);
			expect(result).toEqual({
				objects: [{ type: 'rect' }],
				styles: { color: 'red' },
			});
		});

		it('should throw on invalid JSON', () => {
			expect(() => parseClaudeResponse('invalid')).toThrow('No valid JSON found in response');
		});

		it('should throw on malformed JSON', () => {
			expect(() => parseClaudeResponse('{invalid json}')).toThrow('Failed to parse JSON');
		});
	});

	describe('validateDesign', () => {
		it('should validate a correct design structure', () => {
			const design = {
				objects: [{ type: 'rect', left: 0, top: 0 }],
				styles: {},
				colorPalette: ['#fff'],
			};
			expect(() => validateDesign(design)).not.toThrow();
		});

		it('should reject designs without objects array', () => {
			expect(() => validateDesign({})).toThrow('Design must have an objects array');
		});

		it('should reject non-object designs', () => {
			expect(() => validateDesign(null)).toThrow('Design must be an object');
			expect(() => validateDesign('string')).toThrow('Design must be an object');
		});

		it('should reject objects without type', () => {
			const design = {
				objects: [{ left: 0, top: 0 }],
			};
			expect(() => validateDesign(design)).toThrow('Object at index 0 must have a type');
		});

		it('should validate empty objects array', () => {
			const design = {
				objects: [],
			};
			expect(() => validateDesign(design)).not.toThrow();
		});
	});

	describe('sanitizeObjects', () => {
		it('should remove invalid fabric object properties', () => {
			const objects = [{ type: 'rect', malicious: 'code', left: 0 }];
			const sanitized = sanitizeObjects(objects);
			expect(sanitized[0]).not.toHaveProperty('malicious');
			expect(sanitized[0]).toHaveProperty('type', 'rect');
			expect(sanitized[0]).toHaveProperty('left', 0);
		});

		it('should keep all allowed properties', () => {
			const objects = [
				{
					type: 'rect',
					left: 10,
					top: 20,
					width: 100,
					height: 50,
					fill: '#ff0000',
					stroke: '#000',
					strokeWidth: 2,
					opacity: 0.8,
				},
			];
			const sanitized = sanitizeObjects(objects);
			expect(sanitized[0]).toEqual(objects[0]);
		});

		it('should handle multiple objects', () => {
			const objects = [
				{ type: 'rect', left: 0, dangerous: 'value' },
				{ type: 'circle', top: 10, malware: 'code' },
			];
			const sanitized = sanitizeObjects(objects);
			expect(sanitized).toHaveLength(2);
			expect(sanitized[0]).not.toHaveProperty('dangerous');
			expect(sanitized[1]).not.toHaveProperty('malware');
		});

		it('should handle text objects with allowed text properties', () => {
			const objects = [
				{
					type: 'textbox',
					text: 'Hello',
					fontSize: 16,
					fontFamily: 'Arial',
					fontWeight: 'bold',
					fontStyle: 'italic',
					textAlign: 'center',
					badProp: 'remove',
				},
			];
			const sanitized = sanitizeObjects(objects);
			expect(sanitized[0]).toHaveProperty('text', 'Hello');
			expect(sanitized[0]).toHaveProperty('fontSize', 16);
			expect(sanitized[0]).not.toHaveProperty('badProp');
		});

		it('should handle empty array', () => {
			const sanitized = sanitizeObjects([]);
			expect(sanitized).toEqual([]);
		});
	});
});
