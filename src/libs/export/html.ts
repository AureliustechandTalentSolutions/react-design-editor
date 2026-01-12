/**
 * HTML/CSS Code Export
 * Convert Fabric.js designs to semantic HTML and CSS
 */

import { ExportedCode, ExportOptions } from '../../types/aiui';
import { cssObjectToString, fabricToCSS, formatCode, generateId, kebabToCamel } from './utils';

/**
 * Generate HTML from Fabric.js objects
 */
const generateHTML = (objects: any[], componentName: string): string => {
	const renderObject = (obj: any, index: number): string => {
		const id = generateId('el');
		const className = obj.type === 'text' ? `text-${index}` : `box-${index}`;

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

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${componentName}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    ${elements}
  </div>
</body>
</html>`;
};

/**
 * Generate CSS from Fabric.js objects
 */
const generateHTMLCSS = (objects: any[]): string => {
	const generateObjectCSS = (obj: any, index: number): string => {
		const css = fabricToCSS(obj);
		const selector = obj.type === 'text' ? `.text-${index}` : `.box-${index}`;
		return `${selector} {\n${cssObjectToString(css)}\n}\n`;
	};

	const objectStyles = objects.map((obj, index) => generateObjectCSS(obj, index)).join('\n');

	return `/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Component styles */
${objectStyles}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
}
`;
};

/**
 * Export design as HTML code
 */
export const exportHTML = (design: any, options: ExportOptions): ExportedCode => {
	const componentName = kebabToCamel(design.metadata?.screenName || 'generated-page');
	const objects = design.design?.objects || [];

	const htmlCode = generateHTML(objects, componentName);
	const cssCode = generateHTMLCSS(objects);

	const files: ExportedCode['files'] = [
		{
			path: 'index.html',
			content: formatCode(htmlCode),
			language: 'html',
		},
		{
			path: 'styles.css',
			content: formatCode(cssCode),
			language: 'css',
		},
	];

	return {
		files,
		dependencies: {},
		instructions: 'Open index.html in a web browser to view your design.',
	};
};
