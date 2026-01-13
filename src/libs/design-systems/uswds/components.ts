/**
 * USWDS Component Catalog
 * Comprehensive catalog of all U.S. Web Design System components
 * Based on USWDS 3.x component library
 */

export interface USWDSComponent {
	name: string;
	importName: string;
	category: 'layout' | 'forms' | 'navigation' | 'components';
	props: string[];
	description: string;
}

/**
 * Complete catalog of USWDS components organized by category
 */
export const uswdsComponents: USWDSComponent[] = [
	// Layout Components
	{
		name: 'Grid',
		importName: 'Grid',
		category: 'layout',
		props: ['row', 'col', 'gap', 'className'],
		description: 'Responsive grid system',
	},
	{
		name: 'GridContainer',
		importName: 'GridContainer',
		category: 'layout',
		props: ['containerSize', 'className'],
		description: 'Container for grid layout',
	},

	// Form Components
	{
		name: 'Button',
		importName: 'Button',
		category: 'forms',
		props: ['type', 'onClick', 'disabled', 'className', 'size', 'variant'],
		description: 'Standard button component',
	},
	{
		name: 'TextInput',
		importName: 'TextInput',
		category: 'forms',
		props: ['id', 'name', 'type', 'value', 'onChange', 'className'],
		description: 'Text input field',
	},
	{
		name: 'Label',
		importName: 'Label',
		category: 'forms',
		props: ['htmlFor', 'className', 'children'],
		description: 'Form label',
	},
	{
		name: 'Checkbox',
		importName: 'Checkbox',
		category: 'forms',
		props: ['id', 'name', 'checked', 'onChange', 'label', 'className'],
		description: 'Checkbox input',
	},
	{
		name: 'Radio',
		importName: 'Radio',
		category: 'forms',
		props: ['id', 'name', 'value', 'checked', 'onChange', 'label', 'className'],
		description: 'Radio button input',
	},
	{
		name: 'Dropdown',
		importName: 'Dropdown',
		category: 'forms',
		props: ['id', 'name', 'value', 'onChange', 'className'],
		description: 'Dropdown select',
	},
	{
		name: 'Textarea',
		importName: 'Textarea',
		category: 'forms',
		props: ['id', 'name', 'value', 'onChange', 'className'],
		description: 'Multiline text input',
	},
	{
		name: 'DatePicker',
		importName: 'DatePicker',
		category: 'forms',
		props: ['id', 'name', 'defaultValue', 'onChange', 'className'],
		description: 'Date picker input',
	},
	{
		name: 'FileInput',
		importName: 'FileInput',
		category: 'forms',
		props: ['id', 'name', 'accept', 'onChange', 'className'],
		description: 'File upload input',
	},
	{
		name: 'RangeInput',
		importName: 'RangeInput',
		category: 'forms',
		props: ['id', 'name', 'min', 'max', 'value', 'onChange', 'className'],
		description: 'Range slider input',
	},

	// Navigation Components
	{
		name: 'Header',
		importName: 'Header',
		category: 'navigation',
		props: ['basic', 'extended', 'className'],
		description: 'Site header',
	},
	{
		name: 'PrimaryNav',
		importName: 'PrimaryNav',
		category: 'navigation',
		props: ['items', 'mobileExpanded', 'onToggleMobileNav', 'className'],
		description: 'Primary navigation menu',
	},
	{
		name: 'Menu',
		importName: 'Menu',
		category: 'navigation',
		props: ['items', 'isOpen', 'className'],
		description: 'Menu component',
	},
	{
		name: 'NavMenuButton',
		importName: 'NavMenuButton',
		category: 'navigation',
		props: ['label', 'menuId', 'onClick', 'className'],
		description: 'Navigation menu button',
	},
	{
		name: 'SideNav',
		importName: 'SideNav',
		category: 'navigation',
		props: ['items', 'className'],
		description: 'Side navigation',
	},
	{
		name: 'Breadcrumb',
		importName: 'Breadcrumb',
		category: 'navigation',
		props: ['className'],
		description: 'Breadcrumb navigation',
	},
	{
		name: 'BreadcrumbBar',
		importName: 'BreadcrumbBar',
		category: 'navigation',
		props: ['className'],
		description: 'Breadcrumb container',
	},
	{
		name: 'BreadcrumbLink',
		importName: 'BreadcrumbLink',
		category: 'navigation',
		props: ['href', 'className'],
		description: 'Breadcrumb link item',
	},
	{
		name: 'Footer',
		importName: 'Footer',
		category: 'navigation',
		props: ['size', 'primary', 'secondary', 'className'],
		description: 'Site footer',
	},

	// UI Components
	{
		name: 'Accordion',
		importName: 'Accordion',
		category: 'components',
		props: ['items', 'bordered', 'multiselectable', 'className'],
		description: 'Accordion component',
	},
	{
		name: 'Alert',
		importName: 'Alert',
		category: 'components',
		props: ['type', 'heading', 'slim', 'noIcon', 'className'],
		description: 'Alert message',
	},
	{
		name: 'Banner',
		importName: 'Banner',
		category: 'components',
		props: ['flagLanguage', 'className'],
		description: 'Government banner',
	},
	{
		name: 'Card',
		importName: 'Card',
		category: 'components',
		props: ['layout', 'headerFirst', 'className'],
		description: 'Card component',
	},
	{
		name: 'CardGroup',
		importName: 'CardGroup',
		category: 'components',
		props: ['className'],
		description: 'Container for cards',
	},
	{
		name: 'CardHeader',
		importName: 'CardHeader',
		category: 'components',
		props: ['className'],
		description: 'Card header',
	},
	{
		name: 'CardBody',
		importName: 'CardBody',
		category: 'components',
		props: ['className'],
		description: 'Card body content',
	},
	{
		name: 'CardFooter',
		importName: 'CardFooter',
		category: 'components',
		props: ['className'],
		description: 'Card footer',
	},
	{
		name: 'CharacterCount',
		importName: 'CharacterCount',
		category: 'components',
		props: ['id', 'name', 'maxLength', 'className'],
		description: 'Character counter for text inputs',
	},
	{
		name: 'Collection',
		importName: 'Collection',
		category: 'components',
		props: ['className'],
		description: 'Collection list',
	},
	{
		name: 'Link',
		importName: 'Link',
		category: 'components',
		props: ['href', 'variant', 'className'],
		description: 'Styled link',
	},
	{
		name: 'Modal',
		importName: 'Modal',
		category: 'components',
		props: ['isOpen', 'onClose', 'id', 'className'],
		description: 'Modal dialog',
	},
	{
		name: 'ModalHeading',
		importName: 'ModalHeading',
		category: 'components',
		props: ['id', 'className'],
		description: 'Modal heading',
	},
	{
		name: 'ModalFooter',
		importName: 'ModalFooter',
		category: 'components',
		props: ['className'],
		description: 'Modal footer',
	},
	{
		name: 'Pagination',
		importName: 'Pagination',
		category: 'components',
		props: ['pathname', 'totalPages', 'currentPage', 'onClickPageNumber', 'className'],
		description: 'Pagination controls',
	},
	{
		name: 'ProcessList',
		importName: 'ProcessList',
		category: 'components',
		props: ['className'],
		description: 'Process list',
	},
	{
		name: 'ProcessListItem',
		importName: 'ProcessListItem',
		category: 'components',
		props: ['className'],
		description: 'Process list item',
	},
	{
		name: 'Search',
		importName: 'Search',
		category: 'components',
		props: ['size', 'onSubmit', 'className'],
		description: 'Search input',
	},
	{
		name: 'SiteAlert',
		importName: 'SiteAlert',
		category: 'components',
		props: ['variant', 'slim', 'className'],
		description: 'Site-wide alert',
	},
	{
		name: 'StepIndicator',
		importName: 'StepIndicator',
		category: 'components',
		props: ['headingLevel', 'className'],
		description: 'Step indicator',
	},
	{
		name: 'StepIndicatorStep',
		importName: 'StepIndicatorStep',
		category: 'components',
		props: ['label', 'status', 'className'],
		description: 'Individual step',
	},
	{
		name: 'Table',
		importName: 'Table',
		category: 'components',
		props: ['bordered', 'fullWidth', 'striped', 'className'],
		description: 'Data table',
	},
	{
		name: 'Tag',
		importName: 'Tag',
		category: 'components',
		props: ['className'],
		description: 'Tag component',
	},
	{
		name: 'Tooltip',
		importName: 'Tooltip',
		category: 'components',
		props: ['label', 'position', 'className'],
		description: 'Tooltip',
	},
];

/**
 * Get components by category
 */
export function getComponentsByCategory(category: 'layout' | 'forms' | 'navigation' | 'components'): USWDSComponent[] {
	return uswdsComponents.filter(component => component.category === category);
}

/**
 * Get component by name
 */
export function getComponentByName(name: string): USWDSComponent | undefined {
	return uswdsComponents.find(component => component.name === name);
}

/**
 * Generate USWDS import statement
 */
export function generateUSWDSImport(components: string[]): string {
	if (components.length === 0) {
		return '';
	}

	const uniqueComponents = Array.from(new Set(components)).sort();
	return `import { ${uniqueComponents.join(', ')} } from '@trussworks/react-uswds';`;
}

/**
 * Get all component names
 */
export function getAllComponentNames(): string[] {
	return uswdsComponents.map(c => c.name);
}

/**
 * Get component count
 */
export function getComponentCount(): number {
	return uswdsComponents.length;
}
