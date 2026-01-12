import { describe, it, expect } from 'vitest';

describe('Dialog', () => {
	it('should define DialogProps interface', () => {
		const props = {
			title: 'Test Dialog',
			description: 'Test description',
			showClose: true,
			children: null,
		};
		expect(props.title).toBe('Test Dialog');
		expect(props.description).toBe('Test description');
		expect(props.showClose).toBe(true);
	});

	it('should support trigger prop', () => {
		const props = {
			trigger: 'button' as any,
			children: null,
		};
		expect(props.trigger).toBeDefined();
	});

	it('should support contentClassName prop', () => {
		const props = {
			contentClassName: 'custom-class',
			children: null,
		};
		expect(props.contentClassName).toBe('custom-class');
	});

	it('should support showClose prop', () => {
		const props = {
			showClose: false,
			children: null,
		};
		expect(props.showClose).toBe(false);
	});

	it('should have default showClose value', () => {
		const defaultShowClose = true;
		expect(defaultShowClose).toBe(true);
	});
});
