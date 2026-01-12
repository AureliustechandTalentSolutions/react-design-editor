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
