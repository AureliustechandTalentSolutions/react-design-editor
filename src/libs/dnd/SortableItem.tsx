import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
	id: string;
	children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		cursor: 'grab',
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
}

export default SortableItem;
export { SortableItem };
/**
 * Sortable Item Component
 * Wrapper component that makes any child draggable/sortable
 * Features: proper transform animations and drag state indicators
 */

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { ReactNode, CSSProperties } from 'react';

export interface SortableItemProps {
	id: string;
	children: ReactNode;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children, disabled = false, className = '', style = {} }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });

	const sortableStyle: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		cursor: disabled ? 'default' : 'grab',
		...style,
	};

	return (
		<div ref={setNodeRef} style={sortableStyle} className={className} {...attributes} {...listeners}>
			{children}
		</div>
	);
};

export default SortableItem;
