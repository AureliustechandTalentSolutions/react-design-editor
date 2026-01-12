/**
 * Vision Settings Panel
 * Configure screenshot-to-code conversion settings
 */

import React, { useState } from 'react';
import { Settings, ChevronDown } from '@flomon-ui/icons';
import type { VisionModel, ConversionOptions } from '../../libs/ai/vision/types';

interface VisionSettingsProps {
	onSettingsChange: (settings: VisionSettings) => void;
	initialSettings?: Partial<VisionSettings>;
}

export interface VisionSettings {
	model: VisionModel;
	framework: 'react' | 'vue' | 'html';
	useDesignSystem: boolean;
	fidelity: 'exact' | 'approximate' | 'design-system';
	extractColors: boolean;
	extractText: boolean;
	detectComponents: boolean;
}

const DEFAULT_SETTINGS: VisionSettings = {
	model: 'claude-3-5-sonnet-20241022',
	framework: 'react',
	useDesignSystem: true,
	fidelity: 'approximate',
	extractColors: true,
	extractText: true,
	detectComponents: true,
};

/**
 * Vision Settings Panel Component
 */
export const VisionSettings: React.FC<VisionSettingsProps> = ({
	onSettingsChange,
	initialSettings = {},
}) => {
	const [settings, setSettings] = useState<VisionSettings>({
		...DEFAULT_SETTINGS,
		...initialSettings,
	});
	const [isExpanded, setIsExpanded] = useState(false);

	/**
	 * Update setting
	 */
	const updateSetting = <K extends keyof VisionSettings>(
		key: K,
		value: VisionSettings[K]
	) => {
		const newSettings = { ...settings, [key]: value };
		setSettings(newSettings);
		onSettingsChange(newSettings);
	};

	return (
		<div className="vision-settings">
			<div className="settings-header" onClick={() => setIsExpanded(!isExpanded)}>
				<div className="header-left">
					<Settings size={20} />
					<h3>Vision Settings</h3>
				</div>
				<ChevronDown
					size={20}
					className={`chevron ${isExpanded ? 'expanded' : ''}`}
				/>
			</div>

			{isExpanded && (
				<div className="settings-content">
					{/* AI Model Selection */}
					<div className="setting-group">
						<label>AI Model</label>
						<select
							value={settings.model}
							onChange={(e) => updateSetting('model', e.target.value as VisionModel)}
						>
							<option value="claude-3-5-sonnet-20241022">
								Claude 3.5 Sonnet (Recommended)
							</option>
							<option value="claude-3-opus-20240229">
								Claude 3 Opus (More Accurate)
							</option>
						</select>
						<p className="setting-hint">
							Sonnet is faster and cost-effective. Opus provides higher accuracy.
						</p>
					</div>

					{/* Output Framework */}
					<div className="setting-group">
						<label>Output Framework</label>
						<div className="radio-group">
							<label className="radio-option">
								<input
									type="radio"
									name="framework"
									value="react"
									checked={settings.framework === 'react'}
									onChange={(e) => updateSetting('framework', e.target.value as any)}
								/>
								<span>React</span>
							</label>
							<label className="radio-option">
								<input
									type="radio"
									name="framework"
									value="vue"
									checked={settings.framework === 'vue'}
									onChange={(e) => updateSetting('framework', e.target.value as any)}
								/>
								<span>Vue</span>
							</label>
							<label className="radio-option">
								<input
									type="radio"
									name="framework"
									value="html"
									checked={settings.framework === 'html'}
									onChange={(e) => updateSetting('framework', e.target.value as any)}
								/>
								<span>HTML</span>
							</label>
						</div>
					</div>

					{/* Fidelity Slider */}
					<div className="setting-group">
						<label>
							Fidelity
							<span className="badge">{settings.fidelity}</span>
						</label>
						<div className="slider-container">
							<input
								type="range"
								min="0"
								max="2"
								step="1"
								value={
									settings.fidelity === 'exact'
										? 0
										: settings.fidelity === 'approximate'
										? 1
										: 2
								}
								onChange={(e) => {
									const value = parseInt(e.target.value);
									const fidelity =
										value === 0
											? 'exact'
											: value === 1
											? 'approximate'
											: 'design-system';
									updateSetting('fidelity', fidelity);
								}}
								className="slider"
							/>
							<div className="slider-labels">
								<span>Exact Match</span>
								<span>Approximate</span>
								<span>Design System</span>
							</div>
						</div>
						<p className="setting-hint">
							{settings.fidelity === 'exact' &&
								'Recreate the exact design from the screenshot'}
							{settings.fidelity === 'approximate' &&
								'Balance between accuracy and design system adherence'}
							{settings.fidelity === 'design-system' &&
								'Adapt the design to match your design system'}
						</p>
					</div>

					{/* Design System Toggle */}
					<div className="setting-group">
						<label className="checkbox-label">
							<input
								type="checkbox"
								checked={settings.useDesignSystem}
								onChange={(e) => updateSetting('useDesignSystem', e.target.checked)}
							/>
							<span>Use Design System Tokens</span>
						</label>
						<p className="setting-hint">
							Apply design system colors, spacing, and typography
						</p>
					</div>

					{/* Advanced Options */}
					<div className="setting-group">
						<label>Advanced Options</label>
						
						<label className="checkbox-label">
							<input
								type="checkbox"
								checked={settings.extractColors}
								onChange={(e) => updateSetting('extractColors', e.target.checked)}
							/>
							<span>Extract Color Palette</span>
						</label>

						<label className="checkbox-label">
							<input
								type="checkbox"
								checked={settings.extractText}
								onChange={(e) => updateSetting('extractText', e.target.checked)}
							/>
							<span>OCR Text Extraction</span>
						</label>

						<label className="checkbox-label">
							<input
								type="checkbox"
								checked={settings.detectComponents}
								onChange={(e) => updateSetting('detectComponents', e.target.checked)}
							/>
							<span>Component Detection</span>
						</label>
					</div>

					{/* Info Box */}
					<div className="info-box">
						<h4>How it works</h4>
						<ol>
							<li>Upload a screenshot of any UI</li>
							<li>AI analyzes and detects components</li>
							<li>Converts to editable Fabric.js objects</li>
							<li>Optionally export to code</li>
						</ol>
					</div>
				</div>
			)}
		</div>
	);
};

export default VisionSettings;
