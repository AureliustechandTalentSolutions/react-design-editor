/**
 * AI UI Generator Editor
 * Main editor component integrating Canvas with AI generation capabilities
 */

import { Layout, message, Spin, Tabs } from 'antd';
import React, { Component } from 'react';
import Canvas, { CanvasInstance } from '../../canvas/Canvas';
import { Content } from '../../components/layout';
import { GeneratedDesign, GenerateOptions } from '../../types/aiui';
import { generateUIFromPrompt, isAIAvailable } from '../../libs/ai';
import AIAssistant from './AIAssistant';
import CodePreview from './CodePreview';
import ComponentLibrary from './ComponentLibrary';
import ExportPanel from './ExportPanel';
import LayersPanel from './LayersPanel';
import PromptInput from './PromptInput';
import PropertiesPanel from './PropertiesPanel';
import StyleExplorer from './StyleExplorer';

const { Sider } = Layout;
const { TabPane } = Tabs;

interface IState {
	loading: boolean;
	selectedItem: any;
	currentDesign: GeneratedDesign | null;
	activePanel: string;
}

class AIUIEditor extends Component<any, IState> {
	state: IState = {
		loading: false,
		selectedItem: null,
		currentDesign: null,
		activePanel: 'prompt',
	};

	canvasRef: CanvasInstance | null = null;

	componentDidMount() {
		if (!isAIAvailable()) {
			message.info('Running in demo mode. Connect an API key for full AI functionality.');
		}
	}

	handleGenerate = async (prompt: string, options: GenerateOptions) => {
		this.setState({ loading: true });

		try {
			const design = await generateUIFromPrompt(prompt, options);
			this.setState({ currentDesign: design });

			// Clear canvas if option is set
			if (options.clearCanvas && this.canvasRef) {
				this.canvasRef.handler.clear();
			}

			// Add objects to canvas
			if (design.design.objects && this.canvasRef) {
				design.design.objects.forEach((obj: any) => {
					try {
						this.canvasRef.handler.add(obj);
					} catch (error) {
						console.error('Failed to add object to canvas:', error);
					}
				});
			}

			// Set background
			if (design.design.background && this.canvasRef) {
				this.canvasRef.handler.setBackgroundColor(design.design.background);
			}

			message.success('UI design generated successfully!');
		} catch (error: any) {
			console.error('Generation error:', error);
			message.error(`Failed to generate UI: ${error.message}`);
		} finally {
			this.setState({ loading: false });
		}
	};

	handleQuickAction = async (action: string) => {
		message.info('Quick actions require an API key. Running in demo mode.');
	};

	handleAddComponent = (component: any) => {
		if (this.canvasRef) {
			try {
				this.canvasRef.handler.add(component.template);
				message.success(`Added ${component.name} to canvas`);
			} catch (error) {
				console.error('Failed to add component:', error);
				message.error('Failed to add component to canvas');
			}
		}
	};

	handleApplyPalette = (colors: string[]) => {
		message.info('Palette applied! Use these colors in your design.');
	};

	handleExport = (options: any) => {
		this.setState({ activePanel: 'code' });
		message.success('View code in the Code Preview tab');
	};

	canvasHandlers = {
		onSelect: (target: any) => {
			this.setState({ selectedItem: target });
		},
		onModified: () => {
			// Handle modifications
		},
	};

	renderSidePanel = () => {
		const { activePanel, currentDesign, selectedItem } = this.state;

		return (
			<Tabs
				activeKey={activePanel}
				onChange={key => this.setState({ activePanel: key })}
				size="small"
			>
				<TabPane tab="Prompt" key="prompt">
					<PromptInput onGenerate={this.handleGenerate} loading={this.state.loading} />
				</TabPane>
				<TabPane tab="Components" key="components">
					<ComponentLibrary onAddComponent={this.handleAddComponent} />
				</TabPane>
				<TabPane tab="Assistant" key="assistant">
					<AIAssistant onQuickAction={this.handleQuickAction} />
				</TabPane>
				<TabPane tab="Styles" key="styles">
					<StyleExplorer onApplyPalette={this.handleApplyPalette} />
				</TabPane>
				<TabPane tab="Properties" key="properties">
					<PropertiesPanel selectedObject={selectedItem} />
				</TabPane>
				<TabPane tab="Layers" key="layers">
					<LayersPanel objects={currentDesign?.design.objects} />
				</TabPane>
				<TabPane tab="Code" key="code">
					<CodePreview design={currentDesign} />
				</TabPane>
				<TabPane tab="Export" key="export">
					<ExportPanel onExport={this.handleExport} />
				</TabPane>
			</Tabs>
		);
	};

	render() {
		const { loading } = this.state;

		return (
			<Layout style={{ height: '100%' }}>
				<Sider
					width={350}
					theme="light"
					style={{
						height: '100%',
						overflowY: 'auto',
						borderRight: '1px solid #e5e7eb',
					}}
				>
					{this.renderSidePanel()}
				</Sider>
				<Content style={{ position: 'relative' }}>
					<Spin spinning={loading} tip="Generating UI design..." size="large">
						<Canvas
							ref={(c: CanvasInstance) => {
								this.canvasRef = c;
							}}
							canvasOption={{
								width: 1200,
								height: 800,
							}}
							onSelect={this.canvasHandlers.onSelect}
							onModified={this.canvasHandlers.onModified}
						/>
					</Spin>
				</Content>
			</Layout>
		);
	}
}

export default AIUIEditor;
