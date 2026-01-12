# AI UI Generator Module

A powerful text-to-UI generation system that transforms natural language descriptions into complete, editable UI designs using Claude AI.

## Features

- 🎨 **Text-to-UI Generation**: Describe your UI in plain English
- ✨ **AI-Powered Refinement**: Fine-tune designs with natural language
- 🎭 **Style Exploration**: Multiple color palettes and typography options
- 📱 **Multi-Platform**: Web, mobile, tablet, and responsive designs
- 💻 **Code Export**: React, Vue, HTML/CSS with multiple styling options
- 🧩 **Component Library**: Pre-built draggable UI components

## Quick Start

### 1. Set up your API key

Create a `.env.local` file in the project root:

```env
ANTHROPIC_API_KEY=your-api-key-here
```

### 2. Navigate to AI UI Generator

Click the "AI UI Generator" tab in the editor navigation.

### 3. Generate your first UI

Type a description like:

> "Create a modern dashboard with a sidebar navigation, header with user profile, and a grid of KPI cards showing sales metrics"

### 4. Refine and Export

Use the AI assistant to refine specific elements, explore styles, and export to your preferred framework.

## Component Reference

### Core Components

#### `AIUIGenerator`

Main component that provides the AI UI generation interface.

**Props:**
- `apiKey: string` - Anthropic API key for Claude AI
- `onDesignGenerated?: (design: GeneratedDesign) => void` - Callback when design is generated
- `initialPrompt?: string` - Optional initial prompt to start with

**Example:**
```tsx
import { AIUIGenerator } from 'react-design-editor';

function App() {
  return (
    <AIUIGenerator
      apiKey={process.env.ANTHROPIC_API_KEY}
      onDesignGenerated={(design) => console.log('Generated:', design)}
    />
  );
}
```

#### `PromptInput`

Text input component for natural language UI descriptions.

**Props:**
- `value: string` - Current prompt text
- `onChange: (value: string) => void` - Change handler
- `onSubmit: () => void` - Submit handler
- `placeholder?: string` - Placeholder text
- `loading?: boolean` - Loading state

#### `StyleExplorer`

Component for browsing and applying different style presets.

**Props:**
- `currentStyle: StylePreset` - Currently applied style
- `onStyleChange: (style: StylePreset) => void` - Style change handler
- `styles: StylePreset[]` - Available style presets

#### `CodeExporter`

Export generated designs to various code formats.

**Props:**
- `design: GeneratedDesign` - The design to export
- `format: ExportFormat` - Export format (react, vue, html)
- `stylingOption: StylingOption` - CSS-in-JS, Tailwind, CSS modules, etc.

### Utility Components

#### `ComponentPalette`

Draggable component library for manual adjustments.

#### `DesignPreview`

Live preview of the generated UI design.

#### `RefinementChat`

Chat interface for iterative design refinements.

## API Reference

See [API Documentation](../../../docs/api/ai-ui-generator.md) for detailed API reference.

## Examples

### Basic Usage

```tsx
import { AIUIGenerator } from 'react-design-editor';

function MyApp() {
  const handleDesignGenerated = (design) => {
    console.log('New design:', design);
    // Save or process the design
  };

  return (
    <AIUIGenerator
      apiKey={process.env.ANTHROPIC_API_KEY}
      onDesignGenerated={handleDesignGenerated}
      initialPrompt="Create a landing page for a SaaS product"
    />
  );
}
```

### Advanced: Custom Style Presets

```tsx
import { AIUIGenerator, StylePreset } from 'react-design-editor';

const customStyles: StylePreset[] = [
  {
    name: 'Corporate Blue',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      scale: 1.2,
    },
  },
];

function MyApp() {
  return (
    <AIUIGenerator
      apiKey={process.env.ANTHROPIC_API_KEY}
      stylePresets={customStyles}
    />
  );
}
```

### Programmatic Generation

```tsx
import { generateUIFromPrompt } from 'react-design-editor';

async function generateDesign() {
  try {
    const design = await generateUIFromPrompt(
      'Create a login form with email and password',
      {
        style: 'modern',
        platform: 'web',
        framework: 'react',
      }
    );
    
    console.log('Generated design:', design);
  } catch (error) {
    console.error('Generation failed:', error);
  }
}
```

## Best Practices

### Writing Effective Prompts

1. **Be Specific**: Include details about layout, components, and functionality
   - ❌ "Create a dashboard"
   - ✅ "Create a dashboard with a left sidebar, top navigation bar, and a 3-column grid of metric cards"

2. **Mention Visual Style**: Describe colors, spacing, and design aesthetic
   - ✅ "Use a modern, minimalist design with blue accents and generous white space"

3. **Specify Components**: List the UI elements you need
   - ✅ "Include a search bar, filter dropdown, data table with pagination, and export button"

4. **Include Interactivity**: Describe user interactions when relevant
   - ✅ "Add a modal that opens when clicking the 'Add New' button"

### Iterative Refinement

Start with a broad description, then refine specific areas:

1. Generate initial design
2. Review the output
3. Use refinement prompts like:
   - "Make the header taller and add a logo on the left"
   - "Change the color scheme to use purple as the primary color"
   - "Add more spacing between the cards"

### Performance Tips

- Use `debounce` for real-time prompt updates
- Cache generated designs to avoid redundant API calls
- Preload common component templates
- Use optimistic UI updates during generation

## Troubleshooting

### Common Issues

**Issue: API key not found**
- Ensure `.env.local` file exists with `ANTHROPIC_API_KEY`
- Restart the development server after adding environment variables

**Issue: Generation takes too long**
- Complex UIs may take 10-30 seconds to generate
- Check your internet connection
- Consider simplifying the initial prompt

**Issue: Generated UI doesn't match prompt**
- Try rephrasing your prompt with more specific details
- Break complex UIs into multiple generation steps
- Use refinement prompts to adjust specific elements

**Issue: Export code doesn't work**
- Verify you've selected the correct framework
- Check that all required dependencies are installed
- Review the exported code for any missing imports

## Configuration

### Environment Variables

```env
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Optional
AIUI_MAX_TOKENS=4000
AIUI_MODEL=claude-3-sonnet-20240229
AIUI_TEMPERATURE=0.7
```

### Advanced Configuration

```tsx
import { AIUIGenerator, AIUIConfig } from 'react-design-editor';

const config: AIUIConfig = {
  model: 'claude-3-sonnet-20240229',
  maxTokens: 4000,
  temperature: 0.7,
  cacheResults: true,
  timeout: 30000,
};

<AIUIGenerator apiKey={apiKey} config={config} />
```

## Contributing

See [Developer Guide](../../../docs/guides/ai-ui-generator-developer-guide.md) for information on extending this module.

## License

MIT License - see LICENSE file for details

## Support

- [Documentation](../../../docs/api/ai-ui-generator.md)
- [User Guide](../../../docs/guides/ai-ui-generator-user-guide.md)
- [Examples](../../../docs/examples/prompt-library.md)
- [GitHub Issues](https://github.com/salgum1114/react-design-editor/issues)
