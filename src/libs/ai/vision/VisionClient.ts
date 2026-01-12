/**
 * Vision API Client
 * Handles communication with Claude Vision API for screenshot analysis
 */

import {
	ImageData,
	VisionModel,
	VisionRequestOptions,
	VisionResponse,
	VisionError,
	VisionErrorType,
	RateLimitConfig,
	ScreenshotAnalysis,
} from './types';
import { UI_ANALYSIS_SYSTEM_PROMPT, getElementExtractionPrompt } from './prompts';

/**
 * Default rate limiting configuration
 */
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
	maxRequestsPerMinute: 5,
	maxRequestsPerHour: 50,
	retryAttempts: 3,
	retryDelay: 1000,
};

/**
 * Request tracking for rate limiting
 */
class RateLimiter {
	private requestTimestamps: number[] = [];
	private config: RateLimitConfig;

	constructor(config: RateLimitConfig = DEFAULT_RATE_LIMIT) {
		this.config = config;
	}

	/**
	 * Check if request can be made
	 */
	canMakeRequest(): boolean {
		const now = Date.now();
		const oneMinuteAgo = now - 60 * 1000;
		const oneHourAgo = now - 60 * 60 * 1000;

		// Clean old timestamps
		this.requestTimestamps = this.requestTimestamps.filter(ts => ts > oneHourAgo);

		const recentRequests = this.requestTimestamps.filter(ts => ts > oneMinuteAgo).length;
		const hourlyRequests = this.requestTimestamps.length;

		return (
			recentRequests < this.config.maxRequestsPerMinute &&
			hourlyRequests < this.config.maxRequestsPerHour
		);
	}

	/**
	 * Record a request
	 */
	recordRequest(): void {
		this.requestTimestamps.push(Date.now());
	}

	/**
	 * Get time until next available slot
	 */
	getWaitTime(): number {
		if (this.canMakeRequest()) return 0;

		const now = Date.now();
		const oneMinuteAgo = now - 60 * 1000;
		const recentRequests = this.requestTimestamps.filter(ts => ts > oneMinuteAgo);

		if (recentRequests.length >= this.config.maxRequestsPerMinute) {
			const oldestRecent = Math.min(...recentRequests);
			return oldestRecent + 60 * 1000 - now;
		}

		return 60 * 1000;
	}
}

/**
 * Vision API Client
 */
export class VisionClient {
	private rateLimiter: RateLimiter;
	private apiKey?: string;

	constructor(apiKey?: string, rateLimitConfig?: RateLimitConfig) {
		this.apiKey = apiKey || this.getApiKeyFromEnv();
		this.rateLimiter = new RateLimiter(rateLimitConfig);
	}

	/**
	 * Get API key from environment
	 */
	private getApiKeyFromEnv(): string | undefined {
		return process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;
	}

	/**
	 * Check if API is available
	 */
	isAvailable(): boolean {
		return !!this.apiKey;
	}

	/**
	 * Analyze screenshot with Vision API
	 */
	async analyzeScreenshot(
		imageData: ImageData,
		options: VisionRequestOptions = {}
	): Promise<VisionResponse> {
		if (!this.apiKey) {
			throw new VisionError(
				VisionErrorType.API_ERROR,
				'API key not configured. Set ANTHROPIC_API_KEY environment variable.'
			);
		}

		// Check rate limits
		if (!this.rateLimiter.canMakeRequest()) {
			const waitTime = this.rateLimiter.getWaitTime();
			throw new VisionError(
				VisionErrorType.RATE_LIMIT,
				`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`,
				{ waitTime }
			);
		}

		const {
			model = 'claude-3-5-sonnet-20241022',
			maxTokens = 4096,
			extractColors = true,
			extractText = true,
			detectComponents = true,
		} = options;

		const startTime = Date.now();

		try {
			// Dynamic import to avoid bundling issues
			const Anthropic = (await import('@anthropic-ai/sdk')).default;
			const client = new Anthropic({
				apiKey: this.apiKey,
				dangerouslyAllowBrowser: true, // For demo purposes
			});

			const userPrompt = getElementExtractionPrompt({
				detectText: extractText,
				extractColors,
			});

			const message = await client.messages.create({
				model,
				max_tokens: maxTokens,
				system: UI_ANALYSIS_SYSTEM_PROMPT,
				messages: [
					{
						role: 'user',
						content: [
							{
								type: 'image',
								source: {
									type: 'base64',
									media_type: imageData.format,
									data: imageData.base64,
								},
							},
							{
								type: 'text',
								text: userPrompt,
							},
						],
					},
				],
			});

			this.rateLimiter.recordRequest();

			const content = message.content[0];
			if (content.type !== 'text') {
				throw new VisionError(
					VisionErrorType.API_ERROR,
					'Unexpected response format from Claude API'
				);
			}

			const analysis = this.parseAnalysisResponse(content.text, imageData);
			const processingTime = Date.now() - startTime;

			return {
				analysis,
				rawResponse: content.text,
				metadata: {
					model,
					tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
					processingTime,
				},
			};
		} catch (error: any) {
			if (error instanceof VisionError) {
				throw error;
			}

			// Handle API errors with retry logic
			if (error.status === 429) {
				throw new VisionError(
					VisionErrorType.RATE_LIMIT,
					'API rate limit exceeded',
					error
				);
			}

			throw new VisionError(
				VisionErrorType.API_ERROR,
				`Failed to analyze screenshot: ${error.message}`,
				error
			);
		}
	}

	/**
	 * Parse Claude response into structured analysis
	 */
	private parseAnalysisResponse(response: string, imageData: ImageData): ScreenshotAnalysis {
		try {
			// Extract JSON from response
			let jsonStr = response.trim();
			
			// Remove markdown code blocks if present
			const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
			if (jsonMatch) {
				jsonStr = jsonMatch[1];
			}

			// Try to find JSON object
			const objectMatch = jsonStr.match(/\{[\s\S]*\}/);
			if (objectMatch) {
				jsonStr = objectMatch[0];
			}

			const parsed = JSON.parse(jsonStr);

			// Validate and normalize structure
			return {
				elements: parsed.elements || [],
				colors: parsed.colors || [],
				layout: parsed.layout || { type: 'flex', direction: 'column' },
				typography: parsed.typography || { fonts: [], sizes: [] },
				dimensions: parsed.dimensions || {
					width: imageData.width,
					height: imageData.height,
				},
			};
		} catch (error) {
			throw new VisionError(
				VisionErrorType.API_ERROR,
				'Failed to parse API response',
				error
			);
		}
	}

	/**
	 * Retry logic for failed requests
	 */
	async retryRequest<T>(
		fn: () => Promise<T>,
		attempts: number = DEFAULT_RATE_LIMIT.retryAttempts
	): Promise<T> {
		let lastError: Error;

		for (let i = 0; i < attempts; i++) {
			try {
				return await fn();
			} catch (error: any) {
				lastError = error;

				// Don't retry on certain errors
				if (
					error instanceof VisionError &&
					(error.type === VisionErrorType.INVALID_IMAGE ||
						error.type === VisionErrorType.UNSUPPORTED_FORMAT)
				) {
					throw error;
				}

				// Wait before retry
				if (i < attempts - 1) {
					await this.delay(DEFAULT_RATE_LIMIT.retryDelay * Math.pow(2, i));
				}
			}
		}

		throw lastError!;
	}

	/**
	 * Delay helper
	 */
	private delay(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	/**
	 * Extract colors from image
	 */
	async extractColors(imageData: ImageData): Promise<string[]> {
		const response = await this.analyzeScreenshot(imageData, {
			extractColors: true,
			extractText: false,
			detectComponents: false,
		});

		return response.analysis.colors;
	}

	/**
	 * Get rate limit status
	 */
	getRateLimitStatus(): {
		canMakeRequest: boolean;
		waitTime: number;
	} {
		return {
			canMakeRequest: this.rateLimiter.canMakeRequest(),
			waitTime: this.rateLimiter.getWaitTime(),
		};
	}
}

/**
 * Create a singleton instance
 */
let defaultClient: VisionClient | null = null;

/**
 * Get default client instance
 */
export const getVisionClient = (): VisionClient => {
	if (!defaultClient) {
		defaultClient = new VisionClient();
	}
	return defaultClient;
};

/**
 * Check if Vision API is available
 */
export const isVisionAPIAvailable = (): boolean => {
	return getVisionClient().isAvailable();
};
