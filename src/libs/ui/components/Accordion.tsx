import React from 'react';

import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from '../radix';
import type { AccordionSingleProps, AccordionMultipleProps } from '../radix';
import { cn } from '../variants';

export interface AccordionItemType {
	value: string;
	title: string;
	content: React.ReactNode;
	disabled?: boolean;
}

export interface AccordionProps extends Omit<AccordionSingleProps | AccordionMultipleProps, 'type'> {
	/**
	 * Accordion items
	 */
	items: AccordionItemType[];
	/**
	 * Allow multiple items to be open at once
	 */
	multiple?: boolean;
	/**
	 * Custom className for the root
	 */
	className?: string;
}

/**
 * Accordion component built with Radix UI Accordion
 * Accessible collapsible content sections
 */
export const Accordion: React.FC<AccordionProps> = ({ items, multiple = false, className, ...props }) => {
	const rootProps = multiple
		? ({ type: 'multiple' as const, ...props } as AccordionMultipleProps)
		: ({ type: 'single' as const, collapsible: true, ...props } as AccordionSingleProps);

	return (
		<AccordionRoot
			{...rootProps}
			className={cn('w-full divide-y divide-gray-200 border-b border-gray-200', className)}
		>
			{items.map(item => (
				<AccordionItem
					key={item.value}
					value={item.value}
					disabled={item.disabled}
					className="border-t border-gray-200"
				>
					<AccordionHeader className="flex">
						<AccordionTrigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
							{item.title}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-4 w-4 shrink-0 transition-transform duration-200"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
						<div className="pb-4 pt-0">{item.content}</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</AccordionRoot>
	);
};

Accordion.displayName = 'Accordion';
