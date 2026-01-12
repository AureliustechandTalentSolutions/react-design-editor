/**
 * Code Preview Component
 * Display generated code with syntax highlighting
 */

import { Button, Card, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Icon from '../../components/icon/Icon';
import { ExportOptions } from '../../types/aiui';
import { exportHTML, exportReact, exportVue } from '../../libs/export';

const { TabPane } = Tabs;

interface IProps {
	design: any;
}

const CodePreview: React.FC<IProps> = ({ design }) => {
	const [exportOptions, setExportOptions] = useState<ExportOptions>({
		framework: 'react',
		styling: 'tailwind',
		typescript: true,
		includeResponsive: true,
	});

	const generateCode = () => {
		switch (exportOptions.framework) {
			case 'react':
			case 'nextjs':
				return exportReact(design, exportOptions);
			case 'vue':
				return exportVue(design, exportOptions);
			case 'html':
				return exportHTML(design, exportOptions);
			default:
				return { files: [], dependencies: {} };
		}
	};

	const codeResult = generateCode();

	const handleCopy = (content: string) => {
		navigator.clipboard.writeText(content);
		message.success('Code copied to clipboard!');
	};

	const handleCopyAll = () => {
		const allCode = codeResult.files.map(file => `// ${file.path}\n${file.content}`).join('\n\n');
		navigator.clipboard.writeText(allCode);
		message.success('All code copied to clipboard!');
	};

	if (!design || !design.design) {
		return (
			<div style={{ padding: 16 }}>
				<Card>
					<div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
						<Icon name="code" prefix="fas" size={3} style={{ marginBottom: 16 }} />
						<div>Generate a design to see code preview</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div style={{ padding: 16 }}>
			<Card
				title="Code Export"
				extra={
					<Button
						type="primary"
						size="small"
						onClick={handleCopyAll}
						icon={<Icon name="copy" prefix="fas" />}
					>
						Copy All
					</Button>
				}
			>
				<div style={{ marginBottom: 16 }}>
					<label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 600 }}>
						Export Options
					</label>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
						<select
							value={exportOptions.framework}
							onChange={e => setExportOptions({ ...exportOptions, framework: e.target.value as any })}
							style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #d1d5db' }}
						>
							<option value="react">React</option>
							<option value="nextjs">Next.js</option>
							<option value="vue">Vue 3</option>
							<option value="html">HTML/CSS</option>
						</select>
						<select
							value={exportOptions.styling}
							onChange={e => setExportOptions({ ...exportOptions, styling: e.target.value as any })}
							style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #d1d5db' }}
						>
							<option value="tailwind">Tailwind CSS</option>
							<option value="css">CSS</option>
							<option value="styled-components">Styled Components</option>
							<option value="css-modules">CSS Modules</option>
						</select>
					</div>
				</div>

				<Tabs defaultActiveKey="0">
					{codeResult.files.map((file, index) => (
						<TabPane tab={file.path} key={index.toString()}>
							<div style={{ position: 'relative' }}>
								<Button
									size="small"
									style={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
									onClick={() => handleCopy(file.content)}
									icon={<Icon name="copy" prefix="fas" />}
								>
									Copy
								</Button>
								<SyntaxHighlighter
									language={file.language}
									style={vscDarkPlus}
									customStyle={{ maxHeight: 400, fontSize: 12 }}
								>
									{file.content}
								</SyntaxHighlighter>
							</div>
						</TabPane>
					))}
				</Tabs>

				{codeResult.instructions && (
					<div style={{ marginTop: 12, padding: 8, backgroundColor: '#fef3c7', borderRadius: 4, fontSize: 12 }}>
						<Icon name="info-circle" prefix="fas" style={{ marginRight: 8 }} />
						{codeResult.instructions}
					</div>
				)}
			</Card>
		</div>
	);
};

export default CodePreview;
