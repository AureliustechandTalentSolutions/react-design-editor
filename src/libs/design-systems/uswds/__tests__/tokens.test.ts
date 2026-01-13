import { describe, it, expect } from 'vitest';

import {
	uswdsColors,
	uswdsSpacing,
	uswdsTypography,
	uswdsBorderRadius,
	uswdsShadows,
	uswdsTokens,
	getUSWDSColor,
	getUSWDSSpacing,
	getUSWDSFontSize,
	getUSWDSShadow,
} from '../tokens';

describe('USWDS Tokens', () => {
	describe('Color Palette', () => {
		it('should have primary colors', () => {
			expect(uswdsColors.primary).toBeDefined();
			expect(uswdsColors.primary.base).toBe('#005ea2');
			expect(uswdsColors.primary.lightest).toBeDefined();
			expect(uswdsColors.primary.darker).toBeDefined();
		});

		it('should have secondary colors', () => {
			expect(uswdsColors.secondary).toBeDefined();
			expect(uswdsColors.secondary.base).toBe('#d83933');
		});

		it('should have accent-cool colors', () => {
			expect(uswdsColors['accent-cool']).toBeDefined();
			expect(uswdsColors['accent-cool'].base).toBe('#00a6d2');
		});

		it('should have accent-warm colors', () => {
			expect(uswdsColors['accent-warm']).toBeDefined();
			expect(uswdsColors['accent-warm'].base).toBe('#ffbe2e');
		});

		it('should have base grayscale colors', () => {
			expect(uswdsColors.base).toBeDefined();
			expect(uswdsColors.base.lightest).toBe('#f9f9f9');
			expect(uswdsColors.base.darkest).toBe('#3d4551');
		});

		it('should have status colors', () => {
			expect(uswdsColors.success).toBeDefined();
			expect(uswdsColors.warning).toBeDefined();
			expect(uswdsColors.error).toBeDefined();
			expect(uswdsColors.info).toBeDefined();
		});

		it('should have disabled colors', () => {
			expect(uswdsColors.disabled).toBeDefined();
			expect(uswdsColors.disabled.base).toBe('#c9c9c9');
		});
	});

	describe('Spacing Scale', () => {
		it('should have spacing from 0 to 15', () => {
			expect(uswdsSpacing[0]).toBe(0);
			expect(uswdsSpacing['05']).toBe(4);
			expect(uswdsSpacing[1]).toBe(8);
			expect(uswdsSpacing[2]).toBe(16);
			expect(uswdsSpacing[10]).toBe(80);
			expect(uswdsSpacing[15]).toBe(120);
		});

		it('should follow 8px base unit', () => {
			expect(uswdsSpacing[1]).toBe(8);
			expect(uswdsSpacing[2]).toBe(16);
			expect(uswdsSpacing[3]).toBe(24);
			expect(uswdsSpacing[4]).toBe(32);
		});
	});

	describe('Typography', () => {
		it('should have font families', () => {
			expect(uswdsTypography.fontFamily.sans).toContain('Source Sans Pro');
			expect(uswdsTypography.fontFamily.serif).toContain('Merriweather');
			expect(uswdsTypography.fontFamily.mono).toContain('Roboto Mono');
		});

		it('should have font sizes', () => {
			expect(uswdsTypography.fontSize.base).toBe(16);
			expect(uswdsTypography.fontSize.xs).toBe(12);
			expect(uswdsTypography.fontSize.xl).toBe(20);
			expect(uswdsTypography.fontSize['5xl']).toBe(40);
		});

		it('should have font weights', () => {
			expect(uswdsTypography.fontWeight.light).toBe(300);
			expect(uswdsTypography.fontWeight.normal).toBe(400);
			expect(uswdsTypography.fontWeight.bold).toBe(700);
		});

		it('should have line heights', () => {
			expect(uswdsTypography.lineHeight[1]).toBe(1);
			expect(uswdsTypography.lineHeight[4]).toBe(1.5);
		});
	});

	describe('Border Radius', () => {
		it('should have border radius values', () => {
			expect(uswdsBorderRadius.none).toBe(0);
			expect(uswdsBorderRadius.sm).toBe(2);
			expect(uswdsBorderRadius.md).toBe(4);
			expect(uswdsBorderRadius.lg).toBe(8);
			expect(uswdsBorderRadius.pill).toBe(9999);
			expect(uswdsBorderRadius.circle).toBe('50%');
		});
	});

	describe('Shadows', () => {
		it('should have shadow values', () => {
			expect(uswdsShadows.none).toBe('none');
			expect(uswdsShadows[1]).toContain('rgba');
			expect(uswdsShadows[5]).toContain('rgba');
		});
	});

	describe('Helper Functions', () => {
		describe('getUSWDSColor', () => {
			it('should get primary base color', () => {
				const color = getUSWDSColor('primary', 'base');
				expect(color).toBe('#005ea2');
			});

			it('should get primary light color', () => {
				const color = getUSWDSColor('primary', 'light');
				expect(color).toBe('#58b4ff');
			});

			it('should default to base shade', () => {
				const color = getUSWDSColor('primary');
				expect(color).toBe('#005ea2');
			});

			it('should return fallback for invalid color', () => {
				const color = getUSWDSColor('invalid', 'base');
				expect(color).toBe('#000000');
			});
		});

		describe('getUSWDSSpacing', () => {
			it('should get spacing value', () => {
				expect(getUSWDSSpacing(0)).toBe(0);
				expect(getUSWDSSpacing(1)).toBe(8);
				expect(getUSWDSSpacing(2)).toBe(16);
				expect(getUSWDSSpacing(10)).toBe(80);
			});

			it('should return 0 for invalid key', () => {
				expect(getUSWDSSpacing(999 as any)).toBe(0);
			});
		});

		describe('getUSWDSFontSize', () => {
			it('should get font size value', () => {
				expect(getUSWDSFontSize('base')).toBe(16);
				expect(getUSWDSFontSize('xs')).toBe(12);
				expect(getUSWDSFontSize('xl')).toBe(20);
			});

			it('should return 16 for invalid key', () => {
				expect(getUSWDSFontSize('invalid' as any)).toBe(16);
			});
		});

		describe('getUSWDSShadow', () => {
			it('should get shadow value', () => {
				expect(getUSWDSShadow('none')).toBe('none');
				expect(getUSWDSShadow(1)).toContain('rgba');
			});

			it('should return none for invalid key', () => {
				expect(getUSWDSShadow('invalid' as any)).toBe('none');
			});
		});
	});

	describe('Complete Token Export', () => {
		it('should export all token categories', () => {
			expect(uswdsTokens.colors).toBe(uswdsColors);
			expect(uswdsTokens.spacing).toBe(uswdsSpacing);
			expect(uswdsTokens.typography).toBe(uswdsTypography);
			expect(uswdsTokens.borderRadius).toBe(uswdsBorderRadius);
			expect(uswdsTokens.shadows).toBe(uswdsShadows);
		});

		it('should have z-index scale', () => {
			expect(uswdsTokens.zIndex).toBeDefined();
			expect(uswdsTokens.zIndex.base).toBe(0);
			expect(uswdsTokens.zIndex.top).toBe(99999);
		});

		it('should have measure values', () => {
			expect(uswdsTokens.measure).toBeDefined();
			expect(uswdsTokens.measure.none).toBe('none');
		});

		it('should have opacity scale', () => {
			expect(uswdsTokens.opacity).toBeDefined();
			expect(uswdsTokens.opacity[0]).toBe(0);
			expect(uswdsTokens.opacity[50]).toBe(0.5);
			expect(uswdsTokens.opacity[100]).toBe(1);
		});
	});
});
