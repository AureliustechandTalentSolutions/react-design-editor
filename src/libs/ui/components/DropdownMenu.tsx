import React from 'react';
import {
	DropdownMenuRoot,
	DropdownMenuTrigger,
	DropdownMenuPortal,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '../radix';
import type { DropdownMenuProps as RadixDropdownMenuProps } from '../radix';
import { cn } from '../variants';

export interface DropdownMenuItemType {
	label: string;
	value: string;
	icon?: React.ReactNode;
	disabled?: boolean;
	onSelect?: () => void;
}

export interface DropdownMenuProps extends RadixDropdownMenuProps {
	/**
	 * Trigger element for the dropdown
	 */
	trigger: React.ReactNode;
	/**
	 * Menu items
	 */
	items: (DropdownMenuItemType | 'separator' | { group: string; items: DropdownMenuItemType[] })[];
	/**
	 * Custom className for the content
	 */
	contentClassName?: string;
}

/**
 * DropdownMenu component built with Radix UI DropdownMenu
 * Accessible dropdown menu with keyboard navigation
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
	trigger,
	items,
	contentClassName,
	...props
}) => {
	return (
		<DropdownMenuRoot {...props}>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent
					className={cn(
						'z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
						contentClassName
					)}
					sideOffset={5}
				>
					{items.map((item, index) => {
						if (item === 'separator') {
							return (
								<DropdownMenuSeparator
									key={`separator-${index}`}
									className="-mx-1 my-1 h-px bg-gray-200"
								/>
							);
						}

						if ('group' in item) {
							return (
								<DropdownMenuGroup key={`group-${index}`}>
									<DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-500">
										{item.group}
									</DropdownMenuLabel>
									{item.items.map((groupItem) => (
										<DropdownMenuItem
											key={groupItem.value}
											className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											disabled={groupItem.disabled}
											onSelect={groupItem.onSelect}
										>
											{groupItem.icon && <span className="mr-2">{groupItem.icon}</span>}
											{groupItem.label}
										</DropdownMenuItem>
									))}
								</DropdownMenuGroup>
							);
						}

						return (
							<DropdownMenuItem
								key={item.value}
								className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
								disabled={item.disabled}
								onSelect={item.onSelect}
							>
								{item.icon && <span className="mr-2">{item.icon}</span>}
								{item.label}
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenuRoot>
	);
};

DropdownMenu.displayName = 'DropdownMenu';
