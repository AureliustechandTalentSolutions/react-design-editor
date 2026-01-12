# AI UI Generator API Reference

Complete API documentation for the AI UI Generator module.

## Table of Contents

- [Core Functions](#core-functions)
- [Components](#components)
- [Types](#types)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Error Handling](#error-handling)

## Core Functions

### `generateUIFromPrompt`

Generates a UI design from a natural language prompt using Claude AI.

**Signature:**
```typescript
async function generateUIFromPrompt(
  prompt: string,
  options: GenerateOptions
): Promise<GeneratedDesign>
```

**Parameters:**
- `prompt: string` - Natural language description of the desired UI
- `options: GenerateOptions` - Generation configuration options
  - `style?: StylePreset` - Visual style preset to apply
  - `platform?: Platform` - Target platform ('web' | 'mobile' | 'tablet' | 'responsive')
  - `framework?: Framework` - Export framework ('react' | 'vue' | 'html')
  - `apiKey: string` - Anthropic API key
  - `model?: string` - Claude model to use (default: 'claude-3-sonnet-20240229')
  - `maxTokens?: number` - Maximum tokens for response (default: 4000)
  - `temperature?: number` - Generation temperature 0-1 (default: 0.7)

**Returns:**
`Promise<GeneratedDesign>` - The generated UI design

**Throws:**
- `APIKeyError` - If API key is invalid or missing
- `GenerationError` - If generation fails
- `NetworkError` - If network request fails

**Example:**
```typescript
import { generateUIFromPrompt } from 'react-design-editor';

try {
  const design = await generateUIFromPrompt(
    'Create a login form with email and password fields',
    {
      style: 'modern',
      platform: 'web',
      framework: 'react',
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  );
  
  console.log('Generated design:', design);
} catch (error) {
  if (error instanceof APIKeyError) {
    console.error('Invalid API key');
  } else if (error instanceof GenerationError) {
    console.error('Generation failed:', error.message);
  }
}
```

### `refineDesign`

Refines an existing design based on natural language instructions.

**Signature:**
```typescript
async function refineDesign(
  design: GeneratedDesign,
  refinementPrompt: string,
  options: RefineOptions
): Promise<GeneratedDesign>
```

**Parameters:**
- `design: GeneratedDesign` - The existing design to refine
- `refinementPrompt: string` - Instructions for refinement
- `options: RefineOptions` - Refinement configuration
  - `apiKey: string` - Anthropic API key
  - `preserveLayout?: boolean` - Whether to keep overall layout (default: true)
  - `model?: string` - Claude model to use

**Returns:**
`Promise<GeneratedDesign>` - The refined design

**Example:**
```typescript
const refinedDesign = await refineDesign(
  existingDesign,
  'Make the header taller and add a logo',
  { apiKey: process.env.ANTHROPIC_API_KEY }
);
```

### `exportDesignToCode`

Exports a generated design to code in the specified framework.

**Signature:**
```typescript
function exportDesignToCode(
  design: GeneratedDesign,
  options: ExportOptions
): ExportedCode
```

**Parameters:**
- `design: GeneratedDesign` - The design to export
- `options: ExportOptions` - Export configuration
  - `framework: Framework` - Target framework
  - `styling: StylingOption` - Styling approach ('css' | 'tailwind' | 'css-modules' | 'styled-components' | 'emotion')
  - `includeComments?: boolean` - Add explanatory comments (default: true)
  - `typescript?: boolean` - Use TypeScript (default: false)

**Returns:**
`ExportedCode` - Object containing generated code files

**Example:**
```typescript
const code = exportDesignToCode(design, {
  framework: 'react',
  styling: 'tailwind',
  typescript: true,
});

console.log(code.component); // React component code
console.log(code.styles);    // Stylesheet
console.log(code.types);     // TypeScript types
```

### `applyStylePreset`

Applies a style preset to a design.

**Signature:**
```typescript
function applyStylePreset(
  design: GeneratedDesign,
  preset: StylePreset
): GeneratedDesign
```

**Parameters:**
- `design: GeneratedDesign` - The design to style
- `preset: StylePreset` - Style preset to apply

**Returns:**
`GeneratedDesign` - Design with applied styles

**Example:**
```typescript
const styledDesign = applyStylePreset(design, {
  name: 'Ocean Blue',
  colors: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    background: '#f0f9ff',
    text: '#0c4a6e',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    scale: 1.125,
  },
});
```

## Components

### `AIUIGenerator`

Main component providing the complete AI UI generation interface.

**Props:**
```typescript
interface AIUIGeneratorProps {
  apiKey: string;
  onDesignGenerated?: (design: GeneratedDesign) => void;
  onDesignRefined?: (design: GeneratedDesign) => void;
  onExport?: (code: ExportedCode) => void;
  initialPrompt?: string;
  stylePresets?: StylePreset[];
  config?: AIUIConfig;
  className?: string;
}
```

**Example:**
```tsx
<AIUIGenerator
  apiKey={process.env.ANTHROPIC_API_KEY}
  onDesignGenerated={handleGenerate}
  initialPrompt="Create a dashboard"
  stylePresets={customStyles}
/>
```

### `PromptInput`

Input component for natural language prompts.

**Props:**
```typescript
interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  maxLength?: number;
  showExamples?: boolean;
}
```

### `StyleExplorer`

Component for exploring and applying style presets.

**Props:**
```typescript
interface StyleExplorerProps {
  currentStyle: StylePreset;
  onStyleChange: (style: StylePreset) => void;
  styles: StylePreset[];
  allowCustom?: boolean;
  onCreateCustom?: (style: StylePreset) => void;
}
```

### `CodeExporter`

Export UI designs to code.

**Props:**
```typescript
interface CodeExporterProps {
  design: GeneratedDesign;
  onExport: (code: ExportedCode) => void;
  defaultFramework?: Framework;
  defaultStyling?: StylingOption;
  showPreview?: boolean;
}
```

### `ComponentPalette`

Draggable component library.

**Props:**
```typescript
interface ComponentPaletteProps {
  components: Component[];
  onDragStart?: (component: Component) => void;
  onDragEnd?: (component: Component) => void;
  filter?: string;
  categories?: string[];
}
```

### `DesignPreview`

Live preview of generated designs.

**Props:**
```typescript
interface DesignPreviewProps {
  design: GeneratedDesign;
  interactive?: boolean;
  scale?: number;
  showGrid?: boolean;
  showGuides?: boolean;
  onElementSelect?: (element: UIElement) => void;
}
```

### `RefinementChat`

Chat interface for design refinement.

**Props:**
```typescript
interface RefinementChatProps {
  design: GeneratedDesign;
  onRefine: (prompt: string) => Promise<void>;
  history?: Message[];
  loading?: boolean;
}
```

## Types

### `GeneratedDesign`

```typescript
interface GeneratedDesign {
  id: string;
  prompt: string;
  elements: UIElement[];
  layout: Layout;
  style: StylePreset;
  metadata: {
    generatedAt: Date;
    model: string;
    platform: Platform;
    framework: Framework;
  };
}
```

### `UIElement`

```typescript
interface UIElement {
  id: string;
  type: ElementType;
  props: Record<string, any>;
  children?: UIElement[];
  style: ElementStyle;
  position: Position;
  size: Size;
}

type ElementType = 
  | 'container'
  | 'text'
  | 'button'
  | 'input'
  | 'image'
  | 'card'
  | 'navbar'
  | 'sidebar'
  | 'footer'
  | 'table'
  | 'form'
  | 'modal';
```

### `StylePreset`

```typescript
interface StylePreset {
  name: string;
  colors: ColorScheme;
  typography: Typography;
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

interface Typography {
  fontFamily: string;
  scale: number;
  weights: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}
```

### `GenerateOptions`

```typescript
interface GenerateOptions {
  apiKey: string;
  style?: StylePreset | string;
  platform?: Platform;
  framework?: Framework;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

type Platform = 'web' | 'mobile' | 'tablet' | 'responsive';
type Framework = 'react' | 'vue' | 'html';
```

### `ExportOptions`

```typescript
interface ExportOptions {
  framework: Framework;
  styling: StylingOption;
  includeComments?: boolean;
  typescript?: boolean;
  formatCode?: boolean;
  minify?: boolean;
}

type StylingOption = 
  | 'css'
  | 'tailwind'
  | 'css-modules'
  | 'styled-components'
  | 'emotion';
```

### `ExportedCode`

```typescript
interface ExportedCode {
  component: string;
  styles?: string;
  types?: string;
  dependencies: string[];
  instructions: string;
}
```

## Hooks

### `useAIUIGenerator`

Hook for managing AI UI generation state.

**Signature:**
```typescript
function useAIUIGenerator(
  apiKey: string,
  options?: UseAIUIGeneratorOptions
): UseAIUIGeneratorResult
```

**Returns:**
```typescript
interface UseAIUIGeneratorResult {
  design: GeneratedDesign | null;
  loading: boolean;
  error: Error | null;
  generate: (prompt: string, options?: GenerateOptions) => Promise<void>;
  refine: (prompt: string) => Promise<void>;
  reset: () => void;
}
```

**Example:**
```typescript
function MyComponent() {
  const { design, loading, error, generate, refine } = useAIUIGenerator(
    process.env.ANTHROPIC_API_KEY
  );

  const handleGenerate = async () => {
    await generate('Create a dashboard', {
      style: 'modern',
      platform: 'web',
    });
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && <Error message={error.message} />}
      {design && <DesignPreview design={design} />}
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}
```

### `useStylePresets`

Hook for managing style presets.

**Signature:**
```typescript
function useStylePresets(): UseStylePresetsResult

interface UseStylePresetsResult {
  presets: StylePreset[];
  currentPreset: StylePreset;
  setPreset: (preset: StylePreset) => void;
  createPreset: (preset: StylePreset) => void;
  deletePreset: (id: string) => void;
}
```

### `useCodeExport`

Hook for exporting designs to code.

**Signature:**
```typescript
function useCodeExport(
  design: GeneratedDesign | null
): UseCodeExportResult

interface UseCodeExportResult {
  exportToReact: (options?: ExportOptions) => ExportedCode;
  exportToVue: (options?: ExportOptions) => ExportedCode;
  exportToHTML: (options?: ExportOptions) => ExportedCode;
  download: (code: ExportedCode, filename: string) => void;
  copy: (code: ExportedCode) => Promise<void>;
}
```

## Utilities

### `validatePrompt`

Validates a UI generation prompt.

**Signature:**
```typescript
function validatePrompt(prompt: string): ValidationResult

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}
```

### `optimizeDesign`

Optimizes a generated design for performance.

**Signature:**
```typescript
function optimizeDesign(
  design: GeneratedDesign,
  options?: OptimizeOptions
): GeneratedDesign
```

### `mergeDesigns`

Merges multiple designs into one.

**Signature:**
```typescript
function mergeDesigns(
  designs: GeneratedDesign[],
  strategy: MergeStrategy
): GeneratedDesign

type MergeStrategy = 'combine' | 'overlay' | 'sequence';
```

## Error Handling

### Error Types

```typescript
class APIKeyError extends Error {
  constructor(message: string);
}

class GenerationError extends Error {
  constructor(message: string, cause?: Error);
  readonly retryable: boolean;
}

class NetworkError extends Error {
  constructor(message: string, statusCode?: number);
  readonly statusCode: number;
}

class ValidationError extends Error {
  constructor(message: string, field?: string);
  readonly field: string;
}

class ExportError extends Error {
  constructor(message: string, framework?: Framework);
  readonly framework: Framework;
}
```

### Error Handling Examples

```typescript
// Handle specific errors
try {
  const design = await generateUIFromPrompt(prompt, options);
} catch (error) {
  if (error instanceof APIKeyError) {
    console.error('Please set your Anthropic API key');
  } else if (error instanceof GenerationError && error.retryable) {
    console.error('Generation failed, retrying...');
    // Implement retry logic
  } else if (error instanceof NetworkError) {
    console.error(`Network error: ${error.statusCode}`);
  } else {
    console.error('Unexpected error:', error);
  }
}

// Use error boundary
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AIUIGenerator apiKey={apiKey} />
    </ErrorBoundary>
  );
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Free tier**: 10 requests per minute, 100 per hour
- **Pro tier**: 60 requests per minute, 1000 per hour

When rate limited, the API returns a `429` status code. Implement exponential backoff:

```typescript
async function generateWithRetry(
  prompt: string,
  options: GenerateOptions,
  maxRetries = 3
): Promise<GeneratedDesign> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateUIFromPrompt(prompt, options);
    } catch (error) {
      if (error instanceof NetworkError && error.statusCode === 429) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

## Best Practices

1. **Always validate API keys** before making requests
2. **Cache generated designs** to avoid redundant API calls
3. **Implement error boundaries** for graceful error handling
4. **Use debouncing** for real-time prompt updates
5. **Handle rate limiting** with exponential backoff
6. **Optimize designs** before export for better performance
7. **Validate prompts** before generation to catch issues early

## Version History

- **v1.0.0** - Initial release
  - Basic text-to-UI generation
  - React, Vue, and HTML export
  - Style presets
  
- **v1.1.0** - Enhanced features
  - Design refinement
  - Multi-platform support
  - Advanced styling options

## See Also

- [User Guide](../guides/ai-ui-generator-user-guide.md)
- [Developer Guide](../guides/ai-ui-generator-developer-guide.md)
- [Architecture Documentation](../architecture/ai-ui-generator.md)
- [Example Prompts](../examples/prompt-library.md)
