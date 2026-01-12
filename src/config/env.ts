import { z } from 'zod';

// Environment variable schema
// Note: Vite requires VITE_ prefix for client-side env vars
const envSchema = z.object({
	ANTHROPIC_API_KEY: z.string().optional(),
	VITE_DEBUG_MODE: z
		.string()
		.transform(v => v === 'true')
		.default('false'),
	VITE_MOCK_AI_RESPONSES: z
		.string()
		.transform(v => v === 'true')
		.default('true'),
});

export const env = envSchema.parse({
	// Vite env vars are prefixed with VITE_ but we store without prefix
	ANTHROPIC_API_KEY:
		typeof process !== 'undefined'
			? process.env.VITE_ANTHROPIC_API_KEY
			: (window as any)?.ENV?.VITE_ANTHROPIC_API_KEY,
	VITE_DEBUG_MODE:
		typeof process !== 'undefined' ? process.env.VITE_DEBUG_MODE : (window as any)?.ENV?.VITE_DEBUG_MODE,
	VITE_MOCK_AI_RESPONSES:
		typeof process !== 'undefined'
			? process.env.VITE_MOCK_AI_RESPONSES
			: (window as any)?.ENV?.VITE_MOCK_AI_RESPONSES,
});
