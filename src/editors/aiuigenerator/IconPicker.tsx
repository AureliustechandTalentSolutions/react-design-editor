import React, { useState, useMemo } from 'react';

import { Button } from '../../libs/ui/components/Button';
import { Tabs, type TabItem } from '../../libs/ui/components/Tabs';
import { Tooltip } from '../../libs/ui/components/Tooltip';
import {
	Icon,
	IconLibrary,
	IconCategory,
	searchIcons,
	getIconsByCategory,
	getRecentIcons,
	getFavoriteIcons,
	addRecentIcon,
	toggleFavoriteIcon,
	isFavoriteIcon,
	type IconInfo,
} from '../../libs/ui/icons';

export interface IconPickerProps {
	/**
	 * Callback when an icon is selected
	 */
	onSelect?: (icon: IconInfo) => void;
	/**
	 * Filter by library
	 */
	library?: IconLibrary;
	/**
	 * Show copy code button
	 */
	showCopyCode?: boolean;
}

/**
 * IconPicker component for browsing and selecting icons
 * Features: Search, category filtering, favorites, recent icons
 */
export const IconPicker: React.FC<IconPickerProps> = ({ onSelect, library, showCopyCode = true }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<IconCategory | 'all'>('all');
	const [previewSize, setPreviewSize] = useState<'sm' | 'md' | 'lg'>('md');
	const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

	const categories: (IconCategory | 'all')[] = [
		'all',
		'ui',
		'arrows',
		'social',
		'file',
		'editor',
		'media',
		'device',
		'communication',
		'weather',
		'other',
	];

	const recentIcons = useMemo(() => getRecentIcons(), []);
	const [favoriteIcons, setFavoriteIcons] = useState(() => getFavoriteIcons());

	const filteredIcons = useMemo(() => {
		let icons = searchIcons(searchQuery, library);

		if (selectedCategory !== 'all') {
			icons = getIconsByCategory(selectedCategory, library);
			if (searchQuery) {
				icons = icons.filter(icon => icon.name.toLowerCase().includes(searchQuery.toLowerCase()));
			}
		}

		return icons;
	}, [searchQuery, selectedCategory, library]);

	const handleIconClick = (icon: IconInfo) => {
		addRecentIcon(icon);
		onSelect?.(icon);
	};

	const handleToggleFavorite = (icon: IconInfo, e: React.MouseEvent) => {
		e.stopPropagation();
		toggleFavoriteIcon(icon);
		setFavoriteIcons(getFavoriteIcons());
	};

	const handleCopyCode = (icon: IconInfo, e: React.MouseEvent) => {
		e.stopPropagation();
		const code = `<Icon name="${icon.name}" library="${icon.library}" />`;
		navigator.clipboard.writeText(code);
		setCopiedIcon(`${icon.library}-${icon.name}`);
		setTimeout(() => setCopiedIcon(null), 2000);
	};

	const IconGrid: React.FC<{ icons: IconInfo[] }> = ({ icons }) => {
		const sizeClasses = {
			sm: 'w-12 h-12',
			md: 'w-16 h-16',
			lg: 'w-20 h-20',
		};

		return (
			<div className="grid grid-cols-6 gap-2 max-h-96 overflow-y-auto p-2">
				{icons.slice(0, 100).map(icon => {
					const iconKey = `${icon.library}-${icon.name}`;
					const isFav = isFavoriteIcon(icon);
					const isCopied = copiedIcon === iconKey;

					return (
						<Tooltip
							key={iconKey}
							content={
								<div>
									<div className="font-semibold">{icon.name}</div>
									<div className="text-xs opacity-75">{icon.library}</div>
								</div>
							}
						>
							<div
								className={`${sizeClasses[previewSize]} relative flex items-center justify-center rounded border border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors group`}
								onClick={() => handleIconClick(icon)}
								role="button"
								tabIndex={0}
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') {
										handleIconClick(icon);
									}
								}}
							>
								<Icon name={icon.name} library={icon.library} size={previewSize} />
								<div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<button
										type="button"
										className="p-1 rounded bg-white shadow-sm hover:bg-gray-100"
										onClick={e => handleToggleFavorite(icon, e)}
										title={isFav ? 'Remove from favorites' : 'Add to favorites'}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill={isFav ? 'currentColor' : 'none'}
											stroke="currentColor"
											strokeWidth="2"
											className="text-yellow-500"
										>
											<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
										</svg>
									</button>
									{showCopyCode && (
										<button
											type="button"
											className="p-1 rounded bg-white shadow-sm hover:bg-gray-100"
											onClick={e => handleCopyCode(icon, e)}
											title="Copy code"
										>
											{isCopied ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="12"
													height="12"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													className="text-green-500"
												>
													<polyline points="20 6 9 17 4 12" />
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="12"
													height="12"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
												>
													<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
													<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
												</svg>
											)}
										</button>
									)}
								</div>
							</div>
						</Tooltip>
					);
				})}
			</div>
		);
	};

	const tabs: TabItem[] = [
		{
			label: 'All Icons',
			value: 'all',
			content: <IconGrid icons={filteredIcons} />,
		},
		{
			label: 'Recent',
			value: 'recent',
			content: <IconGrid icons={recentIcons} />,
		},
		{
			label: 'Favorites',
			value: 'favorites',
			content: <IconGrid icons={favoriteIcons} />,
		},
	];

	return (
		<div className="w-full h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="p-4 border-b border-gray-200">
				<div className="flex gap-2 mb-4">
					<input
						type="text"
						placeholder="Search icons..."
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
					<select
						value={previewSize}
						onChange={e => setPreviewSize(e.target.value as 'sm' | 'md' | 'lg')}
						className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<option value="sm">Small</option>
						<option value="md">Medium</option>
						<option value="lg">Large</option>
					</select>
				</div>

				<div className="flex gap-2 flex-wrap">
					{categories.map(cat => (
						<Button
							key={cat}
							size="sm"
							variant={selectedCategory === cat ? 'primary' : 'outline'}
							onClick={() => setSelectedCategory(cat)}
						>
							{cat.charAt(0).toUpperCase() + cat.slice(1)}
						</Button>
					))}
				</div>
			</div>

			<div className="flex-1 overflow-hidden">
				<Tabs tabs={tabs} defaultValue="all" />
			</div>

			<div className="p-2 border-t border-gray-200 text-xs text-gray-500 text-center">
				Showing {filteredIcons.length} icons
			</div>
		</div>
	);
};

IconPicker.displayName = 'IconPicker';
