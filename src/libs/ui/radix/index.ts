/**
 * Radix UI Primitives Wrapper
 * Re-exports all Radix UI primitives with consistent API
 */

// Accordion
export {
	Root as AccordionRoot,
	Item as AccordionItem,
	Header as AccordionHeader,
	Trigger as AccordionTrigger,
	Content as AccordionContent,
} from '@radix-ui/react-accordion';
export type {
	AccordionSingleProps,
	AccordionMultipleProps,
	AccordionItemProps,
	AccordionTriggerProps,
	AccordionContentProps,
} from '@radix-ui/react-accordion';

// Dialog
export {
	Root as DialogRoot,
	Trigger as DialogTrigger,
	Portal as DialogPortal,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Title as DialogTitle,
	Description as DialogDescription,
	Close as DialogClose,
} from '@radix-ui/react-dialog';
export type {
	DialogProps,
	DialogTriggerProps,
	DialogPortalProps,
	DialogOverlayProps,
	DialogContentProps,
	DialogTitleProps,
	DialogDescriptionProps,
	DialogCloseProps,
} from '@radix-ui/react-dialog';

// Dropdown Menu
export {
	Root as DropdownMenuRoot,
	Trigger as DropdownMenuTrigger,
	Portal as DropdownMenuPortal,
	Content as DropdownMenuContent,
	Item as DropdownMenuItem,
	Group as DropdownMenuGroup,
	Label as DropdownMenuLabel,
	CheckboxItem as DropdownMenuCheckboxItem,
	RadioGroup as DropdownMenuRadioGroup,
	RadioItem as DropdownMenuRadioItem,
	ItemIndicator as DropdownMenuItemIndicator,
	Separator as DropdownMenuSeparator,
	Sub as DropdownMenuSub,
	SubTrigger as DropdownMenuSubTrigger,
	SubContent as DropdownMenuSubContent,
} from '@radix-ui/react-dropdown-menu';
export type {
	DropdownMenuProps,
	DropdownMenuTriggerProps,
	DropdownMenuPortalProps,
	DropdownMenuContentProps,
	DropdownMenuItemProps,
	DropdownMenuGroupProps,
	DropdownMenuLabelProps,
	DropdownMenuCheckboxItemProps,
	DropdownMenuRadioGroupProps,
	DropdownMenuRadioItemProps,
	DropdownMenuItemIndicatorProps,
	DropdownMenuSeparatorProps,
	DropdownMenuSubProps,
	DropdownMenuSubTriggerProps,
	DropdownMenuSubContentProps,
} from '@radix-ui/react-dropdown-menu';

// Popover
export {
	Root as PopoverRoot,
	Trigger as PopoverTrigger,
	Portal as PopoverPortal,
	Content as PopoverContent,
	Anchor as PopoverAnchor,
	Close as PopoverClose,
	Arrow as PopoverArrow,
} from '@radix-ui/react-popover';
export type {
	PopoverProps,
	PopoverTriggerProps,
	PopoverPortalProps,
	PopoverContentProps,
	PopoverAnchorProps,
	PopoverCloseProps,
	PopoverArrowProps,
} from '@radix-ui/react-popover';

// Select
export {
	Root as SelectRoot,
	Trigger as SelectTrigger,
	Portal as SelectPortal,
	Content as SelectContent,
	Viewport as SelectViewport,
	Item as SelectItem,
	ItemText as SelectItemText,
	ItemIndicator as SelectItemIndicator,
	Group as SelectGroup,
	Label as SelectLabel,
	Separator as SelectSeparator,
	ScrollUpButton as SelectScrollUpButton,
	ScrollDownButton as SelectScrollDownButton,
	Value as SelectValue,
	Icon as SelectIcon,
} from '@radix-ui/react-select';
export type {
	SelectProps,
	SelectTriggerProps,
	SelectPortalProps,
	SelectContentProps,
	SelectViewportProps,
	SelectItemProps,
	SelectItemTextProps,
	SelectItemIndicatorProps,
	SelectGroupProps,
	SelectLabelProps,
	SelectSeparatorProps,
	SelectScrollUpButtonProps,
	SelectScrollDownButtonProps,
	SelectValueProps,
	SelectIconProps,
} from '@radix-ui/react-select';

// Tabs
export {
	Root as TabsRoot,
	List as TabsList,
	Trigger as TabsTrigger,
	Content as TabsContent,
} from '@radix-ui/react-tabs';
export type {
	TabsProps,
	TabsListProps,
	TabsTriggerProps,
	TabsContentProps,
} from '@radix-ui/react-tabs';

// Tooltip
export {
	Provider as TooltipProvider,
	Root as TooltipRoot,
	Trigger as TooltipTrigger,
	Portal as TooltipPortal,
	Content as TooltipContent,
	Arrow as TooltipArrow,
} from '@radix-ui/react-tooltip';
export type {
	TooltipProviderProps,
	TooltipProps,
	TooltipTriggerProps,
	TooltipPortalProps,
	TooltipContentProps,
	TooltipArrowProps,
} from '@radix-ui/react-tooltip';
