/**
 * USWDS Design Tokens
 * Based on U.S. Web Design System specifications
 * @see https://designsystem.digital.gov/design-tokens/
 */

/**
 * USWDS Color Tokens
 */
export const uswdsColors = {
	// Base colors
	primary: {
		base: '#005ea2',
		vivid: '#0050d8',
		dark: '#1a4480',
		darker: '#162e51',
		light: '#73b3e7',
		lighter: '#eff6fb',
	},
	secondary: {
		base: '#d83933',
		vivid: '#e41d3d',
		dark: '#b50909',
		darker: '#8b0a03',
		light: '#f39268',
		lighter: '#f9dede',
	},
	accent: {
		cool: '#00bde3',
		warm: '#fa9441',
	},
	// Neutral colors
	base: {
		lightest: '#f0f0f0',
		lighter: '#dfe1e2',
		light: '#a9aeb1',
		base: '#71767a',
		dark: '#565c65',
		darker: '#3d4551',
		darkest: '#1b1b1b',
		black: '#000000',
		white: '#ffffff',
	},
	// Semantic colors
	info: {
		base: '#00bde3',
		light: '#99deea',
		lighter: '#e7f6f8',
		dark: '#009ec1',
		darker: '#0081a1',
	},
	success: {
		base: '#00a91c',
		light: '#70e17b',
		lighter: '#ecf3ec',
		dark: '#008817',
		darker: '#216e1f',
	},
	warning: {
		base: '#ffbe2e',
		light: '#fee685',
		lighter: '#faf3d1',
		dark: '#e5a000',
		darker: '#936f38',
	},
	error: {
		base: '#d54309',
		light: '#f4e3db',
		lighter: '#f4e3db',
		dark: '#b50909',
		darker: '#6f3331',
	},
};

/**
 * USWDS Spacing Tokens (in pixels)
 */
export const uswdsSpacing = {
	'05': 4,
	'1': 8,
	'105': 12,
	'2': 16,
	'205': 20,
	'3': 24,
	'4': 32,
	'5': 40,
	'6': 48,
	'7': 56,
	'8': 64,
	'9': 72,
	'10': 80,
};

/**
 * USWDS Typography Tokens
 */
export const uswdsTypography = {
	fontFamily: {
		ui: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
		heading: '"Merriweather", Georgia, Cambria, "Times New Roman", Times, serif',
		body: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
		code: '"Roboto Mono", "Bitstream Vera Sans Mono", "Consolas", "Courier", monospace',
		alt: '"Merriweather", Georgia, Cambria, "Times New Roman", Times, serif',
	},
	fontSize: {
		'3xs': 10,
		'2xs': 11,
		xs: 12,
		sm: 13,
		md: 14,
		lg: 16,
		xl: 18,
		'2xl': 20,
		'3xl': 24,
		'4xl': 28,
		'5xl': 32,
		'6xl': 40,
		'7xl': 48,
		'8xl': 56,
		'9xl': 64,
	},
	fontWeight: {
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
	},
	lineHeight: {
		tight: 1.15,
		base: 1.5,
		loose: 1.75,
	},
};

/**
 * USWDS Border Radius Tokens
 */
export const uswdsBorderRadius = {
	none: 0,
	sm: 2,
	md: 4,
	lg: 8,
	pill: 9999,
	circle: '50%',
};

/**
 * USWDS Shadow Tokens
 */
export const uswdsShadows = {
	none: 'none',
	sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
	md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

/**
 * USWDS Z-Index Tokens
 */
export const uswdsZIndex = {
	bottom: -1,
	base: 0,
	dropdown: 1000,
	sticky: 1020,
	fixed: 1030,
	modal: 1040,
	popover: 1050,
	tooltip: 1060,
};

/**
 * USWDS Breakpoints (in pixels)
 */
export const uswdsBreakpoints = {
	mobile: 320,
	'mobile-lg': 480,
	tablet: 640,
	'tablet-lg': 880,
	desktop: 1024,
	'desktop-lg': 1200,
	widescreen: 1400,
};

/**
 * USWDS Measure (Max Width for Text)
 */
export const uswdsMeasure = {
	none: 'none',
	1: '44ex',
	2: '60ex',
	3: '64ex',
	4: '68ex',
	5: '72ex',
	6: '88ex',
};

/**
 * Export all tokens as a single object
 */
export const uswdsTokens = {
	colors: uswdsColors,
	spacing: uswdsSpacing,
	typography: uswdsTypography,
	borderRadius: uswdsBorderRadius,
	shadows: uswdsShadows,
	zIndex: uswdsZIndex,
	breakpoints: uswdsBreakpoints,
	measure: uswdsMeasure,
};
