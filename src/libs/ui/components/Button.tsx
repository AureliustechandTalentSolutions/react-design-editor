import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { buttonVariants, type ButtonVariants } from '../variants';
import { cn } from '../variants';

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonVariants {
	/**
	 * Loading state - shows loading spinner
	 */
	isLoading?: boolean;
	/**
	 * Icon to display before the button text
	 */
	leftIcon?: React.ReactNode;
	/**
	 * Icon to display after the button text
	 */
	rightIcon?: React.ReactNode;
}

/**
 * Button component with variants and loading state
 * Built with class-variance-authority for consistent styling
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			state,
			isLoading,
			leftIcon,
			rightIcon,
			children,
			disabled,
			...props
		},
		ref
	) => {
		const effectiveState = isLoading ? 'loading' : disabled ? 'disabled' : state;

		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ variant, size, state: effectiveState, className }))}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading && (
					<svg
						className="mr-2 h-4 w-4 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
				{children}
				{!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
			</button>
		);
	}
);

Button.displayName = 'Button';
