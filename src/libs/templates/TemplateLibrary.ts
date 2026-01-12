export interface DesignTemplate {
	id: string;
	name: string;
	description: string;
	category: string;
	thumbnail: string;
	design: object;
	tags: string[];
}

export class TemplateLibrary {
	private templates: Map<string, DesignTemplate>;

	constructor() {
		this.templates = new Map();
	}

	/**
	 * Get all unique categories
	 */
	public getCategories(): string[] {
		const categories = new Set<string>();
		this.templates.forEach(template => {
			categories.add(template.category);
		});
		return Array.from(categories).sort();
	}

	/**
	 * Get templates by category
	 */
	public getByCategory(category: string): DesignTemplate[] {
		const templates: DesignTemplate[] = [];
		this.templates.forEach(template => {
			if (template.category === category) {
				templates.push(template);
			}
		});
		return templates;
	}

	/**
	 * Search templates by query (searches name, description, and tags)
	 */
	public search(query: string): DesignTemplate[] {
		const lowercaseQuery = query.toLowerCase();
		const results: DesignTemplate[] = [];

		this.templates.forEach(template => {
			const nameMatch = template.name.toLowerCase().includes(lowercaseQuery);
			const descriptionMatch = template.description.toLowerCase().includes(lowercaseQuery);
			const tagMatch = template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery));
			const categoryMatch = template.category.toLowerCase().includes(lowercaseQuery);

			if (nameMatch || descriptionMatch || tagMatch || categoryMatch) {
				results.push(template);
			}
		});

		return results;
	}

	/**
	 * Add a new template to the library
	 */
	public addTemplate(template: DesignTemplate): void {
		this.templates.set(template.id, template);
	}

	/**
	 * Load a template's design by ID
	 */
	public loadTemplate(id: string): object | null {
		const template = this.templates.get(id);
		if (!template) {
			return null;
		}
		// Return a deep clone to prevent mutations
		return JSON.parse(JSON.stringify(template.design));
	}

	/**
	 * Get a template by ID
	 */
	public getTemplate(id: string): DesignTemplate | null {
		return this.templates.get(id) || null;
	}

	/**
	 * Get all templates
	 */
	public getAllTemplates(): DesignTemplate[] {
		return Array.from(this.templates.values());
	}

	/**
	 * Remove a template by ID
	 */
	public removeTemplate(id: string): boolean {
		return this.templates.delete(id);
	}

	/**
	 * Get templates by tag
	 */
	public getByTag(tag: string): DesignTemplate[] {
		const lowercaseTag = tag.toLowerCase();
		const results: DesignTemplate[] = [];

		this.templates.forEach(template => {
			if (template.tags.some(t => t.toLowerCase() === lowercaseTag)) {
				results.push(template);
			}
		});

		return results;
	}

	/**
	 * Get all tags from all templates
	 */
	public getAllTags(): string[] {
		const tags = new Set<string>();
		this.templates.forEach(template => {
			template.tags.forEach(tag => tags.add(tag));
		});
		return Array.from(tags).sort();
	}

	/**
	 * Update an existing template
	 */
	public updateTemplate(id: string, updates: Partial<DesignTemplate>): boolean {
		const template = this.templates.get(id);
		if (!template) {
			return false;
		}

		const updated = {
			...template,
			...updates,
			id, // Preserve original ID
		};

		this.templates.set(id, updated);
		return true;
	}

	/**
	 * Export all templates to JSON
	 */
	public exportTemplates(): string {
		const templates = Array.from(this.templates.values());
		return JSON.stringify(templates, null, 2);
	}

	/**
	 * Import templates from JSON
	 */
	public importTemplates(json: string): void {
		try {
			const templates = JSON.parse(json);
			if (!Array.isArray(templates)) {
				throw new Error('Invalid template format');
			}

			templates.forEach((template: DesignTemplate) => {
				this.addTemplate(template);
			});
		} catch (error) {
			throw new Error(`Failed to import templates: ${error}`);
		}
	}

	/**
	 * Clear all templates
	 */
	public clear(): void {
		this.templates.clear();
	}

	/**
	 * Get template count
	 */
	public getCount(): number {
		return this.templates.size;
	}
}
