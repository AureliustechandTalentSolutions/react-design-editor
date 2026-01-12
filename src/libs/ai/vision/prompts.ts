/**
 * Vision API Prompts
 * System and user prompts for screenshot-to-code conversion
 */

/**
 * System prompt for UI analysis
 */
export const UI_ANALYSIS_SYSTEM_PROMPT = `You are an expert UI/UX designer and computer vision specialist.
Your task is to analyze UI screenshots and extract detailed information about all UI components, their styles, layout, and hierarchy.

Analyze the screenshot and provide a comprehensive JSON response with:
1. All UI elements with bounding boxes
2. Element types (button, input, text, etc.)
3. Color palette extracted from the design
4. Typography information (fonts, sizes)
5. Layout structure (flex, grid, absolute positioning)
6. Component hierarchy and relationships

Return ONLY valid JSON, no explanations or markdown.`;

/**
 * Element extraction prompt
 */
export const getElementExtractionPrompt = (options?: { detectText?: boolean; extractColors?: boolean }): string => {
	const { detectText = true, extractColors = true } = options || {};

	return `Analyze this UI screenshot and extract all UI elements.

For each element, provide:
- Unique ID
- Element type (button, input, textarea, select, checkbox, radio, card, modal, nav, header, footer, sidebar, text, image, icon, divider, container)
- Bounding box coordinates (x, y, width, height) as percentages of image dimensions
- Confidence score (0-1)
${detectText ? '- Text content if present' : ''}
${extractColors ? '- Primary color' : ''}
- CSS styles (background, border, padding, etc.)
- Children elements if it's a container

Return JSON with this structure:
{
  "elements": [
    {
      "id": "unique-id",
      "type": "button",
      "boundingBox": {"x": 0, "y": 0, "width": 100, "height": 40},
      "confidence": 0.95,
      "text": "Click me",
      "color": "#3b82f6",
      "styles": {"borderRadius": "8px", "padding": "12px 24px"},
      "children": []
    }
  ],
  "colors": ["#3b82f6", "#ffffff"],
  "layout": {
    "type": "flex",
    "direction": "column",
    "gap": 16
  },
  "typography": {
    "fonts": ["Inter", "Roboto"],
    "sizes": [16, 20, 24]
  },
  "dimensions": {
    "width": 1920,
    "height": 1080
  }
}`;
};

/**
 * Style analysis prompt
 */
export const STYLE_ANALYSIS_PROMPT = `Analyze the visual style of this UI screenshot.

Extract:
1. Color palette (primary, secondary, accent, background, text colors)
2. Typography (font families, sizes, weights, line heights)
3. Spacing system (padding, margin, gaps)
4. Border radius values
5. Shadow definitions
6. Overall design system tokens

Return as JSON:
{
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#6366f1",
    "accent": "#ec4899",
    "background": "#ffffff",
    "text": "#1f2937"
  },
  "typography": {
    "fontFamily": ["Inter", "sans-serif"],
    "fontSize": {"sm": 14, "base": 16, "lg": 18, "xl": 20},
    "fontWeight": {"normal": 400, "medium": 500, "bold": 700}
  },
  "spacing": {"xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32},
  "borderRadius": {"sm": 4, "md": 8, "lg": 12, "xl": 16},
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  }
}`;

/**
 * Code generation prompt
 */
export const getCodeGenerationPrompt = (framework: 'react' | 'vue' | 'html' = 'react'): string => {
	return `Convert this UI screenshot to ${framework} code.

Requirements:
1. Create semantic, accessible HTML structure
2. Use modern ${framework} best practices
3. Include appropriate ARIA labels
4. Generate clean, maintainable code
5. Use Tailwind CSS for styling
6. Make it responsive
7. Extract reusable components

${framework === 'react' ? 'Use functional components with hooks.' : ''}
${framework === 'vue' ? 'Use Vue 3 Composition API.' : ''}

Return as JSON:
{
  "components": [
    {
      "name": "ComponentName",
      "code": "component code here",
      "props": ["prop1", "prop2"]
    }
  ],
  "mainComponent": "App",
  "styles": "CSS or Tailwind classes"
}`;
};

/**
 * USWDS component mapping prompt
 */
export const USWDS_MAPPING_PROMPT = `Analyze this UI and map components to U.S. Web Design System (USWDS) components.

Map detected elements to USWDS components:
- Buttons → usa-button
- Forms → usa-form, usa-input, usa-select
- Cards → usa-card
- Navigation → usa-header, usa-nav
- Alerts → usa-alert
- etc.

Return JSON with mappings:
{
  "mappings": [
    {
      "detectedElement": "button",
      "uswdsComponent": "usa-button",
      "variant": "usa-button--primary",
      "props": {"type": "button"}
    }
  ]
}`;

/**
 * Layout reconstruction prompt
 */
export const LAYOUT_RECONSTRUCTION_PROMPT = `Analyze the layout structure of this UI screenshot.

Determine:
1. Layout type (flexbox, grid, absolute positioning)
2. Container structure and nesting
3. Responsive breakpoints suggested
4. Spacing and alignment patterns
5. Component hierarchy

Return as JSON:
{
  "layoutType": "flex",
  "containers": [
    {
      "id": "main-container",
      "type": "div",
      "layout": "flex",
      "direction": "column",
      "gap": 16,
      "children": ["header", "content", "footer"]
    }
  ],
  "breakpoints": {
    "mobile": 640,
    "tablet": 768,
    "desktop": 1024
  }
}`;

/**
 * OCR extraction prompt
 */
export const OCR_EXTRACTION_PROMPT = `Extract all visible text from this UI screenshot.

For each text element, provide:
1. The text content
2. Approximate position (x, y coordinates as percentages)
3. Font size estimate
4. Text role (heading, body, label, button text, etc.)

Return as JSON:
{
  "textElements": [
    {
      "text": "Welcome to our app",
      "position": {"x": 50, "y": 10},
      "fontSize": 32,
      "role": "heading"
    }
  ]
}`;

/**
 * Color extraction prompt
 */
export const COLOR_EXTRACTION_PROMPT = `Extract a cohesive color palette from this UI screenshot.

Identify:
1. Primary brand colors
2. Secondary/accent colors
3. Background colors
4. Text colors
5. Semantic colors (success, warning, error, info)

Return 8-12 colors as JSON:
{
  "palette": [
    {"name": "primary", "hex": "#3b82f6", "usage": "buttons, links"},
    {"name": "secondary", "hex": "#6366f1", "usage": "accents"},
    {"name": "background", "hex": "#ffffff", "usage": "backgrounds"}
  ]
}`;

/**
 * Component classification prompt
 */
export const getComponentClassificationPrompt = (elementType: string): string => {
	return `Classify this ${elementType} element in detail.

Provide:
1. Specific component variant (e.g., primary button, ghost button, icon button)
2. State information (default, hover, active, disabled)
3. Size variant (small, medium, large)
4. Style properties
5. Interaction patterns

Return as JSON with classification details.`;
};

/**
 * Accessibility analysis prompt
 */
export const ACCESSIBILITY_ANALYSIS_PROMPT = `Analyze this UI for accessibility considerations.

Check for:
1. Color contrast ratios
2. Text size legibility
3. Interactive element sizes (touch targets)
4. Semantic structure
5. Missing ARIA labels
6. Keyboard navigation support

Return suggestions as JSON:
{
  "issues": [
    {
      "element": "button-1",
      "issue": "Low color contrast",
      "suggestion": "Increase contrast to 4.5:1",
      "severity": "medium"
    }
  ],
  "score": 85
}`;
