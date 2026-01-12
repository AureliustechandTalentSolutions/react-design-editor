import { z } from 'zod';

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
