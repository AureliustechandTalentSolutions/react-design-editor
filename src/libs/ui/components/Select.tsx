import React from 'react';

import {
	SelectRoot,
	SelectTrigger,
	SelectPortal,
	SelectContent,
	SelectViewport,
	SelectItem,
	SelectItemText,
	SelectValue,
	SelectIcon,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from '../radix';
import type { SelectProps as RadixSelectProps } from '../radix';
import { cn } from '../variants';

export interface SelectOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface SelectProps extends RadixSelectProps {
	/**
	 * Select options
	 */
	options: SelectOption[];
	/**
	 * Placeholder text
	 */
	placeholder?: string;
	/**
	 * Custom className for the trigger
	 */
	triggerClassName?: string;
	/**
	 * Custom className for the content
	 */
	contentClassName?: string;
}

/**
 * Select component built with Radix UI Select
 * Accessible custom select with keyboard navigation
 */
export const Select: React.FC<SelectProps> = ({
	options,
	placeholder = 'Select an option',
	triggerClassName,
	contentClassName,
	...props
}) => {
	return (
		<SelectRoot {...props}>
			<SelectTrigger
				className={cn(
					'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					triggerClassName,
				)}
			>
				<SelectValue placeholder={placeholder} />
				<SelectIcon className="ml-2">
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
						className="h-4 w-4 opacity-50"
					>
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</SelectIcon>
			</SelectTrigger>
			<SelectPortal>
				<SelectContent
					className={cn(
						'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-900 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
						contentClassName,
					)}
				>
					<SelectScrollUpButton className="flex cursor-default items-center justify-center py-1">
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
							<polyline points="18 15 12 9 6 15" />
						</svg>
					</SelectScrollUpButton>
					<SelectViewport className="p-1">
						{options.map(option => (
							<SelectItem
								key={option.value}
								value={option.value}
								disabled={option.disabled}
								className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
							>
								<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
										<polyline points="20 6 9 17 4 12" />
									</svg>
								</span>
								<SelectItemText>{option.label}</SelectItemText>
							</SelectItem>
						))}
					</SelectViewport>
					<SelectScrollDownButton className="flex cursor-default items-center justify-center py-1">
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
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</SelectScrollDownButton>
				</SelectContent>
			</SelectPortal>
		</SelectRoot>
	);
};

Select.displayName = 'Select';
