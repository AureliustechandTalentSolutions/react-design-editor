/**
 * Design System Tokens
 * Defines spacing, colors, typography, and other design tokens
 */

import { DesignTokens } from '../../types/aiui';

/**
 * Design system tokens for consistent UI generation
 */
export const tokens: DesignTokens = {
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		'2xl': 48,
		'3xl': 64,
		'4xl': 96,
	},
	borderRadius: {
		none: 0,
		sm: 4,
		md: 8,
		lg: 12,
		xl: 16,
		'2xl': 24,
		full: 9999,
	},
	fontSize: {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 18,
		xl: 20,
		'2xl': 24,
		'3xl': 30,
		'4xl': 36,
		'5xl': 48,
		'6xl': 60,
	},
	fontWeight: {
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
	},
	colors: {
		ocean: {
			primary: '#0ea5e9',
			secondary: '#06b6d4',
			accent: '#3b82f6',
			background: '#f0f9ff',
			text: '#0c4a6e',
		},
		sunset: {
			primary: '#f97316',
			secondary: '#fb923c',
			accent: '#ef4444',
			background: '#fff7ed',
			text: '#7c2d12',
		},
		forest: {
			primary: '#10b981',
			secondary: '#059669',
			accent: '#22c55e',
			background: '#f0fdf4',
			text: '#064e3b',
		},
		purple: {
			primary: '#8b5cf6',
			secondary: '#a78bfa',
			accent: '#c084fc',
			background: '#faf5ff',
			text: '#581c87',
		},
		monochrome: {
			primary: '#1f2937',
			secondary: '#4b5563',
			accent: '#6b7280',
			background: '#f9fafb',
			text: '#111827',
		},
		neon: {
			primary: '#ec4899',
			secondary: '#f472b6',
			accent: '#06b6d4',
			background: '#1e293b',
			text: '#f1f5f9',
		},
		modern: {
			primary: '#3b82f6',
			secondary: '#6366f1',
			accent: '#8b5cf6',
			background: '#ffffff',
			text: '#1f2937',
		},
		minimal: {
			primary: '#000000',
			secondary: '#4b5563',
			accent: '#9ca3af',
			background: '#ffffff',
			text: '#000000',
		},
		corporate: {
			primary: '#1e40af',
			secondary: '#3b82f6',
			accent: '#60a5fa',
			background: '#f8fafc',
			text: '#1e3a8a',
		},
		playful: {
			primary: '#f59e0b',
			secondary: '#ec4899',
			accent: '#8b5cf6',
			background: '#fef3c7',
			text: '#78350f',
		},
		dark: {
			primary: '#3b82f6',
			secondary: '#60a5fa',
			accent: '#93c5fd',
			background: '#0f172a',
			text: '#f1f5f9',
		},
		glassmorphism: {
			primary: '#3b82f6',
			secondary: '#8b5cf6',
			accent: '#ec4899',
			background: 'rgba(255, 255, 255, 0.1)',
			text: '#ffffff',
		},
	},
	shadows: {
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
		'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
		none: 'none',
	},
};

/**
 * Get color palette by name
 */
export const getColorPalette = (paletteName: string): string[] => {
	const palette = tokens.colors[paletteName.toLowerCase().replace(/\s+/g, '')];
	if (!palette) {
		return Object.values(tokens.colors.modern);
	}
	return Object.values(palette);
};

/**
 * Get spacing value
 */
export const getSpacing = (size: keyof typeof tokens.spacing): number => {
	return tokens.spacing[size] || tokens.spacing.md;
};

/**
 * Get border radius value
 */
export const getBorderRadius = (size: keyof typeof tokens.borderRadius): number => {
	return tokens.borderRadius[size] || tokens.borderRadius.md;
};

/**
 * Get font size value
 */
export const getFontSize = (size: keyof typeof tokens.fontSize): number => {
	return tokens.fontSize[size] || tokens.fontSize.base;
};

/**
 * Get shadow value
 */
export const getShadow = (size: keyof typeof tokens.shadows): string => {
	return tokens.shadows[size] || tokens.shadows.md;
};
