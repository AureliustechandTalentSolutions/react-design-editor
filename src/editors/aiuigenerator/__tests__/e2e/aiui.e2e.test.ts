import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import { chromium, Browser, Page } from 'playwright';

describe('AI UI Generator E2E', () => {
	let server: PreviewServer;
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		// Start vite preview server
		server = await preview({ preview: { port: 4173 } });
		
		// Launch browser
		browser = await chromium.launch({ 
			headless: true,
		});
		page = await browser.newPage();
	}, 30000);

	afterAll(async () => {
		await page?.close();
		await browser?.close();
		await server?.httpServer.close();
	});

	it('should complete full generation workflow', async () => {
		// Navigate to the app
		await page.goto('http://localhost:4173');

		// Wait for the page to load
		await page.waitForLoadState('networkidle');

		// Navigate to AI UI Generator (if there's a navigation)
		// For now, we'll assume the AI UI Generator is on the page

		// Find and fill the textarea
		const textarea = await page.locator('textarea[placeholder*="Describe"]');
		await textarea.fill('Create a login form');

		// Click generate button
		const generateButton = await page.locator('button:has-text("Generate")');
		await generateButton.click();

		// Wait for generation to complete (button text changes)
		await page.waitForSelector('button:has-text("Generate")', { timeout: 30000 });

		// Verify canvas exists
		const canvas = await page.locator('canvas#ai-canvas');
		expect(await canvas.count()).toBeGreaterThan(0);
	}, 60000);

	it('should allow switching between tabs', async () => {
		await page.goto('http://localhost:4173');
		await page.waitForLoadState('networkidle');

		// Click AI tab
		const aiTab = await page.locator('button[aria-label="AI Tab"]');
		await aiTab.click();

		// Verify AI tab content is visible
		const aiHeading = await page.locator('h2:has-text("AI Assistant")');
		expect(await aiHeading.isVisible()).toBe(true);

		// Click Export tab
		const exportTab = await page.locator('button[aria-label="Export Tab"]');
		await exportTab.click();

		// Verify Export tab content is visible
		const exportHeading = await page.locator('h2:has-text("Exported Code")');
		expect(await exportHeading.isVisible()).toBe(true);
	}, 30000);

	it('should show quick prompts when textarea is focused', async () => {
		await page.goto('http://localhost:4173');
		await page.waitForLoadState('networkidle');

		// Focus textarea
		const textarea = await page.locator('textarea[placeholder*="Describe"]');
		await textarea.click();

		// Wait for quick prompts to appear
		await page.waitForSelector('text=Quick Start', { timeout: 5000 });

		// Verify quick prompts are visible
		const quickPromptHeading = await page.locator('text=Quick Start');
		expect(await quickPromptHeading.isVisible()).toBe(true);
	}, 30000);

	it('should populate textarea when quick prompt is clicked', async () => {
		await page.goto('http://localhost:4173');
		await page.waitForLoadState('networkidle');

		// Focus textarea to show quick prompts
		const textarea = await page.locator('textarea[placeholder*="Describe"]');
		await textarea.click();

		// Wait for and click a quick prompt
		await page.waitForSelector('text=Quick Start');
		const quickPrompt = await page.locator('button.quick-prompt-button').first();
		await quickPrompt.click();

		// Verify textarea has been populated
		const textareaValue = await textarea.inputValue();
		expect(textareaValue.length).toBeGreaterThan(0);
	}, 30000);

	it('should disable button when textarea is empty', async () => {
		await page.goto('http://localhost:4173');
		await page.waitForLoadState('networkidle');

		// Get generate button
		const generateButton = await page.locator('button:has-text("Generate")');

		// Verify button is disabled when textarea is empty
		expect(await generateButton.isDisabled()).toBe(true);
	}, 30000);

	it('should enable button when textarea has content', async () => {
		await page.goto('http://localhost:4173');
		await page.waitForLoadState('networkidle');

		// Fill textarea
		const textarea = await page.locator('textarea[placeholder*="Describe"]');
		await textarea.fill('Create a button');

		// Get generate button
		const generateButton = await page.locator('button:has-text("Generate")');

		// Verify button is enabled
		expect(await generateButton.isDisabled()).toBe(false);
	}, 30000);
});
