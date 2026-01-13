import { describe, it, expect } from 'vitest';
import { USWDS_COMPONENT_CATALOG, generateUSWDSImport } from '../components';

describe('USWDS Component Catalog', () => {
	it('should have all required component categories', () => {
		expect(USWDS_COMPONENT_CATALOG).toHaveProperty('layout');
		expect(USWDS_COMPONENT_CATALOG).toHaveProperty('forms');
		expect(USWDS_COMPONENT_CATALOG).toHaveProperty('navigation');
		expect(USWDS_COMPONENT_CATALOG).toHaveProperty('components');
	});

	it('should have Button component with correct props', () => {
		const button = USWDS_COMPONENT_CATALOG.forms.Button;
		expect(button.import).toBe('Button');
		expect(button.props).toContain('type');
		expect(button.props).toContain('disabled');
	});

	it('should generate correct import statement', () => {
		const importStatement = generateUSWDSImport(['Button', 'TextInput', 'Button']);
		expect(importStatement).toContain('import { Button, TextInput }');
		expect(importStatement).toContain('@trussworks/react-uswds');
		// Should dedupe Button
		expect(importStatement.match(/Button/g)?.length).toBe(1);
	});

	it('should include CSS import', () => {
		const importStatement = generateUSWDSImport(['Button']);
		expect(importStatement).toContain("import '@trussworks/react-uswds/lib/uswds.css'");
	});

	it('should handle empty component array', () => {
		const importStatement = generateUSWDSImport([]);
		expect(importStatement).toContain('import {  }');

import {
	uswdsComponents,
	getComponentsByCategory,
	getComponentByName,
	generateUSWDSImport,
	getAllComponentNames,
	getComponentCount,
	USWDSComponent,
} from '../components';

describe('USWDS Components', () => {
	describe('Component Catalog', () => {
		it('should have 40+ components', () => {
			expect(uswdsComponents.length).toBeGreaterThanOrEqual(40);
		});

		it('should have components in all categories', () => {
			const categories = ['layout', 'forms', 'navigation', 'components'];
			categories.forEach(category => {
				const components = uswdsComponents.filter(c => c.category === (category as USWDSComponent['category']));
				expect(components.length).toBeGreaterThan(0);
			});
		});

		it('should have valid component structure', () => {
			uswdsComponents.forEach(component => {
				expect(component).toHaveProperty('name');
				expect(component).toHaveProperty('importName');
				expect(component).toHaveProperty('category');
				expect(component).toHaveProperty('props');
				expect(component).toHaveProperty('description');
				expect(component.props).toBeInstanceOf(Array);
			});
		});
	});

	describe('getComponentsByCategory', () => {
		it('should return layout components', () => {
			const layoutComponents = getComponentsByCategory('layout');
			expect(layoutComponents.length).toBeGreaterThan(0);
			layoutComponents.forEach(component => {
				expect(component.category).toBe('layout');
			});
		});

		it('should return form components', () => {
			const formComponents = getComponentsByCategory('forms');
			expect(formComponents.length).toBeGreaterThan(0);
			formComponents.forEach(component => {
				expect(component.category).toBe('forms');
			});
		});

		it('should return navigation components', () => {
			const navComponents = getComponentsByCategory('navigation');
			expect(navComponents.length).toBeGreaterThan(0);
			navComponents.forEach(component => {
				expect(component.category).toBe('navigation');
			});
		});

		it('should return UI components', () => {
			const uiComponents = getComponentsByCategory('components');
			expect(uiComponents.length).toBeGreaterThan(0);
			uiComponents.forEach(component => {
				expect(component.category).toBe('components');
			});
		});
	});

	describe('getComponentByName', () => {
		it('should find Button component', () => {
			const button = getComponentByName('Button');
			expect(button).toBeDefined();
			expect(button?.name).toBe('Button');
			expect(button?.category).toBe('forms');
		});

		it('should find Alert component', () => {
			const alert = getComponentByName('Alert');
			expect(alert).toBeDefined();
			expect(alert?.name).toBe('Alert');
			expect(alert?.category).toBe('components');
		});

		it('should return undefined for non-existent component', () => {
			const component = getComponentByName('NonExistentComponent');
			expect(component).toBeUndefined();
		});
	});

	describe('generateUSWDSImport', () => {
		it('should generate import statement for single component', () => {
			const importStatement = generateUSWDSImport(['Button']);
			expect(importStatement).toBe("import { Button } from '@trussworks/react-uswds';");
		});

		it('should generate import statement for multiple components', () => {
			const importStatement = generateUSWDSImport(['Button', 'Alert', 'Card']);
			expect(importStatement).toBe("import { Alert, Button, Card } from '@trussworks/react-uswds';");
		});

		it('should handle empty array', () => {
			const importStatement = generateUSWDSImport([]);
			expect(importStatement).toBe('');
		});

		it('should remove duplicates and sort', () => {
			const importStatement = generateUSWDSImport(['Button', 'Alert', 'Button', 'Card']);
			expect(importStatement).toBe("import { Alert, Button, Card } from '@trussworks/react-uswds';");
		});
	});

	describe('getAllComponentNames', () => {
		it('should return all component names', () => {
			const names = getAllComponentNames();
			expect(names.length).toBe(uswdsComponents.length);
			expect(names).toContain('Button');
			expect(names).toContain('Alert');
			expect(names).toContain('Card');
		});
	});

	describe('getComponentCount', () => {
		it('should return correct component count', () => {
			const count = getComponentCount();
			expect(count).toBe(uswdsComponents.length);
			expect(count).toBeGreaterThanOrEqual(40);
		});
	});

	describe('Component Properties', () => {
		it('Button should have required props', () => {
			const button = getComponentByName('Button');
			expect(button?.props).toContain('type');
			expect(button?.props).toContain('onClick');
			expect(button?.props).toContain('disabled');
		});

		it('TextInput should have required props', () => {
			const input = getComponentByName('TextInput');
			expect(input?.props).toContain('id');
			expect(input?.props).toContain('name');
			expect(input?.props).toContain('type');
			expect(input?.props).toContain('value');
		});

		it('Alert should have required props', () => {
			const alert = getComponentByName('Alert');
			expect(alert?.props).toContain('type');
			expect(alert?.props).toContain('heading');
		});
	});
});
