/**
 * AI Assistant Panel
 * Quick actions and suggestions for design refinement
 */

import { Button, Card } from 'antd';
import React from 'react';
import Icon from '../../components/icon/Icon';
import { quickActionPrompts } from '../../libs/ai/prompts';

interface IProps {
	onQuickAction?: (action: string) => void;
}

const AIAssistant: React.FC<IProps> = ({ onQuickAction }) => {
	const actions = [
		{ key: 'improveContrast', label: 'Improve Contrast', icon: 'adjust', prompt: quickActionPrompts.improveContrast },
		{ key: 'addShadows', label: 'Add Shadows', icon: 'cube', prompt: quickActionPrompts.addShadows },
		{ key: 'improveSpacing', label: 'Improve Spacing', icon: 'arrows-alt', prompt: quickActionPrompts.improveSpacing },
		{ key: 'modernize', label: 'Modernize', icon: 'star', prompt: quickActionPrompts.modernize },
		{ key: 'simplify', label: 'Simplify', icon: 'compress', prompt: quickActionPrompts.simplify },
		{ key: 'responsive', label: 'Make Responsive', icon: 'mobile-alt', prompt: quickActionPrompts.responsive },
		{ key: 'accessibility', label: 'Accessibility', icon: 'universal-access', prompt: quickActionPrompts.accessibility },
	];

	const handleAction = (action: typeof actions[0]) => {
		if (onQuickAction) {
			onQuickAction(action.prompt);
		}
	};

	return (
		<div style={{ padding: 16 }}>
			<Card title="AI Assistant" style={{ marginBottom: 16 }}>
				<div style={{ marginBottom: 16 }}>
					<strong style={{ display: 'block', marginBottom: 8 }}>Quick Actions</strong>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						{actions.map(action => (
							<Button
								key={action.key}
								onClick={() => handleAction(action)}
								icon={<Icon name={action.icon} prefix="fas" />}
								style={{ textAlign: 'left' }}
							>
								{action.label}
							</Button>
						))}
					</div>
				</div>

				<div>
					<strong style={{ display: 'block', marginBottom: 8 }}>Tips</strong>
					<ul style={{ fontSize: 12, color: '#6b7280', paddingLeft: 20 }}>
						<li>Be specific in your descriptions</li>
						<li>Mention colors, layouts, and components</li>
						<li>Use templates as starting points</li>
						<li>Iterate with quick actions</li>
					</ul>
				</div>
			</Card>
		</div>
	);
};

export default AIAssistant;
