/**
 * DndProvider Tests
 * Note: Full rendering tests skipped due to React 16/testing-library compatibility
 */

import { describe, it, expect } from 'vitest';

import DndProvider from '../DndProvider';

describe('DndProvider', () => {
	it('should export DndProvider component', () => {
		expect(DndProvider).toBeDefined();
		expect(typeof DndProvider).toBe('function');
	});

	it('should have correct display name', () => {
		expect(DndProvider.name).toBe('DndProvider');
	});
});
