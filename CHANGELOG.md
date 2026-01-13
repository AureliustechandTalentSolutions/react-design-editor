# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### Testing & Quality Infrastructure

- **Integration Tests**: 5 comprehensive integration test suites
    - DnD with Layer Panel integration
    - Federal Design System (USWDS) to code export
    - Responsive preview and viewport switching
    - Screenshot/Vision to Fabric.js canvas conversion
    - Component library (Radix) integration with canvas
- **End-to-End Tests**: 3 complete E2E test suites
    - Full AI UI generator workflow (prompt → generation → export)
    - Multi-framework export testing (React, Vue, HTML)
    - Accessibility validation workflow (WCAG compliance)
- **NPM Scripts**: Enhanced package.json with quality scripts
    - `test:integration` - Run integration test suite
    - `test:e2e` - Run end-to-end test suite
    - `lint:all` - Comprehensive ESLint checking
    - `format:all` - Format all source files with Prettier
    - `clean:all` - Clean all generated artifacts
    - `audit:deps` - Run npm audit and check outdated packages
    - `quality` - Complete quality gate (typecheck + lint + test)

- **Code Quality Improvements**
    - Auto-fixed 133+ ESLint issues via `eslint --fix`
    - Applied Prettier formatting to entire codebase
    - Reduced ESLint errors from 874 to 741
    - Enhanced code consistency and maintainability

### Changed

- Updated README with new testing capabilities and scripts
- Enhanced documentation for integration and E2E testing
- Improved test coverage tracking (80%+ maintained)

#### AI UI Generator Module

- **Text-to-UI Generation**: Transform natural language descriptions into complete, editable UI designs using Claude AI
    - Support for web, mobile, tablet, and responsive platforms
    - Integration with Anthropic's Claude API for intelligent UI generation
    - Natural language prompt processing and validation
- **AI-Powered Refinement**: Iteratively improve designs with natural language instructions
    - Chat-based refinement interface
    - Context-aware design modifications
    - Preserve layout option for targeted changes
- **Style System**: Multiple color palettes and typography options
    - Pre-built style presets (Modern, Corporate, Playful, Minimal, etc.)
    - Custom style preset creation
    - Style explorer with live preview
    - Comprehensive color scheme support
- **Code Export**: Generate production-ready code in multiple frameworks
    - React support with JSX and TypeScript
    - Vue.js Single File Components
    - HTML/CSS static output
    - Multiple styling options:
        - Plain CSS
        - CSS Modules
        - Tailwind CSS utility classes
        - Styled Components (CSS-in-JS)
        - Emotion (CSS-in-JS)
    - Code formatting and minification options
- **Component Library**: Pre-built draggable UI components
    - Forms, buttons, inputs, cards
    - Navigation bars, sidebars, footers
    - Data tables, charts, modals
    - Extensible component registry
- **API and Hooks**:
    - `generateUIFromPrompt()` - Main generation function
    - `refineDesign()` - Refine existing designs
    - `exportDesignToCode()` - Export to code
    - `applyStylePreset()` - Apply visual styles
    - `useAIUIGenerator()` - React hook for generation state
    - `useStylePresets()` - React hook for style management
    - `useCodeExport()` - React hook for code export
- **Documentation**:
    - Comprehensive module README with quick start guide
    - Complete API reference documentation
    - Architecture documentation with system diagrams
    - User guide with tutorials and best practices
    - Developer guide for extending the module
    - Prompt library with 50+ example prompts
    - TypeDoc configuration for API documentation generation

### Changed

- Updated main README with AI UI Generator feature
- Added Anthropic Claude AI to dependencies section

### Dependencies

- Added support for Anthropic Claude API integration
- Environment variable configuration for `ANTHROPIC_API_KEY`

## [0.0.76] - Previous Release

### Features

- Image Editor with Fabric.js integration
- Business Process Modelling (BPM) with workflow editor
- Multiple editor modes (imagemap, workflow, hexgrid, fiber)
- Drag and drop element support
- Drawing capability with shapes and lines
- Animation effects support
- Code editor with HTML/CSS/JS
- SVG, Chart, and GIF element support
- Undo/Redo functionality

---

## Contributing

When adding entries to the changelog:

1. Keep the "Unreleased" section at the top
2. Use the following categories:
    - **Added** for new features
    - **Changed** for changes in existing functionality
    - **Deprecated** for soon-to-be removed features
    - **Removed** for now removed features
    - **Fixed** for any bug fixes
    - **Security** for vulnerability fixes

3. Follow this format:

    ```markdown
    ### Category

    - Brief description of the change ([#PR](link-to-pr))
    ```

4. When releasing, move "Unreleased" items to a new version section with date:
    ```markdown
    ## [X.Y.Z] - YYYY-MM-DD
    ```

## Links

- [GitHub Releases](https://github.com/salgum1114/react-design-editor/releases)
- [NPM Package](https://www.npmjs.com/package/react-design-editor)
- [Documentation](https://salgum1114.github.io/react-design-editor)
