import { useState, useCallback, useRef } from 'react';
import { AccessibilityChecker, A11yReport } from './AccessibilityChecker';

export function useAccessibilityCheck() {
	const [report, setReport] = useState<A11yReport | null>(null);
	const [isChecking, setIsChecking] = useState(false);
	const checkerRef = useRef(new AccessibilityChecker());

	const runCheck = useCallback(async (element: HTMLElement) => {
		setIsChecking(true);
		try {
			const result = await checkerRef.current.runAxeCheck(element);
			setReport(result);
			return result;
		} finally {
			setIsChecking(false);
		}
	}, []);

	const getSuggestions = useCallback(() => {
		if (!report) return new Map();
		return checkerRef.current.suggestFixesForAxeIssues(report.issues);
	}, [report]);

	return {
		report,
		isChecking,
		runCheck,
		getSuggestions,
		isCompliant: report?.section508Compliant ?? null,
	};
}
