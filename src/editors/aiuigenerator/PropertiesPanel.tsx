/**
 * Properties Panel
 * Display and edit properties of selected objects
 */

import { Card, Input } from 'antd';
import React from 'react';

interface IProps {
	selectedObject?: any;
	onPropertyChange?: (property: string, value: any) => void;
}

const PropertiesPanel: React.FC<IProps> = ({ selectedObject, onPropertyChange }) => {
	if (!selectedObject) {
		return (
			<div style={{ padding: 16 }}>
				<Card>
					<div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
						<div>Select an object to view properties</div>
					</div>
				</Card>
			</div>
		);
	}

	const properties = [
		{ key: 'left', label: 'X Position', type: 'number' },
		{ key: 'top', label: 'Y Position', type: 'number' },
		{ key: 'width', label: 'Width', type: 'number' },
		{ key: 'height', label: 'Height', type: 'number' },
		{ key: 'fill', label: 'Fill Color', type: 'color' },
		{ key: 'stroke', label: 'Stroke Color', type: 'color' },
		{ key: 'strokeWidth', label: 'Stroke Width', type: 'number' },
	];

	return (
		<div style={{ padding: 16 }}>
			<Card title="Properties">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
					{properties.map(prop => {
						const value = selectedObject[prop.key];
						if (value === undefined) return null;

						return (
							<div key={prop.key}>
								<label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>{prop.label}</label>
								<Input
									type={prop.type}
									value={value}
									onChange={e => onPropertyChange && onPropertyChange(prop.key, e.target.value)}
									size="small"
								/>
							</div>
						);
					})}
				</div>
			</Card>
		</div>
	);
};

export default PropertiesPanel;
