/**
 * Layer Reducer Tests
 */

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
	describe('ADD_LAYER', () => {
		it('should add a new layer', () => {
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const newState = layerReducer(initialLayerState, {
				type: 'ADD_LAYER',
				payload: layer,
			});

			expect(newState.layers['layer-1']).toEqual(layer);
			expect(Object.keys(newState.layers).length).toBe(1);
		});

		it('should add multiple layers', () => {
			let state = initialLayerState;

			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'text',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			expect(Object.keys(state.layers).length).toBe(2);
			expect(state.layers['layer-1']).toEqual(layer1);
			expect(state.layers['layer-2']).toEqual(layer2);
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
		it('should remove a layer', () => {
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = layerReducer(initialLayerState, { type: 'ADD_LAYER', payload: layer });
			state = layerReducer(state, { type: 'REMOVE_LAYER', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1']).toBeUndefined();
			expect(Object.keys(state.layers).length).toBe(0);
		});

		it('should clear selectedLayerId when removing selected layer', () => {
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = layerReducer(initialLayerState, { type: 'ADD_LAYER', payload: layer });
			state = layerReducer(state, { type: 'SELECT_LAYER', payload: { id: 'layer-1' } });
			state = layerReducer(state, { type: 'REMOVE_LAYER', payload: { id: 'layer-1' } });

			expect(state.selectedLayerId).toBeUndefined();
		});

		it('should remove layer and its children', () => {
			const parent: Layer = {
				id: 'parent',
				name: 'Parent',
				type: 'group',
				visible: true,
				locked: false,
				zIndex: 0,
				children: ['child-1', 'child-2'],
			};

			const child1: Layer = {
				id: 'child-1',
				name: 'Child 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
				parentId: 'parent',
			};

			const child2: Layer = {
				id: 'child-2',
				name: 'Child 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
				parentId: 'parent',
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: parent });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: child1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: child2 });

			state = layerReducer(state, { type: 'REMOVE_LAYER', payload: { id: 'parent' } });

			expect(state.layers.parent).toBeUndefined();
			expect(state.layers['child-1']).toBeUndefined();
			expect(state.layers['child-2']).toBeUndefined();
		});
	});

	describe('UPDATE_LAYER', () => {
		it('should update layer properties', () => {
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = layerReducer(initialLayerState, { type: 'ADD_LAYER', payload: layer });
			state = layerReducer(state, {
				type: 'UPDATE_LAYER',
				payload: { id: 'layer-1', updates: { name: 'Updated Layer', visible: false } },
			});

			expect(state.layers['layer-1'].name).toBe('Updated Layer');
			expect(state.layers['layer-1'].visible).toBe(false);
			expect(state.layers['layer-1'].type).toBe('shape');
		});

		it('should not update non-existent layer', () => {
			const state = layerReducer(initialLayerState, {
				type: 'UPDATE_LAYER',
				payload: { id: 'non-existent', updates: { name: 'Test' } },
			});

			expect(state).toEqual(initialLayerState);
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
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = layerReducer(initialLayerState, { type: 'ADD_LAYER', payload: layer });
			state = layerReducer(state, { type: 'TOGGLE_VISIBILITY', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].visible).toBe(false);

			state = layerReducer(state, { type: 'TOGGLE_VISIBILITY', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].visible).toBe(true);
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
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = layerReducer(initialLayerState, { type: 'ADD_LAYER', payload: layer });
			state = layerReducer(state, { type: 'TOGGLE_LOCK', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].locked).toBe(true);

			state = layerReducer(state, { type: 'TOGGLE_LOCK', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].locked).toBe(false);
		});
	});

	describe('REORDER_LAYERS', () => {
		it('should reorder layers and recalculate z-indices', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			state = layerReducer(state, {
				type: 'REORDER_LAYERS',
				payload: { layerIds: ['layer-2', 'layer-1'] },
			});

			expect(state.layers['layer-2'].zIndex).toBe(0);
			expect(state.layers['layer-1'].zIndex).toBe(1);
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
		it('should bring layer to front', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			state = layerReducer(state, { type: 'BRING_TO_FRONT', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].zIndex).toBeGreaterThan(state.layers['layer-2'].zIndex);
		});
	});

	describe('SEND_TO_BACK', () => {
		it('should send layer to back', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			state = layerReducer(state, { type: 'SEND_TO_BACK', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].zIndex).toBeLessThan(state.layers['layer-2'].zIndex);
		});
	});

	describe('MOVE_UP', () => {
		it('should move layer up in z-index', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			const originalZIndex = state.layers['layer-1'].zIndex;
			state = layerReducer(state, { type: 'MOVE_UP', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].zIndex).toBeGreaterThan(originalZIndex);
		});

		it('should not move layer up if already at top', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });

			const originalZIndex = state.layers['layer-1'].zIndex;
			state = layerReducer(state, { type: 'MOVE_UP', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].zIndex).toBe(originalZIndex);
		});
	});

	describe('MOVE_DOWN', () => {
		it('should move layer down in z-index', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			const originalZIndex = state.layers['layer-2'].zIndex;
			state = layerReducer(state, { type: 'MOVE_DOWN', payload: { id: 'layer-2' } });

			expect(state.layers['layer-2'].zIndex).toBeLessThan(originalZIndex);
		});

		it('should not move layer down if already at bottom', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });

			const originalZIndex = state.layers['layer-1'].zIndex;
			state = layerReducer(state, { type: 'MOVE_DOWN', payload: { id: 'layer-1' } });

			expect(state.layers['layer-1'].zIndex).toBe(originalZIndex);
		});
	});

	describe('GROUP_LAYERS', () => {
		it('should group multiple layers', () => {
			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			let state = initialLayerState;
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			state = layerReducer(state, {
				type: 'GROUP_LAYERS',
				payload: {
					layerIds: ['layer-1', 'layer-2'],
					groupId: 'group-1',
					groupName: 'Test Group',
				},
			});

			expect(state.layers['group-1']).toBeDefined();
			expect(state.layers['group-1'].type).toBe('group');
			expect(state.layers['group-1'].children).toEqual(['layer-1', 'layer-2']);
			expect(state.layers['layer-1'].parentId).toBe('group-1');
			expect(state.layers['layer-2'].parentId).toBe('group-1');
		});
	});

	describe('UNGROUP_LAYER', () => {
		it('should ungroup layers', () => {
			let state = initialLayerState;

			const layer1: Layer = {
				id: 'layer-1',
				name: 'Layer 1',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			const layer2: Layer = {
				id: 'layer-2',
				name: 'Layer 2',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 1,
			};

			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer1 });
			state = layerReducer(state, { type: 'ADD_LAYER', payload: layer2 });

			state = layerReducer(state, {
				type: 'GROUP_LAYERS',
				payload: {
					layerIds: ['layer-1', 'layer-2'],
					groupId: 'group-1',
					groupName: 'Test Group',
				},
			});

			state = layerReducer(state, { type: 'UNGROUP_LAYER', payload: { id: 'group-1' } });

			expect(state.layers['group-1']).toBeUndefined();
			expect(state.layers['layer-1'].parentId).toBeUndefined();
			expect(state.layers['layer-2'].parentId).toBeUndefined();
		});
	});

	describe('SELECT_LAYER', () => {
		it('should select a layer', () => {
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = layerReducer(initialLayerState, { type: 'ADD_LAYER', payload: layer });
			state = layerReducer(state, { type: 'SELECT_LAYER', payload: { id: 'layer-1' } });

			expect(state.selectedLayerId).toBe('layer-1');
		});

		it('should deselect layer', () => {
			const layer: Layer = {
				id: 'layer-1',
				name: 'Test Layer',
				type: 'shape',
				visible: true,
				locked: false,
				zIndex: 0,
			};

			let state = layerReducer(initialLayerState, { type: 'ADD_LAYER', payload: layer });
			state = layerReducer(state, { type: 'SELECT_LAYER', payload: { id: 'layer-1' } });
			state = layerReducer(state, { type: 'SELECT_LAYER', payload: { id: undefined } });

			expect(state.selectedLayerId).toBeUndefined();
		});
	});
});
