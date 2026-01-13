# React Design Editor with AI UI Generator

[![MIT License](https://img.shields.io/npm/l/react-design-editor?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)
[![Build](https://github.com/AureliustechandTalentSolutions/react-design-editor/workflows/build/badge.svg)]()
[![Coverage](https://img.shields.io/badge/coverage-91%25-brightgreen)]()

> Transform natural language into complete, editable UI designs using AI

## 📑 Table of Contents

- [Overview](#overview)
- [Repository Metadata](#repository-metadata)
- [Key Features](#key-features)
- [Repository Structure](#repository-structure)
- [Technology Stack](#technology-stack)
- [Core Libraries](#core-libraries)
- [Quick Start](#quick-start)
- [Development](#development)
- [CI/CD Pipelines](#cicd-pipelines)
- [Feature Flags](#feature-flags)
- [Testing](#testing)
- [Documentation](#documentation)
- [Technical Debt](#technical-debt)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

This fork extends the original [react-design-editor](https://github.com/salgum1114/react-design-editor) by salgum1114 with a powerful **AI-powered UI generation system** that converts text descriptions into Fabric.js canvas designs with multi-framework code export capabilities.

The repository combines a robust canvas-based design editor with advanced AI capabilities, enabling designers and developers to create, edit, and export UI designs efficiently using natural language prompts or traditional design tools.

## Repository Metadata

| Property            | Value                          |
| ------------------- | ------------------------------ |
| **Version**         | 0.0.76                         |
| **Language**        | TypeScript                     |
| **Framework**       | React 16.14.0                  |
| **License**         | MIT                            |
| **Node Version**    | 18.x - 20.x                    |
| **Package Manager** | npm                            |
| **Original Author** | salgum1114                     |
| **Fork Maintainer** | AureliustechandTalentSolutions |

## Key Features

### AI UI Generator Module (New)

- **🤖 AI-Powered Generation**: Describe your UI in plain English, get editable designs
- **🎨 30+ Pre-built Components**: Forms, navigation, data display, e-commerce elements
- **💻 Multi-Framework Export**: React, Vue 3, HTML5 with Tailwind/CSS Modules/Styled Components
- **🎭 6 Style Presets**: Modern, Minimal, Corporate, Playful, Dark, Glassmorphism
- **📱 Multi-Platform**: Web, Mobile, Tablet, Responsive designs
- **✅ 91% Test Coverage**: Comprehensive TDD with 78 tests
- **♿ Accessibility**: Built-in WCAG 2.1 AA compliance checking

### Original Editor Features

- **Canvas-Based Design**: Fabric.js-powered visual editor
- **Rich Object Support**: Images, shapes, text, SVG, charts, and more
- **Interactive Elements**: Links, animations, and event handlers
- **Workflow Designer**: Node-based workflow creation
- **Layout Tools**: Guidelines, snapping, and alignment helpers
- **History Management**: Comprehensive undo/redo functionality

## Repository Structure

```
react-design-editor/
├── Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tsconfig.build.json       # Build-specific TS config
│   ├── vite.config.ts            # Vite bundler config
│   ├── vitest.config.ts          # Vitest test config
│   ├── webpack.common.js         # Webpack common config
│   ├── webpack.dev.js            # Webpack dev config
│   ├── webpack.prod.js           # Webpack prod config
│   ├── .eslintrc                 # ESLint configuration
│   ├── .prettierrc               # Prettier configuration
│   ├── .editorconfig             # Editor configuration
│   └── typedoc.json              # TypeDoc configuration
│
├── Documentation
│   ├── README.md                 # This file
│   ├── CHANGELOG.md              # Version history
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   ├── ROADMAP.md                # Feature roadmap
│   ├── TECH_DEBT.md              # Technical debt tracker
│   ├── CODE_QUALITY_SUMMARY.md   # Quality metrics
│   ├── DEVOPS_SETUP.md           # DevOps documentation
│   ├── PROJECT_BOARD.md          # Project management
│   └── SPRINT.md                 # Sprint planning
│
├── .github/
│   ├── workflows/                # CI/CD pipelines
│   │   ├── build.yml             # Build workflow
│   │   ├── ci.yml                # CI workflow
│   │   └── project-automation.yml # Project automation
│   ├── ISSUE_TEMPLATE/           # Issue templates
│   ├── labels.yml                # GitHub labels config
│   └── milestones.yml            # Milestones config
│
├── docs/
│   ├── api/                      # API documentation
│   ├── architecture/             # Architecture docs
│   ├── guides/                   # User/dev guides
│   └── examples/                 # Code examples
│
├── scripts/
│   ├── quality-gate.js           # Quality checks
│   ├── audit-deps.js             # Dependency auditing
│   ├── scan-todos.js             # TODO scanner
│   ├── clean.js                  # Clean dist
│   ├── cleanup.js                # General cleanup
│   └── ghpages.js                # GitHub Pages deploy
│
└── src/
    ├── canvas/                   # Canvas implementation
    │   ├── Canvas.tsx            # Main canvas component
    │   ├── handlers/             # Event & object handlers
    │   ├── objects/              # Canvas objects
    │   └── utils/                # Canvas utilities
    ├── components/               # React components
    │   ├── common/               # Shared components
    │   └── font/                 # Font components
    ├── config/
    │   └── featureFlags.ts       # Feature flag config
    ├── editors/
    │   └── aiuigenerator/        # AI UI Generator
    ├── libs/                     # Core libraries
    │   ├── ai/                   # AI integration
    │   ├── export/               # Code exporters
    │   ├── design-system/        # Design tokens
    │   ├── a11y/                 # Accessibility
    │   ├── history/              # History management
    │   ├── templates/            # Template library
    │   └── shortcuts/            # Keyboard shortcuts
    ├── styles/                   # Global styles
    ├── test/                     # Test infrastructure
    └── types/                    # TypeScript definitions
```

## Technology Stack

### Core Technologies

| Technology               | Version | Purpose              |
| ------------------------ | ------- | -------------------- |
| **React**                | 16.14.0 | UI framework         |
| **TypeScript**           | 4.7.4   | Type safety          |
| **Fabric.js**            | 4.6.0   | Canvas manipulation  |
| **Ant Design**           | 3.15.0  | UI component library |
| **Anthropic Claude SDK** | 0.24.0  | AI integration       |
| **Zustand**              | 4.5.0   | State management     |
| **Zod**                  | 3.22.0  | Schema validation    |
| **Immer**                | 10.0.0  | Immutable state      |
| **i18next**              | 19.0.0  | Internationalization |
| **Framer Motion**        | 11.0.0  | Animations           |

### Build & Development Tools

| Tool         | Version | Purpose             |
| ------------ | ------- | ------------------- |
| **Webpack**  | 5.99.9  | Module bundler      |
| **Vite**     | 6.3.5   | Fast build tool     |
| **Vitest**   | 4.0.17  | Unit testing        |
| **ESLint**   | 8.3.0   | Code linting        |
| **Prettier** | 3.5.3   | Code formatting     |
| **Husky**    | 9.1.7   | Git hooks           |
| **TypeDoc**  | 0.17.4  | API documentation   |
| **Babel**    | 7.27.3  | JavaScript compiler |

### Testing Stack

| Tool                            | Version | Purpose                  |
| ------------------------------- | ------- | ------------------------ |
| **Vitest**                      | 4.0.17  | Test runner              |
| **@testing-library/react**      | 14.2.0  | React testing            |
| **@testing-library/user-event** | 14.6.1  | User interaction testing |
| **happy-dom**                   | 20.1.0  | DOM implementation       |
| **MSW**                         | 2.2.0   | API mocking              |
| **@axe-core/react**             | 4.11.0  | A11y testing             |
| **Playwright**                  | 1.57.0  | E2E testing              |
| **@vitest/coverage-v8**         | 4.0.17  | Code coverage            |

## Core Libraries

### 1. Design System (TokenManager)

Manages design tokens for consistent styling across the application.

```typescript
import { TokenManager } from '@/libs/design-system';

// Initialize token manager
const tokenManager = new TokenManager();

// Get design tokens
const tokens = tokenManager.getTokens();
console.log(tokens.colors.primary); // '#1890ff'

// Update tokens
tokenManager.updateTokens({
	colors: {
		primary: '#0066cc',
		secondary: '#00cc66',
	},
});

// Apply tokens to canvas objects
tokenManager.applyTokensToObject(canvasObject, {
	fill: 'primary',
	borderRadius: 'md',
});
```

### 2. Accessibility Checker (AccessibilityChecker)

Validates designs against WCAG 2.1 AA standards.

```typescript
import { AccessibilityChecker } from '@/libs/a11y';

// Initialize checker
const a11yChecker = new AccessibilityChecker();

// Check a canvas object
const result = a11yChecker.checkObject(canvasObject);
console.log(result.passed); // true/false
console.log(result.violations); // Array of violations

// Check color contrast
const contrastRatio = a11yChecker.checkColorContrast(
	'#000000', // foreground
	'#ffffff', // background
);
console.log(contrastRatio); // 21 (passes WCAG AA)

// Generate accessibility report
const report = a11yChecker.generateReport(canvas);
```

### 3. History Manager (HistoryManager)

Provides undo/redo functionality for canvas operations.

```typescript
import { HistoryManager } from '@/libs/history';

// Initialize history manager
const history = new HistoryManager({
	maxStackSize: 50,
});

// Save state
history.saveState(canvas.toJSON());

// Undo/Redo
const previousState = history.undo();
const nextState = history.redo();

// Check availability
console.log(history.canUndo()); // true/false
console.log(history.canRedo()); // true/false

// Clear history
history.clear();
```

### 4. Template Library (TemplateLibrary)

Manages pre-built UI templates and patterns.

```typescript
import { TemplateLibrary } from '@/libs/templates';

// Initialize library
const templates = new TemplateLibrary();

// Get all templates
const allTemplates = templates.getTemplates();

// Get templates by category
const authTemplates = templates.getTemplatesByCategory('authentication');

// Get specific template
const loginTemplate = templates.getTemplate('modern-login');

// Apply template to canvas
templates.applyTemplate(canvas, 'modern-login', {
	colors: { primary: '#0066cc' },
	platform: 'web',
});

// Save custom template
templates.saveTemplate({
	id: 'my-custom-template',
	name: 'My Custom Template',
	category: 'custom',
	data: canvas.toJSON(),
});
```

### 5. Keyboard Shortcuts (ShortcutManager)

Manages keyboard shortcuts for editor actions.

```typescript
import { ShortcutManager } from '@/libs/shortcuts';

// Initialize shortcut manager
const shortcuts = new ShortcutManager();

// Register shortcuts
shortcuts.register('ctrl+z', () => history.undo());
shortcuts.register('ctrl+shift+z', () => history.redo());
shortcuts.register('ctrl+s', () => saveDesign());
shortcuts.register('delete', () => deleteSelected());

// Enable/disable shortcuts
shortcuts.enable();
shortcuts.disable();

// Get all shortcuts
const allShortcuts = shortcuts.getShortcuts();

// Remove shortcut
shortcuts.unregister('ctrl+z');
```

### 6. Feature Flags

Control feature availability at runtime.

```typescript
import { isFeatureEnabled, enableFeature, disableFeature, getAllFeatureFlags } from '@/config/featureFlags';

// Check if feature is enabled
if (isFeatureEnabled('enableA11yChecker')) {
	// Run accessibility checks
}

// Enable a feature
enableFeature('enableImageToUI');

// Disable a feature
disableFeature('enableVoiceCommands');

// Get all flags
const flags = getAllFeatureFlags();
console.log(flags);
```

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/AureliustechandTalentSolutions/react-design-editor.git
cd react-design-editor

# Install dependencies
npm install

# Set up environment (optional - for AI features)
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY

# Start development server
npm start
```

### Generate Your First UI

```typescript
import { generateUIFromPrompt, exportToReact } from 'react-design-editor';

// Generate UI from natural language
const design = await generateUIFromPrompt(
	'Create a modern login form with email, password, social login buttons, and forgot password link',
	{ style: 'modern', platform: 'web', complexity: 'medium' },
);

// Export to React with Tailwind
const code = await exportToReact(design, {
	styling: 'tailwind',
	typescript: true,
});
```

## Development

### Available Scripts

| Script                  | Description                             |
| ----------------------- | --------------------------------------- |
| `npm start`             | Start development server on port 4000   |
| `npm run start:dev`     | Start Webpack dev server                |
| `npm test`              | Run tests in watch mode                 |
| `npm run test:ui`       | Run tests with Vitest UI                |
| `npm run test:coverage` | Generate test coverage report           |
| `npm run test:watch`    | Run tests in watch mode                 |
| `npm run build`         | Production build with Webpack & TypeDoc |
| `npm run build:lib`     | Library build with Vite & TypeScript    |
| `npm run build:types`   | Build type declarations                 |
| `npm run lint`          | Run ESLint with auto-fix                |
| `npm run lint:check`    | Check for linting issues                |
| `npm run lint:fix`      | Fix all linting issues                  |
| `npm run format`        | Format code with Prettier               |
| `npm run format:check`  | Check code formatting                   |
| `npm run format:fix`    | Fix code formatting                     |
| `npm run typecheck`     | Run TypeScript type checking            |
| `npm run validate`      | Run typecheck, lint, and tests          |
| `npm run quality`       | Run quality gate checks                 |
| `npm run clean`         | Remove build artifacts                  |
| `npm run clean:dist`    | Remove dist folder                      |
| `npm run audit:deps`    | Audit dependencies for vulnerabilities  |
| `npm run audit:todos`   | Scan for TODO comments                  |
| `npm run deploy`        | Build library and publish to npm        |
| `npm run ghpages`       | Deploy docs to GitHub Pages             |
| `npm run serve`         | Serve docs on port 4001                 |
| `npm run typedoc`       | Generate TypeDoc documentation          |
| `npm run prepare`       | Install Husky git hooks                 |
| `npm run precommit`     | Run lint-staged on commit               |

### Code Quality Tools

#### ESLint Configuration

- Extends: Airbnb, Airbnb TypeScript, Prettier
- TypeScript rules enabled
- React and React Hooks plugins
- Import resolver for TypeScript paths

#### Prettier Configuration

- Single quotes
- Tab width: 2
- Print width: 100
- Trailing commas: ES5
- Arrow parens: avoid

#### Husky Git Hooks

- Pre-commit: Runs lint-staged
- Validates TypeScript types
- Runs ESLint on staged files
- Formats code with Prettier

#### Lint-staged

Automatically runs on staged files:

- TypeScript files: ESLint + Prettier
- CSS/Less/JSON/Markdown: Prettier

### Development Workflow

1. **Create a feature branch**

    ```bash
    git checkout -b feature/my-feature
    ```

2. **Make changes and test**

    ```bash
    npm test              # Run tests
    npm run typecheck     # Check types
    npm run lint:check    # Check linting
    ```

3. **Commit changes**

    ```bash
    git add .
    git commit -m "feat: add new feature"
    # Husky automatically runs lint-staged
    ```

4. **Push and create PR**
    ```bash
    git push origin feature/my-feature
    ```

## CI/CD Pipelines

### Build Workflow (`build.yml`)

Runs on: Push to `master`, Pull requests to `master`

**Jobs:**

- **Build** (Ubuntu, Node 18.x)
    - Checkout code
    - Install dependencies
    - Run ESLint
    - Build library with Vite

**Purpose:** Ensures the codebase builds successfully on every push/PR.

### CI Workflow (`ci.yml`)

Runs on: Push to `master`/`main`, Pull requests to `master`/`main`

**Jobs:**

- **Test** (Ubuntu, Node 18.x & 20.x)
    - Checkout code
    - Install dependencies with caching
    - TypeScript type checking
    - ESLint check
    - Prettier format check
    - Run tests with coverage

**Purpose:** Comprehensive quality checks including tests, linting, formatting, and type safety.

### Project Automation (`project-automation.yml`)

Automates project board management and issue handling.

**Purpose:** Streamlines project management workflows.

### Quality Gates

The `npm run quality` command runs:

- Dependency security audit
- TODO comment scanning
- Code complexity analysis
- Test coverage verification
- Type checking
- Linting

## Feature Flags

| Feature                    | Status      | Description                       |
| -------------------------- | ----------- | --------------------------------- |
| `enableImageToUI`          | 🔴 Disabled | Convert images to UI designs      |
| `enableVoiceCommands`      | 🔴 Disabled | Voice-controlled design editing   |
| `enableCollaboration`      | 🔴 Disabled | Real-time collaborative editing   |
| `enableAdvancedExport`     | 🟢 Enabled  | Multi-framework code export       |
| `enableTemplateLibrary`    | 🟢 Enabled  | Pre-built UI templates            |
| `enableA11yChecker`        | 🟢 Enabled  | Accessibility compliance checking |
| `enableDesignSystemTokens` | 🟢 Enabled  | Design token management           |
| `enableHistoryManager`     | 🟢 Enabled  | Undo/redo functionality           |
| `enableKeyboardShortcuts`  | 🟢 Enabled  | Keyboard navigation and commands  |

**Toggle at runtime:**

```typescript
import { enableFeature, disableFeature } from '@/config/featureFlags';

enableFeature('enableImageToUI');
disableFeature('enableCollaboration');
```

## Testing

### Test Infrastructure

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Test Coverage Metrics

| Metric         | Coverage | Status       |
| -------------- | -------- | ------------ |
| **Statements** | 91.35%   | 🟢 Excellent |
| **Functions**  | 100%     | 🟢 Perfect   |
| **Branches**   | 77.41%   | 🟡 Good      |
| **Lines**      | 93.18%   | 🟢 Excellent |

### Testing Tools

- **Vitest**: Fast unit test runner with native ESM support
- **@testing-library/react**: React component testing utilities
- **happy-dom**: Lightweight DOM implementation
- **MSW (Mock Service Worker)**: API mocking for tests
- **@axe-core/react**: Automated accessibility testing
- **Playwright**: End-to-end browser testing

### Test Organization

```
src/
├── test/
│   ├── setup.ts              # Test setup and global config
│   ├── mocks/                # Mock data and utilities
│   └── helpers/              # Test helper functions
│
└── [feature]/
    ├── [Component].tsx
    └── __tests__/
        └── [Component].test.tsx
```

## Documentation

### Available Documentation

| Document            | Description                  | Path                                                                                               |
| ------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------- |
| **API Reference**   | AI UI Generator API docs     | [docs/api/ai-ui-generator.md](./docs/api/ai-ui-generator.md)                                       |
| **Architecture**    | System architecture overview | [docs/architecture/ai-ui-generator.md](./docs/architecture/ai-ui-generator.md)                     |
| **User Guide**      | End-user documentation       | [docs/guides/ai-ui-generator-user-guide.md](./docs/guides/ai-ui-generator-user-guide.md)           |
| **Developer Guide** | Development documentation    | [docs/guides/ai-ui-generator-developer-guide.md](./docs/guides/ai-ui-generator-developer-guide.md) |
| **Prompt Library**  | Example prompts and patterns | [docs/examples/prompt-library.md](./docs/examples/prompt-library.md)                               |
| **Changelog**       | Version history              | [CHANGELOG.md](./CHANGELOG.md)                                                                     |
| **Roadmap**         | Feature roadmap              | [ROADMAP.md](./ROADMAP.md)                                                                         |
| **Contributing**    | Contribution guidelines      | [CONTRIBUTING.md](./CONTRIBUTING.md)                                                               |
| **Technical Debt**  | Known issues tracker         | [TECH_DEBT.md](./TECH_DEBT.md)                                                                     |
| **Code Quality**    | Quality metrics              | [CODE_QUALITY_SUMMARY.md](./CODE_QUALITY_SUMMARY.md)                                               |
| **DevOps Setup**    | CI/CD documentation          | [DEVOPS_SETUP.md](./DEVOPS_SETUP.md)                                                               |
| **Project Board**   | Project management           | [PROJECT_BOARD.md](./PROJECT_BOARD.md)                                                             |
| **Sprint Planning** | Sprint documentation         | [SPRINT.md](./SPRINT.md)                                                                           |

### Generating Documentation

```bash
# Generate TypeDoc API documentation
npm run typedoc

# Serve documentation locally
npm run serve
# Visit http://localhost:4001

# Deploy to GitHub Pages
npm run ghpages
```

## Technical Debt

### Overview

The repository maintains a transparent [Technical Debt Tracker](./TECH_DEBT.md) documenting known issues, their priority, and remediation plans.

### Current Debt Summary

| Priority   | Count | Examples                                                        |
| ---------- | ----- | --------------------------------------------------------------- |
| **High**   | 4     | Console.log statements in production code                       |
| **Medium** | 6     | TODO comments for incomplete features, security vulnerabilities |
| **Low**    | 0     | -                                                               |

### Key Issues

1. **Console.log Statements** (High Priority)
    - Location: `src/serviceWorker.ts`, various handler files
    - Impact: Low (development artifacts)
    - Effort: Small

2. **Incomplete Features** (Medium Priority)
    - Polygon resize functionality
    - Object scaling guidelines
    - Element positioning issues
    - Impact: Medium (affects user experience)
    - Effort: Medium

3. **Security Vulnerabilities** (Medium Priority)
    - 35 npm package vulnerabilities (16 moderate, 16 high, 3 critical)
    - Impact: High (security risk)
    - Effort: Large (requires dependency updates and testing)

### Debt Prevention

The project follows these guidelines to prevent new debt:

- No TODO comments without linked issues
- No `@ts-ignore` without explanation
- No `any` types without justification
- All functions must have JSDoc comments
- Test coverage must not decrease

**See [TECH_DEBT.md](./TECH_DEBT.md) for complete details.**

## AI UI Generator Features

### Prompt Templates

Generate common UI patterns with natural language:

- **Landing Pages**: Hero sections, features, testimonials
- **Dashboards**: Analytics, metrics, data visualization
- **E-commerce**: Product cards, shopping cart, checkout flow
- **Authentication**: Login, register, password reset
- **Mobile App Screens**: Bottom navigation, tab bars, cards
- **Admin Panels**: Tables, forms, user management
- **Settings Pages**: Profiles, preferences, notifications
- **Chat Interfaces**: Message lists, input areas, user avatars

### Export Options

| Framework         | Styling Options                              | TypeScript         |
| ----------------- | -------------------------------------------- | ------------------ |
| **React/Next.js** | Tailwind CSS, CSS Modules, Styled Components | ✅                 |
| **Vue 3**         | Tailwind CSS, CSS Modules                    | ✅                 |
| **HTML5**         | Clean CSS, Tailwind CSS                      | ⚠️ JavaScript only |

### Style Presets

- 🌊 **Ocean** - Cool blues and teals for professional apps
- 🌅 **Sunset** - Warm oranges and pinks for creative projects
- 🌲 **Forest** - Natural greens for eco-friendly brands
- 💜 **Purple Haze** - Rich purples for luxury/premium
- ⬛ **Monochrome** - Elegant grays for minimal design
- 🌈 **Neon** - Vibrant colors for modern/bold interfaces

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the complete feature roadmap and release plans.

### Q1 2026 - Enhanced AI Capabilities

- ✨ AI-powered layout suggestions and optimization
- 🎨 Design system import from Figma tokens
- 🔍 Smart component detection and extraction
- 💬 AI design critique and improvement suggestions
- 🖼️ Enhanced image processing and manipulation

### Q2 2026 - Multi-Platform Support

- 📱 React Native export for mobile apps
- 🎯 Flutter export for cross-platform development
- 🔌 Figma plugin for seamless integration
- 📸 Image-to-UI conversion capability
- 🌐 Web Components export option

### Q3-Q4 2026 - Enterprise Features

- 👥 Real-time collaboration and multiplayer editing
- 🔐 SSO integration and enterprise authentication
- 🤖 Custom AI model integration and training
- 💻 VS Code extension for in-editor design
- 📊 Advanced analytics and usage tracking
- 🏢 Team management and permissions system

## Contributing

We welcome contributions from the community! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
    ```bash
    git checkout -b feature/amazing-feature
    ```
3. **Make your changes**
    - Follow the code style guidelines
    - Add tests for new features
    - Update documentation as needed
4. **Run quality checks**
    ```bash
    npm run validate
    ```
5. **Commit your changes**
    ```bash
    git commit -m "feat: add amazing feature"
    ```
6. **Push to your fork**
    ```bash
    git push origin feature/amazing-feature
    ```
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages (Conventional Commits format)
- Add tests for new features and bug fixes
- Update documentation for API changes
- Ensure all tests pass before submitting PR
- Keep PRs focused on a single feature or fix

### Development Setup

See the [Developer Guide](./docs/guides/ai-ui-generator-developer-guide.md) for detailed setup instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2018 Sung Gyun Oh
Copyright (c) 2024-2026 AureliustechandTalentSolutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## Acknowledgments

This project builds upon and integrates several outstanding open-source projects:

### Original Project

- **[react-design-editor](https://github.com/salgum1114/react-design-editor)** by [salgum1114](https://github.com/salgum1114)
    - Foundation for canvas-based design editor
    - Fabric.js integration and object handling
    - Original architecture and design patterns

### Core Technologies

- **[Fabric.js](http://fabricjs.com/)** - Powerful HTML5 canvas library
- **[React](https://reactjs.org/)** - UI component framework
- **[Ant Design](https://ant.design/)** - Enterprise-class UI components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### AI & ML

- **[Anthropic Claude](https://www.anthropic.com/)** - AI language model powering UI generation
- **[Claude SDK](https://github.com/anthropics/anthropic-sdk-typescript)** - TypeScript SDK for Claude API

### Development Tools

- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[Testing Library](https://testing-library.com/)** - Testing utilities
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

### State Management & Utilities

- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Immer](https://immerjs.github.io/immer/)** - Immutable state updates
- **[Zod](https://zod.dev/)** - Schema validation
- **[Lodash](https://lodash.com/)** - Utility functions

### Special Thanks

- All contributors to the original react-design-editor project
- The open-source community for their invaluable tools and libraries
- Beta testers and early adopters for feedback and bug reports

---

<div align="center">

**Made with ❤️ by [AureliustechandTalentSolutions](https://github.com/AureliustechandTalentSolutions)**

[Report Bug](https://github.com/AureliustechandTalentSolutions/react-design-editor/issues) ·
[Request Feature](https://github.com/AureliustechandTalentSolutions/react-design-editor/issues) ·
[Documentation](./docs/README.md) ·
[Roadmap](./ROADMAP.md)

</div>
