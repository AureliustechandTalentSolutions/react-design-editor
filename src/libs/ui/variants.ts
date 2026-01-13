import { cva, type VariantProps } from 'class-variance-authority';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names with Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class name handling
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Button variants using class-variance-authority
 */
export const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
				secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400',
				outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400',
				ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
				destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
			},
			size: {
				sm: 'h-8 px-3 text-xs',
				md: 'h-10 px-4 py-2',
				lg: 'h-11 px-8 text-base',
			},
			state: {
				loading: 'cursor-wait opacity-70',
				disabled: 'cursor-not-allowed opacity-50',
				normal: '',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			state: 'normal',
		},
	},
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Input variants
 */
export const inputVariants = cva(
	'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			size: {
				sm: 'h-8 text-xs',
				md: 'h-10',
				lg: 'h-11 text-base',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

export type InputVariants = VariantProps<typeof inputVariants>;

/**
 * Badge variants
 */
export const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-gray-900 text-white hover:bg-gray-800',
				secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200',
				destructive: 'border-transparent bg-red-600 text-white hover:bg-red-700',
				outline: 'text-gray-900',
				success: 'border-transparent bg-green-600 text-white hover:bg-green-700',
				warning: 'border-transparent bg-yellow-600 text-white hover:bg-yellow-700',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
