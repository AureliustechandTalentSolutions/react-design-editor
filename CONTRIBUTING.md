# Contributing to React Design Editor

Thank you for your interest in contributing to React Design Editor! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Contributing to the Roadmap](#contributing-to-the-roadmap)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/react-design-editor.git`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser to `http://localhost:4000`

## Development Process

### Setting Up Your Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run linting
npm run lint

# Build the project
npm run build
```

### Branch Naming Convention

- `feature/description` - For new features
- `fix/description` - For bug fixes
- `docs/description` - For documentation changes
- `refactor/description` - For code refactoring

## Contributing to the Roadmap

We welcome contributions to our [roadmap](./ROADMAP.md)! Here's how you can help:

### Proposing New Features

1. Check the [roadmap](./ROADMAP.md) to ensure your feature isn't already planned
2. Create a new [feature request issue](https://github.com/AureliustechandTalentSolutions/react-design-editor/issues/new?template=feature_request.md)
3. Use the `enhancement` and `ai-ui-generator` labels
4. Provide:
   - Clear feature description
   - Use case and problem it solves
   - Proposed solution
   - Any alternatives considered
   - Screenshots or mockups if applicable

### Implementing Roadmap Features

1. Check the roadmap for features marked for the current quarter
2. Comment on related issues to express interest in implementation
3. Wait for maintainer approval before starting work
4. Follow the development process outlined below

### Roadmap Updates

- Roadmap is reviewed quarterly
- Community input is gathered through GitHub Discussions
- Priorities may shift based on user feedback and project needs

## Pull Request Process

1. **Before You Start**
   - Check existing issues and PRs to avoid duplicate work
   - Discuss major changes in an issue first
   - Ensure your fork is up to date

2. **Making Changes**
   - Create a new branch from `main`
   - Make your changes following our coding standards
   - Write or update tests as needed
   - Update documentation if required

3. **Submitting a PR**
   - Push your changes to your fork
   - Create a pull request with a clear title and description
   - Reference any related issues
   - Ensure all tests pass
   - Wait for review from maintainers

4. **After Submission**
   - Respond to feedback promptly
   - Make requested changes
   - Keep your PR up to date with main branch

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Enable strict mode

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Follow existing code patterns
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Implement proper prop types/interfaces
- Keep components focused and reusable
- Use React best practices

### Example

```typescript
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Click Me</button>
    </div>
  );
};
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage
- Test both happy paths and edge cases

```bash
# Run tests
npm test
```

## Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex logic
- Keep comments up to date

### User Documentation

- Update README.md for user-facing changes
- Add examples for new features
- Update relevant guides

## Questions?

If you have questions:

- Check existing documentation
- Search closed issues
- Open a new issue with the `question` label
- Join our community discussions

## License

By contributing to React Design Editor, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors are recognized in our release notes and may be added to the contributors list.

Thank you for contributing to React Design Editor! 🎉
