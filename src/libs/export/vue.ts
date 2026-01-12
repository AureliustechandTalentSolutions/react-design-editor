/**
 * Vue 3 Code Export
 * Convert Fabric.js designs to Vue components
 */

import { ExportedCode, ExportOptions } from '../../types/aiui';

import { cssObjectToString, fabricToCSS, fabricToTailwind, formatCode, generateId, kebabToPascal } from './utils';

/**
 * Generate Vue component from Fabric.js objects
 */
const generateVueComponent = (objects: any[], options: ExportOptions, componentName: string): string => {
	const { styling, typescript } = options;
	const useTailwind = styling === 'tailwind';

	const renderObject = (obj: any, index: number): string => {
		const id = generateId('el');
		const className = useTailwind ? fabricToTailwind(obj).join(' ') : `element-${index}`;

		if (obj.type === 'text') {
			return `<div class="${className}">${obj.text || 'Text'}</div>`;
		}

		if (obj.type === 'rect' || obj.type === 'group') {
			const children = obj.objects
				? obj.objects.map((child: any, i: number) => renderObject(child, i)).join('\n      ')
				: '';

			return children
				? `<div class="${className}">\n      ${children}\n    </div>`
				: `<div class="${className}"></div>`;
		}

		return '';
	};

	const elements = objects.map((obj, index) => renderObject(obj, index)).join('\n    ');

	const scriptLang = typescript ? ' lang="ts"' : '';
	const component = `<template>
  <div class="container">
    ${elements}
  </div>
</template>

<script${scriptLang}>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '${componentName}',
  setup() {
    return {};
  },
});
</script>

<style${styling === 'css-modules' ? ' module' : ''} scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

${styling !== 'tailwind' ? generateVueCSS(objects) : ''}
</style>
`;

	return formatCode(component);
};

/**
 * Generate CSS for Vue component
 */
const generateVueCSS = (objects: any[]): string => {
	const generateObjectCSS = (obj: any, index: number): string => {
		const css = fabricToCSS(obj);
		const selector = `.element-${index}`;
		return `${selector} {\n${cssObjectToString(css)}\n}\n`;
	};

	return objects.map((obj, index) => generateObjectCSS(obj, index)).join('\n');
};

/**
 * Export design as Vue code
 */
export const exportVue = (design: any, options: ExportOptions): ExportedCode => {
	const componentName = kebabToPascal(design.metadata?.screenName || 'GeneratedComponent');
	const objects = design.design?.objects || [];

	const ext = options.typescript ? 'vue' : 'vue';
	const componentCode = generateVueComponent(objects, options, componentName);

	const files: ExportedCode['files'] = [
		{
			path: `${componentName}.${ext}`,
			content: componentCode,
			language: 'vue',
		},
	];

	const dependencies: Record<string, string> = {
		vue: '^3.0.0',
	};

	if (options.styling === 'tailwind') {
		dependencies.tailwindcss = '^3.0.0';
	}

	return {
		files,
		dependencies,
		instructions: 'Import and use this component in your Vue 3 application.',
	};
};
