import { describe, it, expect } from 'vitest';

import { getResponsiveTailwindClasses } from '../useViewport';
import { BREAKPOINTS, getBreakpointForWidth } from '../viewports';

describe('useViewport Utilities', () => {
	describe('getBreakpointForWidth (integration)', () => {
		it('should correctly identify mobile width', () => {
			const breakpoint = getBreakpointForWidth(375);
			expect(breakpoint?.name).toBe('mobile');
		});

		it('should correctly identify tablet width', () => {
			const breakpoint = getBreakpointForWidth(768);
			expect(breakpoint?.name).toBe('tablet');
		});

		it('should correctly identify desktop width', () => {
			const breakpoint = getBreakpointForWidth(1024);
			expect(breakpoint?.name).toBe('desktop');
		});

		it('should correctly identify wide width', () => {
			const breakpoint = getBreakpointForWidth(1920);
			expect(breakpoint?.name).toBe('wide');
		});
	});

	describe('getResponsiveTailwindClasses', () => {
		it('should generate mobile classes', () => {
			const classes = getResponsiveTailwindClasses({
				mobile: 'text-sm',
			});

			expect(classes).toBe('text-sm');
		});

		it('should generate tablet classes with md prefix', () => {
			const classes = getResponsiveTailwindClasses({
				mobile: 'text-sm',
				tablet: 'text-base',
			});

			expect(classes).toBe('text-sm md:text-base');
		});

		it('should generate desktop classes with lg prefix', () => {
			const classes = getResponsiveTailwindClasses({
				mobile: 'text-sm',
				desktop: 'text-lg',
			});

			expect(classes).toBe('text-sm lg:text-lg');
		});

		it('should generate wide classes with xl prefix', () => {
			const classes = getResponsiveTailwindClasses({
				mobile: 'text-sm',
				wide: 'text-xl',
			});

			expect(classes).toBe('text-sm xl:text-xl');
		});

		it('should generate all breakpoint classes', () => {
			const classes = getResponsiveTailwindClasses({
				mobile: 'text-sm',
				tablet: 'text-base',
				desktop: 'text-lg',
				wide: 'text-xl',
			});

			expect(classes).toBe('text-sm md:text-base lg:text-lg xl:text-xl');
		});

		it('should handle empty classes', () => {
			const classes = getResponsiveTailwindClasses({});

			expect(classes).toBe('');
		});

		it('should skip undefined breakpoints', () => {
			const classes = getResponsiveTailwindClasses({
				mobile: 'text-sm',
				tablet: undefined,
				desktop: 'text-lg',
			});

			expect(classes).toBe('text-sm lg:text-lg');
		});

		it('should handle multiple classes per breakpoint', () => {
			const classes = getResponsiveTailwindClasses({
				mobile: 'text-sm px-4',
				tablet: 'text-base px-6',
			});

			expect(classes).toContain('text-sm px-4');
			expect(classes).toContain('md:text-base px-6');
		});
	});

	describe('BREAKPOINTS validation', () => {
		it('should have valid ranges', () => {
			BREAKPOINTS.forEach(bp => {
				expect(bp.minWidth).toBeGreaterThanOrEqual(0);
				if (bp.maxWidth) {
					expect(bp.maxWidth).toBeGreaterThan(bp.minWidth);
				}
			});
		});

		it('should have no overlapping ranges', () => {
			let i = 0;
			while (i < BREAKPOINTS.length - 1) {
				const current = BREAKPOINTS[i];
				const next = BREAKPOINTS[i + 1];
				if (current.maxWidth) {
					expect(next.minWidth).toBeGreaterThan(current.maxWidth);
				}
				i += 1;
			}
		});
	});
});
