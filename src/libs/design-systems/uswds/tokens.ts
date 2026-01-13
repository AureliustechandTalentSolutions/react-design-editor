export const USWDSTokens = {
	colors: {
		primary: {
			base: '#005ea2',
			dark: '#1a4480',
			darker: '#162e51',
			light: '#73b3e7',
			lighter: '#d9e8f6',
			vivid: '#0050d8',
		},
		secondary: {
			base: '#d83933',
			dark: '#b50909',
			darker: '#8b0a03',
			light: '#f2938c',
			lighter: '#f8dfe2',
			vivid: '#e41d3d',
		},
		accent: {
			cool: {
				base: '#00bde3',
				dark: '#28a0cb',
				darker: '#07648d',
				light: '#97d4ea',
				lighter: '#e1f3f8',
			},
			warm: {
				base: '#fa9441',
				dark: '#c05600',
				darker: '#775540',
				light: '#ffbc78',
				lighter: '#f2e4d4',
			},
		},
		base: {
			lightest: '#f0f0f0',
			lighter: '#dfe1e2',
			light: '#a9aeb1',
			base: '#71767a',
			dark: '#565c65',
			darker: '#3d4551',
			darkest: '#1b1b1b',
		},
		status: {
			success: '#00a91c',
			successDark: '#4d8055',
			successLight: '#ecf3ec',
			warning: '#ffbe2e',
			warningDark: '#e5a000',
			warningLight: '#faf3d1',
			error: '#d54309',
			errorDark: '#b50909',
			errorLight: '#f4e3db',
			info: '#00bde3',
			infoDark: '#009ec1',
			infoLight: '#e7f6f8',
		},
		white: '#ffffff',
		black: '#000000',
		ink: '#1b1b1b',
	},
	spacing: {
		'0': '0',
		'05': '0.25rem', // 4px
		'1': '0.5rem', // 8px
		'105': '0.75rem', // 12px
		'2': '1rem', // 16px
		'205': '1.25rem', // 20px
		'3': '1.5rem', // 24px
		'4': '2rem', // 32px
		'5': '2.5rem', // 40px
		'6': '3rem', // 48px
		'7': '3.5rem', // 56px
		'8': '4rem', // 64px
		'9': '4.5rem', // 72px
		'10': '5rem', // 80px
		'15': '7.5rem', // 120px
	},
	typography: {
		fontFamily: {
			sans:
				'"Public Sans Web", -apple-system, BlinkMacSystemFont, ' +
				'"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
			serif: '"Merriweather Web", Georgia, Cambria, "Times New Roman", Times, serif',
			mono: '"Roboto Mono Web", "Bitstream Vera Sans Mono", Consolas, Courier, monospace',
		},
		fontSize: {
			'3xs': '0.87rem',
			'2xs': '0.93rem',
			xs: '1rem',
			sm: '1.06rem',
			md: '1.13rem',
			lg: '1.33rem',
			xl: '1.73rem',
			'2xl': '2.13rem',
			'3xl': '2.66rem',
		},
		lineHeight: {
			'1': 1,
			'2': 1.15,
			'3': 1.35,
			'4': 1.5,
			'5': 1.62,
			'6': 1.75,
		},
	},
	borderRadius: {
		'0': '0',
		sm: '0.125rem', // 2px
		md: '0.25rem', // 4px
		lg: '0.5rem', // 8px
		pill: '99rem',
	},
	shadows: {
		'1': '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
		'2': '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
		'3': '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
		'4': '0 12px 24px 0 rgba(0, 0, 0, 0.1)',
		'5': '0 16px 32px 0 rgba(0, 0, 0, 0.1)',
	},
};

export type USWDSColorKey = keyof typeof USWDSTokens.colors;
export type USWDSSpacingKey = keyof typeof USWDSTokens.spacing;
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
 * Official U.S. Web Design System 3.x design tokens
 * Based on https://designsystem.digital.gov/design-tokens/
 */

/**
 * USWDS Color System
 */
export const uswdsColors = {
	// Primary Colors
	primary: {
		lightest: '#e1f3f8',
		lighter: '#97d4ea',
		light: '#58b4ff',
		base: '#005ea2',
		vivid: '#0050d8',
		dark: '#1a4480',
		darker: '#162e51',
		light: '#73b3e7',
		lighter: '#eff6fb',
	},
	secondary: {
	},
	// Secondary Colors
	secondary: {
		lightest: '#f3e1e4',
		lighter: '#f2938c',
		light: '#f77066',
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
	},
	// Accent Cool
	'accent-cool': {
		lightest: '#e7f6f8',
		lighter: '#97ecf1',
		light: '#00bde3',
		base: '#00a6d2',
		vivid: '#0097b8',
		dark: '#168092',
		darker: '#2a646d',
	},
	// Accent Warm
	'accent-warm': {
		lightest: '#fef0c8',
		lighter: '#ffe396',
		light: '#ffc965',
		base: '#ffbe2e',
		vivid: '#fa9441',
		dark: '#c2850c',
		darker: '#8c6b1e',
	},
	// Base/Grayscale
	base: {
		lightest: '#f9f9f9',
		lighter: '#f0f0f0',
		light: '#dfe1e2',
		base: '#a9aeb1',
		dark: '#71767a',
		darker: '#565c65',
		darkest: '#3d4551',
	},
	// Status Colors
	success: {
		lightest: '#ecf3ec',
		lighter: '#70e17b',
		light: '#4d8055',
		base: '#00a91c',
		vivid: '#00a91c',
		dark: '#4d8055',
		darker: '#446443',
	},
	warning: {
		lightest: '#faf3d1',
		lighter: '#fee685',
		light: '#ffbc78',
		base: '#ff9c00',
		vivid: '#ff9c00',
		dark: '#936f38',
		darker: '#5c4a1f',
	},
	error: {
		lightest: '#f4e3db',
		lighter: '#f39268',
		light: '#f77066',
		base: '#e52207',
		vivid: '#e52207',
		dark: '#b50909',
		darker: '#6f3331',
	},
	info: {
		lightest: '#e7f6f8',
		lighter: '#99deea',
		light: '#00bde3',
		base: '#00a6d2',
		vivid: '#0097b8',
		dark: '#168092',
		darker: '#2a646d',
	},
	// Additional Colors
	disabled: {
		light: '#e6e6e6',
		base: '#c9c9c9',
		dark: '#adadad',
	},
};

/**
 * USWDS Spacing Scale (in pixels)
 * 0 = 0px, 1 = 8px, 2 = 16px, etc.
 */
export const uswdsSpacing = {
	0: 0,
	'05': 4,
	1: 8,
	'105': 12,
	2: 16,
	'205': 20,
	3: 24,
	4: 32,
	5: 40,
	6: 48,
	7: 56,
	8: 64,
	9: 72,
	10: 80,
	15: 120,
} as const;

/**
 * USWDS Typography
 */
export const uswdsTypography = {
	// Font Families
	fontFamily: {
		sans: '"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif',
		serif: '"Merriweather", "Georgia", "Cambria", "Times New Roman", "Times", serif',
		mono: '"Roboto Mono", "Bitstream Vera Sans Mono", "Consolas", "Courier", monospace',
	},
	// Font Sizes (in pixels)
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
		base: 16,
		lg: 17,
		xl: 20,
		'2xl': 24,
		'3xl': 28,
		'4xl': 32,
		'5xl': 40,
		'6xl': 48,
		'7xl': 56,
		'8xl': 64,
		'9xl': 80,
	},
	// Font Weights
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
	// Line Heights
	lineHeight: {
		1: 1,
		2: 1.15,
		3: 1.35,
		4: 1.5,
		5: 1.62,
		6: 1.75,
	},
};

/**
 * USWDS Border Radius
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
} as const;

/**
 * USWDS Shadows
 */
export const uswdsShadows = {
	none: 'none',
	1: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
	2: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
	3: '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
	4: '0 12px 24px 0 rgba(0, 0, 0, 0.1)',
	5: '0 16px 32px 0 rgba(0, 0, 0, 0.1)',
};

/**
 * USWDS Z-Index Scale
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
	100: 100,
	200: 200,
	300: 300,
	400: 400,
	500: 500,
	top: 99999,
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
	none: 'none',
};

/**
 * USWDS Opacity
 */
export const uswdsOpacity = {
	0: 0,
	10: 0.1,
	20: 0.2,
	30: 0.3,
	40: 0.4,
	50: 0.5,
	60: 0.6,
	70: 0.7,
	80: 0.8,
	90: 0.9,
	100: 1,
};

/**
 * Type definitions for token keys
 */
export type USWDSColorKey = keyof typeof uswdsColors;
export type USWDSColorShade = 'lightest' | 'lighter' | 'light' | 'base' | 'vivid' | 'dark' | 'darker' | 'darkest';
export type USWDSSpacingKey = keyof typeof uswdsSpacing;
export type USWDSFontSizeKey = keyof typeof uswdsTypography.fontSize;
export type USWDSFontWeightKey = keyof typeof uswdsTypography.fontWeight;
export type USWDSBorderRadiusKey = keyof typeof uswdsBorderRadius;
export type USWDSShadowKey = keyof typeof uswdsShadows;

/**
 * Helper function to get color value
 */
export function getUSWDSColor(colorKey: string, shade: string = 'base'): string {
	const colorFamily = uswdsColors[colorKey as USWDSColorKey];
	if (!colorFamily) {
		return '#000000';
	}

	if (typeof colorFamily === 'object' && colorFamily !== null) {
		return (colorFamily as any)[shade] || (colorFamily as any).base || '#000000';
	}

	return '#000000';
}

/**
 * Helper function to get spacing value
 */
export function getUSWDSSpacing(key: USWDSSpacingKey): number {
	return uswdsSpacing[key] || 0;
}

/**
 * Helper function to get font size
 */
export function getUSWDSFontSize(key: USWDSFontSizeKey): number {
	return uswdsTypography.fontSize[key] || 16;
}

/**
 * Helper function to get shadow
 */
export function getUSWDSShadow(key: USWDSShadowKey): string {
	return uswdsShadows[key] || 'none';
}

/**
 * Complete design tokens export
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
	measure: uswdsMeasure,
	opacity: uswdsOpacity,
};
