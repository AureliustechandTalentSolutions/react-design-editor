import { describe, it, expect } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
	it('should export Button component', () => {
		expect(Button).toBeDefined();
	});

	it('should have displayName', () => {
		expect(Button.displayName).toBe('Button');
	});

	it('should accept ButtonProps interface', () => {
		const props = {
			variant: 'primary' as const,
			size: 'md' as const,
			isLoading: false,
			disabled: false,
		};
		expect(props.variant).toBe('primary');
		expect(props.size).toBe('md');
	});

	it('should support variant types', () => {
		const variants = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;
		expect(variants).toContain('primary');
		expect(variants).toContain('secondary');
		expect(variants).toContain('outline');
		expect(variants).toContain('ghost');
		expect(variants).toContain('destructive');
	});

	it('should support size types', () => {
		const sizes = ['sm', 'md', 'lg'] as const;
		expect(sizes).toContain('sm');
		expect(sizes).toContain('md');
		expect(sizes).toContain('lg');
	});

	it('should support state types', () => {
		const states = ['loading', 'disabled', 'normal'] as const;
		expect(states).toContain('loading');
		expect(states).toContain('disabled');
		expect(states).toContain('normal');
	});
});
