import React from 'react';

import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from '../radix';
import type { TooltipProps as RadixTooltipProps } from '../radix';
import { cn } from '../variants';

export interface TooltipProps extends RadixTooltipProps {
	/**
	 * Trigger element for the tooltip
	 */
	children: React.ReactNode;
	/**
	 * Tooltip content
	 */
	content: React.ReactNode;
	/**
	 * Side of the trigger where tooltip should appear
	 */
	side?: 'top' | 'right' | 'bottom' | 'left';
	/**
	 * Show arrow
	 */
	showArrow?: boolean;
	/**
	 * Custom className for the content
	 */
	contentClassName?: string;
}

/**
 * Tooltip component built with Radix UI Tooltip
 * Accessible tooltip with positioning
 */
export const Tooltip: React.FC<TooltipProps> = ({
	children,
	content,
	side = 'top',
	showArrow = true,
	contentClassName,
	...props
}) => {
	return (
		<TooltipProvider>
			<TooltipRoot {...props}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipPortal>
					<TooltipContent
						side={side}
						className={cn(
							'z-50 overflow-hidden rounded-md border border-gray-200 bg-gray-900 px-3 py-1.5 text-xs text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
							contentClassName,
						)}
					>
						{content}
						{showArrow && <TooltipArrow className="fill-gray-900" />}
					</TooltipContent>
				</TooltipPortal>
			</TooltipRoot>
		</TooltipProvider>
	);
};

Tooltip.displayName = 'Tooltip';
