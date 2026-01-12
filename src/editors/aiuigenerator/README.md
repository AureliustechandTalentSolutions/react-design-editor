# AI UI Generator

An AI-powered UI design generation module that enables users to create complete UI designs from natural language descriptions, integrated with the react-design-editor canvas.

## Features

- **Text-to-UI Generation**: Describe your UI in natural language and let AI generate the design
- **Prompt Templates**: Quick-start templates for common UI patterns (Landing Pages, Dashboards, Forms, etc.)
- **Component Library**: Drag-and-drop UI components organized by category
- **Style Explorer**: Pre-built color palettes and typography presets
- **AI Assistant**: Quick actions for design refinement and improvements
- **Code Export**: Export designs to React, Vue, Next.js, or HTML/CSS
- **Multiple Styling Options**: Support for Tailwind CSS, CSS Modules, Styled Components, or plain CSS

## Usage

### Basic Workflow

1. **Navigate to AI UI Generator**: Click the "AI UI Generator" tab in the main navigation
2. **Enter a Prompt**: Describe the UI you want to create in the prompt input
3. **Configure Options**: Select style, platform, and complexity
4. **Generate**: Click "Generate UI Design" to create your UI
5. **Refine**: Use the AI Assistant for quick refinements
6. **Export**: Export your design to code in your preferred framework

### Prompt Examples

```
A modern landing page with a hero section featuring a headline, 
subheadline, CTA button, and an image. Include a features section 
with 3 feature cards and a footer.
```

```
An admin dashboard with a sidebar navigation, header with user profile, 
and main content area showing KPI cards, charts, and a data table.
```

```
A clean login form with email and password fields, a "Remember me" 
checkbox, "Forgot password?" link, and a login button. Include 
social login options.
```

### Generation Options

- **Style**: modern, minimal, corporate, playful, dark, glassmorphism
- **Platform**: web, mobile, tablet, responsive
- **Complexity**: simple, medium, complex
- **Color Scheme**: auto, light, dark, custom

### Component Library

Browse and add components by category:

- **Layout**: Page, Header, Footer, Sidebar, Grid
- **Forms**: Login Form, Register Form, Contact Form, Search, File Upload
- **Data Display**: Data Table, Card Grid, List, Chart, KPI Card
- **Navigation**: Navbar, Tabs, Breadcrumb, Pagination
- **Actions**: Button, Dropdown, Modal, Toast
- **E-commerce**: Product Card, Cart, Checkout, Price Display

### AI Assistant Quick Actions

- **Improve Contrast**: Enhance color contrast for better accessibility
- **Add Shadows**: Add subtle shadows to create depth
- **Improve Spacing**: Better visual hierarchy through spacing
- **Modernize**: Update design with modern UI patterns
- **Simplify**: Remove unnecessary elements
- **Make Responsive**: Optimize for responsiveness
- **Accessibility**: Improve with ARIA labels and semantic structure

### Code Export

Export your design to:

- **React** with TypeScript/JavaScript
- **Next.js** with various styling options
- **Vue 3** with Composition API
- **HTML/CSS** with semantic markup

Styling options:
- Tailwind CSS
- CSS Modules
- Styled Components
- Plain CSS

## API Configuration

### With Claude API Key

Set the `ANTHROPIC_API_KEY` or `REACT_APP_ANTHROPIC_API_KEY` environment variable:

```bash
ANTHROPIC_API_KEY=your-api-key-here
```

### Demo Mode

Without an API key, the module runs in demo mode with:
- Mock design generation
- Sample layouts
- Full UI functionality
- Limited AI refinement

## Architecture

```
src/editors/aiuigenerator/
├── AIUIEditor.tsx         # Main editor component
├── PromptInput.tsx        # Natural language input
├── ComponentLibrary.tsx   # Draggable components
├── AIAssistant.tsx        # Quick actions panel
├── StyleExplorer.tsx      # Color & typography
├── PropertiesPanel.tsx    # Object properties
├── LayersPanel.tsx        # Layer hierarchy
├── CodePreview.tsx        # Code display
├── ExportPanel.tsx        # Export options
└── index.tsx              # Module exports
```

## Dependencies

- `@anthropic-ai/sdk`: Claude AI integration
- `prismjs` / `react-syntax-highlighter`: Code highlighting
- `framer-motion`: Animations (optional)
- `zustand`: State management (optional)

## Development Tips

1. **Specific Prompts**: Be detailed in your descriptions for better results
2. **Iterate**: Use quick actions to refine generated designs
3. **Templates**: Start with templates and customize
4. **Components**: Mix generated designs with manual components
5. **Export Early**: Export to code frequently to see the results

## Limitations

- AI generation quality depends on the Claude API
- Complex layouts may need manual refinement
- Demo mode provides simplified mock designs
- Generated code may need adjustment for production use

## Future Enhancements

- Real-time collaboration
- Design version history
- More component templates
- Advanced AI refinement options
- Integration with design systems
- A/B testing variations
- Accessibility scoring
- Performance optimization suggestions

## Support

For issues or questions:
- Check the documentation
- Review prompt examples
- Try demo mode first
- Ensure API key is configured correctly

## License

MIT License - See repository LICENSE file
