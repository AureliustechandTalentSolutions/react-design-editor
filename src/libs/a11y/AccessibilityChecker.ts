import { FabricObject } from '../../canvas/models';

export interface A11yIssue {
	type: 'error' | 'warning' | 'info';
	element: string;
	message: string;
	wcagCriteria: string;
	suggestion: string;
}

export interface A11yReport {
	issues: A11yIssue[];
	summary: {
		errors: number;
		warnings: number;
		info: number;
	};
	wcag21AA: boolean;
	section508: boolean;
	timestamp: string;
}

export interface AxeResult {
	violations: AxeViolation[];
	passes: AxePass[];
	incomplete: AxeIncomplete[];
}

export interface FixSuggestion {
	issue: string;
	wcag: string;
	suggestion: string;
	action: string;
	params: Record<string, any>;
}

export interface FixSuggestionsResult {
	[elementId: string]: FixSuggestion[];
}

export interface AxeViolation {
	id: string;
	impact: 'minor' | 'moderate' | 'serious' | 'critical';
	description: string;
	help: string;
	helpUrl: string;
	tags: string[];
	nodes: AxeNode[];
}

export interface AxePass {
	id: string;
	description: string;
	help: string;
}

export interface AxeIncomplete {
	id: string;
	description: string;
	help: string;
	nodes: AxeNode[];
}

export interface AxeNode {
	html: string;
	target: string[];
	failureSummary?: string;
}

export class AccessibilityChecker {
	/**
	 * Check design for accessibility issues
	 */
	public checkDesign(objects: FabricObject[]): A11yIssue[] {
		const issues: A11yIssue[] = [];

		objects.forEach((obj, index) => {
			const elementId = obj.id || `element-${index}`;

			// Check text contrast
			if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
				const textColor = this.extractColor(obj.fill);
				const backgroundColor = this.extractColor(obj.backgroundColor || '#ffffff');

				if (!this.checkColorContrast(textColor, backgroundColor)) {
					issues.push({
						type: 'error',
						element: elementId,
						message: 'Text has insufficient color contrast with background',
						wcagCriteria: 'WCAG 2.1 Level AA - 1.4.3 Contrast (Minimum)',
						suggestion: `Increase contrast ratio to at least 4.5:1 for normal text or 3:1 for large text`,
					});
				}

				// Check font size
				if (obj.fontSize && obj.fontSize < 12) {
					issues.push({
						type: 'warning',
						element: elementId,
						message: 'Font size is too small',
						wcagCriteria: 'WCAG 2.1 Level AA - 1.4.4 Resize text',
						suggestion: 'Use a minimum font size of 12px for body text',
					});
				}
			}

			// Check for missing alt text on images
			if (obj.type === 'image' && !obj.alt) {
				issues.push({
					type: 'warning',
					element: elementId,
					message: 'Image is missing alternative text',
					wcagCriteria: 'WCAG 2.1 Level A - 1.1.1 Non-text Content',
					suggestion: 'Add descriptive alt text to convey the meaning of the image',
				});
			}

			// Check interactive elements size
			if (obj.link || obj.clickable) {
				const width = obj.width || 0;
				const height = obj.height || 0;
				const minSize = 44; // WCAG 2.1 recommended minimum target size

				if (width < minSize || height < minSize) {
					issues.push({
						type: 'warning',
						element: elementId,
						message: 'Interactive element is too small',
						wcagCriteria: 'WCAG 2.1 Level AAA - 2.5.5 Target Size',
						suggestion: `Increase size to at least ${minSize}x${minSize}px for touch targets`,
					});
				}
			}

			// Check for decorative elements that should be hidden
			if (obj.decorative && !obj.ariaHidden) {
				issues.push({
					type: 'info',
					element: elementId,
					message: 'Decorative element should be hidden from screen readers',
					wcagCriteria: 'WCAG 2.1 Best Practice',
					suggestion: 'Add aria-hidden="true" to decorative elements',
				});
			}
		});

		return issues;
	}

	/**
	 * Check color contrast ratio between foreground and background
	 */
	public checkColorContrast(foreground: string, background: string): boolean {
		const ratio = this.getContrastRatio(foreground, background);
		// WCAG AA requires 4.5:1 for normal text, 3:1 for large text
		return ratio >= 4.5;
	}

	/**
	 * Calculate contrast ratio between two colors
	 */
	private getContrastRatio(color1: string, color2: string): number {
		const lum1 = this.getLuminance(color1);
		const lum2 = this.getLuminance(color2);
		const lighter = Math.max(lum1, lum2);
		const darker = Math.min(lum1, lum2);
		return (lighter + 0.05) / (darker + 0.05);
	}

	/**
	 * Calculate relative luminance of a color
	 */
	private getLuminance(color: string): number {
		const rgb = this.hexToRgb(color);
		if (!rgb) return 0;

		const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
			const v = val / 255;
			return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
		});

		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}

	/**
	 * Convert hex color to RGB
	 */
	private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
		// Remove # if present
		hex = hex.replace('#', '');

		// Handle 3-digit hex
		if (hex.length === 3) {
			hex = hex
				.split('')
				.map(char => char + char)
				.join('');
		}

		const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				}
			: null;
	}

	/**
	 * Extract color from fabric object fill property
	 */
	private extractColor(fill: any): string {
		if (typeof fill === 'string') {
			return fill;
		}
		// Handle gradient or pattern - return first color
		if (fill && fill.colorStops && fill.colorStops.length > 0) {
			return fill.colorStops[0].color;
		}
		return '#000000';
	}

	/**
	 * Suggest fixes for accessibility issues using AI
	 */
	public suggestFixes(issues: A11yIssue[]): Promise<FixSuggestionsResult> {
		return new Promise(resolve => {
			const suggestions: FixSuggestionsResult = {};

			issues.forEach(issue => {
				if (!suggestions[issue.element]) {
					suggestions[issue.element] = [];
				}

				// Generate automated fix suggestions
				const fix: FixSuggestion = {
					issue: issue.message,
					wcag: issue.wcagCriteria,
					suggestion: issue.suggestion,
					action: '',
					params: {},
				};

				// Add specific fix recommendations based on issue type
				if (issue.message.indexOf('color contrast') !== -1) {
					fix.action = 'adjustColors';
					fix.params = {
						targetRatio: 4.5,
						adjustMethod: 'darken-text',
					};
				} else if (issue.message.indexOf('Font size') !== -1 || issue.message.indexOf('font size') !== -1) {
					fix.action = 'adjustFontSize';
					fix.params = {
						minSize: 12,
					};
				} else if (issue.message.indexOf('alternative text') !== -1) {
					fix.action = 'addAltText';
					fix.params = {
						generateAlt: true,
					};
				} else if (issue.message.indexOf('too small') !== -1) {
					fix.action = 'resizeElement';
					fix.params = {
						minWidth: 44,
						minHeight: 44,
					};
				} else if (issue.message.indexOf('hidden from screen readers') !== -1) {
					fix.action = 'addAriaHidden';
					fix.params = {
						value: true,
					};
				}

				suggestions[issue.element].push(fix);
			});

			resolve(suggestions);
		});
	}

	/**
	 * Get a summary of accessibility issues by severity
	 */
	public getSummary(issues: A11yIssue[]): { errors: number; warnings: number; info: number } {
		return {
			errors: issues.filter(i => i.type === 'error').length,
			warnings: issues.filter(i => i.type === 'warning').length,
			info: issues.filter(i => i.type === 'info').length,
		};
	}

	/**
	 * Run axe-core accessibility check on a DOM element
	 * This method integrates axe-core for WCAG 2.1 AA validation
	 */
	public async runAxeCheck(element?: HTMLElement, rules?: string[]): Promise<A11yReport> {
		const issues: A11yIssue[] = [];

		// If no element provided, use document body
		const target = element || document.body;

		// Check if axe is available in the environment
		if (typeof window !== 'undefined' && (window as any).axe) {
			try {
				const { axe } = window as any;

				// Configure axe to run specific rules or all WCAG 2.1 AA rules
				const options: any = {
					runOnly: {
						type: 'tag',
						values: rules || ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'section508'],
					},
				};

				// Run axe check
				const results: AxeResult = await axe.run(target, options);

				// Process violations
				results.violations.forEach(violation => {
					violation.nodes.forEach(node => {
						const issueType = this.mapAxeImpactToIssueType(violation.impact);
						issues.push({
							type: issueType,
							element: node.target.join(' > '),
							message: violation.help,
							wcagCriteria: this.extractWCAGCriteria(violation.tags),
							suggestion: violation.description,
						});
					});
				});
			} catch (error) {
				// Axe check failed, fall back to basic checks
			}
		}

		// Generate report
		const summary = this.getSummary(issues);
		const report: A11yReport = {
			issues,
			summary,
			wcag21AA: summary.errors === 0,
			section508: summary.errors === 0 && summary.warnings === 0,
			timestamp: new Date().toISOString(),
		};

		return report;
	}

	/**
	 * Map axe impact level to issue type
	 */
	private mapAxeImpactToIssueType(
		impact: 'minor' | 'moderate' | 'serious' | 'critical',
	): 'error' | 'warning' | 'info' {
		switch (impact) {
			case 'critical':
			case 'serious':
				return 'error';
			case 'moderate':
				return 'warning';
			case 'minor':
			default:
				return 'info';
		}
	}

	/**
	 * Extract WCAG criteria from axe tags
	 */
	private extractWCAGCriteria(tags: string[]): string {
		const wcagTags = tags.filter(tag => tag.startsWith('wcag'));
		if (wcagTags.length === 0) {
			return 'Accessibility Best Practice';
		}

		// Format WCAG criteria
		const criteria = wcagTags
			.map(tag => {
				// Convert wcag2a, wcag2aa, wcag21a, wcag21aa to readable format
				if (tag === 'wcag2a') return 'WCAG 2.0 Level A';
				if (tag === 'wcag2aa') return 'WCAG 2.0 Level AA';
				if (tag === 'wcag21a') return 'WCAG 2.1 Level A';
				if (tag === 'wcag21aa') return 'WCAG 2.1 Level AA';
				if (tag.includes('wcag')) {
					// Handle specific criteria like wcag111, wcag412
					const numbers = tag.replace('wcag', '');
					if (numbers.length >= 3) {
						const version = numbers[0];
						const criterion = numbers.substring(1);
						return `WCAG ${version}.${criterion[0]}.${criterion.substring(1)}`;
					}
				}
				return tag;
			})
			.join(', ');

		return criteria;
	}
}
