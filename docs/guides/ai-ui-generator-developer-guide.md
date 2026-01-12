# AI UI Generator Developer Guide

This guide is for developers who want to extend, customize, or integrate the AI UI Generator into their own applications.

## Table of Contents

- [Development Setup](#development-setup)
- [Architecture Overview](#architecture-overview)
- [Extending the Module](#extending-the-module)
- [Adding Custom Components](#adding-custom-components)
- [Creating Export Formats](#creating-export-formats)
- [Customizing AI Prompts](#customizing-ai-prompts)
- [Plugin Development](#plugin-development)
- [Testing](#testing)
- [Contributing](#contributing)

## Development Setup

### Prerequisites

- Node.js 14+
- npm or yarn
- Git
- TypeScript 4.7+
- React 16.14+

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/salgum1114/react-design-editor.git
   cd react-design-editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your ANTHROPIC_API_KEY
   ```

4. **Start development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Navigate to AI UI Generator:**
   Open `http://localhost:4000` and select the AI UI Generator tab

### Project Structure

```
src/editors/aiuigenerator/
├── components/          # React components
│   ├── AIUIGenerator.tsx
│   ├── PromptInput.tsx
│   ├── StyleExplorer.tsx
│   ├── CodeExporter.tsx
│   └── ...
├── core/               # Core functionality
│   ├── generator.ts    # AI generation logic
│   ├── parser.ts       # Response parsing
│   ├── exporter.ts     # Code export logic
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAIUIGenerator.ts
│   ├── useStylePresets.ts
│   └── ...
├── types/              # TypeScript type definitions
│   ├── design.ts
│   ├── components.ts
│   └── ...
├── utils/              # Utility functions
│   ├── validation.ts
│   ├── formatting.ts
│   └── ...
├── adapters/           # Framework adapters
│   ├── react.ts
│   ├── vue.ts
│   └── html.ts
├── presets/            # Default style presets
│   └── styles.ts
└── index.ts           # Public API exports
```

## Architecture Overview

See the [Architecture Documentation](../architecture/ai-ui-generator.md) for detailed system architecture.

### Key Concepts

1. **Generation Engine**: Interfaces with Claude AI
2. **Design Parser**: Converts AI responses to design objects
3. **Component Registry**: Manages UI component library
4. **Export Engine**: Generates code for different frameworks
5. **Style System**: Manages themes and visual styles

## Extending the Module

### Creating a Plugin

Plugins allow you to extend functionality without modifying core code:

```typescript
// plugins/my-plugin.ts
import { Plugin, GeneratedDesign, ExportedCode } from 'react-design-editor';

export const myPlugin: Plugin = {
  name: 'my-plugin',
  version: '1.0.0',
  
  // Hook into generation process
  beforeGenerate: async (prompt: string, options: GenerateOptions) => {
    console.log('About to generate:', prompt);
    // Modify prompt or options if needed
    return { prompt, options };
  },
  
  // Hook into generated result
  afterGenerate: async (design: GeneratedDesign) => {
    console.log('Generated design:', design);
    // Post-process the design
    return design;
  },
  
  // Hook into export process
  beforeExport: async (design: GeneratedDesign, options: ExportOptions) => {
    console.log('About to export:', design);
    return { design, options };
  },
  
  afterExport: async (code: ExportedCode) => {
    console.log('Exported code:', code);
    // Post-process exported code
    return code;
  },
};

// Usage
import { AIUIGenerator, usePlugins } from 'react-design-editor';

function App() {
  const { registerPlugin } = usePlugins();
  
  useEffect(() => {
    registerPlugin(myPlugin);
  }, []);
  
  return <AIUIGenerator apiKey={apiKey} />;
}
```

### Middleware System

Create middleware to intercept and transform data:

```typescript
// middleware/analytics.ts
import { Middleware } from 'react-design-editor';

export const analyticsMiddleware: Middleware = {
  name: 'analytics',
  
  beforeGenerate: async (prompt, options) => {
    // Track generation event
    analytics.track('ui_generation_started', {
      promptLength: prompt.length,
      platform: options.platform,
    });
    return { prompt, options };
  },
  
  afterGenerate: async (design) => {
    // Track successful generation
    analytics.track('ui_generation_completed', {
      componentCount: design.elements.length,
    });
    return design;
  },
};

// Register middleware
import { AIUIConfig } from 'react-design-editor';

const config: AIUIConfig = {
  middleware: [analyticsMiddleware],
};

<AIUIGenerator apiKey={apiKey} config={config} />
```

## Adding Custom Components

### Define Component Type

```typescript
// types/custom-components.ts
import { UIElement, ElementType } from 'react-design-editor';

export interface DataTableElement extends UIElement {
  type: 'data-table';
  props: {
    columns: Column[];
    data: any[];
    pagination?: boolean;
    sortable?: boolean;
    filterable?: boolean;
  };
}

export interface Column {
  key: string;
  title: string;
  dataType: 'string' | 'number' | 'date' | 'boolean';
  sortable?: boolean;
}
```

### Create Component

```typescript
// components/custom/DataTable.tsx
import React from 'react';
import { DataTableElement } from '../../types/custom-components';

interface DataTableProps {
  element: DataTableElement;
  onUpdate?: (element: DataTableElement) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ element, onUpdate }) => {
  const { columns, data, pagination, sortable } = element.props;
  
  return (
    <div className="data-table" style={element.style}>
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

### Register Component

```typescript
// core/component-registry.ts
import { ComponentRegistry } from 'react-design-editor';
import { DataTable } from '../components/custom/DataTable';

const registry = ComponentRegistry.getInstance();

registry.register({
  type: 'data-table',
  name: 'Data Table',
  icon: TableIcon,
  component: DataTable,
  defaultProps: {
    columns: [],
    data: [],
    pagination: true,
    sortable: true,
  },
  propTypes: [
    {
      name: 'columns',
      type: 'array',
      required: true,
      description: 'Table columns configuration',
    },
    {
      name: 'data',
      type: 'array',
      required: true,
      description: 'Table data rows',
    },
    {
      name: 'pagination',
      type: 'boolean',
      default: true,
      description: 'Enable pagination',
    },
  ],
  category: 'data',
});
```

### Update AI Prompt

Add component to AI's understanding:

```typescript
// core/prompt-builder.ts
export function buildSystemPrompt(options: GenerateOptions): string {
  const components = ComponentRegistry.getInstance().getAll();
  
  const componentDescriptions = components.map(c => ({
    type: c.type,
    name: c.name,
    description: c.description,
    props: c.propTypes,
  }));
  
  return `You are a UI designer. You can use these components:
${JSON.stringify(componentDescriptions, null, 2)}

When creating designs, use appropriate components from this list.`;
}
```

## Creating Export Formats

### Framework Adapter

Create an adapter for a new framework:

```typescript
// adapters/svelte.ts
import { FrameworkAdapter, UIElement, ExportOptions } from 'react-design-editor';

export class SvelteAdapter implements FrameworkAdapter {
  name = 'svelte';
  extension = '.svelte';
  
  generateComponent(element: UIElement): string {
    return `
<script>
  ${this.generateScript(element)}
</script>

${this.generateTemplate(element)}

<style>
  ${this.generateStyles(element)}
</style>
`;
  }
  
  private generateScript(element: UIElement): string {
    return `
  export let ${element.id}Props = ${JSON.stringify(element.props)};
`;
  }
  
  private generateTemplate(element: UIElement): string {
    const tag = this.getHtmlTag(element.type);
    const attrs = this.generateAttributes(element);
    const children = element.children
      ?.map(child => this.generateTemplate(child))
      .join('\n') || '';
    
    return `
<${tag} ${attrs}>
  ${children}
</${tag}>
`;
  }
  
  private generateStyles(element: UIElement): string {
    const styles = Object.entries(element.style)
      .map(([key, value]) => `${this.cssProperty(key)}: ${value};`)
      .join('\n  ');
    
    return `.${element.id} {
  ${styles}
}`;
  }
  
  private getHtmlTag(type: string): string {
    const mapping = {
      'container': 'div',
      'text': 'p',
      'button': 'button',
      'input': 'input',
      // ... more mappings
    };
    return mapping[type] || 'div';
  }
  
  private generateAttributes(element: UIElement): string {
    return `class="${element.id}"`;
  }
  
  private cssProperty(camelCase: string): string {
    return camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
  
  getImports(elements: UIElement[]): string[] {
    // Return necessary imports
    return [];
  }
}
```

### Register Adapter

```typescript
// core/export-registry.ts
import { ExportRegistry } from 'react-design-editor';
import { SvelteAdapter } from '../adapters/svelte';

const registry = ExportRegistry.getInstance();

registry.registerAdapter('svelte', new SvelteAdapter());
```

### Usage

```typescript
const code = exportDesignToCode(design, {
  framework: 'svelte',
  styling: 'css',
});
```

## Customizing AI Prompts

### Custom Prompt Templates

Create specialized prompts for specific use cases:

```typescript
// prompts/ecommerce.ts
export class EcommercePromptBuilder {
  build(userPrompt: string): string {
    return `You are designing an e-commerce interface.
    
Context:
- Users should be able to browse, search, and purchase products
- Include product images, prices, ratings
- Make checkout process clear and simple
- Show trust indicators (secure checkout, reviews)

User request: ${userPrompt}

Design guidelines:
- Use a clean, trustworthy aesthetic
- Prominent product images
- Clear pricing and CTAs
- Mobile-first approach
- Include cart summary

Return design as structured JSON.`;
  }
}
```

### Prompt Modifiers

Add contextual information to prompts:

```typescript
// core/prompt-modifier.ts
export interface PromptModifier {
  name: string;
  modify: (prompt: string, context: any) => string;
}

export const responsiveModifier: PromptModifier = {
  name: 'responsive',
  modify: (prompt: string, context: any) => {
    return `${prompt}

IMPORTANT: Make this design fully responsive.
- Desktop: Full layout with sidebars
- Tablet: Collapse sidebar to hamburger menu
- Mobile: Single column, stacked layout
Include appropriate breakpoints.`;
  },
};

export const accessibilityModifier: PromptModifier = {
  name: 'accessibility',
  modify: (prompt: string) => {
    return `${prompt}

IMPORTANT: Ensure accessibility:
- Sufficient color contrast (WCAG AA)
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly`;
  },
};

// Usage
import { applyModifiers } from 'react-design-editor';

const enhancedPrompt = applyModifiers(
  userPrompt,
  [responsiveModifier, accessibilityModifier],
  context
);
```

### Context Injection

Inject project-specific context:

```typescript
// core/context-builder.ts
export interface GenerationContext {
  projectName: string;
  brandColors: ColorScheme;
  designSystem?: DesignSystem;
  existingComponents?: string[];
}

export function buildContextualPrompt(
  prompt: string,
  context: GenerationContext
): string {
  return `Project: ${context.projectName}

Brand Colors:
${JSON.stringify(context.brandColors, null, 2)}

${context.designSystem ? `
Design System:
- Typography: ${context.designSystem.typography}
- Spacing: ${context.designSystem.spacing}
- Components: ${context.existingComponents?.join(', ')}
` : ''}

User Request: ${prompt}

Use the brand colors and follow the design system guidelines.`;
}
```

## Plugin Development

### Plugin Structure

```typescript
// plugins/custom-plugin/index.ts
import { Plugin, PluginConfig } from 'react-design-editor';

export interface MyPluginConfig {
  apiEndpoint?: string;
  customOption?: boolean;
}

export class MyPlugin implements Plugin {
  name = 'my-plugin';
  version = '1.0.0';
  private config: MyPluginConfig;
  
  constructor(config: MyPluginConfig = {}) {
    this.config = {
      apiEndpoint: 'https://api.example.com',
      customOption: false,
      ...config,
    };
  }
  
  async initialize() {
    console.log('Plugin initialized with config:', this.config);
  }
  
  async beforeGenerate(prompt: string, options: GenerateOptions) {
    // Your logic here
    return { prompt, options };
  }
  
  async afterGenerate(design: GeneratedDesign) {
    // Your logic here
    return design;
  }
  
  async cleanup() {
    console.log('Plugin cleanup');
  }
}

// Export factory function
export function createMyPlugin(config?: MyPluginConfig): Plugin {
  return new MyPlugin(config);
}
```

### Publishing a Plugin

1. **Create package:**
   ```bash
   mkdir react-design-editor-plugin-myplugin
   cd react-design-editor-plugin-myplugin
   npm init
   ```

2. **Add dependencies:**
   ```json
   {
     "peerDependencies": {
       "react-design-editor": "^0.0.76"
     }
   }
   ```

3. **Publish:**
   ```bash
   npm publish
   ```

4. **Usage:**
   ```bash
   npm install react-design-editor-plugin-myplugin
   ```
   
   ```typescript
   import { createMyPlugin } from 'react-design-editor-plugin-myplugin';
   
   const plugin = createMyPlugin({ customOption: true });
   ```

## Testing

### Unit Tests

```typescript
// __tests__/generator.test.ts
import { generateUIFromPrompt } from '../core/generator';
import { mockClaudeAPI } from './mocks';

describe('generateUIFromPrompt', () => {
  beforeEach(() => {
    mockClaudeAPI.reset();
  });
  
  it('should generate a simple form', async () => {
    const design = await generateUIFromPrompt(
      'Create a contact form',
      {
        apiKey: 'test-key',
        platform: 'web',
      }
    );
    
    expect(design.elements).toHaveLength(1);
    expect(design.elements[0].type).toBe('form');
  });
  
  it('should handle API errors', async () => {
    mockClaudeAPI.mockError(new Error('API Error'));
    
    await expect(
      generateUIFromPrompt('Create a form', { apiKey: 'test-key' })
    ).rejects.toThrow('API Error');
  });
});
```

### Integration Tests

```typescript
// __tests__/integration/export.test.ts
import { generateUIFromPrompt, exportDesignToCode } from '../../src';

describe('Full workflow', () => {
  it('should generate and export React code', async () => {
    const design = await generateUIFromPrompt(
      'Create a button',
      { apiKey: process.env.TEST_API_KEY }
    );
    
    const code = exportDesignToCode(design, {
      framework: 'react',
      styling: 'css',
    });
    
    expect(code.component).toContain('function');
    expect(code.component).toContain('button');
    expect(code.styles).toBeTruthy();
  });
});
```

### E2E Tests

```typescript
// e2e/generation.spec.ts
import { test, expect } from '@playwright/test';

test('should generate UI from prompt', async ({ page }) => {
  await page.goto('http://localhost:4000');
  
  // Navigate to AI UI Generator
  await page.click('text=AI UI Generator');
  
  // Enter prompt
  await page.fill('[data-testid="prompt-input"]', 'Create a login form');
  
  // Generate
  await page.click('[data-testid="generate-button"]');
  
  // Wait for result
  await page.waitForSelector('[data-testid="design-preview"]');
  
  // Verify
  const preview = await page.$('[data-testid="design-preview"]');
  expect(preview).toBeTruthy();
});
```

## Contributing

### Code Style

Follow the existing code style:
- Use TypeScript
- Follow Airbnb style guide
- Use Prettier for formatting
- Write meaningful commit messages

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Make** your changes
4. **Test** thoroughly
5. **Commit**: `git commit -m "feat: add my feature"`
6. **Push**: `git push origin feature/my-feature`
7. **Create** a pull request

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Example:
```
feat(export): add Svelte adapter

- Implement SvelteAdapter class
- Add template generation
- Add style scoping
- Update export registry

Closes #123
```

### Testing Requirements

All PRs must:
- Pass existing tests
- Add tests for new features
- Maintain or improve code coverage
- Pass linting checks

### Documentation Requirements

All PRs should:
- Update relevant documentation
- Add JSDoc comments
- Include usage examples
- Update CHANGELOG.md

## Advanced Topics

### Performance Optimization

```typescript
// utils/performance.ts
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive operations
export const MemoizedComponent = memo(({ design }) => {
  const processedDesign = useMemo(
    () => processDesign(design),
    [design]
  );
  
  const handleUpdate = useCallback(
    (element) => {
      updateElement(element);
    },
    []
  );
  
  return <DesignPreview design={processedDesign} onUpdate={handleUpdate} />;
});
```

### Caching Strategy

```typescript
// core/cache.ts
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, GeneratedDesign>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour
});

export async function generateWithCache(
  prompt: string,
  options: GenerateOptions
): Promise<GeneratedDesign> {
  const key = `${prompt}-${JSON.stringify(options)}`;
  
  const cached = cache.get(key);
  if (cached) return cached;
  
  const design = await generateUIFromPrompt(prompt, options);
  cache.set(key, design);
  
  return design;
}
```

### Error Handling

```typescript
// core/error-handler.ts
export class ErrorHandler {
  static handle(error: Error, context: any) {
    if (error instanceof APIKeyError) {
      this.handleAPIKeyError(error);
    } else if (error instanceof NetworkError) {
      this.handleNetworkError(error, context);
    } else {
      this.handleGenericError(error);
    }
  }
  
  private static handleAPIKeyError(error: APIKeyError) {
    console.error('API Key Error:', error.message);
    // Show user-friendly message
    // Guide to fix API key
  }
  
  private static handleNetworkError(error: NetworkError, context: any) {
    console.error('Network Error:', error.message);
    // Implement retry logic
    // Show network status
  }
}
```

## Resources

- [API Reference](../api/ai-ui-generator.md)
- [Architecture Documentation](../architecture/ai-ui-generator.md)
- [User Guide](ai-ui-generator-user-guide.md)
- [Example Prompts](../examples/prompt-library.md)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [GitHub Repository](https://github.com/salgum1114/react-design-editor)

## Support

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Features**: Open a GitHub Issue with enhancement label
- **Security**: Email security@example.com

Happy coding! 🚀
