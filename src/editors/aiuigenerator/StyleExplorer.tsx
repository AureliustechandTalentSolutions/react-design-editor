/**
 * Style Explorer Component
 * Explore and apply color palettes and typography presets
 */

import { Button, Card, message } from 'antd';
import React from 'react';
import Icon from '../../components/icon/Icon';
import { getColorPalette, tokens } from '../../libs/design-system/tokens';

interface IProps {
	onApplyPalette?: (colors: string[]) => void;
}

const StyleExplorer: React.FC<IProps> = ({ onApplyPalette }) => {
	const palettes = [
		{ name: 'Ocean', key: 'ocean' },
		{ name: 'Sunset', key: 'sunset' },
		{ name: 'Forest', key: 'forest' },
		{ name: 'Purple Haze', key: 'purple' },
		{ name: 'Monochrome', key: 'monochrome' },
		{ name: 'Neon', key: 'neon' },
	];

	const handleCopyColor = (color: string) => {
		navigator.clipboard.writeText(color);
		message.success(`Copied ${color} to clipboard`);
	};

	const handleApplyPalette = (colors: string[]) => {
		if (onApplyPalette) {
			onApplyPalette(colors);
			message.success('Palette applied to design');
		}
	};

	return (
		<div style={{ padding: 16 }}>
			<Card title="Color Palettes" style={{ marginBottom: 16 }}>
				{palettes.map(palette => {
					const colors = getColorPalette(palette.name);
					return (
						<div key={palette.key} style={{ marginBottom: 16 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
								<strong>{palette.name}</strong>
								<Button
									size="small"
									onClick={() => handleApplyPalette(colors)}
									icon={<Icon name="palette" prefix="fas" />}
								>
									Apply
								</Button>
							</div>
							<div style={{ display: 'flex', gap: 4 }}>
								{colors.map((color, index) => (
									<div
										key={index}
										onClick={() => handleCopyColor(color)}
										style={{
											width: 40,
											height: 40,
											backgroundColor: color,
											borderRadius: 4,
											cursor: 'pointer',
											border: '1px solid #e5e7eb',
											position: 'relative',
										}}
										title={`${color} - Click to copy`}
									/>
								))}
							</div>
						</div>
					);
				})}
			</Card>

			<Card title="Typography Presets">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
					{[
						{ name: 'Modern Sans', family: 'Inter, system-ui, sans-serif' },
						{ name: 'Classic Serif', family: 'Georgia, serif' },
						{ name: 'Monospace', family: 'Monaco, monospace' },
						{ name: 'Playful', family: 'Comic Sans MS, cursive' },
					].map(preset => (
						<div
							key={preset.name}
							style={{
								padding: 12,
								border: '1px solid #e5e7eb',
								borderRadius: 4,
								fontFamily: preset.family,
							}}
						>
							<div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{preset.name}</div>
							<div style={{ fontSize: 12, color: '#6b7280' }}>{preset.family}</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

export default StyleExplorer;
