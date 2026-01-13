/**
 * DesignSystemSelector Component
 * Choose between USWDS, VA.gov, CMS, Tailwind, shadcn
 */

import React from 'react';

import { DesignSystem } from '../../libs/screenshot-to-code/types';

interface DesignSystemOption {
	id: DesignSystem;
	name: string;
	description: string;
	icon: string;
	badge?: string;
}

const designSystems: DesignSystemOption[] = [
	{
		id: 'uswds',
		name: 'USWDS',
		description: 'U.S. Web Design System - Federal government standard',
		icon: '🏛️',
		badge: 'Federal',
	},
	{
		id: 'va-gov',
		name: 'VA.gov',
		description: 'Veterans Affairs Design System',
		icon: '⭐',
		badge: 'Federal',
	},
	{
		id: 'cms',
		name: 'CMS Design System',
		description: 'Centers for Medicare & Medicaid Services',
		icon: '🏥',
		badge: 'Federal',
	},
	{
		id: 'tailwind',
		name: 'Tailwind CSS',
		description: 'Utility-first CSS framework',
		icon: '🎨',
	},
	{
		id: 'shadcn',
		name: 'shadcn/ui',
		description: 'Beautifully designed components',
		icon: '✨',
	},
	{
		id: 'none',
		name: 'No Design System',
		description: 'Plain HTML/CSS without a design system',
		icon: '📄',
	},
];

interface DesignSystemSelectorProps {
	value: DesignSystem;
	onChange: (designSystem: DesignSystem) => void;
	federalComplianceMode?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export function DesignSystemSelector({ value, onChange, federalComplianceMode = false }: DesignSystemSelectorProps) {
	// Filter to only federal options if in compliance mode
	const availableSystems = federalComplianceMode ? designSystems.filter(ds => ds.badge === 'Federal') : designSystems;

	return (
		<div style={{ width: '100%' }}>
			<div style={{ marginBottom: '12px' }}>
				<div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
					Design System
				</div>
				{federalComplianceMode && (
					<div
						style={{
							fontSize: '12px',
							color: '#7c3aed',
							backgroundColor: '#f5f3ff',
							padding: '4px 8px',
							borderRadius: '4px',
							display: 'inline-block',
							marginBottom: '8px',
						}}
					>
						🔒 Federal Compliance Mode Active
					</div>
				)}
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
					gap: '12px',
				}}
			>
				{availableSystems.map(system => (
					<div
						key={system.id}
						role="button"
						tabIndex={0}
						onClick={() => onChange(system.id)}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') {
								onChange(system.id);
							}
						}}
						style={{
							border: `2px solid ${value === system.id ? '#3b82f6' : '#e5e7eb'}`,
							borderRadius: '8px',
							padding: '16px',
							cursor: 'pointer',
							backgroundColor: value === system.id ? '#eff6ff' : '#ffffff',
							transition: 'all 0.2s',
						}}
						onMouseEnter={e => {
							if (value !== system.id) {
								e.currentTarget.style.borderColor = '#d1d5db';
								e.currentTarget.style.backgroundColor = '#f9fafb';
							}
						}}
						onMouseLeave={e => {
							if (value !== system.id) {
								e.currentTarget.style.borderColor = '#e5e7eb';
								e.currentTarget.style.backgroundColor = '#ffffff';
							}
						}}
					>
						<div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
							<div style={{ fontSize: '32px', lineHeight: '1' }}>{system.icon}</div>
							<div style={{ flex: 1 }}>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
										marginBottom: '4px',
									}}
								>
									<span
										style={{
											fontSize: '16px',
											fontWeight: '600',
											color: value === system.id ? '#1d4ed8' : '#111827',
										}}
									>
										{system.name}
									</span>
									{system.badge && (
										<span
											style={{
												fontSize: '10px',
												fontWeight: '600',
												color: '#7c3aed',
												backgroundColor: '#f5f3ff',
												padding: '2px 6px',
												borderRadius: '4px',
											}}
										>
											{system.badge}
										</span>
									)}
									{value === system.id && (
										<span style={{ fontSize: '16px', color: '#3b82f6' }}>✓</span>
									)}
								</div>
								<p
									style={{
										fontSize: '13px',
										color: '#6b7280',
										margin: 0,
										lineHeight: '1.4',
									}}
								>
									{system.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Additional options for federal design systems */}
			{value !== 'none' && value !== 'tailwind' && value !== 'shadcn' && (
				<div
					style={{
						marginTop: '16px',
						padding: '12px',
						backgroundColor: '#f9fafb',
						borderRadius: '6px',
						fontSize: '13px',
						color: '#6b7280',
					}}
				>
					<p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#374151' }}>
						Federal Design System Features:
					</p>
					<ul style={{ margin: 0, paddingLeft: '20px' }}>
						<li>Section 508 accessibility compliance</li>
						<li>WCAG 2.1 AA standards</li>
						<li>Mobile-responsive components</li>
						<li>Government-approved color palettes</li>
					</ul>
				</div>
			)}
		</div>
	);
}
