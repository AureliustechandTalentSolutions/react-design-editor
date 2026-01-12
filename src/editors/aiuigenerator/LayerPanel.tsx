import React, { useCallback } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../../libs/dnd/SortableItem';
import { Layer } from '../../libs/layers/types';

interface LayerPanelProps {
	layers: Layer[];
	onLayerSelect: (layerId: string) => void;
	onLayerVisibilityToggle: (layerId: string) => void;
	onLayerLockToggle: (layerId: string) => void;
	onLayerReorder: (sourceId: string, targetId: string) => void;
	onBringToFront: (layerId: string) => void;
	onSendToBack: (layerId: string) => void;
	selectedLayerId: string | null;
}

function LayerPanel({
	layers,
	onLayerSelect,
	onLayerVisibilityToggle,
	onLayerLockToggle,
	onLayerReorder,
	onBringToFront,
	onSendToBack,
	selectedLayerId,
}: LayerPanelProps) {
	const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			if (over && active.id !== over.id) {
				onLayerReorder(active.id as string, over.id as string);
			}
		},
		[onLayerReorder]
	);

	const getLayerIcon = (type: Layer['type']) => {
		switch (type) {
			case 'shape':
				return '⬜';
			case 'text':
				return '📝';
			case 'image':
				return '🖼️';
			case 'group':
				return '📁';
			case 'component':
				return '🧩';
			default:
				return '📄';
		}
	};

	return (
		<div
			className="layer-panel"
			style={{
				width: '280px',
				borderLeft: '1px solid #e0e0e0',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					padding: '12px 16px',
					borderBottom: '1px solid #e0e0e0',
					fontWeight: 'bold',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<span>Layers ({layers.length})</span>
			</div>

			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext
					items={sortedLayers.map((l) => l.id)}
					strategy={verticalListSortingStrategy}
				>
					<div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
						{sortedLayers.map((layer) => (
							<SortableItem key={layer.id} id={layer.id}>
								<div
									role="button"
									tabIndex={0}
									onClick={() => onLayerSelect(layer.id)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											onLayerSelect(layer.id);
										}
									}}
									style={{
										display: 'flex',
										alignItems: 'center',
										padding: '8px 12px',
										marginBottom: '4px',
										borderRadius: '4px',
										background: selectedLayerId === layer.id ? '#e3f2fd' : '#fff',
										border:
											selectedLayerId === layer.id
												? '1px solid #2196f3'
												: '1px solid #e0e0e0',
										cursor: 'pointer',
										opacity: layer.visible ? 1 : 0.5,
									}}
								>
									<span style={{ marginRight: '8px' }}>{getLayerIcon(layer.type)}</span>
									<span
										style={{
											flex: 1,
											fontSize: '13px',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
									>
										{layer.name}
									</span>

									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											onLayerVisibilityToggle(layer.id);
										}}
										style={{
											background: 'none',
											border: 'none',
											cursor: 'pointer',
											padding: '4px',
											opacity: layer.visible ? 1 : 0.3,
										}}
										title={layer.visible ? 'Hide layer' : 'Show layer'}
									>
										👁️
									</button>

									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											onLayerLockToggle(layer.id);
										}}
										style={{
											background: 'none',
											border: 'none',
											cursor: 'pointer',
											padding: '4px',
										}}
										title={layer.locked ? 'Unlock layer' : 'Lock layer'}
									>
										{layer.locked ? '🔒' : '🔓'}
									</button>
								</div>
							</SortableItem>
						))}
					</div>
				</SortableContext>
			</DndContext>

			{selectedLayerId && (
				<div
					style={{
						padding: '12px',
						borderTop: '1px solid #e0e0e0',
						display: 'flex',
						gap: '8px',
						flexWrap: 'wrap',
					}}
				>
					<button
						type="button"
						onClick={() => onBringToFront(selectedLayerId)}
						style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}
					>
						⬆️ Front
					</button>
					<button
						type="button"
						onClick={() => onSendToBack(selectedLayerId)}
						style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}
					>
						⬇️ Back
					</button>
				</div>
			)}
		</div>
	);
}

export default LayerPanel;
export { LayerPanel };
