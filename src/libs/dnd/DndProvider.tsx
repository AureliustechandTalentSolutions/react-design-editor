import React from 'react';
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	closestCenter,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface DndProviderProps {
	children: React.ReactNode;
	onDragEnd: (event: DragEndEvent) => void;
	onDragStart?: (event: DragStartEvent) => void;
}

function DndProvider({ children, onDragEnd, onDragStart }: DndProviderProps) {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 },
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			{children}
		</DndContext>
	);
}

export default DndProvider;
export { DndProvider };
