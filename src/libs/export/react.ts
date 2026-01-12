/**
 * React/Next.js Code Export
 * Convert Fabric.js designs to React components
 */

import { ExportedCode, ExportOptions } from '../../types/aiui';
import { cssObjectToString, fabricToCSS, fabricToTailwind, formatCode, generateId, kebabToPascal } from './utils';

/**
 * Generate React component from Fabric.js objects
 */
const generateReactComponent = (
	objects: any[],
	options: ExportOptions,
	componentName: string
): string => {
	const { styling, typescript, includeResponsive } = options;
	const useTailwind = styling === 'tailwind';
	const useStyledComponents = styling === 'styled-components';
	const useCSSModules = styling === 'css-modules';

	let imports = [`import React from 'react';`];
	if (useStyledComponents) {
		imports.push(`import styled from 'styled-components';`);
	}
	if (useCSSModules) {
		imports.push(`import styles from './${componentName}.module.css';`);
	}

	const renderObject = (obj: any, index: number): string => {
		const id = generateId('el');
		
		if (obj.type === 'text') {
			const className = useTailwind
				? fabricToTailwind(obj).join(' ')
				: useCSSModules
				? `styles.text_${index}`
				: useStyledComponents
				? ''
				: `text_${index}`;

			const element = `<div ${className ? `className="${className}"` : ''}>${obj.text || 'Text'}</div>`;
			return useStyledComponents
				? `<StyledText_${index}>${obj.text || 'Text'}</StyledText_${index}>`
				: element;
		}

		if (obj.type === 'rect' || obj.type === 'group') {
			const className = useTailwind
				? fabricToTailwind(obj).join(' ')
				: useCSSModules
				? `styles.box_${index}`
				: useStyledComponents
				? ''
				: `box_${index}`;

			const children = obj.objects
				? obj.objects.map((child: any, i: number) => renderObject(child, i)).join('\n      ')
				: '';

			const element = children
				? `<div ${className ? `className="${className}"` : ''}>\n      ${children}\n    </div>`
				: `<div ${className ? `className="${className}"` : ''} />`;

			return useStyledComponents && !children
				? `<StyledBox_${index} />`
				: useStyledComponents
				? `<StyledBox_${index}>\n      ${children}\n    </StyledBox_${index}>`
				: element;
		}

		return '';
	};

	const elements = objects.map((obj, index) => renderObject(obj, index)).join('\n    ');

	const propsType = typescript ? ': React.FC' : '';
	const component = `
${imports.join('\n')}

const ${componentName}${propsType} = () => {
  return (
    <div className="${useTailwind ? 'container mx-auto' : useCSSModules ? 'styles.container' : 'container'}">
      ${elements}
    </div>
  );
};

export default ${componentName};
`;

	return formatCode(component);
};

/**
 * Generate CSS for React component
 */
const generateCSS = (objects: any[], styling: string): string => {
	if (styling === 'tailwind' || styling === 'styled-components') {
		return '';
	}

	const generateObjectCSS = (obj: any, index: number): string => {
		const css = fabricToCSS(obj);
		const selector = obj.type === 'text' ? `.text_${index}` : `.box_${index}`;
		return `${selector} {\n${cssObjectToString(css)}\n}\n`;
	};

	const cssRules = objects.map((obj, index) => generateObjectCSS(obj, index)).join('\n');

	return `.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n${cssRules}`;
};

/**
 * Generate styled-components definitions
 */
const generateStyledComponents = (objects: any[]): string => {
	const generateStyledComponent = (obj: any, index: number): string => {
		const css = fabricToCSS(obj);
		const cssString = Object.entries(css)
			.map(([key, value]) => `  ${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
			.join('\n');

		const tag = obj.type === 'text' ? 'div' : 'div';
		return `const StyledText_${index} = styled.${tag}\`\n${cssString}\n\`;\n`;
	};

	return objects.map((obj, index) => generateStyledComponent(obj, index)).join('\n');
};

/**
 * Export design as React code
 */
export const exportReact = (design: any, options: ExportOptions): ExportedCode => {
	const componentName = kebabToPascal(design.metadata?.screenName || 'GeneratedComponent');
	const objects = design.design?.objects || [];

	const files: ExportedCode['files'] = [];

	// Main component file
	const ext = options.typescript ? 'tsx' : 'jsx';
	let componentCode = generateReactComponent(objects, options, componentName);

	if (options.styling === 'styled-components') {
		const styledDefs = generateStyledComponents(objects);
		componentCode = componentCode.replace(
			`import styled from 'styled-components';`,
			`import styled from 'styled-components';\n\n${styledDefs}`
		);
	}

	files.push({
		path: `${componentName}.${ext}`,
		content: componentCode,
		language: 'typescript',
	});

	// Style file
	if (options.styling === 'css') {
		files.push({
			path: `${componentName}.css`,
			content: generateCSS(objects, options.styling),
			language: 'css',
		});
	} else if (options.styling === 'css-modules') {
		files.push({
			path: `${componentName}.module.css`,
			content: generateCSS(objects, options.styling),
			language: 'css',
		});
	}

	const dependencies: Record<string, string> = {
		react: '^18.0.0',
		'react-dom': '^18.0.0',
	};

	if (options.framework === 'nextjs') {
		dependencies.next = '^14.0.0';
	}
	if (options.styling === 'styled-components') {
		dependencies['styled-components'] = '^6.0.0';
	}
	if (options.styling === 'tailwind') {
		dependencies.tailwindcss = '^3.0.0';
	}

	return {
		files,
		dependencies,
		instructions: options.styling === 'tailwind'
			? 'Make sure to configure Tailwind CSS in your project.'
			: undefined,
	};
};
