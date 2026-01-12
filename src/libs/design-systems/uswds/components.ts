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
