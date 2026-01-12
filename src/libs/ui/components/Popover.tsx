import React from 'react';
import {
	PopoverRoot,
	PopoverTrigger,
	PopoverPortal,
	PopoverContent,
	PopoverClose,
	PopoverArrow,
} from '../radix';
import type { PopoverProps as RadixPopoverProps } from '../radix';
import { cn } from '../variants';

export interface PopoverProps extends RadixPopoverProps {
	/**
	 * Trigger element for the popover
	 */
	trigger: React.ReactNode;
	/**
	 * Popover content
	 */
	children: React.ReactNode;
	/**
	 * Side of the trigger where popover should appear
	 */
	side?: 'top' | 'right' | 'bottom' | 'left';
	/**
	 * Show arrow
	 */
	showArrow?: boolean;
	/**
	 * Show close button
	 */
	showClose?: boolean;
	/**
	 * Custom className for the content
	 */
	contentClassName?: string;
}

/**
 * Popover component built with Radix UI Popover
 * Accessible popover with positioning
 */
export const Popover: React.FC<PopoverProps> = ({
	trigger,
	children,
	side = 'bottom',
	showArrow = false,
	showClose = false,
	contentClassName,
	...props
}) => {
	return (
		<PopoverRoot {...props}>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent
					side={side}
					className={cn(
						'z-50 w-72 rounded-md border border-gray-200 bg-white p-4 text-gray-900 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
						contentClassName
					)}
					sideOffset={5}
				>
					{children}
					{showClose && (
						<PopoverClose className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none">
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
								className="h-4 w-4"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
							<span className="sr-only">Close</span>
						</PopoverClose>
					)}
					{showArrow && <PopoverArrow className="fill-white" />}
				</PopoverContent>
			</PopoverPortal>
		</PopoverRoot>
	);
};

Popover.displayName = 'Popover';
