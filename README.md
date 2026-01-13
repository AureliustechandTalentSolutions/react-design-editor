<div align="center">

# 🎨 React Design Editor

### AI-Powered Design Tool with Federal Compliance

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/AureliustechandTalentSolutions/react-design-editor/workflows/build/badge.svg)](https://github.com/AureliustechandTalentSolutions/react-design-editor/actions)
[![Coverage](https://img.shields.io/badge/coverage-91%25-brightgreen)](https://github.com/AureliustechandTalentSolutions/react-design-editor)
[![TypeScript](https://img.shields.io/badge/TypeScript-51.4%25-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-115%20passing-success)](https://github.com/AureliustechandTalentSolutions/react-design-editor)
[![Section 508](https://img.shields.io/badge/Section%20508-Compliant-green)](https://www.section508.gov/)
[![USWDS](https://img.shields.io/badge/USWDS-Supported-004085)](https://designsystem.digital.gov/)

**Transform natural language into production-ready UI designs with AI assistance**

[Live Demo](https://salgum1114.github.io/react-design-editor/) · [Documentation](./docs/) · [Report Bug](https://github.com/AureliustechandTalentSolutions/react-design-editor/issues) · [Request Feature](https://github.com/AureliustechandTalentSolutions/react-design-editor/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [What's New](#-whats-new-aurelius-fork-enhancements)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [AI UI Generator](#-ai-ui-generator)
- [Screenshot-to-Code Pipeline](#-screenshot-to-code-pipeline)
- [Federal Design Systems](#-federal-design-systems)
- [Testing](#-testing)
- [Development](#-development)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

React Design Editor is a comprehensive design tool built with React, Fabric.js, and Ant Design. This **Aurelius Tech & Talent Solutions fork** extends the original project with enterprise-grade AI capabilities, federal compliance features, and comprehensive testing infrastructure.

### Key Capabilities

| Capability | Description |
|------------|-------------|
| **🖼️ Image Editor** | Create and edit images with Powerpoint-like functionality |
| **📊 Workflow Editor** | Design flowcharts and BPM diagrams with JSON export |
| **🤖 AI UI Generator** | Transform natural language into complete UI designs |
| **📸 Screenshot-to-Code** | Convert Mobbin screenshots to production code |
| **🏛️ Federal Compliance** | USWDS, VA.gov, Section 508 support |
| **💻 Multi-Framework Export** | React, Vue 3, HTML5 with multiple styling options |

---

## ✨ What's New: Aurelius Fork Enhancements

This fork adds **100+ commits** of new functionality over the upstream repository:

### 🤖 AI-Powered Features
- **Natural Language to UI**: Describe your interface in plain English
- **30+ Pre-built Components**: Forms, navigation, data display, e-commerce
- **6 Style Presets**: Modern, Minimal, Corporate, Playful, Dark, Glassmorphism
- **Smart Component Detection**: AI-assisted layout suggestions

### 🏛️ Federal Government Support
- **USWDS Integration**: U.S. Web Design System components
- **VA.gov Design System**: Veterans Affairs patterns
- **CMS Design System**: Medicare & Medicaid design patterns
- **Section 508 Compliance**: WCAG 2.1 AA automated checking

### 🧪 Enterprise-Grade Quality
- **91% Test Coverage**: Comprehensive unit, integration, and E2E tests
- **TypeScript First**: 51.4% TypeScript with full type definitions
- **DevOps Ready**: CI/CD pipelines, Husky hooks, quality gates

### 📦 Export Capabilities
- **Multi-Framework**: React, Vue 3, HTML5
- **Styling Options**: Tailwind CSS, CSS Modules, Styled Components, shadcn/ui
- **Platform Support**: Web, Mobile, Tablet, Responsive

---

## 🚀 Features

### Core Editor Features

| Feature | Status | Description |
|---------|--------|-------------|
| Element Management | ✅ | Add, remove, resize, clone, copy/paste, drag/drop |
| Drawing Tools | ✅ | Polygon, line, arrows, links |
| Preview Mode | ✅ | Full preview with tooltips |
| Group/Ungroup | ✅ | Object grouping |
| Zoom | ✅ | Canvas zoom controls |
| Import/Export | ✅ | JSON, PNG, JPG, SVG |
| Image Editing | ✅ | Cropping, filters, alignment |
| Snap to Grid | ✅ | Alignment guides |
| Context Menu | ✅ | Right-click actions |
| Animations | ✅ | Fade, Bounce, Shake, Scale, Rotate, Flash |
| Video Elements | ✅ | Embedded video support |
| Icon Picker | ✅ | FontAwesome 5 icons |
| Google Fonts | ✅ | 20+ font families |
| HTML/CSS/JS | ✅ | Custom code elements |
| iFrame Elements | ✅ | Embedded content |
| Code Editor | ✅ | Integrated HTML/CSS/JS editor |
| Layout Modes | ✅ | Fixed, Responsive, Fullscreen, Grid |
| SVG Elements | ✅ | Vector graphics support |
| Charts | ✅ | Data visualization |
| GIF Support | ✅ | Animated images |
| Undo/Redo | ✅ | History management |

### AI UI Generator Features

| Feature | Status | Description |
|---------|--------|-------------|
| Prompt Templates | ✅ | Landing pages, dashboards, e-commerce, auth |
| Component Library | ✅ | 30+ pre-built UI components |
| Style Presets | ✅ | 6 design themes |
| Multi-Platform | ✅ | Web, Mobile, Tablet targets |
| Code Export | ✅ | React, Vue, HTML5 |
| Accessibility | ✅ | WCAG 2.1 AA compliance checking |

### Screenshot-to-Code Features

| Feature | Status | Description |
|---------|--------|-------------|
| Multiple Import | ✅ | Drag-drop, clipboard, file upload |
| Batch Processing | ✅ | Multiple screenshots at once |
| Smart Detection | ✅ | Auto-detect UI elements |
| Federal Systems | ✅ | USWDS, VA.gov, CMS mapping |
| Code Generation | ✅ | TypeScript support |

---

## 🏁 Quick Start

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Git**: Latest version

### Installation

```bash
# Clone the repository
git clone https://github.com/AureliustechandTalentSolutions/react-design-editor.git
cd react-design-editor

# Install dependencies
npm install

# Set up environment (optional - for AI features)
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Start development server
npm start

# Open browser to http://localhost:4000
```

### Quick AI UI Generation Example

```typescript
import { generateUIFromPrompt, exportToReact } from 'react-design-editor';

// Generate UI from natural language
const design = await generateUIFromPrompt(
  'Create a modern login form with email, password, social login buttons, and forgot password link',
  { 
    style: 'modern', 
    platform: 'web', 
    complexity: 'medium' 
  }
);

// Export to React with Tailwind CSS
const code = await exportToReact(design, {
  styling: 'tailwind',
  typescript: true
});

console.log(code);
```

### Quick Screenshot-to-Code Example

```typescript
import { MobbinImporter } from 'react-design-editor';

function App() {
  return (
    <MobbinImporter
      onImportComplete={(result) => {
        console.log('Design:', result.design);
        console.log('Generated code:', result.code);
      }}
      options={{
        framework: 'react',
        styling: 'tailwind',
        typescript: true,
        designSystem: 'uswds',      // Maps to USWDS components
        includeResponsive: true,
        federalCompliance: true     // Section 508 mode
      }}
    />
  );
}
```

---

## 📁 Project Structure

```
react-design-editor/
├── .devcontainer/              # Development container configuration
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── build.yml           # CI/CD pipeline
├── .husky/                     # Git hooks
│   ├── pre-commit              # Lint-staged execution
│   └── commit-msg              # Commit message validation
├── conf/                       # Build configuration
├── docs/                       # Documentation
│   ├── api/                    # API reference
│   │   └── ai-ui-generator.md
│   ├── architecture/           # System architecture
│   │   └── ai-ui-generator.md
│   ├── examples/               # Code examples
│   │   └── prompt-library.md
│   └── guides/                 # User & developer guides
│       ├── ai-ui-generator-user-guide.md
│       └── ai-ui-generator-developer-guide.md
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── index.html
│   └── images/
├── scripts/                    # Build & deployment scripts
├── src/                        # Source code
│   ├── editors/                # Editor modules
│   │   ├── aiuigenerator/      # AI UI Generator
│   │   │   ├── AIUIEditor.tsx
│   │   │   ├── PromptInput.tsx
│   │   │   ├── ComponentLibrary.tsx
│   │   │   ├── StyleExplorer.tsx
│   │   │   ├── AIAssistant.tsx
│   │   │   ├── CodePreview.tsx
│   │   │   └── templates/
│   │   ├── imagemap/           # Image map editor
│   │   └── workflow/           # Workflow editor
│   ├── libs/                   # Core libraries
│   │   ├── ai/                 # Claude AI integration
│   │   │   ├── claude.ts
│   │   │   ├── prompts.ts
│   │   │   └── parsers.ts
│   │   ├── export/             # Code generators
│   │   │   ├── react.ts
│   │   │   ├── vue.ts
│   │   │   └── html.ts
│   │   ├── design-system/      # Design token management
│   │   ├── design-systems/     # Design system integrations
│   │   │   └── uswds/          # USWDS components
│   │   ├── screenshot-to-code/ # Vision pipeline
│   │   │   ├── engine.ts
│   │   │   ├── mobbin.ts
│   │   │   └── types.ts
│   │   ├── a11y/               # Accessibility checker
│   │   ├── history/            # Undo/redo management
│   │   ├── templates/          # Template library
│   │   └── shortcuts/          # Keyboard shortcuts
│   ├── canvas/                 # Fabric.js canvas components
│   ├── components/             # React components
│   ├── types/                  # TypeScript definitions
│   └── test/                   # Test infrastructure
├── .complexity.json            # Code complexity configuration
├── .editorconfig               # Editor configuration
├── .env.example                # Environment template
├── .eslintignore               # ESLint ignore patterns
├── .eslintrc                   # ESLint configuration
├── .gitattributes              # Git attributes
├── .gitignore                  # Git ignore patterns
├── .npmrc                      # NPM configuration
├── .prettierrc                 # Prettier configuration
├── CHANGELOG.md                # Version history
├── CLEANUP_SUMMARY.md          # Cleanup documentation
├── CODE_QUALITY_SUMMARY.md     # Quality metrics
├── CONTRIBUTING.md             # Contribution guidelines
├── DEVOPS_SETUP.md             # DevOps configuration
├── LICENSE                     # MIT License
├── MERGE_SUMMARY.md            # Merge documentation
├── package.json                # NPM configuration
├── PROJECT_BOARD.md            # Project management
├── README.md                   # This file
├── ROADMAP.md                  # Feature roadmap
├── SPRINT.md                   # Sprint planning
├── TDD-IMPLEMENTATION-SUMMARY.md # TDD documentation
├── TECH_DEBT.md                # Technical debt tracking
├── tsconfig.build.json         # TypeScript build config
├── tsconfig.json               # TypeScript configuration
├── typedoc.aiui.json           # AI UI TypeDoc config
├── typedoc.json                # TypeDoc configuration
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest configuration
├── webpack.common.js           # Webpack shared config
├── webpack.dev.js              # Webpack dev config
└── webpack.prod.js             # Webpack prod config
```

---

## 🤖 AI UI Generator

The AI UI Generator module transforms natural language descriptions into complete, editable UI designs.

### Prompt Templates

| Template | Use Case |
|----------|----------|
| Landing Pages | Marketing, product, company pages |
| Dashboards | Admin panels, analytics, metrics |
| E-commerce | Product cards, cart, checkout |
| Authentication | Login, register, password reset |
| Mobile App Screens | iOS/Android native patterns |
| Admin Panels | CRUD interfaces, data tables |
| Settings Pages | User preferences, configuration |
| Chat Interfaces | Messaging, support, AI chat |

### Component Library (30+ Components)

```
Forms:        Input, Textarea, Select, Checkbox, Radio, Switch, DatePicker
Navigation:   Navbar, Sidebar, Tabs, Breadcrumb, Pagination
Data Display: Card, Table, List, Avatar, Badge, Tag, Timeline
E-Commerce:   ProductCard, Cart, Checkout, PriceDisplay
Feedback:     Alert, Modal, Toast, Progress, Skeleton
Layout:       Container, Grid, Divider, Spacer
```

### Export Options

| Framework | Styling Options |
|-----------|-----------------|
| React/Next.js | Tailwind CSS, CSS Modules, Styled Components |
| Vue 3 | Tailwind CSS, CSS Modules |
| HTML5 | Clean CSS, Tailwind CSS |

### Style Presets

| Preset | Description | Colors |
|--------|-------------|--------|
| 🌊 Ocean | Cool and calming | Blues, teals |
| 🌅 Sunset | Warm and inviting | Oranges, pinks |
| 🌲 Forest | Natural and organic | Greens, browns |
| 💜 Purple Haze | Rich and luxurious | Purples, violets |
| ⬛ Monochrome | Elegant and minimal | Grays, blacks |
| 🌈 Neon | Vibrant and energetic | Bright colors |

### Usage Example

```typescript
import { AIUIEditor } from 'react-design-editor';

function DesignStudio() {
  const handleExport = (code: string, framework: string) => {
    // Save or copy the generated code
    console.log(`Generated ${framework} code:`, code);
  };

  return (
    <AIUIEditor
      initialPrompt=""
      stylePreset="modern"
      targetPlatform="web"
      onExport={handleExport}
      enableAccessibilityCheck={true}
      designSystem="uswds" // Optional: federal design system
    />
  );
}
```

---

## 📸 Screenshot-to-Code Pipeline

Convert Mobbin UI screenshots into production-ready code with federal design system support.

### Features

- **📸 Multiple Import Methods**: Drag-drop, clipboard paste (Cmd+V), file upload
- **🏛️ Federal Design Systems**: USWDS, VA.gov, CMS with Section 508 compliance
- **🎨 Design System Support**: USWDS, Tailwind CSS, shadcn/ui, or plain HTML/CSS
- **📦 Batch Processing**: Import and convert multiple screenshots at once
- **🎯 Smart Detection**: Automatically detects UI elements, colors, typography, layout
- **♿ Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes
- **📝 Code Generation**: React, Vue, Next.js, or HTML with TypeScript support

### USWDS Component Mapping

| Detected Element | USWDS Component | Variants |
|------------------|-----------------|----------|
| Button | `usa-button` | primary, secondary, outline |
| Input | `usa-input` | text, email, password |
| Card | `usa-card` | flag, header-first |
| Alert | `usa-alert` | success, warning, error, info |
| Navigation | `usa-nav` | with proper ARIA roles |
| Form | `usa-form` | large, default sizes |

---

## 🏛️ Federal Design Systems

This fork includes comprehensive support for federal government design systems.

### Supported Systems

| System | Description | Status |
|--------|-------------|--------|
| **USWDS** | U.S. Web Design System | ✅ Full Support |
| **VA.gov** | Veterans Affairs design patterns | ✅ Full Support |
| **CMS** | Medicare & Medicaid design system | ✅ Full Support |

### Section 508 Compliance

The built-in accessibility checker validates:

- ✅ Color contrast ratios (WCAG 2.1 AA)
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus indicators
- ✅ ARIA labels and roles
- ✅ Alternative text for images
- ✅ Form label associations
- ✅ Heading hierarchy

### Federal Usage Example

```typescript
import { generateUIFromPrompt } from 'react-design-editor';

const federalForm = await generateUIFromPrompt(
  'Create a veteran benefits application form with personal info, service history, and document upload',
  {
    designSystem: 'uswds',
    federalCompliance: true,
    accessibilityLevel: 'AA',
    includeARIA: true
  }
);
```

---

## 🧪 Testing

### Test Coverage Summary

| Metric | Value | Status |
|--------|-------|--------|
| **Statements** | 91.35% | ✅ Excellent |
| **Functions** | 100% | ✅ Complete |
| **Branches** | 77.41% | ⚠️ Good |
| **Lines** | 93.18% | ✅ Excellent |

### Test Categories

| Category | Count | Description |
|----------|-------|-------------|
| Unit Tests | 78 | Core functionality |
| Integration Tests | 20 | DnD, Export, Responsive, Vision, Components |
| E2E Tests | 17 | AI Flow, Multi-Framework Export, Accessibility |
| Screenshot-to-Code | 43 | Engine, utilities, USWDS mappers |
| **Total** | **115+** | Comprehensive coverage |

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Run specific test file
npm test -- --grep "AI"

# Watch mode
npm run test:watch
```

---

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (port 4000) |
| `npm test` | Run test suite |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:integration` | Run integration tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run lint:all` | Lint all files |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Run Prettier |
| `npm run format:all` | Format all source files |
| `npm run typecheck` | TypeScript type checking |
| `npm run quality` | Run all quality gates (typecheck + lint + test) |
| `npm run clean` | Remove build artifacts |
| `npm run clean:all` | Clean all generated files |
| `npm run audit:deps` | Run npm audit and check outdated packages |
| `npm run build` | Production build |

### Code Quality

The project enforces strict code quality through:

- **ESLint**: TypeScript-aware linting rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks
- **lint-staged**: Staged file validation
- **TypeScript**: Strict type checking
- **Vitest**: Fast unit testing

### Quality Gates

All PRs must pass:

```bash
npm run quality  # Runs typecheck + lint + test
```

### Environment Variables

Create a `.env.local` file from the template:

```bash
cp .env.example .env.local
```

Configure the following (optional):

```env
# AI Features (optional)
ANTHROPIC_API_KEY=your-api-key

# Development
VITE_PORT=4000
VITE_HOST=localhost

# Feature Flags
VITE_ENABLE_AI=true
VITE_ENABLE_ANALYTICS=false
```

---

## 📚 API Reference

### Core Exports

```typescript
// AI UI Generator
import {
  generateUIFromPrompt,
  AIUIEditor,
  PromptInput,
  ComponentLibrary,
  StyleExplorer,
  AIAssistant,
  CodePreview
} from 'react-design-editor';

// Code Export
import {
  exportToReact,
  exportToVue,
  exportToHTML
} from 'react-design-editor';

// Screenshot-to-Code
import {
  MobbinImporter,
  ScreenshotEngine,
  USWDSMapper
} from 'react-design-editor';

// Accessibility
import {
  AccessibilityChecker,
  checkWCAG,
  generateVPAT
} from 'react-design-editor';

// Design Systems
import {
  USWDSComponents,
  VAGovComponents,
  CMSComponents
} from 'react-design-editor';
```

### Type Definitions

```typescript
interface GenerateOptions {
  style: 'modern' | 'minimal' | 'corporate' | 'playful' | 'dark' | 'glassmorphism';
  platform: 'web' | 'mobile' | 'tablet' | 'responsive';
  complexity: 'simple' | 'medium' | 'complex';
  designSystem?: 'uswds' | 'vagov' | 'cms' | 'tailwind' | 'shadcn';
  federalCompliance?: boolean;
  accessibilityLevel?: 'A' | 'AA' | 'AAA';
}

interface ExportOptions {
  styling: 'tailwind' | 'css-modules' | 'styled-components' | 'plain-css';
  typescript: boolean;
  includeResponsive?: boolean;
  componentLibrary?: string;
}

interface MobbinImportResult {
  design: FabricDesign;
  code: string;
  accessibility: AccessibilityReport;
  components: DetectedComponent[];
}
```

### Full Documentation

- [API Reference](./docs/api/ai-ui-generator.md)
- [Architecture Guide](./docs/architecture/ai-ui-generator.md)
- [User Guide](./docs/guides/ai-ui-generator-user-guide.md)
- [Developer Guide](./docs/guides/ai-ui-generator-developer-guide.md)
- [Prompt Library](./docs/examples/prompt-library.md)

---

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for the complete feature roadmap.

### Q1 2026 - Enhanced AI
- [ ] AI-powered layout suggestions
- [ ] Design system import (Figma tokens)
- [ ] Smart component detection
- [ ] Design critique and suggestions

### Q2 2026 - Multi-Platform
- [ ] React Native export
- [ ] Flutter export
- [ ] Figma plugin
- [ ] Image-to-UI conversion

### Q3-Q4 2026 - Enterprise
- [ ] Real-time collaboration
- [ ] SSO integration
- [ ] Custom AI models
- [ ] VS Code extension

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/react-design-editor.git
cd react-design-editor

# Create a feature branch
git checkout -b feature/your-feature-name

# Install dependencies
npm install

# Make your changes and test
npm run quality

# Commit with conventional commits
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

### Original Project
- [react-design-editor](https://github.com/salgum1114/react-design-editor) by [@salgum1114](https://github.com/salgum1114)

### Core Dependencies
| Library | Description | License |
|---------|-------------|---------|
| [React](https://github.com/facebook/react) | UI framework | MIT |
| [Ant Design](https://github.com/ant-design/ant-design/) | UI components | MIT |
| [Fabric.js](https://github.com/fabricjs/fabric.js) | Canvas library | MIT |
| [MediaElement.js](https://github.com/mediaelement/mediaelement) | Media player | MIT |
| [React-Ace](https://github.com/securingsincity/react-ace) | Code editor | MIT |
| [interact.js](https://github.com/taye/interact.js) | Drag and drop | MIT |
| [anime.js](https://github.com/juliangarnier/anime/) | Animation | MIT |
| [Vite](https://github.com/vitejs/vite) | Build tool | MIT |
| [Vitest](https://github.com/vitest-dev/vitest) | Test framework | MIT |
| [FontAwesome 5](https://github.com/FortAwesome/Font-Awesome) | Icons | CC BY 4.0 / MIT |

### AI Integration
- [Anthropic Claude](https://www.anthropic.com/) - AI capabilities

### Federal Design Systems
- [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/)
- [VA.gov Design System](https://design.va.gov/)
- [CMS Design System](https://design.cms.gov/)

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Commits** | 594 |
| **Languages** | TypeScript (51.4%), JavaScript (20.4%), Less (11.7%), SCSS (10.7%), CSS (5.8%) |
| **Test Coverage** | 91%+ |
| **Components** | 30+ pre-built |
| **Export Frameworks** | 3 (React, Vue, HTML) |
| **Federal Design Systems** | 3 (USWDS, VA.gov, CMS) |

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/AureliustechandTalentSolutions/react-design-editor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AureliustechandTalentSolutions/react-design-editor/discussions)
- **Documentation**: [/docs](./docs/)

---

<div align="center">

**Made with ❤️ by [Aurelius Tech & Talent Solutions](https://github.com/AureliustechandTalentSolutions)**

*Service-Disabled Veteran-Owned Small Business (SDVOSB) | Microsoft AI Cloud Partner*

[![GitHub](https://img.shields.io/badge/GitHub-AureliustechandTalentSolutions-181717?style=flat&logo=github)](https://github.com/AureliustechandTalentSolutions)

</div>
