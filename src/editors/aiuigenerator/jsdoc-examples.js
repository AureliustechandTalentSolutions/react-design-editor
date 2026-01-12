/**
 * AI UI Generator JSDoc Examples
 * 
 * This file demonstrates comprehensive JSDoc documentation patterns
 * for the AI UI Generator module. Use these examples as templates
 * when documenting your code.
 * 
 * @module aiuigenerator/jsdoc-examples
 */

/**
 * Type definition for UI generation options.
 * 
 * @typedef {Object} GenerateOptions
 * @property {string} apiKey - Anthropic API key for Claude AI
 * @property {StylePreset|string} [style] - Visual style preset to apply
 * @property {Platform} [platform='web'] - Target platform
 * @property {Framework} [framework='react'] - Export framework
 * @property {string} [model='claude-3-sonnet-20240229'] - Claude model to use
 * @property {number} [maxTokens=4000] - Maximum tokens for response
 * @property {number} [temperature=0.7] - Generation temperature (0-1)
 */

/**
 * Platform type for UI generation.
 * 
 * @typedef {'web'|'mobile'|'tablet'|'responsive'} Platform
 */

/**
 * Framework type for code export.
 * 
 * @typedef {'react'|'vue'|'html'} Framework
 */

/**
 * Generates a UI design from a natural language prompt using Claude AI.
 * 
 * This function takes a natural language description and converts it into
 * a structured UI design. It handles API communication with Claude AI,
 * response parsing, validation, and design object construction.
 * 
 * @async
 * @function generateUIFromPrompt
 * @param {string} prompt - Natural language description of the desired UI.
 *                          Should be clear and specific about layout, components, and style.
 * @param {GenerateOptions} options - Generation configuration options
 * @returns {Promise<GeneratedDesign>} A promise that resolves to the generated design
 * 
 * @throws {APIKeyError} If the API key is invalid or missing
 * @throws {ValidationError} If the prompt is invalid or empty
 * @throws {GenerationError} If the AI generation process fails
 * @throws {NetworkError} If the network request fails
 * 
 * @example
 * // Basic usage
 * const design = await generateUIFromPrompt(
 *   'Create a login form with email and password',
 *   { apiKey: process.env.ANTHROPIC_API_KEY }
 * );
 * 
 * @example
 * // With custom style and platform
 * const design = await generateUIFromPrompt(
 *   'Create a dashboard with KPI cards',
 *   {
 *     apiKey: process.env.ANTHROPIC_API_KEY,
 *     style: 'modern',
 *     platform: 'web',
 *     framework: 'react'
 *   }
 * );
 * 
 * @example
 * // With error handling
 * try {
 *   const design = await generateUIFromPrompt(prompt, options);
 *   console.log('Generated:', design);
 * } catch (error) {
 *   if (error instanceof APIKeyError) {
 *     console.error('Invalid API key');
 *   } else if (error instanceof GenerationError) {
 *     console.error('Generation failed:', error.message);
 *   }
 * }
 * 
 * @see {@link GenerateOptions} for available options
 * @see {@link GeneratedDesign} for the return type structure
 * @see {@link refineDesign} for refining existing designs
 */
export async function generateUIFromPrompt(prompt, options) {
  // Implementation
}

/**
 * Refines an existing design based on natural language instructions.
 * 
 * This function takes an existing design and a refinement prompt to make
 * targeted changes without regenerating the entire design. It's useful
 * for iterative improvements.
 * 
 * @async
 * @function refineDesign
 * @param {GeneratedDesign} design - The existing design to refine
 * @param {string} refinementPrompt - Natural language instructions for refinement
 *                                     (e.g., "Make the header taller", "Change color to blue")
 * @param {RefineOptions} options - Refinement configuration options
 * @returns {Promise<GeneratedDesign>} A promise that resolves to the refined design
 * 
 * @throws {ValidationError} If the design or prompt is invalid
 * @throws {GenerationError} If the refinement process fails
 * 
 * @example
 * // Refine an existing design
 * const refinedDesign = await refineDesign(
 *   existingDesign,
 *   'Make the header taller and add a logo',
 *   { apiKey: process.env.ANTHROPIC_API_KEY }
 * );
 * 
 * @example
 * // Multiple refinements
 * let design = await generateUIFromPrompt(initialPrompt, options);
 * design = await refineDesign(design, 'Add a search bar', options);
 * design = await refineDesign(design, 'Change to dark mode', options);
 */
export async function refineDesign(design, refinementPrompt, options) {
  // Implementation
}

/**
 * Exports a generated design to code in the specified framework.
 * 
 * Converts the internal design representation into production-ready code
 * for React, Vue, or HTML. Supports multiple styling approaches and
 * includes all necessary imports and dependencies.
 * 
 * @function exportDesignToCode
 * @param {GeneratedDesign} design - The design to export
 * @param {ExportOptions} options - Export configuration options
 * @returns {ExportedCode} Object containing generated code files
 * 
 * @throws {ValidationError} If the design is invalid
 * @throws {ExportError} If code generation fails
 * 
 * @example
 * // Export to React with Tailwind
 * const code = exportDesignToCode(design, {
 *   framework: 'react',
 *   styling: 'tailwind',
 *   typescript: true,
 *   includeComments: true
 * });
 * 
 * console.log(code.component); // React component code
 * console.log(code.styles);    // Stylesheet (if applicable)
 * console.log(code.types);     // TypeScript definitions
 * 
 * @example
 * // Export to Vue with CSS modules
 * const code = exportDesignToCode(design, {
 *   framework: 'vue',
 *   styling: 'css-modules',
 *   formatCode: true
 * });
 * 
 * @see {@link ExportOptions} for available export options
 * @see {@link ExportedCode} for the return type structure
 */
export function exportDesignToCode(design, options) {
  // Implementation
}

/**
 * Applies a style preset to an existing design.
 * 
 * Changes the visual appearance of a design by applying a predefined
 * style preset. This includes colors, typography, spacing, and other
 * visual properties.
 * 
 * @function applyStylePreset
 * @param {GeneratedDesign} design - The design to style
 * @param {StylePreset} preset - Style preset to apply
 * @returns {GeneratedDesign} New design with applied styles (immutable operation)
 * 
 * @example
 * // Apply a built-in preset
 * const styledDesign = applyStylePreset(design, {
 *   name: 'Modern Blue',
 *   colors: {
 *     primary: '#3b82f6',
 *     secondary: '#8b5cf6',
 *     background: '#ffffff',
 *     text: '#1f2937'
 *   },
 *   typography: {
 *     fontFamily: 'Inter, sans-serif',
 *     scale: 1.125
 *   }
 * });
 * 
 * @example
 * // Apply custom brand colors
 * const brandedDesign = applyStylePreset(design, myBrandPreset);
 */
export function applyStylePreset(design, preset) {
  // Implementation
}

/**
 * React component for AI UI generation interface.
 * 
 * Main component that provides the complete AI UI generation experience,
 * including prompt input, style exploration, design preview, refinement
 * chat, and code export.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.apiKey - Anthropic API key (required)
 * @param {Function} [props.onDesignGenerated] - Callback when design is generated
 * @param {Function} [props.onDesignRefined] - Callback when design is refined
 * @param {Function} [props.onExport] - Callback when code is exported
 * @param {string} [props.initialPrompt] - Optional initial prompt to start with
 * @param {StylePreset[]} [props.stylePresets] - Custom style presets
 * @param {AIUIConfig} [props.config] - Advanced configuration options
 * @param {string} [props.className] - Additional CSS class names
 * @returns {React.ReactElement} The AI UI Generator interface
 * 
 * @example
 * // Basic usage
 * import { AIUIGenerator } from 'react-design-editor';
 * 
 * function App() {
 *   return (
 *     <AIUIGenerator
 *       apiKey={process.env.ANTHROPIC_API_KEY}
 *       onDesignGenerated={(design) => console.log('Generated:', design)}
 *     />
 *   );
 * }
 * 
 * @example
 * // With custom styles and callbacks
 * function App() {
 *   const handleGenerate = (design) => {
 *     console.log('New design:', design);
 *     saveToDatabase(design);
 *   };
 *   
 *   const customStyles = [
 *     { name: 'My Brand', colors: {...}, typography: {...} }
 *   ];
 *   
 *   return (
 *     <AIUIGenerator
 *       apiKey={process.env.ANTHROPIC_API_KEY}
 *       onDesignGenerated={handleGenerate}
 *       stylePresets={customStyles}
 *       initialPrompt="Create a landing page"
 *     />
 *   );
 * }
 */
export function AIUIGenerator(props) {
  // Implementation
}

/**
 * Custom React hook for managing AI UI generation state.
 * 
 * Provides a convenient interface for managing UI generation state,
 * including loading states, errors, and generated designs.
 * 
 * @hook
 * @param {string} apiKey - Anthropic API key
 * @param {UseAIUIGeneratorOptions} [options] - Optional configuration
 * @returns {UseAIUIGeneratorResult} Generation state and functions
 * 
 * @example
 * // Basic usage
 * function MyComponent() {
 *   const { design, loading, error, generate, refine, reset } = useAIUIGenerator(
 *     process.env.ANTHROPIC_API_KEY
 *   );
 *   
 *   const handleGenerate = async () => {
 *     await generate('Create a login form', {
 *       style: 'modern',
 *       platform: 'web'
 *     });
 *   };
 *   
 *   if (loading) return <Spinner />;
 *   if (error) return <Error message={error.message} />;
 *   
 *   return (
 *     <div>
 *       <button onClick={handleGenerate}>Generate</button>
 *       {design && <DesignPreview design={design} />}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // With refinement
 * function MyComponent() {
 *   const { design, generate, refine } = useAIUIGenerator(apiKey);
 *   
 *   const handleCreate = () => generate('Create a dashboard');
 *   const handleRefine = () => refine('Add more spacing');
 *   
 *   return (
 *     <div>
 *       <button onClick={handleCreate}>Create</button>
 *       {design && <button onClick={handleRefine}>Refine</button>}
 *     </div>
 *   );
 * }
 */
export function useAIUIGenerator(apiKey, options) {
  // Implementation
}

/**
 * Validates a UI generation prompt.
 * 
 * Checks if a prompt is valid and provides suggestions for improvement.
 * Useful for providing real-time feedback to users as they type.
 * 
 * @function validatePrompt
 * @param {string} prompt - The prompt to validate
 * @returns {ValidationResult} Validation result with errors, warnings, and suggestions
 * 
 * @example
 * // Validate a prompt
 * const result = validatePrompt('Create a form');
 * 
 * if (!result.valid) {
 *   console.error('Errors:', result.errors);
 * }
 * 
 * if (result.warnings.length > 0) {
 *   console.warn('Warnings:', result.warnings);
 * }
 * 
 * if (result.suggestions.length > 0) {
 *   console.log('Suggestions:', result.suggestions);
 * }
 * 
 * @example
 * // Use in a React component
 * function PromptInput() {
 *   const [prompt, setPrompt] = useState('');
 *   const validation = validatePrompt(prompt);
 *   
 *   return (
 *     <div>
 *       <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
 *       {!validation.valid && (
 *         <ErrorList errors={validation.errors} />
 *       )}
 *       {validation.suggestions.length > 0 && (
 *         <SuggestionList suggestions={validation.suggestions} />
 *       )}
 *     </div>
 *   );
 * }
 */
export function validatePrompt(prompt) {
  // Implementation
}

/**
 * Custom error class for API key related errors.
 * 
 * Thrown when there are issues with the Anthropic API key,
 * such as missing key, invalid format, or authentication failures.
 * 
 * @class
 * @extends Error
 * 
 * @example
 * // Throwing the error
 * if (!apiKey) {
 *   throw new APIKeyError('API key is required');
 * }
 * 
 * @example
 * // Catching the error
 * try {
 *   await generateUIFromPrompt(prompt, options);
 * } catch (error) {
 *   if (error instanceof APIKeyError) {
 *     console.error('Please set your ANTHROPIC_API_KEY');
 *   }
 * }
 */
export class APIKeyError extends Error {
  /**
   * Creates an APIKeyError.
   * 
   * @param {string} message - Error message
   */
  constructor(message) {
    super(message);
    this.name = 'APIKeyError';
  }
}

/**
 * Custom error class for generation related errors.
 * 
 * Thrown when the UI generation process fails. Includes a `retryable`
 * property to indicate whether the operation can be retried.
 * 
 * @class
 * @extends Error
 * @property {boolean} retryable - Whether the operation can be retried
 * 
 * @example
 * // Check if error is retryable
 * try {
 *   await generateUIFromPrompt(prompt, options);
 * } catch (error) {
 *   if (error instanceof GenerationError && error.retryable) {
 *     console.log('Retrying...');
 *     await generateUIFromPrompt(prompt, options);
 *   }
 * }
 */
export class GenerationError extends Error {
  /**
   * Creates a GenerationError.
   * 
   * @param {string} message - Error message
   * @param {Error} [cause] - Original error that caused this error
   * @param {boolean} [retryable=false] - Whether the operation can be retried
   */
  constructor(message, cause, retryable = false) {
    super(message);
    this.name = 'GenerationError';
    this.cause = cause;
    this.retryable = retryable;
  }
}

/**
 * JSDoc Best Practices for AI UI Generator:
 * 
 * 1. Always include @param tags with type and description
 * 2. Use @returns for return values with type information
 * 3. Document all @throws exceptions
 * 4. Provide @example blocks for common use cases
 * 5. Use @see tags to link related functions/types
 * 6. Include detailed descriptions for complex functions
 * 7. Use @async for async functions
 * 8. Document default values in parameter descriptions
 * 9. Use @typedef for complex types
 * 10. Include @since tags when adding new features
 * 
 * Type Annotations:
 * - Use JSDoc type syntax: {string}, {number}, {boolean}
 * - For arrays: {string[]} or {Array<string>}
 * - For objects: {Object} or detailed {Object.<string, number>}
 * - For unions: {string|number}
 * - For optional: {string} [paramName] or @param {string} [paramName]
 * - For promises: {Promise<Type>}
 * 
 * @see {@link https://jsdoc.app/} Official JSDoc documentation
 * @see {@link https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html} TypeScript JSDoc support
 */
