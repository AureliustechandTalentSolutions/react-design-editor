import React from 'react';
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
/**
 * DnD Provider
 * Reusable drag-and-drop context wrapper using @dnd-kit
 * Features: keyboard accessibility, pointer sensors, closest-center collision detection
 */

import {
	DndContext,
	closestCenter,
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
	DragEndEvent,
	DragStartEvent,
	DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React, { ReactNode } from 'react';

export interface DndProviderProps {
	children: ReactNode;
	onDragStart?: (event: DragStartEvent) => void;
	onDragOver?: (event: DragOverEvent) => void;
	onDragEnd?: (event: DragEndEvent) => void;
}

const DndProvider: React.FC<DndProviderProps> = ({ children, onDragStart, onDragOver, onDragEnd }) => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
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
			onDragOver={onDragOver}
			onDragEnd={onDragEnd}
		>
			{children}
		</DndContext>
	);
}

export default DndProvider;
export { DndProvider };
};

export default DndProvider;
