# React Design Editor

[![](https://img.shields.io/npm/l/react-design-editor?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License) [![build](https://github.com/salgum1114/react-design-editor/workflows/build/badge.svg)](https://github.com/salgum1114/react-design-editor/actions) [![](https://flat.badgen.net/npm/v/react-design-editor?icon=npm)](https://www.npmjs.com/package/react-design-editor)

React Design Editor is a module for React, written in Javascript/Typescript which provides three primary features:

-   **AI UI Generator** - Transform natural language descriptions into complete, editable UI designs using Claude AI. Generate modern interfaces with text prompts, refine with AI assistance, and export to React, Vue, or HTML.
-   **Image Editor** - Create images in React, draw diagrams and arrange compositions using the image editor and save the result to one of several export formats, provides functionality similar to Powerpoint.
-   **Business Process Modelling (BPM)** - Design flowcharts and process workflows in React and export the model to JSON, which can be imported into the tool (load/save).

The module primarily uses the [Ant Design](https://github.com/ant-design/ant-design/), [Fabric.js](https://github.com/fabricjs/fabric.js) and [React](https://github.com/facebook/react) libraries, but a full list of required dependencies can be found below.

Try it out today - the project is being continually developed to support a variety of different functions.

[View Demo](https://salgum1114.github.io/react-design-editor/)

# Feature List

## AI UI Generator Features

-   [x] 🎨 **Text-to-UI Generation** - Describe your UI in plain English and watch it come to life
-   [x] ✨ **AI-Powered Refinement** - Fine-tune designs with natural language instructions
-   [x] 🎭 **Style Exploration** - Multiple color palettes and typography options with live preview
-   [x] 📱 **Multi-Platform Support** - Generate designs for web, mobile, tablet, and responsive layouts
-   [x] 💻 **Code Export** - Export to React, Vue, or HTML/CSS with multiple styling options
-   [x] 🧩 **Component Library** - Pre-built draggable UI components for manual adjustments

## Core Editor Features

-   [x] Add, remove, resize, reorder, clone, copy/paste and drag/drop elements
-   [x] Drawing capability, with polygon, line, arrows and link support
-   [x] Preview mode, tooltips, group/ungroup and zoom functionality
-   [x] Upload (with drag/drop), import and export to JSON or image
-   [x] Image cropping, Image filters, alignment, alignment guides
-   [x] Snap to grid, context menu, animation and video element
-   [x] Various icons in icon picker and fonts from Google Fonts (20)
-   [x] HTML/CSS/JS Element, iFrame element
-   [x] Animation support, with Fade / Bounce / Shake / Scaling / Rotation / Flash effects
-   [x] Code Editor with HTML / CSS / JS / Preview
-   [x] Various interaction modes, including grasp, selection, ctrl + drag grab
-   [x] Multiple layouts, with fixed, responsive, fullscreen and grid modes
-   [x] SVG, Chart and GIF elements
-   [x] Undo/Redo support
-   [ ] Wireframes - in development
-   [ ] Multiple Map - in development
-   [ ] Ruler - in development

# Installation

Run `npm install react-design-editor` or `yarn add react-design-editor`

## AI UI Generator Setup

To use the AI UI Generator feature, you'll need an Anthropic API key:

1. Get your API key from [Anthropic](https://www.anthropic.com)
2. Create a `.env.local` file in your project root:
   ```env
   ANTHROPIC_API_KEY=your-api-key-here
   ```
3. Use the AI UI Generator in your app:
   ```tsx
   import { AIUIGenerator } from 'react-design-editor';
   
   function App() {
     return <AIUIGenerator apiKey={process.env.ANTHROPIC_API_KEY} />;
   }
   ```

See the [AI UI Generator documentation](src/editors/aiuigenerator/README.md) for detailed usage instructions.



# Getting Started

1. Clone this Project with `git clone https://github.com/salgum1114/react-design-editor.git`
2. Install dependencies with `npm install` or `yarn`
3. Run the App with `npm start` or `yarn start`
4. Open your web browser to `http://localhost:4000`

## 📊 Project Status

### AI UI Generator Module

| Component | Status | Team | Progress |
|-----------|--------|------|----------|
| Core Editor | 🚧 In Progress | Core | ████████░░ 80% |
| AI Integration | 🚧 In Progress | Core | ███████░░░ 70% |
| DevOps Setup | 🚧 In Progress | DevOps | ██████░░░░ 60% |
| Documentation | 🚧 In Progress | Docs | █████░░░░░ 50% |
| Test Suite | 🚧 In Progress | Testing | ████░░░░░░ 40% |
| Code Quality | 🚧 In Progress | Quality | ████░░░░░░ 40% |

### Active PRs
See [Pull Requests](../../pulls) for all active development.

### Project Board
Track progress on our [Project Board](../../projects/1).

# Ask AI

[React Design Editor](https://codeparrot.ai/oracle?owner=salgum1114&repo=react-design-editor) AI will help you understand this repository better. 

# Documentation

## AI UI Generator
- [Module README](src/editors/aiuigenerator/README.md) - Quick start and component reference
- [API Reference](docs/api/ai-ui-generator.md) - Complete API documentation
- [User Guide](docs/guides/ai-ui-generator-user-guide.md) - Step-by-step tutorials and best practices
- [Developer Guide](docs/guides/ai-ui-generator-developer-guide.md) - Extend and customize the module
- [Architecture](docs/architecture/ai-ui-generator.md) - System design and data flow
- [Prompt Library](docs/examples/prompt-library.md) - 50+ example prompts for various UI types

## General
- [Changelog](CHANGELOG.md) - Version history and release notes 


# Screenshots

## Image Map Editor

### 1. Fixed Layout Mode

![fixed](https://user-images.githubusercontent.com/19975642/55678049-6aff6180-592e-11e9-8b29-8e1d60df178a.PNG)

### 2. Responsive Layout Mode

![responsive](https://user-images.githubusercontent.com/19975642/55678050-6cc92500-592e-11e9-8a57-c82d371e4be1.PNG)

### 3. Full Screen Layout Mode

![fullscreen](https://user-images.githubusercontent.com/19975642/55678051-6dfa5200-592e-11e9-9b9e-b8d8ee3ccb08.PNG)

### 4. Preview Mode

![preview](https://user-images.githubusercontent.com/19975642/55678052-6fc41580-592e-11e9-9958-9a9be8239bd7.PNG)

## Workflow Editor

![workflow](https://user-images.githubusercontent.com/19975642/55678053-718dd900-592e-11e9-9996-cce9b46d8433.PNG)

## ❤️ Sponsors and Backers [![](https://opencollective.com/react-design-editor/tiers/badge.svg)](https://opencollective.com/react-design-editor/contribute) [![](https://opencollective.com/react-design-editor/tiers/sponsor/badge.svg?label=Sponsor&color=brightgreen)](https://opencollective.com/react-design-editor/contribute) [![](https://opencollective.com/react-design-editor/tiers/backer/badge.svg?label=Backer&color=brightgreen)](https://opencollective.com/react-design-editor/contribute)

[![Sponsored by Workflows for Confluence](https://remote.automation-consultants.com/knowledge/download/attachments/57671882/sponsorship.png)](https://marketplace.atlassian.com/apps/1222276/workflows-for-confluence)

[![](https://opencollective.com/react-design-editor/tiers/sponsor.svg?avatarHeight=36)](https://opencollective.com/react-design-editor/contribute)

[![](https://opencollective.com/react-design-editor/tiers/backer.svg?avatarHeight=36)](https://opencollective.com/react-design-editor/contribute)

# Dependencies

| Dependency                                                      | License(s)                                         |
| --------------------------------------------------------------- | -------------------------------------------------- |
| [React](https://github.com/facebook/react)                      | MIT                                                |
| [Ant Design](https://github.com/ant-design/ant-design/)         | MIT                                                |
| [Fabric.js](https://github.com/fabricjs/fabric.js)              | MIT                                                |
| [MediaElement.js](https://github.com/mediaelement/mediaelement) | MIT                                                |
| [React-Ace](https://github.com/securingsincity/react-ace)       | MIT                                                |
| [interact.js](https://github.com/taye/interact.js)              | MIT                                                |
| [anime.js](https://github.com/juliangarnier/anime/)             | MIT                                                |
| [Webpack 4](https://github.com/webpack/webpack)                 | MIT                                                |
| [Babel](https://github.com/babel/babel)                         | MIT                                                |
| [fontawesome5](https://github.com/FortAwesome/Font-Awesome)     | Icons (CC BY 4.0), Fonts (SIL OFL 1.1), Code (MIT) |

## AI UI Generator Dependencies

The AI UI Generator module integrates with:

| Service/Library                                                 | Purpose                                            |
| --------------------------------------------------------------- | -------------------------------------------------- |
| [Anthropic Claude API](https://www.anthropic.com)               | AI-powered UI generation (API key required)        |

**Note**: An Anthropic API key is required to use the AI UI Generator features. See the [Installation](#installation) section for setup instructions.
