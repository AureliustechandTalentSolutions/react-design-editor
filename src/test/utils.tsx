import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { vi } from 'vitest';

// Custom render with providers
export function renderWithProviders(ui: ReactElement) {
	return render(ui);
}

// Canvas mock
export const mockCanvasHandler = {
	add: vi.fn(),
	remove: vi.fn(),
	set: vi.fn(),
	getObjects: vi.fn(() => []),
	exportJSON: vi.fn(() => ({ objects: [] })),
	importJSON: vi.fn(),
	clear: vi.fn(),
	renderAll: vi.fn(),
	setWidth: vi.fn(),
	setHeight: vi.fn(),
	dispose: vi.fn(),
};
