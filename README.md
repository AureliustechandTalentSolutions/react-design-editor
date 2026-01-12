# React Design Editor with AI UI Generator

[![MIT License](https://img.shields.io/npm/l/react-design-editor?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)
[![Build](https://github.com/AureliustechandTalentSolutions/react-design-editor/workflows/build/badge.svg)]()
[![Coverage](https://img.shields.io/badge/coverage-91%25-brightgreen)]()

> Transform natural language into complete, editable UI designs using AI

## ✨ What's New: AI UI Generator Module

This fork extends the original react-design-editor with a powerful **AI-powered UI generation system** that converts text descriptions into Fabric.js canvas designs with multi-framework code export.

### 🎯 Key Features

- **🤖 AI-Powered Generation**: Describe your UI in plain English, get editable designs
- **🎨 30+ Pre-built Components**: Forms, navigation, data display, e-commerce elements
- **💻 Multi-Framework Export**: React, Vue 3, HTML5 with Tailwind/CSS Modules/Styled Components
- **🎭 6 Style Presets**: Modern, Minimal, Corporate, Playful, Dark, Glassmorphism
- **📱 Multi-Platform**: Web, Mobile, Tablet, Responsive designs
- **✅ 91% Test Coverage**: Comprehensive TDD with 78 tests
- **♿ Accessibility**: Built-in WCAG 2.1 AA compliance checking

## 🚀 Quick Start

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

## 📁 Project Structure

```
src/
├── editors/
│   ├── aiuigenerator/       # AI UI Generator editor
│   │   ├── AIUIEditor.tsx   # Main editor component
│   │   ├── PromptInput.tsx  # Natural language input
│   │   ├── ComponentLibrary.tsx
│   │   ├── StyleExplorer.tsx
│   │   ├── AIAssistant.tsx
│   │   ├── CodePreview.tsx
│   │   └── templates/       # Pre-built UI templates
│   └── ...
├── libs/
│   ├── ai/                  # Claude AI integration
│   │   ├── claude.ts
│   │   ├── prompts.ts
│   │   └── parsers.ts
│   ├── export/              # Code generators
│   │   ├── react.ts
│   │   ├── vue.ts
│   │   └── html.ts
│   ├── design-system/       # Token management
│   ├── a11y/                # Accessibility checker
│   ├── history/             # Undo/redo management
│   ├── templates/           # Template library
│   └── shortcuts/           # Keyboard shortcuts
├── types/                   # TypeScript definitions
└── test/                    # Test infrastructure
```

## 🎨 AI UI Generator Features

### Prompt Templates

- Landing Pages
- Dashboards
- E-commerce (Product cards, Cart, Checkout)
- Authentication (Login, Register, Password Reset)
- Mobile App Screens
- Admin Panels
- Settings Pages
- Chat Interfaces

### Export Options

| Framework     | Styling Options                          |
| ------------- | ---------------------------------------- |
| React/Next.js | Tailwind, CSS Modules, Styled Components |
| Vue 3         | Tailwind, CSS Modules                    |
| HTML5         | Clean CSS, Tailwind                      |

### Style Presets

- 🌊 Ocean - Cool blues and teals
- 🌅 Sunset - Warm oranges and pinks
- 🌲 Forest - Natural greens
- 💜 Purple Haze - Rich purples
- ⬛ Monochrome - Elegant grays
- 🌈 Neon - Vibrant colors

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run specific tests
npm test -- --grep "AI"
```

**Coverage Results:**

- Statements: 91.35%
- Functions: 100%
- Branches: 77.41%
- Lines: 93.18%

## 📚 Documentation

- [API Reference](./docs/api/ai-ui-generator.md)
- [Architecture](./docs/architecture/ai-ui-generator.md)
- [User Guide](./docs/guides/ai-ui-generator-user-guide.md)
- [Developer Guide](./docs/guides/ai-ui-generator-developer-guide.md)
- [Prompt Library](./docs/examples/prompt-library.md)
- **[Screenshot-to-Code Pipeline](./docs/screenshot-to-code.md)** ⭐ NEW
- [Roadmap](./ROADMAP.md)

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start dev server (port 4000)
npm test           # Run tests
npm run test:ui    # Run tests with UI
npm run test:coverage # Generate coverage report
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Run Prettier
npm run typecheck  # TypeScript type checking
npm run quality    # Run all quality gates
npm run clean      # Remove build artifacts
npm run build      # Production build
```

### Code Quality

- ESLint with TypeScript rules
- Prettier for formatting
- Husky pre-commit hooks
- lint-staged for staged files
- Quality gates for CI/CD

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for the full feature roadmap.

### Q1 2026 - Enhanced AI

- AI layout suggestions
- Design system import (Figma tokens)
- Smart component detection
- Design critique

### Q2 2026 - Multi-Platform

- React Native export
- Flutter export
- Figma plugin
- Image-to-UI

### Q3-Q4 2026 - Enterprise

- Real-time collaboration
- SSO integration
- Custom AI models
- VS Code extension

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE)

## 🙏 Acknowledgments

- Original [react-design-editor](https://github.com/salgum1114/react-design-editor) by salgum1114
- [Fabric.js](http://fabricjs.com/) for canvas manipulation
- [Ant Design](https://ant.design/) for UI components
- [Anthropic Claude](https://www.anthropic.com/) for AI capabilities

---

Made with ❤️ by AureliustechandTalentSolutions
