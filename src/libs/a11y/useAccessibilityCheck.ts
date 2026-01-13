/**
 * React Hook for Accessibility Checking
 * Provides real-time accessibility checking for React components
 */

import { useState, useEffect, useRef, useCallback } from 'react';

import { AccessibilityChecker, A11yReport } from './AccessibilityChecker';

export interface UseAccessibilityCheckOptions {
	enabled?: boolean;
	checkInterval?: number;
	rules?: string[];
}

export interface AccessibilityCheckState {
	report: A11yReport | null;
	isChecking: boolean;
	error: Error | null;
	lastChecked: Date | null;
}

/**
 * Hook for real-time accessibility checking
 * @param elementRef - Ref to the element to check
 * @param options - Configuration options
 * @returns Accessibility check state and methods
 */
export function useAccessibilityCheck(
	elementRef: React.RefObject<HTMLElement>,
	options: UseAccessibilityCheckOptions = {},
): AccessibilityCheckState & {
	runCheck: () => Promise<void>;
	clear: () => void;
} {
	const { enabled = true, checkInterval = 0, rules } = options;

	const [report, setReport] = useState<A11yReport | null>(null);
	const [isChecking, setIsChecking] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [lastChecked, setLastChecked] = useState<Date | null>(null);

	const checkerRef = useRef(new AccessibilityChecker());
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * Run accessibility check
	 */
	const runCheck = useCallback(async () => {
		if (!enabled || !elementRef.current) {
			return;
		}

		setIsChecking(true);
		setError(null);

		try {
			const checkReport = await checkerRef.current.runAxeCheck(elementRef.current, rules);
			setReport(checkReport);
			setLastChecked(new Date());
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Accessibility check failed'));
		} finally {
			setIsChecking(false);
		}
	}, [enabled, elementRef, rules]);

	/**
	 * Clear current report
	 */
	const clear = useCallback(() => {
		setReport(null);
		setError(null);
		setLastChecked(null);
	}, []);

	/**
	 * Set up automatic checking if interval is specified
	 */
	useEffect(() => {
		if (!enabled || checkInterval <= 0) {
			return undefined;
		}

		// Initial check
		runCheck();

		// Set up interval
		intervalRef.current = setInterval(() => {
			runCheck();
		}, checkInterval);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [enabled, checkInterval, runCheck]);

	/**
	 * Run initial check when enabled changes to true
	 */
	useEffect(() => {
		if (enabled && checkInterval === 0) {
			runCheck();
		}
	}, [enabled, checkInterval, runCheck]);

	return {
		report,
		isChecking,
		error,
		lastChecked,
		runCheck,
		clear,
	};
}

/**
 * Hook for checking compliance status
 */
export function useComplianceStatus(report: A11yReport | null): {
	isWCAG21AACompliant: boolean;
	isSection508Compliant: boolean;
	complianceLevel: 'none' | 'partial' | 'full';
} {
	const isWCAG21AACompliant = report?.wcag21AA || false;
	const isSection508Compliant = report?.section508 || false;

	let complianceLevel: 'none' | 'partial' | 'full' = 'none';

	if (isWCAG21AACompliant && isSection508Compliant) {
		complianceLevel = 'full';
	} else if (report && report.summary.errors === 0) {
		complianceLevel = 'partial';
	}

	return {
		isWCAG21AACompliant,
		isSection508Compliant,
		complianceLevel,
	};
}
