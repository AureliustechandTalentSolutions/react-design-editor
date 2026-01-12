import React, { useState } from 'react';
import {
	Button,
	Dialog,
	Select,
	Tabs,
	Accordion,
	Tooltip,
	DropdownMenu,
	Popover,
	type TabItem,
	type AccordionItemType,
	type SelectOption,
	type DropdownMenuItemType,
} from '../../libs/ui/components';
import { Icon } from '../../libs/ui/icons';

export interface ComponentInfo {
	id: string;
	name: string;
	category: 'radix' | 'headless' | 'custom';
	library: string;
	description: string;
	props: Record<string, any>;
	preview: React.ReactNode;
}

export interface EnhancedComponentPaletteProps {
	/**
	 * Callback when a component is selected for drag
	 */
	onComponentSelect?: (component: ComponentInfo) => void;
	/**
	 * Show preview on hover
	 */
	showPreview?: boolean;
}

/**
 * EnhancedComponentPalette displays Radix/Headless UI components
 * Features: Component preview, props configuration, drag to canvas
 */
export const EnhancedComponentPalette: React.FC<EnhancedComponentPaletteProps> = ({
	onComponentSelect,
	showPreview = true,
}) => {
	const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);
	const [configOpen, setConfigOpen] = useState(false);

	const components: ComponentInfo[] = [
		{
			id: 'button',
			name: 'Button',
			category: 'radix',
			library: 'Radix UI',
			description: 'Interactive button with variants and loading state',
			props: {
				variant: 'primary',
				size: 'md',
			},
			preview: <Button>Click me</Button>,
		},
		{
			id: 'dialog',
			name: 'Dialog',
			category: 'radix',
			library: 'Radix UI',
			description: 'Modal dialog with overlay',
			props: {
				title: 'Dialog Title',
				showClose: true,
			},
			preview: (
				<Button variant="outline" size="sm">
					Open Dialog
				</Button>
			),
		},
		{
			id: 'select',
			name: 'Select',
			category: 'radix',
			library: 'Radix UI',
			description: 'Custom select dropdown',
			props: {
				placeholder: 'Select option',
			},
			preview: (
				<Select
					options={[
						{ label: 'Option 1', value: '1' },
						{ label: 'Option 2', value: '2' },
					]}
					placeholder="Select..."
				/>
			),
		},
		{
			id: 'tabs',
			name: 'Tabs',
			category: 'radix',
			library: 'Radix UI',
			description: 'Tab interface for switching content',
			props: {},
			preview: (
				<Tabs
					tabs={[
						{ label: 'Tab 1', value: 'tab1', content: <div>Content 1</div> },
						{ label: 'Tab 2', value: 'tab2', content: <div>Content 2</div> },
					]}
					defaultValue="tab1"
				/>
			),
		},
		{
			id: 'accordion',
			name: 'Accordion',
			category: 'radix',
			library: 'Radix UI',
			description: 'Collapsible content sections',
			props: {},
			preview: (
				<Accordion
					items={[
						{
							value: 'item1',
							title: 'Section 1',
							content: <div>Content for section 1</div>,
						},
					]}
				/>
			),
		},
		{
			id: 'tooltip',
			name: 'Tooltip',
			category: 'radix',
			library: 'Radix UI',
			description: 'Contextual tooltip',
			props: {
				side: 'top',
			},
			preview: (
				<Tooltip content="Tooltip content">
					<Button variant="outline" size="sm">
						Hover me
					</Button>
				</Tooltip>
			),
		},
		{
			id: 'dropdown',
			name: 'Dropdown Menu',
			category: 'radix',
			library: 'Radix UI',
			description: 'Dropdown menu with items',
			props: {},
			preview: (
				<DropdownMenu
					trigger={
						<Button variant="outline" size="sm">
							Menu
						</Button>
					}
					items={[
						{ label: 'Item 1', value: '1' },
						{ label: 'Item 2', value: '2' },
					]}
				/>
			),
		},
		{
			id: 'popover',
			name: 'Popover',
			category: 'radix',
			library: 'Radix UI',
			description: 'Floating popover content',
			props: {
				side: 'bottom',
			},
			preview: (
				<Popover trigger={<Button variant="outline" size="sm">Open</Button>}>
					<div>Popover content</div>
				</Popover>
			),
		},
	];

	const handleComponentClick = (component: ComponentInfo) => {
		setSelectedComponent(component);
		onComponentSelect?.(component);
	};

	const handleConfigureComponent = (component: ComponentInfo) => {
		setSelectedComponent(component);
		setConfigOpen(true);
	};

	const accordionItems: AccordionItemType[] = [
		{
			value: 'radix',
			title: 'Radix UI Components',
			content: (
				<div className="grid grid-cols-2 gap-2 p-2">
					{components
						.filter((c) => c.category === 'radix')
						.map((component) => (
							<div
								key={component.id}
								className="relative p-3 rounded border border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-move transition-colors group"
								draggable
								onDragStart={() => handleComponentClick(component)}
								onClick={() => handleComponentClick(component)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										handleComponentClick(component);
									}
								}}
							>
								<div className="flex items-center justify-between mb-2">
									<h4 className="font-semibold text-sm">{component.name}</h4>
									<button
										type="button"
										className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
										onClick={(e) => {
											e.stopPropagation();
											handleConfigureComponent(component);
										}}
										title="Configure"
									>
										<Icon name="Settings" library="lucide" size="xs" />
									</button>
								</div>
								<p className="text-xs text-gray-600 mb-2">{component.description}</p>
								{showPreview && (
									<div className="mt-2 p-2 bg-white rounded border border-gray-100 text-xs">
										{component.preview}
									</div>
								)}
							</div>
						))}
				</div>
			),
		},
		{
			value: 'headless',
			title: 'Headless UI Components',
			content: (
				<div className="p-2 text-sm text-gray-500">
					Headless UI components can be added here
				</div>
			),
		},
		{
			value: 'custom',
			title: 'Custom Components',
			content: (
				<div className="p-2 text-sm text-gray-500">Custom components can be added here</div>
			),
		},
	];

	return (
		<div className="w-full h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="p-4 border-b border-gray-200">
				<h3 className="text-lg font-semibold">Component Palette</h3>
				<p className="text-sm text-gray-600">Drag components to the canvas</p>
			</div>

			<div className="flex-1 overflow-y-auto">
				<Accordion items={accordionItems} defaultValue="radix" />
			</div>

			{selectedComponent && (
				<Dialog
					open={configOpen}
					onOpenChange={setConfigOpen}
					title={`Configure ${selectedComponent.name}`}
					description={selectedComponent.description}
				>
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">Library</label>
							<div className="text-sm text-gray-600">{selectedComponent.library}</div>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">Properties</label>
							<div className="space-y-2">
								{Object.entries(selectedComponent.props).map(([key, value]) => (
									<div key={key} className="flex items-center justify-between">
										<span className="text-sm">{key}</span>
										<span className="text-sm text-gray-600">
											{typeof value === 'boolean' ? value.toString() : value}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="flex gap-2 justify-end">
							<Button variant="outline" onClick={() => setConfigOpen(false)}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									setConfigOpen(false);
									onComponentSelect?.(selectedComponent);
								}}
							>
								Insert Component
							</Button>
						</div>
					</div>
				</Dialog>
			)}
		</div>
	);
};

EnhancedComponentPalette.displayName = 'EnhancedComponentPalette';
