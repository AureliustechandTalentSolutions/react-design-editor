# DevOps & Infrastructure Setup - AI UI Generator Module

This document provides setup instructions for the AI UI Generator module development infrastructure.

## Overview

The infrastructure includes:
- All required dependencies (production and development)
- DevContainer configuration for consistent development environment
- Type-safe environment configuration
- Testing infrastructure with Vitest and MSW
- CI/CD pipeline with GitHub Actions
- ESLint and Prettier configuration

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
# Note: VITE_ prefix is required for Vite to expose vars to client-side code
VITE_ANTHROPIC_API_KEY=your-api-key-here
VITE_DEBUG_MODE=false
VITE_MOCK_AI_RESPONSES=true
```

### 3. Verify Setup

Run the following commands to verify everything is working:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint:check

# Formatting check
npm run format:check

# Run tests
npm run test

# Build the library
npm run build:lib
```

## Available Scripts

### Development

- `npm run start:dev` - Start the development server
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI for interactive testing

### Testing

- `npm test` - Run all tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Open Vitest UI

### Code Quality

- `npm run lint` - Lint and auto-fix issues
- `npm run lint:check` - Check for linting issues without fixing
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript compiler without emitting files

### Build

- `npm run build` - Build the production bundle with documentation
- `npm run build:lib` - Build the library for distribution
- `npm run build:types` - Build TypeScript type definitions

### Validation

- `npm run validate` - Run typecheck, lint, and test coverage (CI validation)

## DevContainer Setup

This project includes a DevContainer configuration for VS Code. To use it:

1. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Open the command palette (F1) and run "Dev Containers: Reopen in Container"
3. Wait for the container to build and dependencies to install

The DevContainer includes:
- Node.js 20
- GitHub CLI
- All required VS Code extensions pre-installed
- Automatic environment variable forwarding

## Testing Infrastructure

### Test Setup

Tests are configured with:
- **Vitest** for test running
- **Happy DOM** as the test environment (secure version 20.0.0)
- **MSW** (Mock Service Worker) for API mocking
- **Testing Library** for React component testing

### Writing Tests

Create test files with `.test.ts` or `.spec.ts` extension in the `src` directory:

```typescript
import { describe, it, expect } from 'vitest';

describe('My Component', () => {
  it('should render correctly', () => {
    expect(true).toBe(true);
  });
});
```

### Mocking APIs

API mocks are configured in `src/test/mocks/handlers.ts` using MSW:

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://api.anthropic.com/v1/messages', () => {
    return HttpResponse.json({ /* mock response */ });
  }),
];
```

## TypeScript Configuration

The project uses TypeScript with path aliases configured:

- `@/*` → `./src/*`
- `@/libs/*` → `./src/libs/*`
- `@/editors/*` → `./src/editors/*`
- `@/types/*` → `./src/types/*`
- `@/components/*` → `./src/components/*`
- `@/config/*` → `./src/config/*`

Use these in your imports:

```typescript
import { env } from '@/config/env';
import MyComponent from '@/components/MyComponent';
```

## CI/CD Pipeline

GitHub Actions workflow runs on every push and pull request:

1. **Test Job**
   - Runs on Node.js 18.x and 20.x
   - Type checking
   - Linting
   - Format checking
   - Test coverage
   - Uploads coverage to Codecov

2. **Build Job**
   - Runs on Node.js 20.x
   - Builds the library
   - Archives build artifacts

## Security

### Patched Vulnerabilities

The following dependencies use patched versions to address security vulnerabilities:

- **vitest**: `^1.6.1` (fixes RCE vulnerability)
- **happy-dom**: `^20.0.0` (fixes VM context escape and code execution vulnerabilities)
- **prismjs**: `^1.30.0` (fixes DOM clobbering vulnerability)

### Environment Variables

Never commit actual API keys or secrets. Use `.env` files (which are gitignored) for local development.

For CI/CD, configure secrets in GitHub repository settings:
- Settings → Secrets and variables → Actions
- Add `ANTHROPIC_API_KEY` and any other required secrets

## Troubleshooting

### Dependency Installation Issues

If you encounter issues during `npm install`:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Test Failures

If tests fail unexpectedly:

```bash
# Run tests with verbose output
npm run test -- --reporter=verbose

# Run specific test file
npm run test src/test/setup.test.ts
```

### Build Errors

If the build fails:

```bash
# Clean build artifacts
npm run clean

# Run build with verbose output
npm run build:lib
```

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Library](https://testing-library.com/)
- [Anthropic API Documentation](https://docs.anthropic.com/)

## Support

For issues or questions, please open an issue on the GitHub repository.
