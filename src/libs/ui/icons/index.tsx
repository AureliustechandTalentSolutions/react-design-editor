import * as TablerIcons from '@tabler/icons-react';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import * as ReactIcons from 'react-icons';

/**
 * Icon size mapping
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<IconSize, number> = {
	xs: 12,
	sm: 16,
	md: 20,
	lg: 24,
	xl: 32,
};

/**
 * Icon library sources
 */
export type IconLibrary = 'react-icons' | 'lucide' | 'tabler';

/**
 * Icon categories for organization
 */
export type IconCategory =
	| 'ui'
	| 'arrows'
	| 'social'
	| 'file'
	| 'editor'
	| 'media'
	| 'device'
	| 'communication'
	| 'brand'
	| 'weather'
	| 'other';

export interface IconInfo {
	name: string;
	library: IconLibrary;
	category: IconCategory;
	component: React.ComponentType<any>;
}

export interface IconProps {
	/**
	 * Icon name
	 */
	name: string;
	/**
	 * Icon library source
	 */
	library?: IconLibrary;
	/**
	 * Icon size
	 */
	size?: IconSize | number;
	/**
	 * Icon color
	 */
	color?: string;
	/**
	 * Additional className
	 */
	className?: string;
}

/**
 * Unified Icon component that works across all icon libraries
 */
export const Icon: React.FC<IconProps> = ({ name, library = 'lucide', size = 'md', color, className }) => {
	const iconSize = typeof size === 'number' ? size : sizeMap[size];

	let IconComponent: React.ComponentType<any> | null = null;

	try {
		switch (library) {
			case 'react-icons':
				IconComponent = (ReactIcons as any)[name];
				break;
			case 'lucide':
				IconComponent = (LucideIcons as any)[name];
				break;
			case 'tabler':
				IconComponent = (TablerIcons as any)[name];
				break;
			default:
				break;
		}
	} catch (error) {
		console.warn(`Icon ${name} not found in ${library}`);
	}

	if (!IconComponent) {
		return null;
	}

	return <IconComponent size={iconSize} color={color} className={className} />;
};

/**
 * Get all available icons from Lucide
 */
export const getLucideIcons = (): IconInfo[] => {
	const icons: IconInfo[] = [];
	const lucideIconNames = Object.keys(LucideIcons);

	lucideIconNames.forEach(name => {
		if (name !== 'createLucideIcon' && typeof (LucideIcons as any)[name] === 'function') {
			icons.push({
				name,
				library: 'lucide',
				category: categorizeIcon(name),
				component: (LucideIcons as any)[name],
			});
		}
	});

	return icons;
};

/**
 * Get all available icons from Tabler
 */
export const getTablerIcons = (): IconInfo[] => {
	const icons: IconInfo[] = [];
	const tablerIconNames = Object.keys(TablerIcons);

	tablerIconNames.forEach(name => {
		if (typeof (TablerIcons as any)[name] === 'function') {
			icons.push({
				name,
				library: 'tabler',
				category: categorizeIcon(name),
				component: (TablerIcons as any)[name],
			});
		}
	});

	return icons;
};

/**
 * Get all available icons from all libraries
 */
export const getAllIcons = (): IconInfo[] => {
	return [...getLucideIcons(), ...getTablerIcons()];
};

/**
 * Search icons by name
 */
export const searchIcons = (query: string, library?: IconLibrary): IconInfo[] => {
	const allIcons = library ? getAllIcons().filter(icon => icon.library === library) : getAllIcons();

	if (!query) {
		return allIcons;
	}

	const lowerQuery = query.toLowerCase();
	return allIcons.filter(icon => icon.name.toLowerCase().includes(lowerQuery));
};

/**
 * Get icons by category
 */
export const getIconsByCategory = (category: IconCategory, library?: IconLibrary): IconInfo[] => {
	const allIcons = library ? getAllIcons().filter(icon => icon.library === library) : getAllIcons();

	return allIcons.filter(icon => icon.category === category);
};

/**
 * Categorize icon based on its name
 */
function categorizeIcon(name: string): IconCategory {
	const lowerName = name.toLowerCase();

	if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('caret')) {
		return 'arrows';
	}

	if (
		lowerName.includes('facebook') ||
		lowerName.includes('twitter') ||
		lowerName.includes('instagram') ||
		lowerName.includes('github') ||
		lowerName.includes('linkedin') ||
		lowerName.includes('youtube')
	) {
		return 'social';
	}

	if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document')) {
		return 'file';
	}

	if (
		lowerName.includes('bold') ||
		lowerName.includes('italic') ||
		lowerName.includes('underline') ||
		lowerName.includes('align')
	) {
		return 'editor';
	}

	if (
		lowerName.includes('play') ||
		lowerName.includes('pause') ||
		lowerName.includes('music') ||
		lowerName.includes('video') ||
		lowerName.includes('image')
	) {
		return 'media';
	}

	if (
		lowerName.includes('phone') ||
		lowerName.includes('tablet') ||
		lowerName.includes('desktop') ||
		lowerName.includes('laptop') ||
		lowerName.includes('mobile')
	) {
		return 'device';
	}

	if (
		lowerName.includes('mail') ||
		lowerName.includes('message') ||
		lowerName.includes('chat') ||
		lowerName.includes('comment')
	) {
		return 'communication';
	}

	if (
		lowerName.includes('sun') ||
		lowerName.includes('cloud') ||
		lowerName.includes('rain') ||
		lowerName.includes('snow')
	) {
		return 'weather';
	}

	if (
		lowerName.includes('menu') ||
		lowerName.includes('close') ||
		lowerName.includes('search') ||
		lowerName.includes('settings') ||
		lowerName.includes('home') ||
		lowerName.includes('user')
	) {
		return 'ui';
	}

	return 'other';
}

/**
 * Local storage key for recently used icons
 */
const RECENT_ICONS_KEY = 'ui-icon-picker-recent';

/**
 * Get recently used icons
 */
export const getRecentIcons = (): IconInfo[] => {
	try {
		const stored = localStorage.getItem(RECENT_ICONS_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

/**
 * Add icon to recently used
 */
export const addRecentIcon = (icon: IconInfo): void => {
	try {
		const recent = getRecentIcons();
		const filtered = recent.filter(i => !(i.name === icon.name && i.library === icon.library));
		const updated = [icon, ...filtered].slice(0, 20);
		localStorage.setItem(RECENT_ICONS_KEY, JSON.stringify(updated));
	} catch {
		// Ignore storage errors
	}
};

/**
 * Local storage key for favorite icons
 */
const FAVORITE_ICONS_KEY = 'ui-icon-picker-favorites';

/**
 * Get favorite icons
 */
export const getFavoriteIcons = (): IconInfo[] => {
	try {
		const stored = localStorage.getItem(FAVORITE_ICONS_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

/**
 * Toggle favorite icon
 */
export const toggleFavoriteIcon = (icon: IconInfo): void => {
	try {
		const favorites = getFavoriteIcons();
		const index = favorites.findIndex(i => i.name === icon.name && i.library === icon.library);

		if (index >= 0) {
			favorites.splice(index, 1);
		} else {
			favorites.push(icon);
		}

		localStorage.setItem(FAVORITE_ICONS_KEY, JSON.stringify(favorites));
	} catch {
		// Ignore storage errors
	}
};

/**
 * Check if icon is favorite
 */
export const isFavoriteIcon = (icon: IconInfo): boolean => {
	const favorites = getFavoriteIcons();
	return favorites.some(i => i.name === icon.name && i.library === icon.library);
};
