import React from 'react';

interface DesignSystem {
	id: string;
	name: string;
	description: string;
	version: string;
	components: number;
	section508: boolean;
	npmPackage: string;
	docsUrl: string;
	logo: string;
	agency?: string;
}

const FEDERAL_DESIGN_SYSTEMS: DesignSystem[] = [
	{
		id: 'uswds',
		name: 'U.S. Web Design System',
		description: 'Official federal government design system with full Section 508 compliance',
		version: '3.8.0',
		components: 40,
		section508: true,
		npmPackage: '@trussworks/react-uswds',
		docsUrl: 'https://designsystem.digital.gov/',
		logo: '🏛️',
	},
	{
		id: 'va',
		name: 'VA.gov Design System',
		description: 'Design system for Department of Veterans Affairs digital services',
		version: '3.0.0',
		components: 60,
		section508: true,
		npmPackage: '@department-of-veterans-affairs/component-library',
		docsUrl: 'https://design.va.gov/',
		logo: '🎖️',
		agency: 'VA',
	},
	{
		id: 'cms',
		name: 'CMS Design System',
		description: 'Healthcare.gov and Medicare.gov unified design system',
		version: '10.0.0',
		components: 45,
		section508: true,
		npmPackage: '@cmsgov/design-system',
		docsUrl: 'https://design.cms.gov/',
		logo: '🏥',
		agency: 'HHS/CMS',
	},
];

interface FederalDesignSystemSelectorProps {
	selectedSystem: string;
	onSelectSystem: (systemId: string) => void;
	onViewDocs: (url: string) => void;
}

export function FederalDesignSystemSelector({
	selectedSystem,
	onSelectSystem,
	onViewDocs,
}: FederalDesignSystemSelectorProps): JSX.Element {
	return (
		<div className="federal-ds-selector" style={{ padding: '16px' }}>
			<div style={{ marginBottom: '16px' }}>
				<h3
					style={{
						margin: '0 0 8px 0',
						fontSize: '16px',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					🏛️ Federal Design Systems
					<span
						style={{
							background: '#00a91c',
							color: 'white',
							padding: '2px 8px',
							borderRadius: '4px',
							fontSize: '10px',
						}}
					>
						Section 508 Compliant
					</span>
				</h3>
				<p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
					Select a federal design system for your project
				</p>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				{FEDERAL_DESIGN_SYSTEMS.map(system => (
					<div
						key={system.id}
						role="button"
						tabIndex={0}
						onClick={() => onSelectSystem(system.id)}
						onKeyPress={e => {
							if (e.key === 'Enter' || e.key === ' ') {
								onSelectSystem(system.id);
							}
						}}
						style={{
							border: selectedSystem === system.id ? '2px solid #005ea2' : '1px solid #dfe1e2',
							borderRadius: '8px',
							padding: '16px',
							cursor: 'pointer',
							background: selectedSystem === system.id ? '#e7f6f8' : 'white',
							transition: 'all 0.2s ease',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
							}}
						>
							<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
								<span style={{ fontSize: '28px' }}>{system.logo}</span>
								<div>
									<h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#1b1b1b' }}>
										{system.name}
										{system.agency && (
											<span
												style={{
													marginLeft: '8px',
													fontSize: '10px',
													background: '#dfe1e2',
													padding: '2px 6px',
													borderRadius: '4px',
												}}
											>
												{system.agency}
											</span>
										)}
									</h4>
									<p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#565c65' }}>
										{system.description}
									</p>
									<div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#71767a' }}>
										<span>v{system.version}</span>
										<span>•</span>
										<span>{system.components} components</span>
										<span>•</span>
										<span style={{ color: '#00a91c' }}>✓ 508</span>
									</div>
								</div>
							</div>

							<button
								type="button"
								onClick={e => {
									e.stopPropagation();
									onViewDocs(system.docsUrl);
								}}
								style={{
									background: 'none',
									border: '1px solid #005ea2',
									color: '#005ea2',
									padding: '4px 12px',
									borderRadius: '4px',
									cursor: 'pointer',
									fontSize: '12px',
								}}
							>
								Docs →
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default FederalDesignSystemSelector;
