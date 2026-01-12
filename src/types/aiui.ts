/**
 * Type definitions for AI UI Generator module
 */

import { FabricObject } from '../canvas';

/**
 * Style presets for UI generation
 */
export type StylePreset = 'modern' | 'minimal' | 'corporate' | 'playful' | 'dark' | 'glassmorphism';

/**
 * Color scheme options
 */
export type ColorScheme = 'auto' | 'light' | 'dark' | 'custom';

/**
 * Platform targets for UI generation
 */
export type Platform = 'web' | 'mobile' | 'tablet' | 'responsive';

/**
 * Complexity levels for UI generation
 */
export type Complexity = 'simple' | 'medium' | 'complex';

/**
 * Export framework options
 */
export type ExportFramework = 'react' | 'nextjs' | 'vue' | 'html';

/**
 * Styling options for code export
 */
export type StylingOption = 'tailwind' | 'css' | 'styled-components' | 'css-modules';

/**
 * Color palette presets
 */
export type ColorPalette = 'Ocean' | 'Sunset' | 'Forest' | 'Purple Haze' | 'Monochrome' | 'Neon';

/**
 * Typography presets
 */
export type TypographyPreset = 'Modern Sans' | 'Classic Serif' | 'Monospace' | 'Playful';

/**
 * Options for UI generation
 */
export interface GenerateOptions {
	style: StylePreset;
	colorScheme: ColorScheme;
	platform: Platform;
	complexity: Complexity;
	clearCanvas: boolean;
}

/**
 * Metadata for generated designs
 */
export interface DesignMetadata {
	screenName: string;
	description: string;
	components: string[];
	timestamp?: number;
}

/**
 * Generated design structure
 */
export interface GeneratedDesign {
	design: {
		objects: any[];
		background?: string;
	};
	styles: Record<string, any>;
	colorPalette: string[];
	metadata: DesignMetadata;
}

/**
 * Current design state
 */
export interface DesignState {
	objects: FabricObject[];
	styles: Record<string, any>;
	colorPalette: string[];
	history?: DesignState[];
	currentIndex?: number;
}

/**
 * Code export options
 */
export interface ExportOptions {
	framework: ExportFramework;
	styling: StylingOption;
	typescript: boolean;
	includeResponsive: boolean;
}

/**
 * Component category types
 */
export type ComponentCategory = 'layout' | 'forms' | 'data' | 'navigation' | 'actions' | 'ecommerce';

/**
 * UI Component definition
 */
export interface UIComponent {
	id: string;
	name: string;
	category: ComponentCategory;
	icon: string;
	description: string;
	template: any; // Fabric.js object template
}

/**
 * Prompt template definition
 */
export interface PromptTemplate {
	id: string;
	name: string;
	description: string;
	prompt: string;
	category: string;
}

/**
 * AI refinement instruction
 */
export interface RefinementInstruction {
	instruction: string;
	targetObjectId?: string;
	context?: any;
}

/**
 * Style variation request
 */
export interface StyleVariationRequest {
	design: any;
	count: number;
	baseStyle?: StylePreset;
}

/**
 * Exported code structure
 */
export interface ExportedCode {
	files: {
		path: string;
		content: string;
		language: string;
	}[];
	dependencies: Record<string, string>;
	instructions?: string;
}

/**
 * AI Assistant action
 */
export interface AIAssistantAction {
	id: string;
	label: string;
	description: string;
	icon: string;
	prompt: string;
}

/**
 * Generation history entry
 */
export interface GenerationHistoryEntry {
	id: string;
	timestamp: number;
	prompt: string;
	options: GenerateOptions;
	result: GeneratedDesign;
}

/**
 * Design system tokens
 */
export interface DesignTokens {
	spacing: Record<string, number>;
	borderRadius: Record<string, number>;
	fontSize: Record<string, number>;
	fontWeight: Record<string, number>;
	colors: Record<string, Record<string, string>>;
	shadows: Record<string, string>;
}

/**
 * Layout pattern definition
 */
export interface LayoutPattern {
	id: string;
	name: string;
	description: string;
	structure: any;
	responsive: boolean;
}
