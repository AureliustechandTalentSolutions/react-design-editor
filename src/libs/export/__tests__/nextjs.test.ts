import { describe, it, expect } from 'vitest';

import { exportNextJS } from '../nextjs';

describe('Next.js Export', () => {
	const mockDesign = {
		metadata: {
			screenName: 'test-page',
		},
		design: {
			objects: [
				{
					type: 'text',
					text: 'Hello World',
					fontSize: 24,
					fill: '#000000',
				},
				{
					type: 'rect',
					width: 200,
					height: 100,
					fill: '#3b82f6',
				},
			],
		},
	};

	describe('exportNextJS', () => {
		it('should export Next.js App Router component with TypeScript', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			expect(result.files).toBeDefined();
			expect(result.files.length).toBeGreaterThan(0);
			expect(result.dependencies).toHaveProperty('next');
			expect(result.dependencies).toHaveProperty('react');
		});

		it('should create page.tsx file', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			const pageFile = result.files.find(file => file.path === 'app/page.tsx');
			expect(pageFile).toBeDefined();
			expect(pageFile?.content).toContain('export default function');
		});

		it('should create layout.tsx file', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			const layoutFile = result.files.find(file => file.path === 'app/layout.tsx');
			expect(layoutFile).toBeDefined();
			expect(layoutFile?.content).toContain('RootLayout');
			expect(layoutFile?.content).toContain('metadata');
		});

		it('should include loading component for Tailwind', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			const loadingFile = result.files.find(file => file.path === 'app/loading.tsx');
			expect(loadingFile).toBeDefined();
			expect(loadingFile?.content).toContain('Loading');
		});

		it('should include error component for Tailwind', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			const errorFile = result.files.find(file => file.path === 'app/error.tsx');
			expect(errorFile).toBeDefined();
			expect(errorFile?.content).toContain('Error');
			expect(errorFile?.content).toContain("'use client'");
		});

		it('should use Tailwind classes when specified', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			const pageFile = result.files.find(file => file.path === 'app/page.tsx');
			expect(pageFile?.content).toContain('className=');
			expect(pageFile?.content).toContain('container');
		});

		it('should include Tailwind dependencies', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			expect(result.dependencies).toHaveProperty('tailwindcss');
			expect(result.dependencies).toHaveProperty('autoprefixer');
			expect(result.dependencies).toHaveProperty('postcss');
		});

		it('should create CSS file when using css styling', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'css',
				typescript: true,
				includeResponsive: true,
			});

			const cssFile = result.files.find(file => file.path === 'app/globals.css');
			expect(cssFile).toBeDefined();
			expect(cssFile?.language).toBe('css');
		});

		it('should create CSS module when using css-modules', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'css-modules',
				typescript: true,
				includeResponsive: true,
			});

			const moduleFile = result.files.find(file => file.path.endsWith('.module.css'));
			expect(moduleFile).toBeDefined();
			expect(moduleFile?.language).toBe('css');
		});

		it('should include styled-components dependency when used', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'styled-components',
				typescript: true,
				includeResponsive: true,
			});

			expect(result.dependencies).toHaveProperty('styled-components');
			const pageFile = result.files.find(file => file.path === 'app/page.tsx');
			expect(pageFile?.content).toContain('styled');
		});

		it('should support JavaScript when typescript is false', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: false,
				includeResponsive: true,
			});

			const pageFile = result.files.find(file => file.path === 'app/page.jsx');
			expect(pageFile).toBeDefined();
		});

		it('should add client directive for interactive components', () => {
			const interactiveDesign = {
				metadata: { screenName: 'interactive' },
				design: {
					objects: [
						{
							type: 'rect',
							interactive: true,
							onClick: true,
						},
					],
				},
			};

			const result = exportNextJS(interactiveDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			const pageFile = result.files.find(file => file.path === 'app/page.tsx');
			expect(pageFile?.content).toContain("'use client'");
		});

		it('should handle empty objects array', () => {
			const emptyDesign = {
				metadata: { screenName: 'empty' },
				design: { objects: [] },
			};

			const result = exportNextJS(emptyDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			expect(result.files.length).toBeGreaterThan(0);
			const pageFile = result.files.find(file => file.path === 'app/page.tsx');
			expect(pageFile).toBeDefined();
		});

		it('should include instructions', () => {
			const result = exportNextJS(mockDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			expect(result.instructions).toBeDefined();
			expect(result.instructions).toContain('Next.js');
		});

		it('should handle nested objects', () => {
			const nestedDesign = {
				metadata: { screenName: 'nested' },
				design: {
					objects: [
						{
							type: 'group',
							objects: [
								{ type: 'text', text: 'Nested Text' },
								{ type: 'rect', width: 100, height: 50 },
							],
						},
					],
				},
			};

			const result = exportNextJS(nestedDesign, {
				framework: 'nextjs',
				styling: 'tailwind',
				typescript: true,
				includeResponsive: true,
			});

			const pageFile = result.files.find(file => file.path === 'app/page.tsx');
			expect(pageFile?.content).toContain('Nested Text');
		});
	});
});
