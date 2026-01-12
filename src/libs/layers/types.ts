export interface Layer {
	id: string;
	name: string;
	type: 'shape' | 'text' | 'image' | 'group' | 'component';
	visible: boolean;
	locked: boolean;
	zIndex: number;
	parentId?: string;
	children?: string[];
	fabricObject?: fabric.Object;
}

export interface LayerState {
	layers: Layer[];
	selectedLayerId: string | null;
	expandedGroups: Set<string>;
}

export type LayerAction =
	| { type: 'ADD_LAYER'; payload: Layer }
	| { type: 'REMOVE_LAYER'; payload: string }
	| { type: 'UPDATE_LAYER'; payload: { id: string; updates: Partial<Layer> } }
	| { type: 'REORDER_LAYERS'; payload: { sourceId: string; targetId: string } }
	| { type: 'SELECT_LAYER'; payload: string | null }
	| { type: 'TOGGLE_VISIBILITY'; payload: string }
	| { type: 'TOGGLE_LOCK'; payload: string }
	| { type: 'GROUP_LAYERS'; payload: string[] }
	| { type: 'UNGROUP_LAYER'; payload: string }
	| { type: 'BRING_TO_FRONT'; payload: string }
	| { type: 'SEND_TO_BACK'; payload: string }
	| { type: 'MOVE_UP'; payload: string }
	| { type: 'MOVE_DOWN'; payload: string };
