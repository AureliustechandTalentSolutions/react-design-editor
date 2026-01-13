/**
 * Layer Reducer
 * Manages layer state with all CRUD and ordering operations
 */

import { LayerState, LayerAction, Layer } from './types';

export const initialLayerState: LayerState = {
	layers: {},
	selectedLayerId: undefined,
};

export function layerReducer(state: LayerState, action: LayerAction): LayerState {
	switch (action.type) {
		case 'ADD_LAYER': {
			const newLayer = action.payload;
			return {
				...state,
				layers: {
					...state.layers,
					[newLayer.id]: newLayer,
				},
			};
		}

		case 'REMOVE_LAYER': {
			const { id } = action.payload;
			const newLayers = { ...state.layers };
			const layerToRemove = newLayers[id];

			if (layerToRemove) {
				// Remove from parent's children if it has a parent
				if (layerToRemove.parentId) {
					const parent = newLayers[layerToRemove.parentId];
					if (parent && parent.children) {
						parent.children = parent.children.filter(childId => childId !== id);
					}
				}

				// If layer has children, remove them too
				if (layerToRemove.children) {
					layerToRemove.children.forEach(childId => {
						delete newLayers[childId];
					});
				}

				delete newLayers[id];
			}

			return {
				...state,
				layers: newLayers,
				selectedLayerId: state.selectedLayerId === id ? undefined : state.selectedLayerId,
			};
		}

		case 'UPDATE_LAYER': {
			const { id, updates } = action.payload;
			if (!state.layers[id]) {
				return state;
			}
			return {
				...state,
				layers: {
					...state.layers,
					[id]: {
						...state.layers[id],
						...updates,
					},
				},
			};
		}

		case 'REORDER_LAYERS': {
			const { layerIds } = action.payload;
			const newLayers = { ...state.layers };

			// Recalculate z-index based on new order
			layerIds.forEach((layerId, index) => {
				if (newLayers[layerId]) {
					newLayers[layerId] = {
						...newLayers[layerId],
						zIndex: index,
					};
				}
			});

			return {
				...state,
				layers: newLayers,
			};
		}

		case 'TOGGLE_VISIBILITY': {
			const { id } = action.payload;
			if (!state.layers[id]) {
				return state;
			}
			return {
				...state,
				layers: {
					...state.layers,
					[id]: {
						...state.layers[id],
						visible: !state.layers[id].visible,
					},
				},
			};
		}

		case 'TOGGLE_LOCK': {
			const { id } = action.payload;
			if (!state.layers[id]) {
				return state;
			}
			return {
				...state,
				layers: {
					...state.layers,
					[id]: {
						...state.layers[id],
						locked: !state.layers[id].locked,
					},
				},
			};
		}

		case 'BRING_TO_FRONT': {
			const { id } = action.payload;
			if (!state.layers[id]) {
				return state;
			}

			const layerArray = Object.values(state.layers).sort((a, b) => a.zIndex - b.zIndex);
			const maxZIndex = Math.max(...layerArray.map(l => l.zIndex), 0);

			return {
				...state,
				layers: {
					...state.layers,
					[id]: {
						...state.layers[id],
						zIndex: maxZIndex + 1,
					},
				},
			};
		}

		case 'SEND_TO_BACK': {
			const { id } = action.payload;
			if (!state.layers[id]) {
				return state;
			}

			const layerArray = Object.values(state.layers).sort((a, b) => a.zIndex - b.zIndex);
			const minZIndex = Math.min(...layerArray.map(l => l.zIndex), 0);

			return {
				...state,
				layers: {
					...state.layers,
					[id]: {
						...state.layers[id],
						zIndex: minZIndex - 1,
					},
				},
			};
		}

		case 'MOVE_UP': {
			const { id } = action.payload;
			if (!state.layers[id]) {
				return state;
			}

			const currentLayer = state.layers[id];
			const layerArray = Object.values(state.layers)
				.filter(l => !l.parentId || l.parentId === currentLayer.parentId)
				.sort((a, b) => a.zIndex - b.zIndex);

			const currentIndex = layerArray.findIndex(l => l.id === id);
			if (currentIndex < layerArray.length - 1) {
				const nextLayer = layerArray[currentIndex + 1];
				const newLayers = { ...state.layers };

				// Swap z-indices
				newLayers[id] = { ...currentLayer, zIndex: nextLayer.zIndex };
				newLayers[nextLayer.id] = { ...nextLayer, zIndex: currentLayer.zIndex };

				return {
					...state,
					layers: newLayers,
				};
			}

			return state;
		}

		case 'MOVE_DOWN': {
			const { id } = action.payload;
			if (!state.layers[id]) {
				return state;
			}

			const currentLayer = state.layers[id];
			const layerArray = Object.values(state.layers)
				.filter(l => !l.parentId || l.parentId === currentLayer.parentId)
				.sort((a, b) => a.zIndex - b.zIndex);

			const currentIndex = layerArray.findIndex(l => l.id === id);
			if (currentIndex > 0) {
				const prevLayer = layerArray[currentIndex - 1];
				const newLayers = { ...state.layers };

				// Swap z-indices
				newLayers[id] = { ...currentLayer, zIndex: prevLayer.zIndex };
				newLayers[prevLayer.id] = { ...prevLayer, zIndex: currentLayer.zIndex };

				return {
					...state,
					layers: newLayers,
				};
			}

			return state;
		}

		case 'GROUP_LAYERS': {
			const { layerIds, groupId, groupName } = action.payload;
			const newLayers = { ...state.layers };

			// Create group layer
			const groupZIndex = Math.max(...layerIds.map(id => newLayers[id]?.zIndex || 0), 0);

			const groupLayer: Layer = {
				id: groupId,
				name: groupName,
				type: 'group',
				visible: true,
				locked: false,
				zIndex: groupZIndex,
				children: layerIds,
			};

			newLayers[groupId] = groupLayer;

			// Update children to reference parent
			layerIds.forEach(layerId => {
				if (newLayers[layerId]) {
					newLayers[layerId] = {
						...newLayers[layerId],
						parentId: groupId,
					};
				}
			});

			return {
				...state,
				layers: newLayers,
			};
		}

		case 'UNGROUP_LAYER': {
			const { id } = action.payload;
			const groupLayer = state.layers[id];

			if (!groupLayer || groupLayer.type !== 'group' || !groupLayer.children) {
				return state;
			}

			const newLayers = { ...state.layers };

			// Remove parent reference from children
			groupLayer.children.forEach(childId => {
				if (newLayers[childId]) {
					const child = { ...newLayers[childId] };
					delete child.parentId;
					newLayers[childId] = child;
				}
			});

			// Remove group layer
			delete newLayers[id];

			return {
				...state,
				layers: newLayers,
				selectedLayerId: state.selectedLayerId === id ? undefined : state.selectedLayerId,
			};
		}

		case 'SELECT_LAYER': {
			return {
				...state,
				selectedLayerId: action.payload.id,
			};
		}

		default:
			return state;
	}
}
