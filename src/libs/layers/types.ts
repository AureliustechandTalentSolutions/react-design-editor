/**
 * Layer Types & Interfaces
 */

export type LayerType = 'shape' | 'text' | 'image' | 'group' | 'component';

export interface Layer {
	id: string;
	name: string;
	type: LayerType;
	visible: boolean;
	locked: boolean;
	zIndex: number;
	parentId?: string;
	children?: string[];
}

export interface LayerState {
	layers: Record<string, Layer>;
	selectedLayerId?: string;
}

export type LayerAction =
	| { type: 'ADD_LAYER'; payload: Layer }
	| { type: 'REMOVE_LAYER'; payload: { id: string } }
	| { type: 'UPDATE_LAYER'; payload: { id: string; updates: Partial<Layer> } }
	| { type: 'REORDER_LAYERS'; payload: { layerIds: string[] } }
	| { type: 'TOGGLE_VISIBILITY'; payload: { id: string } }
	| { type: 'TOGGLE_LOCK'; payload: { id: string } }
	| { type: 'BRING_TO_FRONT'; payload: { id: string } }
	| { type: 'SEND_TO_BACK'; payload: { id: string } }
	| { type: 'MOVE_UP'; payload: { id: string } }
	| { type: 'MOVE_DOWN'; payload: { id: string } }
	| { type: 'GROUP_LAYERS'; payload: { layerIds: string[]; groupId: string; groupName: string } }
	| { type: 'UNGROUP_LAYER'; payload: { id: string } }
	| { type: 'SELECT_LAYER'; payload: { id?: string } };
