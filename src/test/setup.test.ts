import { describe, it, expect } from 'vitest';

describe('Setup Test', () => {
	it('should run a basic test', () => {
		expect(true).toBe(true);
	});

	it('should have access to test environment', () => {
		expect(typeof window).toBe('object');
	});
});
