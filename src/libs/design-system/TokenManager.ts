import { Handler } from '../../canvas/handlers/Handler';

export interface DesignTokens {
	colors: Record<string, string>;
	spacing: Record<string, number>;
	typography: {
		fontFamilies: string[];
		fontSizes: Record<string, number>;
		fontWeights: Record<string, number>;
		lineHeights: Record<string, number>;
	};
	borderRadius: Record<string, number>;
	shadows: Record<string, string>;
}

const defaultTokens: DesignTokens = {
	colors: {
		primary: '#1890ff',
		secondary: '#52c41a',
		error: '#f5222d',
		warning: '#faad14',
		info: '#1890ff',
		success: '#52c41a',
		background: '#ffffff',
		surface: '#fafafa',
		text: '#000000',
		textSecondary: '#595959',
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		xxl: 48,
	},
	typography: {
		fontFamilies: ['Roboto', 'Arial', 'sans-serif'],
		fontSizes: {
			xs: 12,
			sm: 14,
			md: 16,
			lg: 18,
			xl: 20,
			xxl: 24,
		},
		fontWeights: {
			light: 300,
			regular: 400,
			medium: 500,
			bold: 700,
		},
		lineHeights: {
			tight: 1.2,
			normal: 1.5,
			relaxed: 1.75,
		},
	},
	borderRadius: {
		none: 0,
		sm: 2,
		md: 4,
		lg: 8,
		xl: 16,
		full: 9999,
	},
	shadows: {
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
	},
};

export interface FigmaTokens {
	colors?: Record<string, { value: string }>;
	spacing?: Record<string, { value: string | number }>;
	typography?: {
		fontFamilies?: Array<string | { value: string }>;
		fontSizes?: Record<string, { value: string | number }>;
		fontWeights?: Record<string, { value: string | number }>;
		lineHeights?: Record<string, { value: string | number }>;
	};
	borderRadius?: Record<string, { value: string | number }>;
	shadows?: Record<string, { value: string }>;
}

export class TokenManager {
	private tokens: DesignTokens;

	constructor(tokens?: Partial<DesignTokens>) {
		this.tokens = this.mergeWithDefaults(tokens);
	}

	private mergeWithDefaults(tokens?: Partial<DesignTokens>): DesignTokens {
		if (!tokens) {
			return { ...defaultTokens };
		}

		return {
			colors: { ...defaultTokens.colors, ...tokens.colors },
			spacing: { ...defaultTokens.spacing, ...tokens.spacing },
			typography: {
				fontFamilies: tokens.typography?.fontFamilies || defaultTokens.typography.fontFamilies,
				fontSizes: { ...defaultTokens.typography.fontSizes, ...tokens.typography?.fontSizes },
				fontWeights: { ...defaultTokens.typography.fontWeights, ...tokens.typography?.fontWeights },
				lineHeights: { ...defaultTokens.typography.lineHeights, ...tokens.typography?.lineHeights },
			},
			borderRadius: { ...defaultTokens.borderRadius, ...tokens.borderRadius },
			shadows: { ...defaultTokens.shadows, ...tokens.shadows },
		};
	}

	/**
	 * Get a color value by name
	 */
	public getColor(name: string): string {
		return this.tokens.colors[name] || defaultTokens.colors[name] || '#000000';
	}

	/**
	 * Get a spacing value by name
	 */
	public getSpacing(name: string): number {
		return this.tokens.spacing[name] || defaultTokens.spacing[name] || 0;
	}

	/**
	 * Apply design tokens to canvas objects
	 */
	public applyToCanvas(handler: Handler): void {
		const objects = handler.getObjects();
		objects.forEach(obj => {
			if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
				// Apply typography tokens
				const fontSize = this.tokens.typography.fontSizes.md;
				const fontFamily = this.tokens.typography.fontFamilies[0];
				if (fontSize && obj.fontSize !== fontSize) {
					obj.set('fontSize', fontSize);
				}
				if (fontFamily && obj.fontFamily !== fontFamily) {
					obj.set('fontFamily', fontFamily);
				}
			}
			// Apply color tokens
			if (obj.fill && typeof obj.fill === 'string') {
				const colorName = Object.keys(this.tokens.colors).find(
					key => this.tokens.colors[key] === obj.fill
				);
				if (colorName) {
					obj.set('fill', this.getColor(colorName));
				}
			}
		});
		handler.canvas.renderAll();
	}

	/**
	 * Export all design tokens
	 */
	public exportTokens(): DesignTokens {
		return JSON.parse(JSON.stringify(this.tokens));
	}

	/**
	 * Import design tokens from Figma format
	 */
	public importFromFigma(figmaTokens: FigmaTokens): void {
		const converted: Partial<DesignTokens> = {};

		// Convert Figma color tokens
		if (figmaTokens.colors) {
			converted.colors = {};
			Object.keys(figmaTokens.colors).forEach(key => {
				const color = figmaTokens.colors[key];
				if (color.value) {
					converted.colors![key] = color.value;
				}
			});
		}

		// Convert Figma spacing tokens
		if (figmaTokens.spacing) {
			converted.spacing = {};
			Object.keys(figmaTokens.spacing).forEach(key => {
				const spacing = figmaTokens.spacing[key];
				if (spacing.value) {
					converted.spacing![key] = parseInt(spacing.value, 10);
				}
			});
		}

		// Convert Figma typography tokens
		if (figmaTokens.typography) {
			converted.typography = {
				fontFamilies: [],
				fontSizes: {},
				fontWeights: {},
				lineHeights: {},
			};

			if (figmaTokens.typography.fontFamilies) {
				converted.typography.fontFamilies = figmaTokens.typography.fontFamilies.map(
					(f: any) => f.value || f
				);
			}

			if (figmaTokens.typography.fontSizes) {
				Object.keys(figmaTokens.typography.fontSizes).forEach(key => {
					const fontSize = figmaTokens.typography.fontSizes[key];
					if (fontSize.value) {
						converted.typography!.fontSizes[key] = parseInt(fontSize.value, 10);
					}
				});
			}

			if (figmaTokens.typography.fontWeights) {
				Object.keys(figmaTokens.typography.fontWeights).forEach(key => {
					const fontWeight = figmaTokens.typography.fontWeights[key];
					if (fontWeight.value) {
						converted.typography!.fontWeights[key] = parseInt(fontWeight.value, 10);
					}
				});
			}

			if (figmaTokens.typography.lineHeights) {
				Object.keys(figmaTokens.typography.lineHeights).forEach(key => {
					const lineHeight = figmaTokens.typography.lineHeights[key];
					if (lineHeight.value) {
						converted.typography!.lineHeights[key] = parseFloat(lineHeight.value);
					}
				});
			}
		}

		// Convert Figma border radius tokens
		if (figmaTokens.borderRadius) {
			converted.borderRadius = {};
			Object.keys(figmaTokens.borderRadius).forEach(key => {
				const radius = figmaTokens.borderRadius[key];
				if (radius.value) {
					converted.borderRadius![key] = parseInt(radius.value, 10);
				}
			});
		}

		// Convert Figma shadow tokens
		if (figmaTokens.shadows) {
			converted.shadows = {};
			Object.keys(figmaTokens.shadows).forEach(key => {
				const shadow = figmaTokens.shadows[key];
				if (shadow.value) {
					converted.shadows![key] = shadow.value;
				}
			});
		}

		this.tokens = this.mergeWithDefaults(converted);
	}

	/**
	 * Get all tokens
	 */
	public getTokens(): DesignTokens {
		return this.tokens;
	}

	/**
	 * Update tokens
	 */
	public updateTokens(updates: Partial<DesignTokens>): void {
		this.tokens = this.mergeWithDefaults(updates);
	}
}
