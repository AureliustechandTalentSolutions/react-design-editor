import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableCanvasProps {
	id: string;
	children: React.ReactNode;
	className?: string;
}

function DroppableCanvas({ id, children, className }: DroppableCanvasProps) {
	const { isOver, setNodeRef } = useDroppable({ id });

	return (
		<div
			ref={setNodeRef}
			className={className}
			style={{
				backgroundColor: isOver ? 'rgba(0, 102, 204, 0.1)' : undefined,
				border: isOver ? '2px dashed #0066cc' : '2px dashed transparent',
				transition: 'all 0.2s ease',
			}}
		>
			{children}
		</div>
	);
}

export default DroppableCanvas;
export { DroppableCanvas };
/**
 * Droppable Canvas Zone
 * Drop target zone with visual feedback when items are dragged over
 */

import { useDroppable } from '@dnd-kit/core';
import React, { ReactNode, CSSProperties } from 'react';

export interface DroppableCanvasProps {
	id: string;
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}

const DroppableCanvas: React.FC<DroppableCanvasProps> = ({ id, children, className = '', style = {} }) => {
	const { isOver, setNodeRef } = useDroppable({
		id,
	});

	const droppableStyle: CSSProperties = {
		border: isOver ? '2px dashed #1890ff' : '2px dashed transparent',
		backgroundColor: isOver ? 'rgba(24, 144, 255, 0.05)' : 'transparent',
		transition: 'all 0.2s ease',
		...style,
	};

	return (
		<div ref={setNodeRef} className={className} style={droppableStyle}>
			{children}
		</div>
	);
};

export default DroppableCanvas;
