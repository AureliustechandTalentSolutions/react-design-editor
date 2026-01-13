/**
 * SortableItem Tests
 * Note: Full rendering tests skipped due to React 16/testing-library compatibility
 */

import { describe, it, expect } from 'vitest';

import SortableItem from '../SortableItem';

describe('SortableItem', () => {
	it('should export SortableItem component', () => {
		expect(SortableItem).toBeDefined();
		expect(typeof SortableItem).toBe('function');
	});

	it('should have correct display name', () => {
		expect(SortableItem.name).toBe('SortableItem');
	});
});
