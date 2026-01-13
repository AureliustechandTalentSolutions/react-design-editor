/**
 * LayerPanel Tests
 * Note: Full rendering tests skipped due to React 16/testing-library compatibility
 */

import { describe, it, expect } from 'vitest';

import LayerPanel from '../LayersPanel';

describe('LayerPanel', () => {
	it('should export LayerPanel component', () => {
		expect(LayerPanel).toBeDefined();
		expect(typeof LayerPanel).toBe('function');
	});

	it('should have correct display name', () => {
		expect(LayerPanel.name).toBe('LayerPanel');
	});
});
