import { describe, it, expect } from 'vitest';

import { layerReducer, initialLayerState } from '../layerReducer';
import { Layer } from '../types';

describe('layerReducer', () => {
	const mockLayer: Layer = {
		id: 'layer-1',
		name: 'Test Layer',
		type: 'shape',
		visible: true,
		locked: false,
		zIndex: 0,
	};

	describe('ADD_LAYER', () => {
		it('should add a new layer', () => {
			const state = layerReducer(initialLayerState, {
				type: 'ADD_LAYER',
				payload: mockLayer,
			});

			expect(state.layers).toHaveLength(1);
			expect(state.layers[0]).toEqual(mockLayer);
		});
	});

	describe('REMOVE_LAYER', () => {
		it('should remove a layer by id', () => {
			const stateWithLayer = { ...initialLayerState, layers: [mockLayer] };
			const state = layerReducer(stateWithLayer, {
				type: 'REMOVE_LAYER',
				payload: 'layer-1',
			});

			expect(state.layers).toHaveLength(0);
		});
	});

	describe('TOGGLE_VISIBILITY', () => {
		it('should toggle layer visibility', () => {
			const stateWithLayer = { ...initialLayerState, layers: [mockLayer] };
			const state = layerReducer(stateWithLayer, {
				type: 'TOGGLE_VISIBILITY',
				payload: 'layer-1',
			});

			expect(state.layers[0].visible).toBe(false);
		});
	});

	describe('TOGGLE_LOCK', () => {
		it('should toggle layer lock state', () => {
			const stateWithLayer = { ...initialLayerState, layers: [mockLayer] };
			const state = layerReducer(stateWithLayer, {
				type: 'TOGGLE_LOCK',
				payload: 'layer-1',
			});

			expect(state.layers[0].locked).toBe(true);
		});
	});

	describe('BRING_TO_FRONT', () => {
		it('should set highest z-index', () => {
			const layers = [
				{ ...mockLayer, id: 'layer-1', zIndex: 0 },
				{ ...mockLayer, id: 'layer-2', zIndex: 1 },
			];
			const stateWithLayers = { ...initialLayerState, layers };

			const state = layerReducer(stateWithLayers, {
				type: 'BRING_TO_FRONT',
				payload: 'layer-1',
			});

			expect(state.layers.find(l => l.id === 'layer-1')?.zIndex).toBe(2);
		});
	});
});
