import React, { useState, FormEvent } from 'react';
import { GenerateUIOptions } from '../../libs/ai/claude';

interface PromptInputProps {
	onSubmit: (prompt: string, options: GenerateUIOptions) => void;
	isLoading: boolean;
}

const QUICK_PROMPTS = [
	'Create a login form with email and password',
	'Design a modern button',
	'Create a profile card',
	'Design a navigation bar',
];

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading }) => {
	const [prompt, setPrompt] = useState('');
	const [showQuickPrompts, setShowQuickPrompts] = useState(false);
	const [options, setOptions] = useState<GenerateUIOptions>({
		style: 'modern',
		platform: 'web',
		complexity: 'simple',
		colorScheme: 'auto',
		clearCanvas: true,
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (prompt.trim()) {
			onSubmit(prompt, options);
		}
	};

	const handleQuickPrompt = (quickPrompt: string) => {
		setPrompt(quickPrompt);
		setShowQuickPrompts(false);
	};

	const handleFocus = () => {
		if (!prompt) {
			setShowQuickPrompts(true);
		}
	};

	const handleBlur = () => {
		// Delay to allow click on quick prompt
		setTimeout(() => setShowQuickPrompts(false), 200);
	};

	return (
		<div className="prompt-input-container">
			<form onSubmit={handleSubmit}>
				<div className="input-wrapper">
					<textarea
						value={prompt}
						onChange={e => setPrompt(e.target.value)}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder="Describe the UI you want to generate..."
						disabled={isLoading}
						rows={3}
						className="prompt-textarea"
					/>
					{showQuickPrompts && (
						<div className="quick-prompts">
							<h3>Quick Start</h3>
							{QUICK_PROMPTS.map((qp, index) => (
								<button
									key={index}
									type="button"
									onClick={() => handleQuickPrompt(qp)}
									className="quick-prompt-button"
								>
									{qp}
								</button>
							))}
						</div>
					)}
				</div>

				<div className="options-row">
					<label>
						Style:
						<select
							value={options.style}
							onChange={e =>
								setOptions({ ...options, style: e.target.value as any })
							}
							disabled={isLoading}
						>
							<option value="modern">Modern</option>
							<option value="minimal">Minimal</option>
							<option value="classic">Classic</option>
							<option value="playful">Playful</option>
						</select>
					</label>

					<label>
						Platform:
						<select
							value={options.platform}
							onChange={e =>
								setOptions({ ...options, platform: e.target.value as any })
							}
							disabled={isLoading}
						>
							<option value="web">Web</option>
							<option value="mobile">Mobile</option>
							<option value="tablet">Tablet</option>
						</select>
					</label>

					<label>
						Complexity:
						<select
							value={options.complexity}
							onChange={e =>
								setOptions({ ...options, complexity: e.target.value as any })
							}
							disabled={isLoading}
						>
							<option value="simple">Simple</option>
							<option value="moderate">Moderate</option>
							<option value="complex">Complex</option>
						</select>
					</label>
				</div>

				<button type="submit" disabled={isLoading || !prompt.trim()} className="generate-button">
					{isLoading ? 'Generating...' : 'Generate UI'}
				</button>
			</form>
		</div>
	);
};
