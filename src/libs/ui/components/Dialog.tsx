import React from 'react';
import {
	DialogRoot,
	DialogTrigger,
	DialogPortal,
	DialogOverlay,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from '../radix';
import type { DialogProps as RadixDialogProps } from '../radix';
import { cn } from '../variants';

export interface DialogProps extends RadixDialogProps {
	/**
	 * Trigger element for the dialog
	 */
	trigger?: React.ReactNode;
	/**
	 * Dialog title
	 */
	title?: string;
	/**
	 * Dialog description
	 */
	description?: string;
	/**
	 * Dialog content
	 */
	children: React.ReactNode;
	/**
	 * Custom className for the content
	 */
	contentClassName?: string;
	/**
	 * Show close button
	 */
	showClose?: boolean;
}

/**
 * Dialog component built with Radix UI Dialog
 * Accessible modal dialog with overlay
 */
export const Dialog: React.FC<DialogProps> = ({
	trigger,
	title,
	description,
	children,
	contentClassName,
	showClose = true,
	...props
}) => {
	return (
		<DialogRoot {...props}>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogPortal>
				<DialogOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<DialogContent
					className={cn(
						'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
						contentClassName
					)}
				>
					{title && (
						<DialogTitle className="text-lg font-semibold leading-none tracking-tight">
							{title}
						</DialogTitle>
					)}
					{description && (
						<DialogDescription className="text-sm text-gray-500">
							{description}
						</DialogDescription>
					)}
					<div className="mt-2">{children}</div>
					{showClose && (
						<DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500">
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
						</DialogClose>
					)}
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	);
};

Dialog.displayName = 'Dialog';
