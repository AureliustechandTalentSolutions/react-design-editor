/**
 * Component Library
 * Draggable UI components organized by category
 */

import { Card, Collapse, message } from 'antd';
import React from 'react';
import Icon from '../../components/icon/Icon';
import { componentLibrary, getComponentsByCategory } from '../../libs/design-system/components';

const { Panel } = Collapse;

interface IProps {
	onAddComponent?: (component: any) => void;
}

const ComponentLibrary: React.FC<IProps> = ({ onAddComponent }) => {
	const categories = ['layout', 'forms', 'data', 'navigation', 'actions', 'ecommerce'];

	const categoryLabels: Record<string, string> = {
		layout: 'Layout',
		forms: 'Forms',
		data: 'Data Display',
		navigation: 'Navigation',
		actions: 'Actions',
		ecommerce: 'E-commerce',
	};

	const handleAddComponent = (component: any) => {
		if (onAddComponent) {
			onAddComponent(component);
			message.success(`Added ${component.name} to canvas`);
		}
	};

	return (
		<div style={{ padding: 16 }}>
			<Card title="Component Library">
				<Collapse defaultActiveKey={['layout']} ghost>
					{categories.map(category => {
						const components = getComponentsByCategory(category);
						return (
							<Panel header={categoryLabels[category]} key={category}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
									{components.map(component => (
										<div
											key={component.id}
											onClick={() => handleAddComponent(component)}
											style={{
												padding: 8,
												border: '1px solid #e5e7eb',
												borderRadius: 4,
												cursor: 'pointer',
												display: 'flex',
												alignItems: 'center',
												gap: 8,
												transition: 'all 0.2s',
											}}
											onMouseEnter={e => {
												e.currentTarget.style.backgroundColor = '#f3f4f6';
												e.currentTarget.style.borderColor = '#3b82f6';
											}}
											onMouseLeave={e => {
												e.currentTarget.style.backgroundColor = 'transparent';
												e.currentTarget.style.borderColor = '#e5e7eb';
											}}
										>
											<Icon name={component.icon} prefix="fas" />
											<div>
												<div style={{ fontWeight: 500, fontSize: 13 }}>{component.name}</div>
												<div style={{ fontSize: 11, color: '#6b7280' }}>{component.description}</div>
											</div>
										</div>
									))}
								</div>
							</Panel>
						);
					})}
				</Collapse>
			</Card>
		</div>
	);
};

export default ComponentLibrary;
