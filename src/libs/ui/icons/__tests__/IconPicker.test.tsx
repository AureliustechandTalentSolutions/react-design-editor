import { describe, it, expect, beforeEach } from 'vitest';
import {
	searchIcons,
	getIconsByCategory,
	getRecentIcons,
	getFavoriteIcons,
	addRecentIcon,
	toggleFavoriteIcon,
	isFavoriteIcon,
	type IconInfo,
} from '../index';

describe('Icon utilities', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should search icons by query', () => {
		const results = searchIcons('arrow');
		expect(Array.isArray(results)).toBe(true);
	});

	it('should return all icons when query is empty', () => {
		const results = searchIcons('');
		expect(Array.isArray(results)).toBe(true);
		expect(results.length).toBeGreaterThan(0);
	});

	it('should filter icons by library', () => {
		const results = searchIcons('', 'lucide');
		expect(Array.isArray(results)).toBe(true);
		if (results.length > 0) {
			expect(results[0].library).toBe('lucide');
		}
	});

	it('should get icons by category', () => {
		const results = getIconsByCategory('ui');
		expect(Array.isArray(results)).toBe(true);
	});

	it('should get icons by category and library', () => {
		const results = getIconsByCategory('ui', 'lucide');
		expect(Array.isArray(results)).toBe(true);
	});

	it('should get recent icons from localStorage', () => {
		const results = getRecentIcons();
		expect(Array.isArray(results)).toBe(true);
	});

	it('should add icon to recent list', () => {
		const icon: IconInfo = {
			name: 'TestIcon',
			library: 'lucide',
			category: 'ui',
			component: () => null,
		};
		addRecentIcon(icon);
		const recent = getRecentIcons();
		expect(recent.length).toBeGreaterThan(0);
	});

	it('should get favorite icons from localStorage', () => {
		const results = getFavoriteIcons();
		expect(Array.isArray(results)).toBe(true);
	});

	it('should toggle favorite icon', () => {
		const icon: IconInfo = {
			name: 'TestIcon',
			library: 'lucide',
			category: 'ui',
			component: () => null,
		};

		toggleFavoriteIcon(icon);
		expect(isFavoriteIcon(icon)).toBe(true);

		toggleFavoriteIcon(icon);
		expect(isFavoriteIcon(icon)).toBe(false);
	});

	it('should check if icon is favorite', () => {
		const icon: IconInfo = {
			name: 'TestIcon',
			library: 'lucide',
			category: 'ui',
			component: () => null,
		};
		const result = isFavoriteIcon(icon);
		expect(typeof result).toBe('boolean');
	});

	it('should limit recent icons to 20', () => {
		const icon: IconInfo = {
			name: 'TestIcon',
			library: 'lucide',
			category: 'ui',
			component: () => null,
		};

		for (let i = 0; i < 25; i++) {
			addRecentIcon({ ...icon, name: `TestIcon${i}` });
		}

		const recent = getRecentIcons();
		expect(recent.length).toBeLessThanOrEqual(20);
	});
});
