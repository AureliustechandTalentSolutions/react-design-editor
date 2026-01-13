export const USWDS_COMPONENT_CATALOG = {
	layout: {
		Grid: { import: 'Grid', props: ['row', 'col', 'gap'] },
		GridContainer: { import: 'GridContainer', props: ['containerSize'] },
	},
	forms: {
		Button: {
			import: 'Button',
			props: ['type', 'disabled', 'outline', 'secondary', 'accent', 'base', 'size'],
		},
		TextInput: {
			import: 'TextInput',
			props: ['id', 'name', 'type', 'value', 'onChange', 'error', 'success'],
		},
		Select: { import: 'Select', props: ['id', 'name', 'options', 'value', 'onChange'] },
		Checkbox: { import: 'Checkbox', props: ['id', 'name', 'label', 'checked', 'onChange'] },
		Radio: { import: 'Radio', props: ['id', 'name', 'label', 'value', 'checked', 'onChange'] },
		DatePicker: {
			import: 'DatePicker',
			props: ['id', 'name', 'value', 'onChange', 'minDate', 'maxDate'],
		},
		Textarea: { import: 'Textarea', props: ['id', 'name', 'value', 'onChange'] },
		Label: { import: 'Label', props: ['htmlFor', 'error', 'hint'] },
		ErrorMessage: { import: 'ErrorMessage', props: ['id'] },
		Form: { import: 'Form', props: ['onSubmit', 'large', 'search'] },
		FormGroup: { import: 'FormGroup', props: ['error'] },
		FileInput: { import: 'FileInput', props: ['id', 'name', 'accept', 'multiple', 'onChange'] },
	},
	navigation: {
		Header: { import: 'Header', props: ['basic', 'extended', 'showMobileOverlay'] },
		Footer: { import: 'Footer', props: ['size', 'primary', 'secondary', 'returnToTop'] },
		PrimaryNav: { import: 'PrimaryNav', props: ['items', 'mobileExpanded', 'onToggleMobileNav'] },
		SideNav: { import: 'SideNav', props: ['items', 'isSubnav'] },
		Breadcrumb: { import: 'Breadcrumb', props: ['items', 'current'] },
		BreadcrumbBar: { import: 'BreadcrumbBar', props: ['listProps'] },
		BreadcrumbLink: { import: 'BreadcrumbLink', props: ['href'] },
		NavDropDownButton: {
			import: 'NavDropDownButton',
			props: ['label', 'menuId', 'isOpen', 'onToggle'],
		},
		Menu: { import: 'Menu', props: ['items', 'isOpen', 'id'] },
	},
	components: {
		Alert: {
			import: 'Alert',
			props: ['type', 'heading', 'headingLevel', 'noIcon', 'slim', 'validation'],
		},
		Card: { import: 'Card', props: ['layout', 'headerFirst'] },
		CardHeader: { import: 'CardHeader', props: ['exdent'] },
		CardBody: { import: 'CardBody', props: ['exdent'] },
		CardFooter: { import: 'CardFooter', props: ['exdent'] },
		CardMedia: { import: 'CardMedia', props: ['exdent', 'imageClass', 'inset'] },
		CardGroup: { import: 'CardGroup', props: [] },
		Accordion: { import: 'Accordion', props: ['bordered', 'multiselectable', 'items'] },
		Modal: { import: 'Modal', props: ['id', 'isVisible', 'onClose', 'forceAction'] },
		ModalHeading: { import: 'ModalHeading', props: [] },
		ModalFooter: { import: 'ModalFooter', props: [] },
		Table: { import: 'Table', props: ['bordered', 'striped', 'stackedStyle', 'scrollable'] },
		Tag: { import: 'Tag', props: ['background'] },
		Icon: { import: 'Icon', props: ['name', 'size'] },
		Link: { import: 'Link', props: ['href', 'variant', 'target'] },
		Banner: { import: 'Banner', props: [] },
		Identifier: { import: 'Identifier', props: ['domain', 'masthead', 'logos', 'links'] },
		StepIndicator: { import: 'StepIndicator', props: ['counters', 'centered', 'headingLevel'] },
		StepIndicatorStep: { import: 'StepIndicatorStep', props: ['label', 'status'] },
		SummaryBox: { import: 'SummaryBox', props: ['heading', 'headingLevel'] },
		ProcessList: { import: 'ProcessList', props: [] },
		ProcessListItem: { import: 'ProcessListItem', props: [] },
		ProcessListHeading: { import: 'ProcessListHeading', props: ['type'] },
		Collection: { import: 'Collection', props: ['condensed'] },
		CollectionItem: { import: 'CollectionItem', props: ['headingLevel', 'variantComponent'] },
		Search: { import: 'Search', props: ['big', 'small', 'onSubmit', 'placeholder'] },
		SiteAlert: { import: 'SiteAlert', props: ['variant', 'heading', 'showIcon'] },
		Tooltip: { import: 'Tooltip', props: ['label', 'position'] },
	},
};

export const generateUSWDSImport = (components: string[]): string => {
	const uniqueComponents = [...new Set(components)];
	return `import { ${uniqueComponents.join(', ')} } from '@trussworks/react-uswds';
import '@trussworks/react-uswds/lib/uswds.css';`;
};
/**
 * USWDS Component Definitions
 * Defines mapping between UI elements and USWDS components
 */

/**
 * USWDS component definition
 */
export interface USWDSComponent {
	name: string;
	className: string;
	description: string;
	props?: Record<string, unknown>;
	variants?: Record<string, unknown>;
	a11y?: {
		role?: string;
		ariaLabel?: string;
		ariaRequired?: boolean;
	};
}

/**
 * USWDS Button Component
 */
export const usaButton: USWDSComponent = {
	name: 'Button',
	className: 'usa-button',
	description: 'Standard USWDS button component',
	variants: {
		primary: 'usa-button',
		secondary: 'usa-button usa-button--secondary',
		accent: 'usa-button usa-button--accent-cool',
		base: 'usa-button usa-button--base',
		outline: 'usa-button usa-button--outline',
		unstyled: 'usa-button usa-button--unstyled',
		big: 'usa-button usa-button--big',
	},
	a11y: {
		role: 'button',
	},
};

/**
 * USWDS Card Component
 */
export const usaCard: USWDSComponent = {
	name: 'Card',
	className: 'usa-card',
	description: 'USWDS card component for content containers',
	variants: {
		default: 'usa-card',
		flag: 'usa-card usa-card--flag',
		headerFirst: 'usa-card usa-card--header-first',
		media: 'usa-card usa-card--media-right',
	},
};

/**
 * USWDS Input Component
 */
export const usaInput: USWDSComponent = {
	name: 'Input',
	className: 'usa-input',
	description: 'USWDS text input component',
	variants: {
		default: 'usa-input',
		error: 'usa-input usa-input--error',
		success: 'usa-input usa-input--success',
	},
	a11y: {
		ariaRequired: true,
	},
};

/**
 * USWDS Alert Component
 */
export const usaAlert: USWDSComponent = {
	name: 'Alert',
	className: 'usa-alert',
	description: 'USWDS alert component for notifications',
	variants: {
		info: 'usa-alert usa-alert--info',
		success: 'usa-alert usa-alert--success',
		warning: 'usa-alert usa-alert--warning',
		error: 'usa-alert usa-alert--error',
		slim: 'usa-alert usa-alert--slim',
		noIcon: 'usa-alert usa-alert--no-icon',
	},
	a11y: {
		role: 'alert',
	},
};

/**
 * USWDS Header Component
 */
export const usaHeader: USWDSComponent = {
	name: 'Header',
	className: 'usa-header',
	description: 'USWDS header component',
	variants: {
		basic: 'usa-header usa-header--basic',
		extended: 'usa-header usa-header--extended',
	},
	a11y: {
		role: 'banner',
	},
};

/**
 * USWDS Navigation Component
 */
export const usaNav: USWDSComponent = {
	name: 'Navigation',
	className: 'usa-nav',
	description: 'USWDS navigation component',
	a11y: {
		role: 'navigation',
	},
};

/**
 * USWDS Form Component
 */
export const usaForm: USWDSComponent = {
	name: 'Form',
	className: 'usa-form',
	description: 'USWDS form component',
	variants: {
		default: 'usa-form',
		large: 'usa-form usa-form--large',
	},
};

/**
 * USWDS Label Component
 */
export const usaLabel: USWDSComponent = {
	name: 'Label',
	className: 'usa-label',
	description: 'USWDS form label component',
};

/**
 * USWDS Checkbox Component
 */
export const usaCheckbox: USWDSComponent = {
	name: 'Checkbox',
	className: 'usa-checkbox',
	description: 'USWDS checkbox input component',
	a11y: {
		role: 'checkbox',
	},
};

/**
 * USWDS Radio Component
 */
export const usaRadio: USWDSComponent = {
	name: 'Radio',
	className: 'usa-radio',
	description: 'USWDS radio button component',
	a11y: {
		role: 'radio',
	},
};

/**
 * USWDS Table Component
 */
export const usaTable: USWDSComponent = {
	name: 'Table',
	className: 'usa-table',
	description: 'USWDS table component',
	variants: {
		default: 'usa-table',
		borderless: 'usa-table usa-table--borderless',
		striped: 'usa-table usa-table--striped',
	},
};

/**
 * USWDS Banner Component
 */
export const usaBanner: USWDSComponent = {
	name: 'Banner',
	className: 'usa-banner',
	description: 'USWDS official government site banner',
	a11y: {
		role: 'region',
		ariaLabel: 'Official government website',
	},
};

/**
 * USWDS Footer Component
 */
export const usaFooter: USWDSComponent = {
	name: 'Footer',
	className: 'usa-footer',
	description: 'USWDS footer component',
	variants: {
		big: 'usa-footer usa-footer--big',
		medium: 'usa-footer usa-footer--medium',
		slim: 'usa-footer usa-footer--slim',
	},
	a11y: {
		role: 'contentinfo',
	},
};

/**
 * USWDS Accordion Component
 */
export const usaAccordion: USWDSComponent = {
	name: 'Accordion',
	className: 'usa-accordion',
	description: 'USWDS accordion component',
	variants: {
		default: 'usa-accordion',
		bordered: 'usa-accordion usa-accordion--bordered',
	},
};

/**
 * USWDS Breadcrumb Component
 */
export const usaBreadcrumb: USWDSComponent = {
	name: 'Breadcrumb',
	className: 'usa-breadcrumb',
	description: 'USWDS breadcrumb navigation',
	a11y: {
		role: 'navigation',
		ariaLabel: 'Breadcrumbs',
	},
};

/**
 * Map of all USWDS components
 */
export const uswdsComponents: Record<string, USWDSComponent> = {
	button: usaButton,
	card: usaCard,
	input: usaInput,
	alert: usaAlert,
	header: usaHeader,
	nav: usaNav,
	form: usaForm,
	label: usaLabel,
	checkbox: usaCheckbox,
	radio: usaRadio,
	table: usaTable,
	banner: usaBanner,
	footer: usaFooter,
	accordion: usaAccordion,
	breadcrumb: usaBreadcrumb,
};

/**
 * Get USWDS component by name
 */
export const getUSWDSComponent = (name: string): USWDSComponent | undefined => {
	return uswdsComponents[name.toLowerCase()];
};

/**
 * Check if a component exists in USWDS
 */
export const isUSWDSComponent = (name: string): boolean => {
	return name.toLowerCase() in uswdsComponents;
};
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
