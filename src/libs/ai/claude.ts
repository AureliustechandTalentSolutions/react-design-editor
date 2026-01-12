/**
 * Claude AI Integration
 * Handles communication with Claude API for UI generation
 * Includes mock/demo mode for development without API key
 */

import { GenerateOptions, GeneratedDesign, RefinementInstruction, StyleVariationRequest } from '../../types/aiui';

import { createMockDesign, parseAndValidateDesign, safeParseDesign } from './parsers';
import { formatRefinementPrompt, formatStyleVariationPrompt, formatUserPrompt, getSystemPrompt } from './prompts';

/**
 * Check if API key is available
 */
const hasApiKey = (): boolean => {
	return !!process.env.ANTHROPIC_API_KEY || !!process.env.REACT_APP_ANTHROPIC_API_KEY;
};

/**
 * Get API key from environment
 */
const getApiKey = (): string | undefined => {
	return process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;
};

/**
 * Call Claude API
 */
const callClaudeAPI = async (systemPrompt: string, userPrompt: string): Promise<string> => {
	const apiKey = getApiKey();
	if (!apiKey) {
		throw new Error('API key not configured');
	}

	try {
		// Dynamic import to avoid bundling issues
		const Anthropic = (await import('@anthropic-ai/sdk')).default;
		// NOTE: dangerouslyAllowBrowser is used here for demo/development purposes.
		// In production, implement a backend proxy to keep API keys secure.
		const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

		const message = await client.messages.create({
			model: 'claude-3-5-sonnet-20241022',
			max_tokens: 4096,
			system: systemPrompt,
			messages: [
				{
					role: 'user',
					content: userPrompt,
				},
			],
		});

		const content = message.content[0];
		if (content.type === 'text') {
			return content.text;
		}

		throw new Error('Unexpected response format from Claude API');
	} catch (error: any) {
		console.error('Claude API error:', error);
		throw new Error(`Failed to call Claude API: ${error.message}`);
	}
};

/**
 * Generate UI from prompt using Claude AI
 * Falls back to mock design if API key is not available
 */
export const generateUIFromPrompt = async (prompt: string, options: GenerateOptions): Promise<GeneratedDesign> => {
	// If no API key, return mock design
	if (!hasApiKey()) {
		console.warn('No API key found. Using mock design for demo.');
		await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
		return createMockDesign(prompt);
	}

	try {
		const systemPrompt = getSystemPrompt(options);
		const userPrompt = formatUserPrompt(prompt, options);

		const response = await callClaudeAPI(systemPrompt, userPrompt);
		return safeParseDesign(response, prompt);
	} catch (error: any) {
		console.error('Error generating UI:', error);
		// Fallback to mock design on error
		return createMockDesign(prompt);
	}
};

/**
 * Refine specific design element using Claude AI
 */
export const refineDesign = async (instruction: RefinementInstruction, context: any): Promise<any> => {
	// If no API key, return mock refinement
	if (!hasApiKey()) {
		console.warn('No API key found. Refinement not available in demo mode.');
		return null;
	}

	try {
		const systemPrompt = 'You are an expert UI designer. Refine UI elements based on user instructions.';
		const userPrompt = formatRefinementPrompt(
			instruction.instruction,
			instruction.targetObjectId ? context.objects.find((o: any) => o.id === instruction.targetObjectId) : null,
			context,
		);

		const response = await callClaudeAPI(systemPrompt, userPrompt);
		return parseAndValidateDesign(response);
	} catch (error: any) {
		console.error('Error refining design:', error);
		return null;
	}
};

/**
 * Generate style variations of a design
 */
export const generateStyleVariations = async (request: StyleVariationRequest): Promise<GeneratedDesign[]> => {
	// If no API key, return empty array
	if (!hasApiKey()) {
		console.warn('No API key found. Style variations not available in demo mode.');
		return [];
	}

	try {
		const systemPrompt = 'You are an expert UI designer. Create visual style variations while maintaining layout.';
		const userPrompt = formatStyleVariationPrompt(request.design, request.count);

		const response = await callClaudeAPI(systemPrompt, userPrompt);
		const parsed = JSON.parse(response);

		if (Array.isArray(parsed)) {
			return parsed.map(design => {
				try {
					return parseAndValidateDesign(JSON.stringify(design));
				} catch {
					return createMockDesign('Style variation');
				}
			});
		}

		return [];
	} catch (error: any) {
		console.error('Error generating style variations:', error);
		return [];
	}
};

/**
 * Extract color palette from image
 */
export const extractColorPalette = async (imageBase64: string): Promise<string[]> => {
	// If no API key, return default palette
	if (!hasApiKey()) {
		console.warn('No API key found. Color extraction not available in demo mode.');
		return ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
	}

	try {
		const apiKey = getApiKey();
		if (!apiKey) {
			throw new Error('API key not configured');
		}

		const Anthropic = (await import('@anthropic-ai/sdk')).default;
		const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

		const message = await client.messages.create({
			model: 'claude-3-5-sonnet-20241022',
			max_tokens: 1024,
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'image',
							source: {
								type: 'base64',
								media_type: 'image/jpeg',
								data: imageBase64,
							},
						},
						{
							type: 'text',
							text: 'Extract a cohesive color palette of 5-7 colors from this image suitable for UI design. Return only a JSON array of hex color codes.',
						},
					],
				},
			],
		});

		const content = message.content[0];
		if (content.type === 'text') {
			const parsed = JSON.parse(content.text);
			if (Array.isArray(parsed)) {
				return parsed;
			}
			if (parsed.colors && Array.isArray(parsed.colors)) {
				return parsed.colors;
			}
		}

		return ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
	} catch (error: any) {
		console.error('Error extracting colors:', error);
		return ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
	}
};

/**
 * Check if AI features are available
 */
export const isAIAvailable = (): boolean => {
	return hasApiKey();
};
