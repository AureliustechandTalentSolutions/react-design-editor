# AI UI Generator - Test Suite

## Overview

This directory contains comprehensive Test-Driven Development (TDD) tests for the AI UI Generator module.

## Test Pyramid

```
        /\
       /  \     E2E Tests (Skipped - requires running server)
      /----\
     /      \   Integration Tests (11 tests)
    /--------\
   /          \ Unit Tests (67 tests)
  /-----------\
```

## Test Structure

### Unit Tests

#### AI Library (`src/libs/ai/__tests__/`)

- **claude.test.ts** (21 tests): Tests for AI integration functions
    - `generateUIFromPrompt`: UI generation from text prompts
    - `refineDesign`: Design refinement based on instructions
    - `generateStyleVariations`: Style variation generation

- **parsers.test.ts** (14 tests): Tests for response parsing
    - `parseClaudeResponse`: JSON extraction from AI responses
    - `validateDesign`: Design structure validation
    - `sanitizeObjects`: Security sanitization of fabric objects

#### Export Library (`src/libs/export/__tests__/`)

- **react.test.ts** (19 tests): Tests for React code generation
    - `exportToReact`: Full React component export
    - `generateComponentCode`: Component code generation
    - `generateImports`: Import statement generation

#### Components (`src/editors/aiuigenerator/__tests__/`)

- **PromptInput.test.tsx** (13 tests): Tests for the PromptInput component
    - User input handling
    - Quick prompts functionality
    - Option selection
    - Button state management

### Integration Tests

- **AIUIEditor.integration.test.tsx** (11 tests): Full workflow integration tests
    - UI generation workflow
    - Tab navigation
    - Design preview
    - Code export

### E2E Tests (Skipped)

- **e2e/aiui.e2e.test.ts**: End-to-end tests with Playwright
    - Requires running server
    - Not included in default test runs

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Coverage Requirements

Current coverage meets all thresholds:

- ✅ **Lines**: 93.18% (threshold: 80%)
- ✅ **Functions**: 100% (threshold: 80%)
- ✅ **Branches**: 77.41% (threshold: 70%)
- ✅ **Statements**: 91.35% (threshold: 80%)

## Test Results

**Total**: 78 tests passing

- 21 tests: Claude AI Integration
- 14 tests: Response Parsers
- 19 tests: React Export
- 13 tests: PromptInput Component
- 11 tests: AIUIEditor Integration

## Mock Data

Located in `src/test/mocks/mockData.ts`:

- `mockGeneratedDesign`: Sample login form design
- `mockSimpleButton`: Simple button design
- `mockMobileButton`: Mobile-optimized button design

## Test Utilities

Located in `src/test/`:

- `setup.ts`: Test environment setup with canvas mocking
- `utils.tsx`: Render helpers and canvas mock handlers

## Technologies

- **Vitest**: Test runner and framework
- **@testing-library/react**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM environment for tests
- **Playwright**: E2E testing (not currently active)

## Notes

- E2E tests are excluded from default runs due to server requirements
- Some warnings about React state updates in unmounted components are expected due to setTimeout cleanup timing
- All tests are deterministic and should pass consistently
