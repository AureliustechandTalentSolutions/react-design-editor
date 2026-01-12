/**
 * AI System Prompts
 * Prompts for Claude AI to generate UI designs
 */

import { GenerateOptions } from '../../types/aiui';
import { tokens } from '../design-system/tokens';

/**
 * System prompt for UI generation
 */
export const getSystemPrompt = (options: GenerateOptions): string => {
	const colorPalette = tokens.colors[options.style] || tokens.colors.modern;

	return `You are an expert UI/UX designer specializing in creating beautiful, functional user interfaces.
Your task is to generate UI designs as JSON objects compatible with Fabric.js canvas library.

DESIGN TOKENS:
- Spacing: ${JSON.stringify(tokens.spacing)}
- Border Radius: ${JSON.stringify(tokens.borderRadius)}
- Font Sizes: ${JSON.stringify(tokens.fontSize)}
- Colors: ${JSON.stringify(colorPalette)}
- Shadows: ${JSON.stringify(tokens.shadows)}

PLATFORM: ${options.platform}
STYLE: ${options.style}
COLOR SCHEME: ${options.colorScheme}
COMPLEXITY: ${options.complexity}

FABRIC.JS OBJECT STRUCTURE:
Each UI element should be a Fabric.js object with these properties:
- type: 'rect', 'circle', 'text', 'group', etc.
- left, top: Position coordinates
- width, height: Dimensions
- fill: Color (use design tokens)
- stroke, strokeWidth: Border properties
- rx, ry: Border radius
- shadow: Shadow definition
- fontFamily, fontSize, fontWeight: Text properties

GUIDELINES:
1. Use the provided design tokens for consistency
2. Create semantic, hierarchical layouts
3. Ensure proper spacing and alignment
4. Use appropriate typography scale
5. Apply shadows for depth
6. Consider ${options.platform} platform constraints
7. Follow ${options.style} style guidelines
8. Implement ${options.complexity} complexity level

OUTPUT FORMAT:
Return a JSON object with this structure:
{
  "design": {
    "objects": [/* Array of Fabric.js objects */],
    "background": "color"
  },
  "styles": {/* CSS-like styles for reference */},
  "colorPalette": [/* Array of colors used */],
  "metadata": {
    "screenName": "Name of the screen",
    "description": "Brief description",
    "components": [/* Array of component types */]
  }
}

IMPORTANT:
- Return ONLY valid JSON, no explanations
- Ensure all coordinates are numbers, not strings
- Use realistic content and placeholder text
- Make the design visually appealing and professional`;
};

/**
 * User prompt template for UI generation
 */
export const formatUserPrompt = (prompt: string, options: GenerateOptions): string => {
	return `Create a ${options.complexity} ${options.platform} UI design with ${options.style} style for:

${prompt}

Platform: ${options.platform}
Style: ${options.style}
Complexity: ${options.complexity}

Generate a complete, production-ready design with all necessary components.`;
};

/**
 * Refinement prompt template
 */
export const formatRefinementPrompt = (instruction: string, targetObject: any, context: any): string => {
	return `Refine the following UI element based on this instruction: "${instruction}"

Current element: ${JSON.stringify(targetObject, null, 2)}

Design context: ${JSON.stringify(context, null, 2)}

Return the updated element as a Fabric.js compatible JSON object. Maintain the same type and general structure unless the instruction requires changes.

Return ONLY the JSON object, no explanations.`;
};

/**
 * Style variation prompt template
 */
export const formatStyleVariationPrompt = (design: any, count: number): string => {
	return `Create ${count} style variations of this UI design:

${JSON.stringify(design, null, 2)}

Generate ${count} distinct visual styles while maintaining the same layout and structure.
Return an array of ${count} complete design objects in the same format.

Return ONLY the JSON array, no explanations.`;
};

/**
 * Color extraction prompt template
 */
export const formatColorExtractionPrompt = (): string => {
	return `Analyze this image and extract a cohesive color palette of 5-7 colors suitable for UI design.

Return a JSON object with:
{
  "colors": [/* Array of hex color codes */],
  "description": "Brief description of the palette mood/theme"
}

Return ONLY valid JSON, no explanations.`;
};

/**
 * Quick action prompts
 */
export const quickActionPrompts = {
	improveContrast: 'Improve the color contrast for better accessibility',
	addShadows: 'Add subtle shadows to create depth',
	improveSpacing: 'Improve spacing and alignment for better visual hierarchy',
	modernize: 'Update the design to use more modern UI patterns',
	simplify: 'Simplify the design by removing unnecessary elements',
	responsive: 'Make the design more responsive-friendly',
	addAnimation: 'Suggest animation opportunities in the design',
	accessibility: 'Improve accessibility with ARIA labels and semantic structure',
};

/**
 * Prompt templates for common UI patterns
 */
export const promptTemplates = [
	{
		id: 'landing-page',
		name: 'Landing Page',
		description: 'Hero section with features and CTA',
		prompt: 'A modern landing page with a hero section featuring a headline, subheadline, CTA button, and an image. Include a features section with 3 feature cards and a footer.',
		category: 'Marketing',
	},
	{
		id: 'dashboard',
		name: 'Dashboard',
		description: 'Admin dashboard layout',
		prompt: 'An admin dashboard with a sidebar navigation, header with user profile, and main content area showing KPI cards, charts, and a data table.',
		category: 'Admin',
	},
	{
		id: 'login',
		name: 'Login Form',
		description: 'Authentication screen',
		prompt: 'A clean login form with email and password fields, a "Remember me" checkbox, "Forgot password?" link, and a login button. Include social login options.',
		category: 'Auth',
	},
	{
		id: 'register',
		name: 'Register Form',
		description: 'Sign up screen',
		prompt: 'A registration form with fields for name, email, password, and password confirmation. Include terms acceptance checkbox and a sign-up button.',
		category: 'Auth',
	},
	{
		id: 'product-listing',
		name: 'Product Listings',
		description: 'E-commerce product grid',
		prompt: 'An e-commerce product listing page with a grid of product cards showing images, titles, prices, and ratings. Include filters sidebar and sorting options.',
		category: 'E-commerce',
	},
	{
		id: 'product-detail',
		name: 'Product Details',
		description: 'Product detail page',
		prompt: 'A product detail page with large product images, title, price, description, size/color selectors, quantity selector, and add-to-cart button.',
		category: 'E-commerce',
	},
	{
		id: 'profile-page',
		name: 'Profile Page',
		description: 'User profile layout',
		prompt: 'A user profile page with avatar, bio, stats (followers, following, posts), and a tabbed interface for posts, about, and settings.',
		category: 'Social',
	},
	{
		id: 'chat-ui',
		name: 'Chat Interface',
		description: 'Messaging interface',
		prompt: 'A chat interface with a list of conversations on the left, main message area in the center with message bubbles, and message input at the bottom.',
		category: 'Communication',
	},
	{
		id: 'settings',
		name: 'Settings Page',
		description: 'Settings interface',
		prompt: 'A settings page with a sidebar containing setting categories (Profile, Security, Notifications, Privacy) and a main panel showing setting options with toggles, inputs, and buttons.',
		category: 'Admin',
	},
	{
		id: 'mobile-app',
		name: 'Mobile App Screen',
		description: 'Mobile app layout',
		prompt: 'A mobile app home screen with a header, scrollable content area with cards, and a bottom navigation bar with 4 tabs.',
		category: 'Mobile',
	},
];

/**
 * Get prompt template by ID
 */
export const getPromptTemplate = (id: string) => {
	return promptTemplates.find(template => template.id === id);
};
