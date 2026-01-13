import React, { useState, useEffect } from 'react';

import { DesignTemplate, TemplateLibrary } from '../../libs/templates/TemplateLibrary';

// Import template JSON files
import chatInterfaceTemplate from './templates/chat-interface.json';
import dashboardTemplate from './templates/dashboard.json';
import landingPageTemplate from './templates/landing-page.json';
import loginFormTemplate from './templates/login-form.json';
import mobileAppHomeTemplate from './templates/mobile-app-home.json';
import pricingTableTemplate from './templates/pricing-table.json';
import productCardTemplate from './templates/product-card.json';
import settingsPageTemplate from './templates/settings-page.json';

interface TemplateGalleryProps {
	onSelectTemplate: (template: DesignTemplate) => void;
}

// Initialize templates with metadata
const initializeTemplates = (): DesignTemplate[] => {
	return [
		{
			id: 'dashboard',
			name: dashboardTemplate.name,
			description: dashboardTemplate.description,
			category: dashboardTemplate.category,
			thumbnail: '/assets/templates/dashboard-thumb.png',
			design: dashboardTemplate.objects,
			tags: ['dashboard', 'analytics', 'admin', 'cards'],
		},
		{
			id: 'landing-page',
			name: landingPageTemplate.name,
			description: landingPageTemplate.description,
			category: landingPageTemplate.category,
			thumbnail: '/assets/templates/landing-page-thumb.png',
			design: landingPageTemplate.objects,
			tags: ['landing', 'marketing', 'hero', 'features'],
		},
		{
			id: 'login-form',
			name: loginFormTemplate.name,
			description: loginFormTemplate.description,
			category: loginFormTemplate.category,
			thumbnail: '/assets/templates/login-form-thumb.png',
			design: loginFormTemplate.objects,
			tags: ['login', 'authentication', 'form', 'signin'],
		},
		{
			id: 'product-card',
			name: productCardTemplate.name,
			description: productCardTemplate.description,
			category: productCardTemplate.category,
			thumbnail: '/assets/templates/product-card-thumb.png',
			design: productCardTemplate.objects,
			tags: ['ecommerce', 'product', 'card', 'shop'],
		},
		{
			id: 'pricing-table',
			name: pricingTableTemplate.name,
			description: pricingTableTemplate.description,
			category: pricingTableTemplate.category,
			thumbnail: '/assets/templates/pricing-table-thumb.png',
			design: pricingTableTemplate.objects,
			tags: ['pricing', 'plans', 'subscription', 'marketing'],
		},
		{
			id: 'settings-page',
			name: settingsPageTemplate.name,
			description: settingsPageTemplate.description,
			category: settingsPageTemplate.category,
			thumbnail: '/assets/templates/settings-page-thumb.png',
			design: settingsPageTemplate.objects,
			tags: ['settings', 'profile', 'preferences', 'dashboard'],
		},
		{
			id: 'mobile-app-home',
			name: mobileAppHomeTemplate.name,
			description: mobileAppHomeTemplate.description,
			category: mobileAppHomeTemplate.category,
			thumbnail: '/assets/templates/mobile-app-home-thumb.png',
			design: mobileAppHomeTemplate.objects,
			tags: ['mobile', 'app', 'home', 'navigation'],
		},
		{
			id: 'chat-interface',
			name: chatInterfaceTemplate.name,
			description: chatInterfaceTemplate.description,
			category: chatInterfaceTemplate.category,
			thumbnail: '/assets/templates/chat-interface-thumb.png',
			design: chatInterfaceTemplate.objects,
			tags: ['chat', 'messaging', 'conversation', 'communication'],
		},
	];
};

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
	const [library] = useState(() => {
		const lib = new TemplateLibrary();
		const templates = initializeTemplates();
		templates.forEach(template => lib.addTemplate(template));
		return lib;
	});

	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filteredTemplates, setFilteredTemplates] = useState<DesignTemplate[]>([]);
	const [previewTemplate, setPreviewTemplate] = useState<DesignTemplate | null>(null);

	useEffect(() => {
		let templates = library.getAllTemplates();

		// Filter by category
		if (selectedCategory !== 'all') {
			templates = library.getByCategory(selectedCategory);
		}

		// Filter by search query
		if (searchQuery.trim()) {
			templates = library.search(searchQuery);
		}

		setFilteredTemplates(templates);
	}, [selectedCategory, searchQuery, library]);

	const categories = ['all', ...library.getCategories()];

	const handleTemplateClick = (template: DesignTemplate) => {
		setPreviewTemplate(template);
	};

	const handleSelectTemplate = (template: DesignTemplate) => {
		onSelectTemplate(template);
		setPreviewTemplate(null);
	};

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<h2 style={styles.title}>Template Gallery</h2>
				<input
					type="text"
					placeholder="Search templates..."
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					style={styles.searchInput}
				/>
			</div>

			<div style={styles.categoryBar}>
				{categories.map(category => (
					<button
						key={category}
						onClick={() => setSelectedCategory(category)}
						style={{
							...styles.categoryButton,
							...(selectedCategory === category ? styles.categoryButtonActive : {}),
						}}
					>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				))}
			</div>

			<div style={styles.grid}>
				{filteredTemplates.map(template => (
					<div key={template.id} style={styles.card} onClick={() => handleTemplateClick(template)}>
						<div style={styles.thumbnailPlaceholder}>
							<span style={styles.thumbnailText}>{template.name.substring(0, 2).toUpperCase()}</span>
						</div>
						<div style={styles.cardContent}>
							<h3 style={styles.cardTitle}>{template.name}</h3>
							<p style={styles.cardDescription}>{template.description}</p>
							<div style={styles.tags}>
								{template.tags.slice(0, 3).map(tag => (
									<span key={tag} style={styles.tag}>
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			{filteredTemplates.length === 0 && (
				<div style={styles.emptyState}>
					<p>No templates found matching your criteria.</p>
				</div>
			)}

			{previewTemplate && (
				<div style={styles.modal} onClick={() => setPreviewTemplate(null)}>
					<div style={styles.modalContent} onClick={e => e.stopPropagation()}>
						<button style={styles.closeButton} onClick={() => setPreviewTemplate(null)}>
							×
						</button>
						<h2 style={styles.modalTitle}>{previewTemplate.name}</h2>
						<p style={styles.modalDescription}>{previewTemplate.description}</p>
						<div style={styles.modalPreview}>
							<div style={styles.previewPlaceholder}>Template Preview</div>
						</div>
						<div style={styles.modalActions}>
							<button style={styles.selectButton} onClick={() => handleSelectTemplate(previewTemplate)}>
								Use This Template
							</button>
							<button style={styles.cancelButton} onClick={() => setPreviewTemplate(null)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// Inline styles for simplicity
const styles: Record<string, React.CSSProperties> = {
	container: {
		padding: '20px',
		maxWidth: '1200px',
		margin: '0 auto',
		fontFamily: 'Arial, sans-serif',
	},
	header: {
		marginBottom: '20px',
	},
	title: {
		fontSize: '28px',
		fontWeight: 'bold',
		marginBottom: '10px',
		color: '#111827',
	},
	searchInput: {
		width: '100%',
		maxWidth: '400px',
		padding: '10px 15px',
		fontSize: '14px',
		border: '1px solid #d1d5db',
		borderRadius: '8px',
		outline: 'none',
	},
	categoryBar: {
		display: 'flex',
		gap: '10px',
		marginBottom: '30px',
		flexWrap: 'wrap',
	},
	categoryButton: {
		padding: '8px 16px',
		fontSize: '14px',
		border: '1px solid #d1d5db',
		borderRadius: '6px',
		background: '#ffffff',
		cursor: 'pointer',
		transition: 'all 0.2s',
	},
	categoryButtonActive: {
		background: '#3b82f6',
		color: '#ffffff',
		borderColor: '#3b82f6',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
		gap: '20px',
		marginBottom: '20px',
	},
	card: {
		border: '1px solid #e5e7eb',
		borderRadius: '12px',
		overflow: 'hidden',
		cursor: 'pointer',
		transition: 'all 0.2s',
		background: '#ffffff',
	},
	thumbnailPlaceholder: {
		height: '160px',
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	thumbnailText: {
		fontSize: '48px',
		fontWeight: 'bold',
		color: '#ffffff',
	},
	cardContent: {
		padding: '15px',
	},
	cardTitle: {
		fontSize: '16px',
		fontWeight: 'bold',
		marginBottom: '5px',
		color: '#111827',
	},
	cardDescription: {
		fontSize: '13px',
		color: '#6b7280',
		marginBottom: '10px',
		lineHeight: '1.5',
	},
	tags: {
		display: 'flex',
		gap: '5px',
		flexWrap: 'wrap',
	},
	tag: {
		fontSize: '11px',
		padding: '3px 8px',
		background: '#f3f4f6',
		color: '#374151',
		borderRadius: '4px',
	},
	emptyState: {
		textAlign: 'center',
		padding: '60px 20px',
		color: '#6b7280',
	},
	modal: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1000,
	},
	modalContent: {
		background: '#ffffff',
		borderRadius: '12px',
		padding: '30px',
		maxWidth: '600px',
		width: '90%',
		maxHeight: '80vh',
		overflow: 'auto',
		position: 'relative',
	},
	closeButton: {
		position: 'absolute',
		top: '15px',
		right: '15px',
		background: 'transparent',
		border: 'none',
		fontSize: '32px',
		cursor: 'pointer',
		color: '#6b7280',
		lineHeight: '1',
	},
	modalTitle: {
		fontSize: '24px',
		fontWeight: 'bold',
		marginBottom: '10px',
		color: '#111827',
	},
	modalDescription: {
		fontSize: '14px',
		color: '#6b7280',
		marginBottom: '20px',
	},
	modalPreview: {
		marginBottom: '20px',
		border: '1px solid #e5e7eb',
		borderRadius: '8px',
		overflow: 'hidden',
	},
	previewPlaceholder: {
		height: '300px',
		background: '#f9fafb',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#9ca3af',
	},
	modalActions: {
		display: 'flex',
		gap: '10px',
		justifyContent: 'flex-end',
	},
	selectButton: {
		padding: '10px 20px',
		fontSize: '14px',
		fontWeight: 'bold',
		background: '#3b82f6',
		color: '#ffffff',
		border: 'none',
		borderRadius: '8px',
		cursor: 'pointer',
	},
	cancelButton: {
		padding: '10px 20px',
		fontSize: '14px',
		background: '#f3f4f6',
		color: '#374151',
		border: 'none',
		borderRadius: '8px',
		cursor: 'pointer',
	},
};
