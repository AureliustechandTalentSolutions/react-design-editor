/**
 * Enhanced Layers Panel
 * Full-featured layer management with drag-and-drop reordering
 * Features: visibility toggle, lock toggle, z-index management, layer type icons
 */

import {
	EyeOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	UnlockOutlined,
	UpOutlined,
	DownOutlined,
	BorderOutlined,
	FontSizeOutlined,
	FileImageOutlined,
	GroupOutlined,
	AppstoreOutlined,
} from '@ant-design/icons';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Card, Button, Tooltip } from 'antd';
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
			return <BorderOutlined />;
		case 'text':
			return <FontSizeOutlined />;
		case 'image':
			return <FileImageOutlined />;
		case 'group':
			return <GroupOutlined />;
		case 'component':
			return <AppstoreOutlined />;
		default:
			return <BorderOutlined />;
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
										<span style={{ marginRight: 8, fontSize: 16 }}>{getLayerIcon(layer.type)}</span>
										<span style={{ flex: 1, fontSize: 14 }}>{layer.name}</span>
										<div style={{ display: 'flex', gap: 4 }}>
											<Tooltip title={layer.visible ? 'Hide' : 'Show'}>
												<Button
													type="text"
													size="small"
													icon={layer.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
													onClick={e => handleToggleVisibility(layer.id, e)}
												/>
											</Tooltip>
											<Tooltip title={layer.locked ? 'Unlock' : 'Lock'}>
												<Button
													type="text"
													size="small"
													icon={layer.locked ? <LockOutlined /> : <UnlockOutlined />}
													onClick={e => handleToggleLock(layer.id, e)}
												/>
											</Tooltip>
											<Tooltip title="Bring to Front">
												<Button
													type="text"
													size="small"
													icon={<UpOutlined />}
													onClick={e => handleBringToFront(layer.id, e)}
													disabled={layer.locked}
												/>
											</Tooltip>
											<Tooltip title="Send to Back">
												<Button
													type="text"
													size="small"
													icon={<DownOutlined />}
													onClick={e => handleSendToBack(layer.id, e)}
													disabled={layer.locked}
												/>
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
