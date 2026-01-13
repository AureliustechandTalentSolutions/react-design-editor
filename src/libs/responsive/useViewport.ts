/**
 * useViewport Hook
 * Current viewport detection and breakpoint utilities
 */

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { BREAKPOINTS, Breakpoint, getBreakpointForWidth } from './viewports';

/**
 * Viewport state
 */
export interface ViewportState {
	width: number;
	height: number;
	breakpoint: Breakpoint | undefined;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	isWide: boolean;
}

/**
 * Hook to get current viewport information
 */
export const useViewport = (): ViewportState => {
	const [dimensions, setDimensions] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 1440,
		height: typeof window !== 'undefined' ? window.innerHeight : 900,
	});

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const breakpoint = getBreakpointForWidth(dimensions.width);

	return {
		width: dimensions.width,
		height: dimensions.height,
		breakpoint,
		isMobile: breakpoint?.name === 'mobile',
		isTablet: breakpoint?.name === 'tablet',
		isDesktop: breakpoint?.name === 'desktop',
		isWide: breakpoint?.name === 'wide',
	};
};

/**
 * Hook to check if a specific breakpoint matches
 */
export const useBreakpoint = (breakpointName: string): boolean => {
	const breakpoint = BREAKPOINTS.find(bp => bp.name === breakpointName);
	if (!breakpoint) return false;

	const query = breakpoint.maxWidth
		? `(min-width: ${breakpoint.minWidth}px) and (max-width: ${breakpoint.maxWidth}px)`
		: `(min-width: ${breakpoint.minWidth}px)`;

	return useMediaQuery({ query });
};

/**
 * Hook for mobile-first breakpoint detection
 */
export const useResponsive = () => {
	// Check if we're in a browser environment
	if (typeof window === 'undefined') {
		return {
			isMobile: false,
			isTablet: false,
			isDesktop: true,
			isWide: false,
		};
	}

	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
	const isDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
	const isWide = useMediaQuery({ minWidth: 1440 });

	return {
		isMobile,
		isTablet,
		isDesktop,
		isWide,
	};
};

/**
 * Generate responsive class names based on breakpoint
 * Note: This is a utility function that should be called within a React component
 * that has access to the viewport context
 */
export const generateResponsiveClasses = (
	baseClass: string,
	breakpointModifiers: Partial<Record<string, string>>,
	currentBreakpointName?: string,
): string => {
	const classes = [baseClass];

	if (currentBreakpointName && breakpointModifiers[currentBreakpointName]) {
		classes.push(breakpointModifiers[currentBreakpointName] as string);
	}

	return classes.join(' ');
};

/**
 * Get responsive Tailwind classes
 */
export const getResponsiveTailwindClasses = (classes: {
	mobile?: string;
	tablet?: string;
	desktop?: string;
	wide?: string;
}): string => {
	const classArray: string[] = [];

	if (classes.mobile) {
		classArray.push(classes.mobile);
	}
	if (classes.tablet) {
		classArray.push(`md:${classes.tablet}`);
	}
	if (classes.desktop) {
		classArray.push(`lg:${classes.desktop}`);
	}
	if (classes.wide) {
		classArray.push(`xl:${classes.wide}`);
	}

	return classArray.join(' ');
};
