import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromptInput } from '../PromptInput';

describe('PromptInput', () => {
	it('should render the input field', () => {
		render(<PromptInput onSubmit={vi.fn()} isLoading={false} />);
		expect(screen.getByPlaceholderText(/describe/i)).toBeInTheDocument();
	});

	it('should call onSubmit when Generate button is clicked', async () => {
		const onSubmit = vi.fn();
		render(<PromptInput onSubmit={onSubmit} isLoading={false} />);

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.type(input, 'Create a button');

		const button = screen.getByRole('button', { name: /generate/i });
		await userEvent.click(button);

		expect(onSubmit).toHaveBeenCalledWith('Create a button', expect.any(Object));
	});

	it('should disable button when loading', () => {
		render(<PromptInput onSubmit={vi.fn()} isLoading={true} />);
		expect(screen.getByRole('button', { name: /generating/i })).toBeDisabled();
	});

	it('should disable button when input is empty', () => {
		render(<PromptInput onSubmit={vi.fn()} isLoading={false} />);
		const button = screen.getByRole('button', { name: /generate/i });
		expect(button).toBeDisabled();
	});

	it('should show quick prompts when input is focused and empty', async () => {
		render(<PromptInput onSubmit={vi.fn()} isLoading={false} />);

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.click(input);

		expect(screen.getByText(/quick start/i)).toBeInTheDocument();
	});

	it('should hide quick prompts after blur', async () => {
		render(<PromptInput onSubmit={vi.fn()} isLoading={false} />);

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.click(input);

		expect(screen.getByText(/quick start/i)).toBeInTheDocument();

		fireEvent.blur(input);

		await waitFor(
			() => {
				expect(screen.queryByText(/quick start/i)).not.toBeInTheDocument();
			},
			{ timeout: 300 }
		);
	});

	it('should populate input when quick prompt is clicked', async () => {
		render(<PromptInput onSubmit={vi.fn()} isLoading={false} />);

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.click(input);

		const quickPrompt = screen.getByText(/create a login form/i);
		await userEvent.click(quickPrompt);

		await waitFor(() => {
			expect(input).toHaveValue('Create a login form with email and password');
		});
	});

	it('should allow changing style option', async () => {
		const onSubmit = vi.fn();
		render(<PromptInput onSubmit={onSubmit} isLoading={false} />);

		const styleSelect = screen.getByLabelText(/style/i);
		await userEvent.selectOptions(styleSelect, 'minimal');

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.type(input, 'Test');

		const button = screen.getByRole('button', { name: /generate/i });
		await userEvent.click(button);

		expect(onSubmit).toHaveBeenCalledWith('Test', expect.objectContaining({ style: 'minimal' }));
	});

	it('should allow changing platform option', async () => {
		const onSubmit = vi.fn();
		render(<PromptInput onSubmit={onSubmit} isLoading={false} />);

		const platformSelect = screen.getByLabelText(/platform/i);
		await userEvent.selectOptions(platformSelect, 'mobile');

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.type(input, 'Test');

		const button = screen.getByRole('button', { name: /generate/i });
		await userEvent.click(button);

		expect(onSubmit).toHaveBeenCalledWith(
			'Test',
			expect.objectContaining({ platform: 'mobile' })
		);
	});

	it('should allow changing complexity option', async () => {
		const onSubmit = vi.fn();
		render(<PromptInput onSubmit={onSubmit} isLoading={false} />);

		const complexitySelect = screen.getByLabelText(/complexity/i);
		await userEvent.selectOptions(complexitySelect, 'complex');

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.type(input, 'Test');

		const button = screen.getByRole('button', { name: /generate/i });
		await userEvent.click(button);

		expect(onSubmit).toHaveBeenCalledWith(
			'Test',
			expect.objectContaining({ complexity: 'complex' })
		);
	});

	it('should not submit on empty prompt', async () => {
		const onSubmit = vi.fn();
		render(<PromptInput onSubmit={onSubmit} isLoading={false} />);

		const button = screen.getByRole('button', { name: /generate/i });
		// Button should be disabled for empty input
		expect(button).toBeDisabled();

		expect(onSubmit).not.toHaveBeenCalled();
	});

	it('should disable all inputs when loading', () => {
		render(<PromptInput onSubmit={vi.fn()} isLoading={true} />);

		const input = screen.getByPlaceholderText(/describe/i);
		const styleSelect = screen.getByLabelText(/style/i);
		const platformSelect = screen.getByLabelText(/platform/i);
		const complexitySelect = screen.getByLabelText(/complexity/i);
		const button = screen.getByRole('button', { name: /generating/i });

		expect(input).toBeDisabled();
		expect(styleSelect).toBeDisabled();
		expect(platformSelect).toBeDisabled();
		expect(complexitySelect).toBeDisabled();
		expect(button).toBeDisabled();
	});

	it('should handle form submission', async () => {
		const onSubmit = vi.fn();
		render(<PromptInput onSubmit={onSubmit} isLoading={false} />);

		const input = screen.getByPlaceholderText(/describe/i);
		await userEvent.type(input, 'Create button');

		const form = input.closest('form');
		if (form) {
			fireEvent.submit(form);
		}

		expect(onSubmit).toHaveBeenCalledWith('Create button', expect.any(Object));
	});
});
