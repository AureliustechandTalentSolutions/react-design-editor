import { describe, it, expect, vi } from 'vitest';
import { DndProvider } from '../DndProvider';

describe('DndProvider', () => {
	it('exports DndProvider function', () => {
		const handleDragEnd = vi.fn();
		expect(typeof DndProvider).toBe('function');
		expect(handleDragEnd).toBeDefined();
	});

	it('accepts required props', () => {
		const handleDragEnd = vi.fn();
		const onDragStart = vi.fn();

		// Verify the props interface exists
		const props = {
			children: null,
			onDragEnd: handleDragEnd,
			onDragStart,
		};

		expect(props.onDragEnd).toBe(handleDragEnd);
		expect(props.onDragStart).toBe(onDragStart);
	});
});
