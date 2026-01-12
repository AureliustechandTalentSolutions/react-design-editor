/**
 * Layout Patterns
 * Common UI layout patterns and responsive configurations
 */

import { LayoutPattern } from '../../types/aiui';

/**
 * Common layout patterns for UI generation
 */
export const layoutPatterns: LayoutPattern[] = [
	{
		id: 'landing-page',
		name: 'Landing Page',
		description: 'Hero section with features and CTA',
		responsive: true,
		structure: {
			sections: ['hero', 'features', 'testimonials', 'cta', 'footer'],
			layout: 'vertical',
		},
	},
	{
		id: 'dashboard',
		name: 'Dashboard',
		description: 'Admin dashboard with sidebar and widgets',
		responsive: true,
		structure: {
			sections: ['sidebar', 'header', 'main-content', 'widgets'],
			layout: 'sidebar-left',
		},
	},
	{
		id: 'auth-flow',
		name: 'Authentication Flow',
		description: 'Login/Register screens',
		responsive: true,
		structure: {
			sections: ['form-container', 'branding'],
			layout: 'centered',
		},
	},
	{
		id: 'ecommerce',
		name: 'E-commerce',
		description: 'Product listings and details',
		responsive: true,
		structure: {
			sections: ['navbar', 'filters', 'product-grid', 'footer'],
			layout: 'sidebar-left',
		},
	},
	{
		id: 'profile-page',
		name: 'Profile Page',
		description: 'User profile with tabs',
		responsive: true,
		structure: {
			sections: ['header', 'profile-info', 'tabs', 'content'],
			layout: 'vertical',
		},
	},
	{
		id: 'chat-ui',
		name: 'Chat Interface',
		description: 'Messaging interface',
		responsive: true,
		structure: {
			sections: ['sidebar', 'chat-list', 'message-view', 'input'],
			layout: 'three-column',
		},
	},
	{
		id: 'mobile-app',
		name: 'Mobile App',
		description: 'Mobile app screen',
		responsive: true,
		structure: {
			sections: ['header', 'content', 'bottom-nav'],
			layout: 'mobile',
		},
	},
	{
		id: 'settings-page',
		name: 'Settings Page',
		description: 'Settings with navigation',
		responsive: true,
		structure: {
			sections: ['sidebar', 'settings-panels'],
			layout: 'sidebar-left',
		},
	},
];

/**
 * Responsive breakpoints
 */
export const breakpoints = {
	mobile: 375,
	tablet: 768,
	desktop: 1024,
	wide: 1440,
};

/**
 * Get layout pattern by ID
 */
export const getLayoutPattern = (id: string): LayoutPattern | undefined => {
	return layoutPatterns.find(pattern => pattern.id === id);
};

/**
 * Get all layout patterns
 */
export const getAllLayoutPatterns = (): LayoutPattern[] => {
	return layoutPatterns;
};
