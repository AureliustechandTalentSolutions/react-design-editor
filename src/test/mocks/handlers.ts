import { http, HttpResponse } from 'msw';
import { mockGeneratedDesign } from './mockData';

export const handlers = [
	http.post('https://api.anthropic.com/v1/messages', () => {
		return HttpResponse.json({
			content: [{ type: 'text', text: JSON.stringify(mockGeneratedDesign) }],
		});
	}),
];
