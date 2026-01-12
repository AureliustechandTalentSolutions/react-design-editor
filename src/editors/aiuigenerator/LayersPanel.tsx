/**
 * Enhanced Layers Panel
 * Full-featured layer management with drag-and-drop reordering
 * Features: visibility toggle, lock toggle, z-index management, layer type icons
 */

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Card, Button, Tooltip, Icon } from 'antd';
import React, { useReducer, useEffect } from 'react';

import { SortableItem } from '@/libs/dnd';
import { layerReducer, initialLayerState, Layer, LayerType } from '@/libs/layers';

interface IProps {
	objects?: any[];
	onSelectObject?: (objectId: string) => void;
	onLayersChange?: (layers: Layer[]) => void;
}

const getLayerIcon = (type: LayerType) => {
	switch (type) {
		case 'shape':
			return 'border';
		case 'text':
			return 'font-size';
		case 'image':
			return 'file-image';
		case 'group':
			return 'group';
		case 'component':
			return 'appstore';
		default:
			return 'border';
	}
};

const getLayerType = (objType?: string): LayerType => {
	if (!objType) return 'shape';
	if (objType.includes('text') || objType === 'i-text' || objType === 'textbox') return 'text';
	if (objType === 'image' || objType.includes('image')) return 'image';
	if (objType === 'group') return 'group';
	return 'shape';
};

export const LayerPanel: React.FC<IProps> = ({ objects, onSelectObject, onLayersChange }) => {
	const [state, dispatch] = useReducer(layerReducer, initialLayerState);

	// Initialize layers from objects
	useEffect(() => {
		if (objects && objects.length > 0) {
			objects.forEach((obj, index) => {
				const layerId = obj.id || `layer-${index}`;
				if (!state.layers[layerId]) {
					const layer: Layer = {
						id: layerId,
						name: obj.name || `${obj.type || 'Object'} ${index + 1}`,
						type: getLayerType(obj.type),
						visible: obj.visible !== false,
						locked: obj.selectable === false,
						zIndex: index,
					};
					dispatch({ type: 'ADD_LAYER', payload: layer });
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [objects]);

	// Notify parent of layer changes
	useEffect(() => {
		if (onLayersChange) {
			const layerArray = Object.values(state.layers).sort((a, b) => b.zIndex - a.zIndex);
			onLayersChange(layerArray);
		}
	}, [state.layers, onLayersChange]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const layerArray = Object.values(state.layers)
				.filter(l => !l.parentId)
				.sort((a, b) => a.zIndex - b.zIndex);

			const oldIndex = layerArray.findIndex(l => l.id === active.id);
			const newIndex = layerArray.findIndex(l => l.id === over.id);

			if (oldIndex !== -1 && newIndex !== -1) {
				const reorderedLayers = arrayMove(layerArray, oldIndex, newIndex);
				const layerIds = reorderedLayers.map(l => l.id);
				dispatch({ type: 'REORDER_LAYERS', payload: { layerIds } });
			}
		}
	};

	const handleToggleVisibility = (id: string, event: React.MouseEvent) => {
		event.stopPropagation();
		dispatch({ type: 'TOGGLE_VISIBILITY', payload: { id } });
	};

	const handleToggleLock = (id: string, event: React.MouseEvent) => {
		event.stopPropagation();
		dispatch({ type: 'TOGGLE_LOCK', payload: { id } });
	};

	const handleBringToFront = (id: string, event: React.MouseEvent) => {
		event.stopPropagation();
		dispatch({ type: 'BRING_TO_FRONT', payload: { id } });
	};

	const handleSendToBack = (id: string, event: React.MouseEvent) => {
		event.stopPropagation();
		dispatch({ type: 'SEND_TO_BACK', payload: { id } });
	};

	const handleSelectLayer = (id: string) => {
		dispatch({ type: 'SELECT_LAYER', payload: { id } });
		if (onSelectObject) {
			onSelectObject(id);
		}
	};

	const layerArray = Object.values(state.layers)
		.filter(l => !l.parentId)
		.sort((a, b) => b.zIndex - a.zIndex);

	if (layerArray.length === 0) {
		return (
			<div style={{ padding: 16 }}>
				<Card title="Layers">
					<div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
						<div>No objects in design</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div style={{ padding: 16 }}>
			<Card title="Layers">
				<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
					<SortableContext items={layerArray.map(l => l.id)} strategy={verticalListSortingStrategy}>
						<div style={{ maxHeight: '500px', overflowY: 'auto' }}>
							{layerArray.map(layer => (
								<SortableItem key={layer.id} id={layer.id} disabled={layer.locked}>
									<div
										role="button"
										tabIndex={0}
										onClick={() => handleSelectLayer(layer.id)}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												handleSelectLayer(layer.id);
											}
										}}
										style={{
											display: 'flex',
											alignItems: 'center',
											padding: '8px',
											marginBottom: '4px',
											backgroundColor: state.selectedLayerId === layer.id ? '#e6f7ff' : '#fff',
											border: '1px solid #d9d9d9',
											borderRadius: '4px',
											cursor: layer.locked ? 'not-allowed' : 'pointer',
											opacity: layer.visible ? 1 : 0.5,
										}}
									>
										<span style={{ marginRight: 8, fontSize: 16 }}>
											<Icon type={getLayerIcon(layer.type)} />
										</span>
										<span style={{ flex: 1, fontSize: 14 }}>{layer.name}</span>
										<div style={{ display: 'flex', gap: 4 }}>
											<Tooltip title={layer.visible ? 'Hide' : 'Show'}>
												<Button
													size="small"
													onClick={(e: React.MouseEvent) => handleToggleVisibility(layer.id, e)}
												>
													<Icon type={layer.visible ? 'eye' : 'eye-invisible'} />
												</Button>
											</Tooltip>
											<Tooltip title={layer.locked ? 'Unlock' : 'Lock'}>
												<Button
													size="small"
													onClick={(e: React.MouseEvent) => handleToggleLock(layer.id, e)}
												>
													<Icon type={layer.locked ? 'lock' : 'unlock'} />
												</Button>
											</Tooltip>
											<Tooltip title="Bring to Front">
												<Button
													size="small"
													onClick={(e: React.MouseEvent) => handleBringToFront(layer.id, e)}
													disabled={layer.locked}
												>
													<Icon type="up" />
												</Button>
											</Tooltip>
											<Tooltip title="Send to Back">
												<Button
													size="small"
													onClick={(e: React.MouseEvent) => handleSendToBack(layer.id, e)}
													disabled={layer.locked}
												>
													<Icon type="down" />
												</Button>
											</Tooltip>
										</div>
									</div>
								</SortableItem>
							))}
						</div>
					</SortableContext>
				</DndContext>
			</Card>
		</div>
	);
};

export default LayerPanel;
