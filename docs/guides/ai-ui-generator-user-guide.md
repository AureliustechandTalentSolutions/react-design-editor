# AI UI Generator User Guide

Welcome to the AI UI Generator! This comprehensive guide will help you create stunning UI designs using natural language.

## Table of Contents

- [Getting Started](#getting-started)
- [Basic Workflows](#basic-workflows)
- [Writing Effective Prompts](#writing-effective-prompts)
- [Style Customization](#style-customization)
- [Refining Designs](#refining-designs)
- [Exporting Your Work](#exporting-your-work)
- [Tips and Best Practices](#tips-and-best-practices)
- [Troubleshooting](#troubleshooting)
- [FAQs](#faqs)

## Getting Started

### Prerequisites

- Node.js 14 or higher
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Anthropic API key ([Get one here](https://www.anthropic.com))

### Installation

1. **Install the package:**
   ```bash
   npm install react-design-editor
   # or
   yarn add react-design-editor
   ```

2. **Set up your API key:**
   
   Create a `.env.local` file in your project root:
   ```env
   ANTHROPIC_API_KEY=sk-ant-your-api-key-here
   ```

3. **Import and use:**
   ```tsx
   import { AIUIGenerator } from 'react-design-editor';
   
   function App() {
     return <AIUIGenerator apiKey={process.env.ANTHROPIC_API_KEY} />;
   }
   ```

### First Launch

When you first open the AI UI Generator:

1. The interface will show a prompt input area
2. Example prompts are displayed for inspiration
3. Style presets are available in the sidebar
4. The canvas area is ready for your generated design

## Basic Workflows

### Workflow 1: Quick UI Generation

**Goal:** Create a simple login form

1. **Enter your prompt:**
   ```
   Create a modern login form with email and password fields, 
   a remember me checkbox, and a login button
   ```

2. **Click Generate** or press `Ctrl+Enter`

3. **Wait** for the AI to generate your design (5-15 seconds)

4. **Review** the generated UI in the preview area

5. **Export** if satisfied, or refine further

### Workflow 2: Iterative Refinement

**Goal:** Create and refine a dashboard

1. **Initial Generation:**
   ```
   Create a dashboard with a sidebar and main content area
   ```

2. **First Refinement:**
   ```
   Add a navigation bar at the top with a logo and user profile menu
   ```

3. **Second Refinement:**
   ```
   Add 4 metric cards in a grid layout in the main content area
   ```

4. **Style Adjustment:**
   ```
   Use a blue color scheme with white cards
   ```

5. **Final Touch:**
   ```
   Add more spacing between elements
   ```

### Workflow 3: Style Exploration

**Goal:** Find the perfect style for your design

1. **Generate base design:**
   ```
   Create a product landing page with hero section and features
   ```

2. **Open Style Explorer** from the sidebar

3. **Browse presets:**
   - Modern Minimalist
   - Bold & Colorful
   - Corporate Professional
   - Soft & Friendly

4. **Click on presets** to preview them on your design

5. **Select your favorite** and continue editing

## Writing Effective Prompts

### Anatomy of a Good Prompt

A well-structured prompt includes:

1. **Page Type:** "Create a [type of page]"
2. **Layout:** "with a [layout description]"
3. **Components:** "including [list of components]"
4. **Style:** "using a [style description]"
5. **Specifics:** "with [specific requirements]"

### Examples by Detail Level

#### Basic Prompt
```
Create a contact form
```
**Result:** Simple form with name, email, and message fields

#### Detailed Prompt
```
Create a contact form with name, email, phone, and message fields,
a submit button, and a privacy policy checkbox
```
**Result:** More complete form with specified fields

#### Comprehensive Prompt
```
Create a modern contact form with the following:
- Fields: Full name, email address, phone number, and message textarea
- A checkbox for subscribing to newsletter
- A blue submit button with rounded corners
- Validation indicators for required fields
- A privacy policy link at the bottom
- Use a clean, minimalist design with plenty of white space
```
**Result:** Fully specified form exactly matching requirements

### Prompt Templates

#### Landing Page
```
Create a [product type] landing page with:
- Hero section with headline, subheading, and CTA button
- Features section with 3-4 feature cards
- Social proof section with testimonials
- Pricing section with 3 tiers
- Footer with links and contact info
Style: [modern/corporate/playful/minimal]
```

#### Dashboard
```
Create a [type] dashboard with:
- Top navigation bar with logo, search, and user menu
- Left sidebar with navigation links
- Main content area with:
  - [number] KPI cards at the top
  - [type of chart/graph] in the center
  - [additional components]
Style: Use [color scheme] colors
```

#### E-commerce Page
```
Create a product page for [product type] with:
- Product image gallery on the left
- Product details on the right: title, price, rating, description
- Add to cart and buy now buttons
- Size/color selectors if applicable
- Related products section below
- Customer reviews section
Style: [modern/elegant/fun]
```

#### Authentication
```
Create a [login/signup] page with:
- [Company name] logo at the top
- [Fields needed]
- Social login options: [Google/Facebook/etc]
- Forgot password link
- [Sign up/Login] link at the bottom
Style: [centered/split screen] layout, [color scheme]
```

### Prompt Keywords

**Layout Keywords:**
- centered, split-screen, sidebar, full-width, grid, columns
- card-based, list-view, masonry, flex

**Style Keywords:**
- modern, minimalist, corporate, playful, elegant, bold
- clean, vibrant, muted, gradient, flat, neumorphic

**Component Keywords:**
- navbar, sidebar, header, footer, hero, card, modal
- form, table, chart, gallery, carousel, tabs

**Spacing Keywords:**
- compact, spacious, generous padding, tight spacing
- breathing room, dense, airy

**Color Keywords:**
- blue/red/green accent, monochrome, colorful, neutral
- dark mode, light theme, high contrast

## Style Customization

### Using Style Presets

1. **Open Style Explorer** in the sidebar
2. **Preview** by clicking on preset thumbnails
3. **Apply** by clicking "Apply Style"
4. **Customize** further using the color picker

### Creating Custom Styles

1. Click **"Create Custom Style"** in Style Explorer
2. **Name your style** (e.g., "My Brand Colors")
3. **Set colors:**
   - Primary color
   - Secondary color
   - Background colors
   - Text colors
4. **Configure typography:**
   - Font family
   - Font scale
   - Font weights
5. **Set spacing:**
   - Base spacing unit
   - Spacing scale
6. **Save** your custom style

### Style Properties

**Colors:**
- Primary: Main brand color
- Secondary: Accent color
- Background: Page background
- Surface: Card/component background
- Text: Primary text color
- Text Secondary: Muted text
- Border: Border color
- Success/Error/Warning/Info: Status colors

**Typography:**
- Font Family: Main typeface
- Scale: Size multiplier (1.0 = base, 1.25 = larger)
- Weights: Light, Regular, Medium, Semibold, Bold

**Spacing:**
- Scale: xs, sm, md, lg, xl, 2xl (in pixels or rem)

**Effects:**
- Border Radius: Corner roundness
- Shadows: Elevation levels
- Animations: Transition settings

## Refining Designs

### Using the Refinement Chat

The Refinement Chat allows iterative improvements:

1. **Open chat** by clicking the chat icon
2. **Type refinement instructions:**
   - "Make the header taller"
   - "Change button color to green"
   - "Add more cards in the features section"
3. **Submit** and wait for update
4. **Review changes** in the preview
5. **Continue refining** or undo if needed

### Common Refinement Patterns

#### Layout Changes
```
Move the sidebar to the right
Make the content area wider
Add a footer at the bottom
Change from 3 columns to 4 columns
```

#### Style Changes
```
Make all buttons rounded
Increase font size throughout
Use more vibrant colors
Add shadows to cards
Reduce spacing between elements
```

#### Content Changes
```
Add a logo in the header
Include social media icons
Add more placeholder text
Include image placeholders
Add a search bar
```

#### Component Changes
```
Change the contact form to a newsletter signup
Replace the carousel with a static image
Turn the card grid into a list view
Add pagination to the table
```

### Manual Editing

For precise control:

1. **Select an element** on the canvas
2. **Edit properties** in the property panel:
   - Position and size
   - Colors and typography
   - Spacing and borders
3. **Drag components** from the component palette
4. **Use alignment tools** for precise positioning

## Exporting Your Work

### Export Options

#### Framework Selection

Choose your target framework:
- **React** - Components with JSX
- **Vue** - Single File Components (.vue)
- **HTML/CSS** - Static HTML with CSS

#### Styling Options

Select how styles are implemented:
- **CSS** - Separate CSS file
- **CSS Modules** - Scoped CSS
- **Tailwind** - Utility classes
- **Styled Components** - CSS-in-JS
- **Emotion** - CSS-in-JS alternative

### Export Process

1. **Click Export** in the toolbar
2. **Select framework** (React/Vue/HTML)
3. **Choose styling option**
4. **Configure options:**
   - Include TypeScript (React/Vue)
   - Include comments
   - Format code
   - Minify
5. **Click Generate Code**
6. **Review code** in the preview
7. **Download** or **Copy to clipboard**

### Using Exported Code

#### React Example

```bash
# Install dependencies
npm install react react-dom

# For Tailwind
npm install -D tailwindcss

# For Styled Components
npm install styled-components
```

Copy the exported code into your React project:

```tsx
// Import the component
import { GeneratedComponent } from './GeneratedComponent';

function App() {
  return <GeneratedComponent />;
}
```

#### Vue Example

```bash
# Install dependencies
npm install vue

# Copy .vue file to your components folder
# Import and use
```

```vue
<template>
  <GeneratedComponent />
</template>

<script>
import GeneratedComponent from './GeneratedComponent.vue';

export default {
  components: {
    GeneratedComponent,
  },
};
</script>
```

#### HTML Example

1. Save HTML file
2. Save CSS file
3. Link CSS in HTML:
```html
<link rel="stylesheet" href="styles.css">
```
4. Open in browser

## Tips and Best Practices

### Prompt Writing Tips

1. **Start Broad, Then Refine**
   - Begin with overall structure
   - Add details in refinement steps
   - Polish styling last

2. **Be Specific About Counts**
   - "3 cards" not "some cards"
   - "4-column grid" not "grid layout"

3. **Mention Responsive Behavior**
   - "Mobile-friendly"
   - "Responsive grid that collapses on mobile"

4. **Reference Common Patterns**
   - "Like Stripe's pricing page"
   - "Similar to Apple's product pages"

5. **Use Design Terminology**
   - "Hero section" not "top part"
   - "CTA button" not "action button"

### Design Tips

1. **Maintain Consistency**
   - Use the same style preset throughout
   - Keep spacing consistent
   - Use color palette coherently

2. **Consider Accessibility**
   - Ensure sufficient color contrast
   - Include proper ARIA labels
   - Provide keyboard navigation

3. **Think Mobile-First**
   - Design for small screens first
   - Use responsive components
   - Test at different viewports

4. **Use White Space**
   - Don't overcrowd designs
   - Let elements breathe
   - Group related items

### Performance Tips

1. **Cache Results**
   - Designs are auto-saved locally
   - Reuse previous generations

2. **Use Templates**
   - Start from saved templates
   - Modify rather than regenerate

3. **Batch Refinements**
   - Make multiple changes in one prompt
   - Reduces API calls

## Troubleshooting

### Common Issues

#### Issue: "API Key Invalid"

**Solution:**
1. Check `.env.local` file exists
2. Verify API key is correct
3. Ensure no extra spaces in key
4. Restart development server

#### Issue: "Generation Failed"

**Possible Causes:**
- Network connectivity issues
- API rate limits exceeded
- Invalid prompt format

**Solutions:**
- Check internet connection
- Wait a few minutes and retry
- Simplify prompt and try again

#### Issue: "Export Not Working"

**Solutions:**
1. Ensure framework is selected
2. Check browser allows downloads
3. Try "Copy to Clipboard" instead
4. Check browser console for errors

#### Issue: "Design Looks Different Than Expected"

**Solutions:**
1. Rephrase prompt with more details
2. Use refinement chat to adjust
3. Manually edit in the editor
4. Try different style presets

#### Issue: "Slow Performance"

**Solutions:**
1. Clear browser cache
2. Reduce design complexity
3. Close other browser tabs
4. Use a more powerful device

### Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| `APIKeyError` | Invalid or missing API key | Check API key configuration |
| `NetworkError` | Connection failed | Check internet connection |
| `RateLimitError` | Too many requests | Wait before retrying |
| `ValidationError` | Invalid input | Check prompt format |
| `GenerationError` | AI generation failed | Simplify prompt, retry |

### Getting Help

- **Documentation**: [Full API Reference](../api/ai-ui-generator.md)
- **Examples**: [Prompt Library](../examples/prompt-library.md)
- **GitHub Issues**: Report bugs and request features
- **Community**: Join discussions on Discord/Slack

## FAQs

### General Questions

**Q: How much does it cost?**
A: The AI UI Generator uses the Anthropic API, which has its own pricing. Check [Anthropic's pricing page](https://www.anthropic.com/pricing) for details.

**Q: Can I use this commercially?**
A: Yes, the generated code is yours to use commercially. Check the license for details.

**Q: Does it work offline?**
A: No, an internet connection is required to communicate with the Claude AI API.

**Q: What languages are supported?**
A: Prompts can be in English. Code can be exported for React, Vue, or HTML.

### Technical Questions

**Q: Can I self-host this?**
A: Yes, the entire system can be self-hosted. You'll need your own Anthropic API key.

**Q: What browsers are supported?**
A: Modern versions of Chrome, Firefox, Safari, and Edge.

**Q: Can I integrate this into my own app?**
A: Yes! See the [Developer Guide](ai-ui-generator-developer-guide.md) for integration instructions.

**Q: How do I report bugs?**
A: Open an issue on [GitHub](https://github.com/salgum1114/react-design-editor/issues).

### Design Questions

**Q: Can I import my own design system?**
A: Yes, create custom style presets with your brand colors and typography.

**Q: Can I save my designs?**
A: Yes, designs are automatically saved to browser storage. You can also export JSON.

**Q: Can multiple people work on the same design?**
A: Not yet, but collaborative editing is planned for a future release.

**Q: How accurate are the generated designs?**
A: Very accurate for well-structured prompts. Complex layouts may need refinement.

## Next Steps

- Explore the [Prompt Library](../examples/prompt-library.md) for inspiration
- Read the [Developer Guide](ai-ui-generator-developer-guide.md) to extend functionality
- Check out the [API Reference](../api/ai-ui-generator.md) for programmatic use
- Review [Architecture Documentation](../architecture/ai-ui-generator.md) for system details

Happy designing! 🎨
