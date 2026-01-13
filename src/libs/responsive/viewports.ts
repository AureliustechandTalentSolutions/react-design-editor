/**
 * Device Viewport Definitions
 * Standard viewports and device presets for responsive design
 */

/**
 * Viewport interface
 */
export interface Viewport {
	id: string;
	name: string;
	width: number;
	height: number;
	icon: string;
	category: 'mobile' | 'tablet' | 'desktop' | 'wide';
}

/**
 * Breakpoint configuration
 */
export interface Breakpoint {
	name: string;
	minWidth: number;
	maxWidth?: number;
}

/**
 * Standard breakpoints
 */
export const BREAKPOINTS: Breakpoint[] = [
	{ name: 'mobile', minWidth: 0, maxWidth: 767 },
	{ name: 'tablet', minWidth: 768, maxWidth: 1023 },
	{ name: 'desktop', minWidth: 1024, maxWidth: 1439 },
	{ name: 'wide', minWidth: 1440 },
];

/**
 * Standard viewport presets
 */
export const STANDARD_VIEWPORTS: Viewport[] = [
	{
		id: 'mobile',
		name: 'Mobile',
		width: 375,
		height: 667,
		icon: '📱',
		category: 'mobile',
	},
	{
		id: 'tablet',
		name: 'Tablet',
		width: 768,
		height: 1024,
		icon: '📱',
		category: 'tablet',
	},
	{
		id: 'desktop',
		name: 'Desktop',
		width: 1440,
		height: 900,
		icon: '💻',
		category: 'desktop',
	},
	{
		id: 'wide',
		name: 'Wide',
		width: 1920,
		height: 1080,
		icon: '🖥️',
		category: 'wide',
	},
];

/**
 * Device presets
 */
export const DEVICE_PRESETS: Viewport[] = [
	// iPhone devices
	{
		id: 'iphone-14',
		name: 'iPhone 14',
		width: 390,
		height: 844,
		icon: '📱',
		category: 'mobile',
	},
	{
		id: 'iphone-14-pro',
		name: 'iPhone 14 Pro',
		width: 393,
		height: 852,
		icon: '📱',
		category: 'mobile',
	},
	{
		id: 'iphone-14-pro-max',
		name: 'iPhone 14 Pro Max',
		width: 430,
		height: 932,
		icon: '📱',
		category: 'mobile',
	},
	{
		id: 'iphone-se',
		name: 'iPhone SE',
		width: 375,
		height: 667,
		icon: '📱',
		category: 'mobile',
	},
	// iPad devices
	{
		id: 'ipad-mini',
		name: 'iPad Mini',
		width: 744,
		height: 1133,
		icon: '📱',
		category: 'tablet',
	},
	{
		id: 'ipad-air',
		name: 'iPad Air',
		width: 820,
		height: 1180,
		icon: '📱',
		category: 'tablet',
	},
	{
		id: 'ipad-pro-11',
		name: 'iPad Pro 11"',
		width: 834,
		height: 1194,
		icon: '📱',
		category: 'tablet',
	},
	{
		id: 'ipad-pro-13',
		name: 'iPad Pro 13"',
		width: 1024,
		height: 1366,
		icon: '📱',
		category: 'tablet',
	},
	// Desktop devices
	{
		id: 'macbook-air',
		name: 'MacBook Air',
		width: 1280,
		height: 800,
		icon: '💻',
		category: 'desktop',
	},
	{
		id: 'macbook-pro-14',
		name: 'MacBook Pro 14"',
		width: 1512,
		height: 982,
		icon: '💻',
		category: 'desktop',
	},
	{
		id: 'macbook-pro-16',
		name: 'MacBook Pro 16"',
		width: 1728,
		height: 1117,
		icon: '💻',
		category: 'desktop',
	},
	{
		id: 'imac-24',
		name: 'iMac 24"',
		width: 2240,
		height: 1260,
		icon: '🖥️',
		category: 'wide',
	},
];

/**
 * All available viewports
 */
export const ALL_VIEWPORTS: Viewport[] = [...STANDARD_VIEWPORTS, ...DEVICE_PRESETS];

/**
 * Get viewport by ID
 */
export const getViewportById = (id: string): Viewport | undefined => {
	return ALL_VIEWPORTS.find(viewport => viewport.id === id);
};

/**
 * Get viewports by category
 */
export const getViewportsByCategory = (category: Viewport['category']): Viewport[] => {
	return ALL_VIEWPORTS.filter(viewport => viewport.category === category);
};

/**
 * Get breakpoint for width
 */
export const getBreakpointForWidth = (width: number): Breakpoint | undefined => {
	return BREAKPOINTS.find(
		breakpoint =>
			width >= breakpoint.minWidth && (breakpoint.maxWidth === undefined || width <= breakpoint.maxWidth),
	);
};

/**
 * Check if width matches breakpoint
 */
export const matchesBreakpoint = (width: number, breakpointName: string): boolean => {
	const breakpoint = BREAKPOINTS.find(bp => bp.name === breakpointName);
	if (!breakpoint) return false;

	return width >= breakpoint.minWidth && (breakpoint.maxWidth === undefined || width <= breakpoint.maxWidth);
};

/**
 * Custom viewport creation
 */
export const createCustomViewport = (
	name: string,
	width: number,
	height: number,
	category: Viewport['category'] = 'desktop',
): Viewport => {
	let icon = '💻';
	if (category === 'mobile' || category === 'tablet') {
		icon = '📱';
	} else if (category === 'wide') {
		icon = '🖥️';
	}

	return {
		id: `custom-${name.toLowerCase().replace(/\s+/g, '-')}`,
		name,
		width,
		height,
		icon,
		category,
	};
};
