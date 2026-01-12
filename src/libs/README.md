# React Design Editor Libraries

This directory contains core libraries and utilities for the React Design Editor.

## Table of Contents

- [Design System](#design-system)
- [Accessibility](#accessibility)
- [History Management](#history-management)
- [Template Library](#template-library)
- [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Design System

**Location:** `libs/design-system/`

Manage design tokens and system-level styling.

### TokenManager

Handles design tokens for colors, spacing, typography, border radius, and shadows.

#### Usage

```typescript
import { TokenManager } from './libs/design-system';

// Create with default tokens
const tokenManager = new TokenManager();

// Create with custom tokens
const customTokenManager = new TokenManager({
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
  },
  spacing: {
    sm: 8,
    md: 16,
  },
});

// Get values
const primaryColor = tokenManager.getColor('primary');
const mediumSpacing = tokenManager.getSpacing('md');

// Apply to canvas
tokenManager.applyToCanvas(handler);

// Export tokens
const tokens = tokenManager.exportTokens();

// Import from Figma
tokenManager.importFromFigma(figmaTokens);
```

#### Features

- **Default Tokens**: Comprehensive set of default design tokens
- **Token Merging**: Merge custom tokens with defaults
- **Canvas Integration**: Apply tokens to canvas objects
- **Export/Import**: JSON export and Figma token import

---

## Accessibility

**Location:** `libs/a11y/`

Check designs for WCAG compliance and accessibility issues.

### AccessibilityChecker

Analyzes designs for accessibility issues including color contrast, font size, alt text, and interactive element sizing.

#### Usage

```typescript
import { AccessibilityChecker } from './libs/a11y';

const checker = new AccessibilityChecker();

// Check design for issues
const objects = handler.getObjects();
const issues = checker.checkDesign(objects);

// Check color contrast
const hasGoodContrast = checker.checkColorContrast('#000000', '#ffffff');

// Get AI-powered fix suggestions
const suggestions = await checker.suggestFixes(issues);

// Get summary
const summary = checker.getSummary(issues);
console.log(`Errors: ${summary.errors}, Warnings: ${summary.warnings}`);
```

#### Issue Types

- **Color Contrast**: WCAG 2.1 Level AA compliance (4.5:1 ratio)
- **Font Size**: Minimum 12px for body text
- **Alt Text**: Missing alternative text on images
- **Touch Targets**: Minimum 44x44px for interactive elements
- **ARIA Attributes**: Decorative elements should be hidden

---

## History Management

**Location:** `libs/history/`

Manage design history with undo/redo functionality.

### HistoryManager

Tracks design snapshots with undo/redo support and history export/import.

#### Usage

```typescript
import { HistoryManager } from './libs/history';

const historyManager = new HistoryManager();

// Save a snapshot
historyManager.save(canvasObjects, 'Added button', 'user@example.com');

// Undo/Redo
const previousState = historyManager.undo();
const nextState = historyManager.redo();

// Get history
const history = historyManager.getHistory();

// Restore specific snapshot
const restored = historyManager.restoreSnapshot('snapshot-id');

// Export/Import
const exported = historyManager.export();
historyManager.import(exported);

// Check availability
if (historyManager.canUndo()) {
  // Undo is available
}
```

#### Features

- **Automatic Limit**: Maintains up to 50 snapshots (configurable)
- **Branching**: Automatically prunes future history when new changes are made
- **Metadata**: Includes timestamp, description, and optional author
- **Export/Import**: JSON serialization for persistence

---

## Template Library

**Location:** `libs/templates/`

Manage and organize design templates.

### TemplateLibrary

Store, search, and retrieve design templates.

#### Usage

```typescript
import { TemplateLibrary, DesignTemplate } from './libs/templates';

const library = new TemplateLibrary();

// Add template
const template: DesignTemplate = {
  id: 'my-template',
  name: 'My Template',
  description: 'A custom template',
  category: 'dashboard',
  thumbnail: '/path/to/thumbnail.png',
  design: { /* canvas objects */ },
  tags: ['dashboard', 'admin'],
};

library.addTemplate(template);

// Get by category
const dashboards = library.getByCategory('dashboard');

// Search
const results = library.search('login');

// Load template
const design = library.loadTemplate('my-template');

// Get all categories
const categories = library.getCategories();

// Get all tags
const tags = library.getAllTags();

// Export/Import
const json = library.exportTemplates();
library.importTemplates(json);
```

#### Features

- **Category Organization**: Group templates by category
- **Tag System**: Multi-tag support for flexible searching
- **Search**: Full-text search across name, description, tags
- **Export/Import**: JSON serialization

---

## Keyboard Shortcuts

**Location:** `libs/shortcuts/`

Manage keyboard shortcuts and hotkeys.

### ShortcutManager

Register and handle keyboard shortcuts with modifier key support.

#### Usage

```typescript
import { ShortcutManager, registerAIUIGeneratorShortcuts } from './libs/shortcuts';

const shortcutManager = new ShortcutManager();

// Register individual shortcut
shortcutManager.register({
  key: 's',
  ctrlKey: true,
  description: 'Save',
  handler: () => {
    console.log('Save triggered');
  },
});

// Register AI UI Generator shortcuts
registerAIUIGeneratorShortcuts(shortcutManager, {
  onGenerate: () => console.log('Generate'),
  onOpenGenerateDialog: () => console.log('Open dialog'),
  onExportCode: () => console.log('Export'),
  onSaveAsTemplate: () => console.log('Save as template'),
});

// Initialize event listener
const cleanup = shortcutManager.initialize();

// Later, cleanup
cleanup();

// Enable/disable
shortcutManager.disable();
shortcutManager.enable();

// Get all shortcuts
const shortcuts = shortcutManager.getShortcuts();
```

#### AI UI Generator Shortcuts

- `Ctrl/Cmd + G`: Generate from last prompt
- `Ctrl/Cmd + Shift + G`: Open generation dialog
- `Ctrl/Cmd + E`: Export code
- `Ctrl/Cmd + Shift + S`: Save as template

#### Features

- **Modifier Keys**: Support for Ctrl, Shift, Alt, Meta
- **Platform-aware**: Displays Cmd on Mac, Ctrl on Windows/Linux
- **Enable/Disable**: Toggle shortcuts on/off
- **Conflict Prevention**: Unique key combinations

---

## Feature Flags

**Location:** `../config/featureFlags.ts`

Control feature availability across the application.

### Usage

```typescript
import { isFeatureEnabled, enableFeature, disableFeature } from '../config/featureFlags';

// Check if feature is enabled
if (isFeatureEnabled('enableTemplateLibrary')) {
  // Show template library
}

// Enable feature
enableFeature('enableA11yChecker');

// Disable feature
disableFeature('enableImageToUI');
```

### Available Flags

- `enableImageToUI`: Image-to-UI generation (planned)
- `enableVoiceCommands`: Voice-controlled design (planned)
- `enableCollaboration`: Real-time collaboration (planned)
- `enableAdvancedExport`: Advanced export options (enabled)
- `enableTemplateLibrary`: Template library (enabled)
- `enableA11yChecker`: Accessibility checker (enabled)
- `enableDesignSystemTokens`: Design system tokens (enabled)
- `enableHistoryManager`: History management (enabled)
- `enableKeyboardShortcuts`: Keyboard shortcuts (enabled)

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on contributing to these libraries.

## License

MIT License - See [LICENSE](../../LICENSE) for details.
