import { describe, it, expect } from 'vitest';

import {
	BREAKPOINTS,
	STANDARD_VIEWPORTS,
	DEVICE_PRESETS,
	ALL_VIEWPORTS,
	getViewportById,
	getViewportsByCategory,
	getBreakpointForWidth,
	matchesBreakpoint,
	createCustomViewport,
} from '../viewports';

describe('Viewports', () => {
	describe('BREAKPOINTS', () => {
		it('should have four breakpoints', () => {
			expect(BREAKPOINTS).toHaveLength(4);
		});

		it('should have correct breakpoint names', () => {
			const names = BREAKPOINTS.map(bp => bp.name);
			expect(names).toEqual(['mobile', 'tablet', 'desktop', 'wide']);
		});

		it('should have valid breakpoint ranges', () => {
			BREAKPOINTS.forEach(bp => {
				expect(bp.minWidth).toBeGreaterThanOrEqual(0);
				if (bp.maxWidth) {
					expect(bp.maxWidth).toBeGreaterThan(bp.minWidth);
				}
			});
		});
	});

	describe('STANDARD_VIEWPORTS', () => {
		it('should have four standard viewports', () => {
			expect(STANDARD_VIEWPORTS).toHaveLength(4);
		});

		it('should have all required properties', () => {
			STANDARD_VIEWPORTS.forEach(viewport => {
				expect(viewport).toHaveProperty('id');
				expect(viewport).toHaveProperty('name');
				expect(viewport).toHaveProperty('width');
				expect(viewport).toHaveProperty('height');
				expect(viewport).toHaveProperty('icon');
				expect(viewport).toHaveProperty('category');
			});
		});

		it('should have valid dimensions', () => {
			STANDARD_VIEWPORTS.forEach(viewport => {
				expect(viewport.width).toBeGreaterThan(0);
				expect(viewport.height).toBeGreaterThan(0);
			});
		});
	});

	describe('DEVICE_PRESETS', () => {
		it('should have device presets', () => {
			expect(DEVICE_PRESETS.length).toBeGreaterThan(0);
		});

		it('should include iPhone devices', () => {
			const iPhones = DEVICE_PRESETS.filter(d => d.name.includes('iPhone'));
			expect(iPhones.length).toBeGreaterThan(0);
		});

		it('should include iPad devices', () => {
			const iPads = DEVICE_PRESETS.filter(d => d.name.includes('iPad'));
			expect(iPads.length).toBeGreaterThan(0);
		});

		it('should include MacBook devices', () => {
			const macBooks = DEVICE_PRESETS.filter(d => d.name.includes('MacBook'));
			expect(macBooks.length).toBeGreaterThan(0);
		});
	});

	describe('ALL_VIEWPORTS', () => {
		it('should combine standard and device presets', () => {
			expect(ALL_VIEWPORTS.length).toBe(STANDARD_VIEWPORTS.length + DEVICE_PRESETS.length);
		});
	});

	describe('getViewportById', () => {
		it('should return viewport for valid id', () => {
			const viewport = getViewportById('mobile');
			expect(viewport).toBeDefined();
			expect(viewport?.id).toBe('mobile');
		});

		it('should return undefined for invalid id', () => {
			const viewport = getViewportById('invalid-id');
			expect(viewport).toBeUndefined();
		});

		it('should return device preset by id', () => {
			const viewport = getViewportById('iphone-14');
			expect(viewport).toBeDefined();
			expect(viewport?.name).toBe('iPhone 14');
		});
	});

	describe('getViewportsByCategory', () => {
		it('should return mobile viewports', () => {
			const mobiles = getViewportsByCategory('mobile');
			expect(mobiles.length).toBeGreaterThan(0);
			mobiles.forEach(vp => {
				expect(vp.category).toBe('mobile');
			});
		});

		it('should return tablet viewports', () => {
			const tablets = getViewportsByCategory('tablet');
			expect(tablets.length).toBeGreaterThan(0);
			tablets.forEach(vp => {
				expect(vp.category).toBe('tablet');
			});
		});

		it('should return desktop viewports', () => {
			const desktops = getViewportsByCategory('desktop');
			expect(desktops.length).toBeGreaterThan(0);
			desktops.forEach(vp => {
				expect(vp.category).toBe('desktop');
			});
		});

		it('should return wide viewports', () => {
			const wides = getViewportsByCategory('wide');
			expect(wides.length).toBeGreaterThan(0);
			wides.forEach(vp => {
				expect(vp.category).toBe('wide');
			});
		});
	});

	describe('getBreakpointForWidth', () => {
		it('should return mobile for width 375', () => {
			const breakpoint = getBreakpointForWidth(375);
			expect(breakpoint?.name).toBe('mobile');
		});

		it('should return tablet for width 768', () => {
			const breakpoint = getBreakpointForWidth(768);
			expect(breakpoint?.name).toBe('tablet');
		});

		it('should return desktop for width 1024', () => {
			const breakpoint = getBreakpointForWidth(1024);
			expect(breakpoint?.name).toBe('desktop');
		});

		it('should return wide for width 1920', () => {
			const breakpoint = getBreakpointForWidth(1920);
			expect(breakpoint?.name).toBe('wide');
		});

		it('should handle edge cases', () => {
			expect(getBreakpointForWidth(0)?.name).toBe('mobile');
			expect(getBreakpointForWidth(767)?.name).toBe('mobile');
			expect(getBreakpointForWidth(1023)?.name).toBe('tablet');
			expect(getBreakpointForWidth(1439)?.name).toBe('desktop');
			expect(getBreakpointForWidth(3840)?.name).toBe('wide');
		});
	});

	describe('matchesBreakpoint', () => {
		it('should match mobile breakpoint', () => {
			expect(matchesBreakpoint(375, 'mobile')).toBe(true);
			expect(matchesBreakpoint(1024, 'mobile')).toBe(false);
		});

		it('should match tablet breakpoint', () => {
			expect(matchesBreakpoint(768, 'tablet')).toBe(true);
			expect(matchesBreakpoint(375, 'tablet')).toBe(false);
		});

		it('should match desktop breakpoint', () => {
			expect(matchesBreakpoint(1024, 'desktop')).toBe(true);
			expect(matchesBreakpoint(768, 'desktop')).toBe(false);
		});

		it('should match wide breakpoint', () => {
			expect(matchesBreakpoint(1920, 'wide')).toBe(true);
			expect(matchesBreakpoint(1024, 'wide')).toBe(false);
		});

		it('should return false for invalid breakpoint name', () => {
			expect(matchesBreakpoint(1024, 'invalid')).toBe(false);
		});
	});

	describe('createCustomViewport', () => {
		it('should create custom viewport with default category', () => {
			const viewport = createCustomViewport('Custom Size', 800, 600);
			expect(viewport.id).toBe('custom-custom-size');
			expect(viewport.name).toBe('Custom Size');
			expect(viewport.width).toBe(800);
			expect(viewport.height).toBe(600);
			expect(viewport.category).toBe('desktop');
		});

		it('should create custom viewport with mobile category', () => {
			const viewport = createCustomViewport('Custom Mobile', 360, 640, 'mobile');
			expect(viewport.category).toBe('mobile');
			expect(viewport.icon).toBe('📱');
		});

		it('should create custom viewport with tablet category', () => {
			const viewport = createCustomViewport('Custom Tablet', 800, 1024, 'tablet');
			expect(viewport.category).toBe('tablet');
			expect(viewport.icon).toBe('📱');
		});

		it('should create custom viewport with desktop category', () => {
			const viewport = createCustomViewport('Custom Desktop', 1366, 768, 'desktop');
			expect(viewport.category).toBe('desktop');
			expect(viewport.icon).toBe('💻');
		});

		it('should create custom viewport with wide category', () => {
			const viewport = createCustomViewport('Custom Wide', 2560, 1440, 'wide');
			expect(viewport.category).toBe('wide');
			expect(viewport.icon).toBe('🖥️');
		});

		it('should handle spaces in name', () => {
			const viewport = createCustomViewport('My Custom Size', 1000, 800);
			expect(viewport.id).toBe('custom-my-custom-size');
		});
	});
});
