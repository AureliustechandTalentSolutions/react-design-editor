/**
 * UI Component Templates
 * Fabric.js object templates for UI components
 */

import { UIComponent } from '../../types/aiui';

import { tokens } from './tokens';

/**
 * Create a basic rectangle template
 */
const createRectTemplate = (width: number, height: number, fill: string, options: any = {}): any => ({
	type: 'rect',
	width,
	height,
	fill,
	stroke: tokens.colors.monochrome.secondary,
	strokeWidth: 1,
	...options,
});

/**
 * Create a text template
 */
const createTextTemplate = (text: string, fontSize: number, options: any = {}): any => ({
	type: 'text',
	text,
	fontSize,
	fontFamily: 'Inter, sans-serif',
	fill: tokens.colors.monochrome.text,
	...options,
});

/**
 * UI Component library with Fabric.js templates
 */
export const componentLibrary: UIComponent[] = [
	// Layout Components
	{
		id: 'layout-page',
		name: 'Page',
		category: 'layout',
		icon: 'file',
		description: 'Full page container',
		template: createRectTemplate(1200, 800, '#ffffff', {
			selectable: false,
			evented: false,
		}),
	},
	{
		id: 'layout-header',
		name: 'Header',
		category: 'layout',
		icon: 'window-maximize',
		description: 'Page header section',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(1200, 80, '#ffffff', {
					shadow: tokens.shadows.sm,
				}),
			],
		},
	},
	{
		id: 'layout-footer',
		name: 'Footer',
		category: 'layout',
		icon: 'window-minimize',
		description: 'Page footer section',
		template: {
			type: 'group',
			objects: [createRectTemplate(1200, 100, tokens.colors.monochrome.background)],
		},
	},
	{
		id: 'layout-sidebar',
		name: 'Sidebar',
		category: 'layout',
		icon: 'columns',
		description: 'Vertical sidebar',
		template: createRectTemplate(280, 600, '#ffffff', {
			shadow: tokens.shadows.md,
		}),
	},
	{
		id: 'layout-grid',
		name: 'Grid',
		category: 'layout',
		icon: 'th',
		description: 'Grid container',
		template: {
			type: 'group',
			objects: [],
		},
	},
	// Form Components
	{
		id: 'form-login',
		name: 'Login Form',
		category: 'forms',
		icon: 'sign-in-alt',
		description: 'Login form with email and password',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(400, 500, '#ffffff', {
					shadow: tokens.shadows.lg,
					rx: tokens.borderRadius.lg,
					ry: tokens.borderRadius.lg,
				}),
				createTextTemplate('Login', tokens.fontSize['3xl'], {
					top: 40,
					left: 40,
					fontWeight: tokens.fontWeight.bold,
				}),
			],
		},
	},
	{
		id: 'form-register',
		name: 'Register Form',
		category: 'forms',
		icon: 'user-plus',
		description: 'Registration form',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(400, 600, '#ffffff', {
					shadow: tokens.shadows.lg,
					rx: tokens.borderRadius.lg,
					ry: tokens.borderRadius.lg,
				}),
			],
		},
	},
	{
		id: 'form-contact',
		name: 'Contact Form',
		category: 'forms',
		icon: 'envelope',
		description: 'Contact form',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(500, 600, '#ffffff', {
					shadow: tokens.shadows.md,
					rx: tokens.borderRadius.md,
					ry: tokens.borderRadius.md,
				}),
			],
		},
	},
	{
		id: 'form-search',
		name: 'Search',
		category: 'forms',
		icon: 'search',
		description: 'Search input',
		template: createRectTemplate(300, 40, '#ffffff', {
			stroke: tokens.colors.monochrome.secondary,
			strokeWidth: 1,
			rx: tokens.borderRadius.full,
			ry: tokens.borderRadius.full,
		}),
	},
	{
		id: 'form-upload',
		name: 'File Upload',
		category: 'forms',
		icon: 'upload',
		description: 'File upload area',
		template: createRectTemplate(400, 200, tokens.colors.monochrome.background, {
			stroke: tokens.colors.monochrome.secondary,
			strokeWidth: 2,
			strokeDashArray: [5, 5],
			rx: tokens.borderRadius.md,
			ry: tokens.borderRadius.md,
		}),
	},
	// Data Display Components
	{
		id: 'data-table',
		name: 'Data Table',
		category: 'data',
		icon: 'table',
		description: 'Data table',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(800, 400, '#ffffff', {
					shadow: tokens.shadows.sm,
				}),
			],
		},
	},
	{
		id: 'data-card-grid',
		name: 'Card Grid',
		category: 'data',
		icon: 'th-large',
		description: 'Grid of cards',
		template: {
			type: 'group',
			objects: [],
		},
	},
	{
		id: 'data-list',
		name: 'List',
		category: 'data',
		icon: 'list',
		description: 'List component',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(600, 400, '#ffffff', {
					shadow: tokens.shadows.sm,
				}),
			],
		},
	},
	{
		id: 'data-chart',
		name: 'Chart',
		category: 'data',
		icon: 'chart-bar',
		description: 'Chart visualization',
		template: createRectTemplate(600, 400, '#ffffff', {
			shadow: tokens.shadows.md,
			rx: tokens.borderRadius.lg,
			ry: tokens.borderRadius.lg,
		}),
	},
	{
		id: 'data-kpi',
		name: 'KPI Card',
		category: 'data',
		icon: 'tachometer-alt',
		description: 'KPI metric card',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(280, 140, '#ffffff', {
					shadow: tokens.shadows.md,
					rx: tokens.borderRadius.lg,
					ry: tokens.borderRadius.lg,
				}),
			],
		},
	},
	// Navigation Components
	{
		id: 'nav-navbar',
		name: 'Navbar',
		category: 'navigation',
		icon: 'bars',
		description: 'Navigation bar',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(1200, 60, '#ffffff', {
					shadow: tokens.shadows.sm,
				}),
			],
		},
	},
	{
		id: 'nav-tabs',
		name: 'Tabs',
		category: 'navigation',
		icon: 'folder',
		description: 'Tab navigation',
		template: {
			type: 'group',
			objects: [createRectTemplate(600, 40, 'transparent')],
		},
	},
	{
		id: 'nav-breadcrumb',
		name: 'Breadcrumb',
		category: 'navigation',
		icon: 'ellipsis-h',
		description: 'Breadcrumb navigation',
		template: {
			type: 'group',
			objects: [createTextTemplate('Home / Products / Details', tokens.fontSize.sm)],
		},
	},
	{
		id: 'nav-pagination',
		name: 'Pagination',
		category: 'navigation',
		icon: 'step-forward',
		description: 'Pagination controls',
		template: {
			type: 'group',
			objects: [],
		},
	},
	// Action Components
	{
		id: 'action-button',
		name: 'Button',
		category: 'actions',
		icon: 'hand-pointer',
		description: 'Action button',
		template: createRectTemplate(120, 40, tokens.colors.modern.primary, {
			rx: tokens.borderRadius.md,
			ry: tokens.borderRadius.md,
		}),
	},
	{
		id: 'action-dropdown',
		name: 'Dropdown',
		category: 'actions',
		icon: 'caret-down',
		description: 'Dropdown menu',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(200, 40, '#ffffff', {
					stroke: tokens.colors.monochrome.secondary,
					strokeWidth: 1,
					rx: tokens.borderRadius.md,
					ry: tokens.borderRadius.md,
				}),
			],
		},
	},
	{
		id: 'action-modal',
		name: 'Modal',
		category: 'actions',
		icon: 'window-restore',
		description: 'Modal dialog',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(600, 400, '#ffffff', {
					shadow: tokens.shadows['2xl'],
					rx: tokens.borderRadius.xl,
					ry: tokens.borderRadius.xl,
				}),
			],
		},
	},
	{
		id: 'action-toast',
		name: 'Toast',
		category: 'actions',
		icon: 'comment',
		description: 'Toast notification',
		template: createRectTemplate(360, 80, '#ffffff', {
			shadow: tokens.shadows.lg,
			rx: tokens.borderRadius.lg,
			ry: tokens.borderRadius.lg,
		}),
	},
	// E-commerce Components
	{
		id: 'ecommerce-product-card',
		name: 'Product Card',
		category: 'ecommerce',
		icon: 'shopping-bag',
		description: 'Product card',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(280, 400, '#ffffff', {
					shadow: tokens.shadows.md,
					rx: tokens.borderRadius.lg,
					ry: tokens.borderRadius.lg,
				}),
			],
		},
	},
	{
		id: 'ecommerce-cart',
		name: 'Cart',
		category: 'ecommerce',
		icon: 'shopping-cart',
		description: 'Shopping cart',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(400, 600, '#ffffff', {
					shadow: tokens.shadows.xl,
				}),
			],
		},
	},
	{
		id: 'ecommerce-checkout',
		name: 'Checkout',
		category: 'ecommerce',
		icon: 'credit-card',
		description: 'Checkout form',
		template: {
			type: 'group',
			objects: [
				createRectTemplate(800, 600, '#ffffff', {
					shadow: tokens.shadows.md,
					rx: tokens.borderRadius.lg,
					ry: tokens.borderRadius.lg,
				}),
			],
		},
	},
	{
		id: 'ecommerce-price',
		name: 'Price Display',
		category: 'ecommerce',
		icon: 'dollar-sign',
		description: 'Price display',
		template: {
			type: 'group',
			objects: [
				createTextTemplate('$99.99', tokens.fontSize['3xl'], {
					fontWeight: tokens.fontWeight.bold,
				}),
			],
		},
	},
];

/**
 * Get component by ID
 */
export const getComponentById = (id: string): UIComponent | undefined => {
	return componentLibrary.find(comp => comp.id === id);
};

/**
 * Get components by category
 */
export const getComponentsByCategory = (category: string): UIComponent[] => {
	return componentLibrary.filter(comp => comp.category === category);
};
