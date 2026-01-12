/**
 * Prompt Input Component
 * Provides text input for natural language UI descriptions with templates
 */

import { Button, Card, Input, Select, Tabs } from 'antd';
import React, { useState } from 'react';

import Icon from '../../components/icon/Icon';
import { promptTemplates } from '../../libs/ai/prompts';
import { GenerateOptions } from '../../types/aiui';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface IProps {
	onGenerate: (prompt: string, options: GenerateOptions) => void;
	loading?: boolean;
}

const PromptInput: React.FC<IProps> = ({ onGenerate, loading }) => {
	const [prompt, setPrompt] = useState('');
	const [options, setOptions] = useState<GenerateOptions>({
		style: 'modern',
		colorScheme: 'auto',
		platform: 'web',
		complexity: 'medium',
		clearCanvas: true,
	});

	const handleGenerate = () => {
		if (prompt.trim()) {
			onGenerate(prompt, options);
		}
	};

	const handleTemplateSelect = (templateId: string) => {
		const template = promptTemplates.find(t => t.id === templateId);
		if (template) {
			setPrompt(template.prompt);
		}
	};

	const templatesByCategory = promptTemplates.reduce(
		(acc, template) => {
			if (!acc[template.category]) {
				acc[template.category] = [];
			}
			acc[template.category].push(template);
			return acc;
		},
		{} as Record<string, typeof promptTemplates>,
	);

	return (
		<div style={{ padding: 16 }}>
			<Card title="Generate UI from Description" style={{ marginBottom: 16 }}>
				<TextArea
					value={prompt}
					onChange={e => setPrompt(e.target.value)}
					placeholder="Describe the UI you want to create... (e.g., 'A modern login form with email and password fields, a remember me checkbox, and a blue gradient button')"
					rows={4}
					style={{ marginBottom: 16 }}
				/>

				<div style={{ marginBottom: 16 }}>
					<h4 style={{ marginBottom: 8 }}>Quick Templates</h4>
					<Tabs defaultActiveKey="Marketing" size="small">
						{Object.entries(templatesByCategory).map(([category, templates]) => (
							<TabPane tab={category} key={category}>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
									{templates.map(template => (
										<Button
											key={template.id}
											size="small"
											onClick={() => handleTemplateSelect(template.id)}
										>
											{template.name}
										</Button>
									))}
								</div>
							</TabPane>
						))}
					</Tabs>
				</div>

				<div style={{ marginBottom: 16 }}>
					<h4 style={{ marginBottom: 8 }}>Generation Options</h4>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
						<div>
							<label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>Style</label>
							<Select
								value={options.style}
								onChange={value => setOptions({ ...options, style: value })}
								style={{ width: '100%' }}
								size="small"
							>
								<Option value="modern">Modern</Option>
								<Option value="minimal">Minimal</Option>
								<Option value="corporate">Corporate</Option>
								<Option value="playful">Playful</Option>
								<Option value="dark">Dark</Option>
								<Option value="glassmorphism">Glassmorphism</Option>
							</Select>
						</div>
						<div>
							<label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>Platform</label>
							<Select
								value={options.platform}
								onChange={value => setOptions({ ...options, platform: value })}
								style={{ width: '100%' }}
								size="small"
							>
								<Option value="web">Web</Option>
								<Option value="mobile">Mobile</Option>
								<Option value="tablet">Tablet</Option>
								<Option value="responsive">Responsive</Option>
							</Select>
						</div>
						<div>
							<label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>Complexity</label>
							<Select
								value={options.complexity}
								onChange={value => setOptions({ ...options, complexity: value })}
								style={{ width: '100%' }}
								size="small"
							>
								<Option value="simple">Simple</Option>
								<Option value="medium">Medium</Option>
								<Option value="complex">Complex</Option>
							</Select>
						</div>
						<div>
							<label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>Color Scheme</label>
							<Select
								value={options.colorScheme}
								onChange={value => setOptions({ ...options, colorScheme: value })}
								style={{ width: '100%' }}
								size="small"
							>
								<Option value="auto">Auto</Option>
								<Option value="light">Light</Option>
								<Option value="dark">Dark</Option>
								<Option value="custom">Custom</Option>
							</Select>
						</div>
					</div>
				</div>

				<Button
					type="primary"
					size="large"
					block
					onClick={handleGenerate}
					loading={loading}
					disabled={!prompt.trim()}
					icon={<Icon name="magic" prefix="fas" />}
				>
					Generate UI Design
				</Button>
			</Card>
		</div>
	);
};

export default PromptInput;
