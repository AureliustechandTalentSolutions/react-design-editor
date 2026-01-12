import { LayerState, LayerAction } from './types';

export const initialLayerState: LayerState = {
	layers: [],
	selectedLayerId: null,
	expandedGroups: new Set(),
};

export function layerReducer(state: LayerState, action: LayerAction): LayerState {
	switch (action.type) {
		case 'ADD_LAYER':
			return {
				...state,
				layers: [...state.layers, action.payload],
			};

		case 'REMOVE_LAYER':
			return {
				...state,
				layers: state.layers.filter((l) => l.id !== action.payload),
				selectedLayerId:
					state.selectedLayerId === action.payload ? null : state.selectedLayerId,
			};

		case 'UPDATE_LAYER':
			return {
				...state,
				layers: state.layers.map((l) =>
					l.id === action.payload.id ? { ...l, ...action.payload.updates } : l
				),
			};

		case 'REORDER_LAYERS': {
			const { sourceId, targetId } = action.payload;
			const layers = [...state.layers];
			const sourceIndex = layers.findIndex((l) => l.id === sourceId);
			const targetIndex = layers.findIndex((l) => l.id === targetId);

			if (sourceIndex === -1 || targetIndex === -1) return state;

			const [removed] = layers.splice(sourceIndex, 1);
			layers.splice(targetIndex, 0, removed);

			// Update z-indices
			const reindexed = layers.map((l, i) => ({ ...l, zIndex: i }));

			return { ...state, layers: reindexed };
		}

		case 'SELECT_LAYER':
			return { ...state, selectedLayerId: action.payload };

		case 'TOGGLE_VISIBILITY':
			return {
				...state,
				layers: state.layers.map((l) =>
					l.id === action.payload ? { ...l, visible: !l.visible } : l
				),
			};

		case 'TOGGLE_LOCK':
			return {
				...state,
				layers: state.layers.map((l) =>
					l.id === action.payload ? { ...l, locked: !l.locked } : l
				),
			};

		case 'BRING_TO_FRONT': {
			if (state.layers.length === 0) return state;
			const maxZ = Math.max(...state.layers.map((l) => l.zIndex));
			return {
				...state,
				layers: state.layers.map((l) =>
					l.id === action.payload ? { ...l, zIndex: maxZ + 1 } : l
				),
			};
		}

		case 'SEND_TO_BACK': {
			if (state.layers.length === 0) return state;
			const minZ = Math.min(...state.layers.map((l) => l.zIndex));
			return {
				...state,
				layers: state.layers.map((l) =>
					l.id === action.payload ? { ...l, zIndex: minZ - 1 } : l
				),
			};
		}

		default:
			return state;
	}
}
