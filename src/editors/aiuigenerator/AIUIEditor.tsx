import React, { useState } from 'react';
import { PromptInput } from './PromptInput';
import { generateUIFromPrompt, GenerateUIOptions, GenerateUIResult } from '../../libs/ai/claude';
import { exportToReact } from '../../libs/export/react';

type TabType = 'prompt' | 'ai' | 'export';

export const AIUIEditor: React.FC = () => {
	const [activeTab, setActiveTab] = useState<TabType>('prompt');
	const [isGenerating, setIsGenerating] = useState(false);
	const [generatedDesign, setGeneratedDesign] = useState<GenerateUIResult | null>(null);
	const [exportedCode, setExportedCode] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleGenerateUI = async (prompt: string, options: GenerateUIOptions) => {
		setIsGenerating(true);
		setError(null);

		try {
			const result = await generateUIFromPrompt(prompt, options);
			setGeneratedDesign(result);
			setActiveTab('ai');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to generate UI');
		} finally {
			setIsGenerating(false);
		}
	};

	const handleExportCode = async () => {
		if (!generatedDesign) {
			setError('No design to export');
			return;
		}

		try {
			const code = await exportToReact(generatedDesign.design, {
				styling: 'tailwind',
				typescript: true,
				includeComments: true,
			});
			setExportedCode(code);
			setActiveTab('export');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to export code');
		}
	};

	return (
		<div className="ai-ui-editor">
			<div className="tabs">
				<button
					onClick={() => setActiveTab('prompt')}
					className={activeTab === 'prompt' ? 'active' : ''}
					role="button"
					aria-label="Prompt Tab"
				>
					Prompt
				</button>
				<button
					onClick={() => setActiveTab('ai')}
					className={activeTab === 'ai' ? 'active' : ''}
					role="button"
					aria-label="AI Tab"
				>
					AI Assistant
				</button>
				<button
					onClick={() => setActiveTab('export')}
					className={activeTab === 'export' ? 'active' : ''}
					role="button"
					aria-label="Export Tab"
				>
					Export
				</button>
			</div>

			<div className="tab-content">
				{activeTab === 'prompt' && (
					<div className="prompt-tab">
						<PromptInput onSubmit={handleGenerateUI} isLoading={isGenerating} />
						{error && <div className="error-message">{error}</div>}
					</div>
				)}

				{activeTab === 'ai' && (
					<div className="ai-tab">
						<h2>AI Assistant</h2>
						{generatedDesign ? (
							<div className="design-preview">
								<h3>{generatedDesign.metadata.screenName}</h3>
								<p>{generatedDesign.metadata.description}</p>
								<div className="design-info">
									<p>Objects: {generatedDesign.design.objects.length}</p>
									<p>Components: {generatedDesign.metadata.components.join(', ')}</p>
								</div>
								<button onClick={handleExportCode} role="button" aria-label="Export React">
									Export React Code
								</button>
							</div>
						) : (
							<p>No design generated yet. Go to Prompt tab to create one.</p>
						)}
					</div>
				)}

				{activeTab === 'export' && (
					<div className="export-tab">
						<h2>Exported Code</h2>
						{exportedCode ? (
							<pre className="code-block">{exportedCode}</pre>
						) : (
							<p>No code exported yet. Generate a design and click Export.</p>
						)}
					</div>
				)}
			</div>

			<div className="canvas-container">
				<canvas id="ai-canvas" />
			</div>
		</div>
	);
};
