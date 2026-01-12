import { z } from 'zod';

const envSchema = z.object({
	ANTHROPIC_API_KEY: z.string().optional(),
	VITE_DEBUG_MODE: z
		.string()
		.transform((v) => v === 'true')
		.default('false'),
	VITE_MOCK_AI_RESPONSES: z
		.string()
		.transform((v) => v === 'true')
		.default('true'),
});

export const env = envSchema.parse({
	ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY,
	VITE_DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
	VITE_MOCK_AI_RESPONSES: import.meta.env.VITE_MOCK_AI_RESPONSES,
});
