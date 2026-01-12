/**
 * Layers Panel
 * Display hierarchy of design objects
 */

import { Card, Tree } from 'antd';
import React from 'react';

interface IProps {
	objects?: any[];
	onSelectObject?: (objectId: string) => void;
}

const LayersPanel: React.FC<IProps> = ({ objects, onSelectObject }) => {
	if (!objects || objects.length === 0) {
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

	const treeData = objects.map((obj, index) => ({
		title: `${obj.type || 'Object'} ${index + 1}`,
		key: obj.id || `obj-${index}`,
		children: obj.objects ? obj.objects.map((child: any, childIndex: number) => ({
			title: `${child.type || 'Object'} ${childIndex + 1}`,
			key: child.id || `obj-${index}-${childIndex}`,
		})) : undefined,
	}));

	return (
		<div style={{ padding: 16 }}>
			<Card title="Layers">
				<Tree
					treeData={treeData}
					defaultExpandAll
					onSelect={(keys) => {
						if (keys.length > 0 && onSelectObject) {
							onSelectObject(keys[0] as string);
						}
					}}
				/>
			</Card>
		</div>
	);
};

export default LayersPanel;
