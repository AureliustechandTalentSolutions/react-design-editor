export interface Shortcut {
	key: string;
	ctrlKey?: boolean;
	shiftKey?: boolean;
	altKey?: boolean;
	metaKey?: boolean;
	description: string;
	handler: () => void;
}

export class ShortcutManager {
	private shortcuts: Map<string, Shortcut>;
	private isEnabled: boolean;

	constructor() {
		this.shortcuts = new Map();
		this.isEnabled = true;
	}

	/**
	 * Register a keyboard shortcut
	 */
	public register(shortcut: Shortcut): void {
		const key = this.createKey(shortcut);
		this.shortcuts.set(key, shortcut);
	}

	/**
	 * Unregister a keyboard shortcut
	 */
	public unregister(key: string, ctrlKey?: boolean, shiftKey?: boolean, altKey?: boolean, metaKey?: boolean): void {
		const shortcutKey = this.createKeyFromParts(key, ctrlKey, shiftKey, altKey, metaKey);
		this.shortcuts.delete(shortcutKey);
	}

	/**
	 * Handle keyboard event
	 */
	public handleKeyDown(event: KeyboardEvent): boolean {
		if (!this.isEnabled) {
			return false;
		}

		const key = this.createKeyFromEvent(event);
		const shortcut = this.shortcuts.get(key);

		if (shortcut) {
			event.preventDefault();
			shortcut.handler();
			return true;
		}

		return false;
	}

	/**
	 * Initialize event listener
	 */
	public initialize(): () => void {
		const handler = (event: KeyboardEvent) => {
			this.handleKeyDown(event);
		};

		document.addEventListener('keydown', handler);

		// Return cleanup function
		return () => {
			document.removeEventListener('keydown', handler);
		};
	}

	/**
	 * Enable shortcuts
	 */
	public enable(): void {
		this.isEnabled = true;
	}

	/**
	 * Disable shortcuts
	 */
	public disable(): void {
		this.isEnabled = false;
	}

	/**
	 * Get all registered shortcuts
	 */
	public getShortcuts(): Shortcut[] {
		return Array.from(this.shortcuts.values());
	}

	/**
	 * Clear all shortcuts
	 */
	public clear(): void {
		this.shortcuts.clear();
	}

	/**
	 * Create a unique key for a shortcut
	 */
	private createKey(shortcut: Shortcut): string {
		return this.createKeyFromParts(
			shortcut.key,
			shortcut.ctrlKey,
			shortcut.shiftKey,
			shortcut.altKey,
			shortcut.metaKey
		);
	}

	/**
	 * Create a unique key from parts
	 */
	private createKeyFromParts(
		key: string,
		ctrlKey?: boolean,
		shiftKey?: boolean,
		altKey?: boolean,
		metaKey?: boolean
	): string {
		const parts: string[] = [];
		if (ctrlKey) parts.push('ctrl');
		if (shiftKey) parts.push('shift');
		if (altKey) parts.push('alt');
		if (metaKey) parts.push('meta');
		parts.push(key.toLowerCase());
		return parts.join('+');
	}

	/**
	 * Create a key from keyboard event
	 */
	private createKeyFromEvent(event: KeyboardEvent): string {
		return this.createKeyFromParts(
			event.key,
			event.ctrlKey,
			event.shiftKey,
			event.altKey,
			event.metaKey
		);
	}

	/**
	 * Format shortcut for display
	 */
	public static formatShortcut(shortcut: Shortcut): string {
		const parts: string[] = [];
		// Use userAgent as a more reliable platform detection method
		const isMac = typeof navigator !== 'undefined' && 
			/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);

		if (shortcut.ctrlKey || shortcut.metaKey) {
			parts.push(isMac ? '⌘' : 'Ctrl');
		}
		if (shortcut.shiftKey) {
			parts.push(isMac ? '⇧' : 'Shift');
		}
		if (shortcut.altKey) {
			parts.push(isMac ? '⌥' : 'Alt');
		}
		parts.push(shortcut.key.toUpperCase());

		return parts.join(isMac ? '' : '+');
	}
}

/**
 * Register default AI UI Generator shortcuts
 */
export function registerAIUIGeneratorShortcuts(
	manager: ShortcutManager,
	callbacks: {
		onGenerate?: () => void;
		onOpenGenerateDialog?: () => void;
		onExportCode?: () => void;
		onSaveAsTemplate?: () => void;
	}
): void {
	// Ctrl/Cmd + G: Generate from last prompt
	if (callbacks.onGenerate) {
		manager.register({
			key: 'g',
			ctrlKey: true,
			description: 'Generate from last prompt',
			handler: callbacks.onGenerate,
		});
	}

	// Ctrl/Cmd + Shift + G: Open generation dialog
	if (callbacks.onOpenGenerateDialog) {
		manager.register({
			key: 'G',
			ctrlKey: true,
			shiftKey: true,
			description: 'Open generation dialog',
			handler: callbacks.onOpenGenerateDialog,
		});
	}

	// Ctrl/Cmd + E: Export code
	if (callbacks.onExportCode) {
		manager.register({
			key: 'e',
			ctrlKey: true,
			description: 'Export code',
			handler: callbacks.onExportCode,
		});
	}

	// Ctrl/Cmd + Shift + S: Save as template
	if (callbacks.onSaveAsTemplate) {
		manager.register({
			key: 'S',
			ctrlKey: true,
			shiftKey: true,
			description: 'Save as template',
			handler: callbacks.onSaveAsTemplate,
		});
	}
}
