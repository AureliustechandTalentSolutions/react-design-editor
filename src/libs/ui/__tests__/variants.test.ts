import { describe, it, expect } from 'vitest';
import { cn, buttonVariants, inputVariants, badgeVariants } from '../variants';

describe('variants', () => {
	describe('cn utility', () => {
		it('should merge class names', () => {
			const result = cn('foo', 'bar');
			expect(result).toBe('foo bar');
		});

		it('should handle conditional classes', () => {
			const result = cn('foo', false && 'bar', 'baz');
			expect(result).toBe('foo baz');
		});

		it('should merge Tailwind classes correctly', () => {
			const result = cn('px-2 py-1', 'px-4');
			expect(result).toBe('py-1 px-4');
		});

		it('should handle arrays of classes', () => {
			const result = cn(['foo', 'bar'], 'baz');
			expect(result).toBe('foo bar baz');
		});

		it('should handle objects with boolean values', () => {
			const result = cn({ foo: true, bar: false, baz: true });
			expect(result).toBe('foo baz');
		});
	});

	describe('buttonVariants', () => {
		it('should return default variant classes', () => {
			const result = buttonVariants();
			expect(result).toContain('inline-flex');
			expect(result).toContain('bg-blue-600');
		});

		it('should apply primary variant', () => {
			const result = buttonVariants({ variant: 'primary' });
			expect(result).toContain('bg-blue-600');
			expect(result).toContain('text-white');
		});

		it('should apply secondary variant', () => {
			const result = buttonVariants({ variant: 'secondary' });
			expect(result).toContain('bg-gray-200');
			expect(result).toContain('text-gray-900');
		});

		it('should apply outline variant', () => {
			const result = buttonVariants({ variant: 'outline' });
			expect(result).toContain('border');
			expect(result).toContain('bg-transparent');
		});

		it('should apply ghost variant', () => {
			const result = buttonVariants({ variant: 'ghost' });
			expect(result).toContain('hover:bg-gray-100');
		});

		it('should apply destructive variant', () => {
			const result = buttonVariants({ variant: 'destructive' });
			expect(result).toContain('bg-red-600');
			expect(result).toContain('text-white');
		});

		it('should apply small size', () => {
			const result = buttonVariants({ size: 'sm' });
			expect(result).toContain('h-8');
			expect(result).toContain('px-3');
		});

		it('should apply medium size (default)', () => {
			const result = buttonVariants({ size: 'md' });
			expect(result).toContain('h-10');
			expect(result).toContain('px-4');
		});

		it('should apply large size', () => {
			const result = buttonVariants({ size: 'lg' });
			expect(result).toContain('h-11');
			expect(result).toContain('px-8');
		});

		it('should apply loading state', () => {
			const result = buttonVariants({ state: 'loading' });
			expect(result).toContain('cursor-wait');
			expect(result).toContain('opacity-70');
		});

		it('should apply disabled state', () => {
			const result = buttonVariants({ state: 'disabled' });
			expect(result).toContain('cursor-not-allowed');
			expect(result).toContain('opacity-50');
		});

		it('should combine multiple variants', () => {
			const result = buttonVariants({
				variant: 'outline',
				size: 'lg',
				state: 'normal',
			});
			expect(result).toContain('border');
			expect(result).toContain('h-11');
		});

		it('should allow custom className', () => {
			const result = buttonVariants({ className: 'custom-class' });
			expect(result).toContain('custom-class');
		});
	});

	describe('inputVariants', () => {
		it('should return default input classes', () => {
			const result = inputVariants();
			expect(result).toContain('flex');
			expect(result).toContain('w-full');
			expect(result).toContain('rounded-md');
		});

		it('should apply small size', () => {
			const result = inputVariants({ size: 'sm' });
			expect(result).toContain('h-8');
		});

		it('should apply medium size (default)', () => {
			const result = inputVariants({ size: 'md' });
			expect(result).toContain('h-10');
		});

		it('should apply large size', () => {
			const result = inputVariants({ size: 'lg' });
			expect(result).toContain('h-11');
		});
	});

	describe('badgeVariants', () => {
		it('should return default badge classes', () => {
			const result = badgeVariants();
			expect(result).toContain('inline-flex');
			expect(result).toContain('rounded-full');
		});

		it('should apply default variant', () => {
			const result = badgeVariants({ variant: 'default' });
			expect(result).toContain('bg-gray-900');
			expect(result).toContain('text-white');
		});

		it('should apply secondary variant', () => {
			const result = badgeVariants({ variant: 'secondary' });
			expect(result).toContain('bg-gray-100');
			expect(result).toContain('text-gray-900');
		});

		it('should apply destructive variant', () => {
			const result = badgeVariants({ variant: 'destructive' });
			expect(result).toContain('bg-red-600');
			expect(result).toContain('text-white');
		});

		it('should apply outline variant', () => {
			const result = badgeVariants({ variant: 'outline' });
			expect(result).toContain('text-gray-900');
		});

		it('should apply success variant', () => {
			const result = badgeVariants({ variant: 'success' });
			expect(result).toContain('bg-green-600');
			expect(result).toContain('text-white');
		});

		it('should apply warning variant', () => {
			const result = badgeVariants({ variant: 'warning' });
			expect(result).toContain('bg-yellow-600');
			expect(result).toContain('text-white');
		});
	});
});
