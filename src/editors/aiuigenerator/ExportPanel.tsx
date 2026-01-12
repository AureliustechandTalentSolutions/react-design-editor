/**
 * Export Panel
 * Options for exporting design
 */

import { Button, Card, Radio, Switch } from 'antd';
import React, { useState } from 'react';
import Icon from '../../components/icon/Icon';
import { ExportOptions } from '../../types/aiui';

interface IProps {
	onExport?: (options: ExportOptions) => void;
}

const ExportPanel: React.FC<IProps> = ({ onExport }) => {
	const [options, setOptions] = useState<ExportOptions>({
		framework: 'react',
		styling: 'tailwind',
		typescript: true,
		includeResponsive: true,
	});

	const handleExport = () => {
		if (onExport) {
			onExport(options);
		}
	};

	return (
		<div style={{ padding: 16 }}>
			<Card title="Export Code">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					<div>
						<label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Framework</label>
						<Radio.Group
							value={options.framework}
							onChange={e => setOptions({ ...options, framework: e.target.value })}
						>
							<Radio.Button value="react">React</Radio.Button>
							<Radio.Button value="nextjs">Next.js</Radio.Button>
							<Radio.Button value="vue">Vue 3</Radio.Button>
							<Radio.Button value="html">HTML</Radio.Button>
						</Radio.Group>
					</div>

					<div>
						<label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Styling</label>
						<Radio.Group
							value={options.styling}
							onChange={e => setOptions({ ...options, styling: e.target.value })}
						>
							<Radio.Button value="tailwind">Tailwind</Radio.Button>
							<Radio.Button value="css">CSS</Radio.Button>
							<Radio.Button value="styled-components">Styled</Radio.Button>
							<Radio.Button value="css-modules">Modules</Radio.Button>
						</Radio.Group>
					</div>

					<div>
						<label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Options</label>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span>TypeScript</span>
								<Switch
									checked={options.typescript}
									onChange={checked => setOptions({ ...options, typescript: checked })}
								/>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span>Responsive</span>
								<Switch
									checked={options.includeResponsive}
									onChange={checked => setOptions({ ...options, includeResponsive: checked })}
								/>
							</div>
						</div>
					</div>

					<Button
						type="primary"
						size="large"
						block
						onClick={handleExport}
						icon={<Icon name="download" prefix="fas" />}
					>
						Export Code
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default ExportPanel;
