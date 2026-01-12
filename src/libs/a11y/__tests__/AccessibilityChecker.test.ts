import { describe, it, expect } from 'vitest';
import { AccessibilityChecker, AxeA11yIssue } from '../AccessibilityChecker';

describe('AccessibilityChecker', () => {
const checker = new AccessibilityChecker();

describe('suggestFixesForAxeIssues', () => {
it('should provide suggestions for color-contrast issues', () => {
const issues: AxeA11yIssue[] = [
{
id: 'color-contrast',
impact: 'serious',
description: 'Color contrast issue',
help: 'Ensure contrast ratio',
helpUrl: 'https://example.com',
nodes: [],
wcagCriteria: ['wcag2aa'],
},
];

const suggestions = checker.suggestFixesForAxeIssues(issues);
expect(suggestions.has('color-contrast')).toBe(true);
expect(suggestions.get('color-contrast')?.length).toBeGreaterThan(0);
});

it('should provide suggestions for image-alt issues', () => {
const issues: AxeA11yIssue[] = [
{
id: 'image-alt',
impact: 'critical',
description: 'Missing alt text',
help: 'Add alt attribute',
helpUrl: 'https://example.com',
nodes: [],
wcagCriteria: ['wcag2a'],
},
];

const suggestions = checker.suggestFixesForAxeIssues(issues);
expect(suggestions.has('image-alt')).toBe(true);
expect(suggestions.get('image-alt')).toContain('Add alt attribute to images');
});

it('should provide default suggestions for unknown issue types', () => {
const issues: AxeA11yIssue[] = [
{
id: 'unknown-issue',
impact: 'minor',
description: 'Unknown issue',
help: 'Fix the issue',
helpUrl: 'https://example.com/unknown',
nodes: [],
wcagCriteria: ['wcag2a'],
},
];

const suggestions = checker.suggestFixesForAxeIssues(issues);
expect(suggestions.has('unknown-issue')).toBe(true);
expect(suggestions.get('unknown-issue')).toContain('Fix the issue');
expect(suggestions.get('unknown-issue')).toContain('See: https://example.com/unknown');
});

it('should handle multiple issues', () => {
const issues: AxeA11yIssue[] = [
{
id: 'color-contrast',
impact: 'serious',
description: 'Color contrast issue',
help: 'Ensure contrast ratio',
helpUrl: 'https://example.com',
nodes: [],
wcagCriteria: ['wcag2aa'],
},
{
id: 'image-alt',
impact: 'critical',
description: 'Missing alt text',
help: 'Add alt attribute',
helpUrl: 'https://example.com',
nodes: [],
wcagCriteria: ['wcag2a'],
},
];

const suggestions = checker.suggestFixesForAxeIssues(issues);
expect(suggestions.size).toBe(2);
expect(suggestions.has('color-contrast')).toBe(true);
expect(suggestions.has('image-alt')).toBe(true);
});

it('should handle empty issues array', () => {
const suggestions = checker.suggestFixesForAxeIssues([]);
expect(suggestions.size).toBe(0);
});
});
});
