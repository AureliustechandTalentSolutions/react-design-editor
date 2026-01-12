/**
 * Screenshot-to-Code Engine
 * Uses Claude Vision API to analyze screenshots and generate code
 */

/* eslint-disable no-use-before-define */

import { ScreenshotImportRequest, ConversionResult, AnalysisResult, DetectedElement, AnalysisOptions } from './types';

/**
 * Get API key from environment
 */
const getApiKey = (): string | undefined => {
	return process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;
};

/**
 * Check if API key is available
 */
const hasApiKey = (): boolean => {
	return !!getApiKey();
};

/**
 * Analyze screenshot using Claude Vision API
 */
export const analyzeScreenshot = async (imageBase64: string, options: AnalysisOptions): Promise<AnalysisResult> => {
	if (!hasApiKey()) {
		// Return mock analysis in demo mode
		return createMockAnalysis();
	}

	try {
		const apiKey = getApiKey();
		if (!apiKey) {
			throw new Error('API key not configured');
		}

		const Anthropic = (await import('@anthropic-ai/sdk')).default;
		const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

		const systemPrompt = `You are an expert UI/UX analyzer. Analyze the provided screenshot and extract:
1. All UI elements (buttons, inputs, cards, navigation, etc.) with their positions and properties
2. Color palette used in the design
3. Typography information (font families and sizes)
4. Layout structure
5. Accessibility considerations

Return a JSON object with this structure:
{
  "elements": [{"type": "button", "bounds": {"x": 0, "y": 0, "width": 100, "height": 40}, 
    "properties": {}, "text": "Click", "confidence": 0.95}],
  "colorPalette": ["#hex1", "#hex2"],
  "typography": {"fontFamilies": ["Inter", "Arial"], "fontSizes": [14, 16, 20]},
  "layout": {"type": "flex", "columns": 1},
  "accessibility": {"score": 85, "issues": []}
}`;

		const message = await client.messages.create({
			model: 'claude-3-5-sonnet-20241022',
			max_tokens: 4096,
			system: systemPrompt,
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'image',
							source: {
								type: 'base64',
								media_type: 'image/png',
								data: imageBase64,
							},
						},
						{
							type: 'text',
							text: `Analyze this UI screenshot and extract all elements, colors, typography, layout,
 and accessibility information. ${
		options.designSystem ? `Map elements to ${options.designSystem} design system components.` : ''
 }`,
						},
					],
				},
			],
		});

		const content = message.content[0];
		if (content.type === 'text') {
			const parsed = JSON.parse(content.text);
			return validateAnalysisResult(parsed);
		}

		throw new Error('Unexpected response format from Claude API');
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error analyzing screenshot:', error);
		}
		return createMockAnalysis();
	}
};

/**
 * Convert screenshot to code
 */
export const convertScreenshotToCode = async (request: ScreenshotImportRequest): Promise<ConversionResult> => {
	// First analyze the screenshot
	const analysis = await analyzeScreenshot(request.data, request.options);

	// Generate design from analysis
	const design = await generateDesignFromAnalysis(analysis, request.options);

	// Generate code based on framework and styling options
	const code = await generateCodeFromDesign(design, request.options);

	return {
		...design,
		analysis,
		code,
	};
};

/**
 * Generate design from analysis result
 */
const generateDesignFromAnalysis = async (
	analysis: AnalysisResult,
	options: ConversionOptions,
): Promise<{
	design: { objects: unknown[]; background?: string };
	styles: Record<string, unknown>;
	colorPalette: string[];
	metadata: { screenName: string; description: string; components: string[]; timestamp: number };
}> => {
	// Convert detected elements to Fabric.js objects
	const objects = analysis.elements.map((element: DetectedElement) => {
		return convertElementToFabricObject(element, options);
	});

	return {
		design: {
			objects,
			background: analysis.colorPalette[0] || '#ffffff',
		},
		styles: {},
		colorPalette: analysis.colorPalette,
		metadata: {
			screenName: 'Screenshot Import',
			description: 'Imported from screenshot',
			components: analysis.elements.map((e: DetectedElement) => e.type),
			timestamp: Date.now(),
		},
	};
};

/**
 * Convert detected element to Fabric.js object
 */
const convertElementToFabricObject = (
	element: DetectedElement,
	_options: ConversionOptions,
): Record<string, unknown> => {
	const { type, bounds, properties, text } = element;

	const baseObject: Record<string, unknown> = {
		id: `element-${Date.now()}-${Math.random()}`,
		type: mapElementTypeToFabricType(type),
		left: bounds.x,
		top: bounds.y,
		width: bounds.width,
		height: bounds.height,
		...properties,
	};

	// Add text-specific properties
	if (text && (type === 'text' || type === 'button' || type === 'label')) {
		return {
			...baseObject,
			type: 'textbox',
			text,
			fontSize: (properties.fontSize as number) || 16,
			fontFamily: (properties.fontFamily as string) || 'Arial',
			fill: (properties.color as string) || '#000000',
		};
	}

	return baseObject;
};

/**
 * Map element type to Fabric.js type
 */
const mapElementTypeToFabricType = (elementType: string): string => {
	const mapping: Record<string, string> = {
		button: 'rect',
		input: 'rect',
		card: 'rect',
		image: 'image',
		text: 'textbox',
		label: 'textbox',
		icon: 'circle',
		container: 'rect',
		navigation: 'rect',
	};

	return mapping[elementType] || 'rect';
};

/**
 * Generate code from design
 */
const generateCodeFromDesign = async (
	design: {
		design: { objects: unknown[]; background?: string };
		styles: Record<string, unknown>;
		colorPalette: string[];
		metadata: { screenName: string; description: string; components: string[]; timestamp: number };
	},
	options: ConversionOptions,
): Promise<{ files: { path: string; content: string; language: string }[]; dependencies: Record<string, string> }> => {
	// Import code generation functions
	const { exportReact } = await import('../export/react');

	// Generate code based on framework
	const exported = exportReact(design, {
		framework: options.framework,
		styling: options.styling || 'tailwind',
		typescript: options.typescript ?? true,
		includeResponsive: options.includeResponsive ?? true,
	});

	return {
		files: exported.files,
		dependencies: {
			...exported.dependencies,
			...(options.designSystem === 'uswds' && {
				'@trussworks/react-uswds': '^9.0.0',
			}),
		},
	};
};

/**
 * Validate analysis result structure
 */
const validateAnalysisResult = (result: unknown): AnalysisResult => {
	const res = result as {
		elements?: unknown[];
		colorPalette?: unknown[];
		typography?: { fontFamilies: string[]; fontSizes: number[] };
		layout?: { type: string };
		accessibility?: { score: number; issues: string[] };
	};

	return {
		elements: Array.isArray(res.elements) ? (res.elements as DetectedElement[]) : [],
		colorPalette: Array.isArray(res.colorPalette) ? (res.colorPalette as string[]) : [],
		typography: res.typography || { fontFamilies: [], fontSizes: [] },
		layout: res.layout || { type: 'flex' },
		accessibility: res.accessibility || { score: 0, issues: [] },
	};
};

/**
 * Create mock analysis for demo mode
 */
const createMockAnalysis = (): AnalysisResult => {
	return {
		elements: [
			{
				type: 'button',
				bounds: { x: 100, y: 100, width: 120, height: 40 },
				properties: {
					backgroundColor: '#3b82f6',
					color: '#ffffff',
					borderRadius: 8,
				},
				text: 'Submit',
				confidence: 0.95,
			},
			{
				type: 'input',
				bounds: { x: 100, y: 50, width: 200, height: 40 },
				properties: {
					backgroundColor: '#ffffff',
					border: '1px solid #d1d5db',
					borderRadius: 6,
				},
				text: '',
				confidence: 0.92,
			},
		],
		colorPalette: ['#3b82f6', '#ffffff', '#d1d5db', '#1f2937'],
		typography: {
			fontFamilies: ['Inter', 'Arial', 'sans-serif'],
			fontSizes: [14, 16, 20, 24],
		},
		layout: {
			type: 'flex',
			columns: 1,
		},
		accessibility: {
			score: 85,
			issues: ['Missing alt text on image', 'Low contrast ratio on button'],
		},
	};
};

/**
 * Check if screenshot-to-code features are available
 */
export const isScreenshotToCodeAvailable = (): boolean => {
	return hasApiKey();
};
