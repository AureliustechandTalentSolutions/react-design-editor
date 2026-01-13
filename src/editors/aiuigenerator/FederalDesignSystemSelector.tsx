/**
 * Federal Design System Selector Component
 * Allows users to select between USWDS, VA.gov, and CMS design systems
 */

import React, { useState } from 'react';

import { getComponentCount } from '@/libs/design-systems/uswds/components';

export interface DesignSystemOption {
	id: string;
	name: string;
	description: string;
	componentCount: number;
	version: string;
	compliance: string[];
	documentationUrl: string;
	logoUrl?: string;
}

const designSystems: DesignSystemOption[] = [
	{
		id: 'uswds',
		name: 'U.S. Web Design System',
		description: 'The official design system for federal government websites',
		componentCount: getComponentCount(),
		version: '3.0.0',
		compliance: ['WCAG 2.1 AA', 'Section 508'],
		documentationUrl: 'https://designsystem.digital.gov/',
	},
	{
		id: 'va',
		name: 'VA.gov Design System',
		description: 'Design system for Veterans Affairs digital services',
		componentCount: 35,
		version: '1.0.0',
		compliance: ['WCAG 2.1 AA', 'Section 508', 'VA Specific'],
		documentationUrl: 'https://design.va.gov/',
	},
	{
		id: 'cms',
		name: 'CMS Design System',
		description: 'Design system for Centers for Medicare & Medicaid Services',
		componentCount: 30,
		version: '2.0.0',
		compliance: ['WCAG 2.1 AA', 'Section 508', 'HIPAA'],
		documentationUrl: 'https://design.cms.gov/',
	},
];

export interface FederalDesignSystemSelectorProps {
	onSelect?: (systemId: string) => void;
	defaultSelected?: string;
	className?: string;
}

/**
 * FederalDesignSystemSelector Component
 */
export const FederalDesignSystemSelector: React.FC<FederalDesignSystemSelectorProps> = ({
	onSelect,
	defaultSelected = 'uswds',
	className = '',
}) => {
	const [selected, setSelected] = useState<string>(defaultSelected);

	const handleSelect = (systemId: string) => {
		setSelected(systemId);
		if (onSelect) {
			onSelect(systemId);
		}
	};

	return (
		<div className={`federal-design-system-selector ${className}`}>
			<h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Select Federal Design System</h2>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: '16px',
				}}
			>
				{designSystems.map(system => (
					<div
						key={system.id}
						onClick={() => handleSelect(system.id)}
						style={{
							border: selected === system.id ? '2px solid #005ea2' : '1px solid #dfe1e2',
							borderRadius: '8px',
							padding: '16px',
							cursor: 'pointer',
							backgroundColor: selected === system.id ? '#e7f6f8' : '#ffffff',
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={e => {
							if (selected !== system.id) {
								e.currentTarget.style.borderColor = '#a9aeb1';
							}
						}}
						onMouseLeave={e => {
							if (selected !== system.id) {
								e.currentTarget.style.borderColor = '#dfe1e2';
							}
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								marginBottom: '12px',
							}}
						>
							<div>
								<h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{system.name}</h3>
								<p
									style={{
										margin: '4px 0 0',
										fontSize: '12px',
										color: '#71767a',
									}}
								>
									v{system.version}
								</p>
							</div>
							{selected === system.id && (
								<span
									style={{
										backgroundColor: '#00a91c',
										color: '#ffffff',
										padding: '4px 8px',
										borderRadius: '4px',
										fontSize: '12px',
										fontWeight: 600,
									}}
								>
									SELECTED
								</span>
							)}
						</div>

						<p
							style={{
								margin: '0 0 12px',
								fontSize: '14px',
								lineHeight: '1.5',
								color: '#3d4551',
							}}
						>
							{system.description}
						</p>

						<div style={{ marginBottom: '12px' }}>
							<div
								style={{
									fontSize: '14px',
									fontWeight: 600,
									marginBottom: '4px',
								}}
							>
								{system.componentCount} Components
							</div>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<div
								style={{
									fontSize: '12px',
									fontWeight: 600,
									color: '#71767a',
									marginBottom: '4px',
								}}
							>
								Compliance:
							</div>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
								{system.compliance.map(badge => (
									<span
										key={badge}
										style={{
											backgroundColor: '#e7f6f8',
											color: '#005ea2',
											padding: '2px 8px',
											borderRadius: '4px',
											fontSize: '11px',
											fontWeight: 600,
											border: '1px solid #97d4ea',
										}}
									>
										{badge}
									</span>
								))}
							</div>
						</div>

						<a
							href={system.documentationUrl}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: '#005ea2',
								fontSize: '14px',
								textDecoration: 'none',
								fontWeight: 500,
							}}
							onClick={e => e.stopPropagation()}
						>
							View Documentation →
						</a>
					</div>
				))}
			</div>
		</div>
	);
};
