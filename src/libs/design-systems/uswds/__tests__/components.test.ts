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
	});
});
