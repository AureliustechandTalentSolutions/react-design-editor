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
