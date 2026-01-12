import React from 'react';

import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '../radix';
import type { TabsProps as RadixTabsProps } from '../radix';
import { cn } from '../variants';

export interface TabItem {
	label: string;
	value: string;
	content: React.ReactNode;
	disabled?: boolean;
}

export interface TabsProps extends RadixTabsProps {
	/**
	 * Tab items
	 */
	tabs: TabItem[];
	/**
	 * Custom className for the tabs list
	 */
	listClassName?: string;
	/**
	 * Custom className for the tabs content
	 */
	contentClassName?: string;
}

/**
 * Tabs component built with Radix UI Tabs
 * Accessible tab interface with keyboard navigation
 */
export const Tabs: React.FC<TabsProps> = ({ tabs, listClassName, contentClassName, ...props }) => {
	return (
		<TabsRoot {...props}>
			<TabsList
				className={cn(
					'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500',
					listClassName,
				)}
			>
				{tabs.map(tab => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						disabled={tab.disabled}
						className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map(tab => (
				<TabsContent
					key={tab.value}
					value={tab.value}
					className={cn(
						'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
						contentClassName,
					)}
				>
					{tab.content}
				</TabsContent>
			))}
		</TabsRoot>
	);
};

Tabs.displayName = 'Tabs';
