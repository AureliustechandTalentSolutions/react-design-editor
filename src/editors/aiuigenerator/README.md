# AI UI Generator Templates

This directory contains pre-built templates for the AI UI Generator feature.

## Template Gallery Component

The `TemplateGallery.tsx` component provides a user-friendly interface for browsing and selecting templates.

### Usage

```typescript
import { TemplateGallery } from './editors/aiuigenerator/TemplateGallery';
import { DesignTemplate } from './libs/templates/TemplateLibrary';

function MyComponent() {
  const handleSelectTemplate = (template: DesignTemplate) => {
    // Load the template design into the canvas
    console.log('Selected template:', template);
  };

  return <TemplateGallery onSelectTemplate={handleSelectTemplate} />;
}
```

### Features

- **Category Filtering**: Browse templates by category (dashboard, marketing, authentication, etc.)
- **Search**: Search templates by name, description, or tags
- **Preview Modal**: View template details before selecting
- **Responsive Grid**: Templates displayed in a responsive grid layout

## Available Templates

### Dashboard Templates

1. **Dashboard** (`dashboard.json`)
   - Modern dashboard with sidebar navigation
   - Analytics cards and chart area
   - Tags: dashboard, analytics, admin, cards

2. **Settings Page** (`settings-page.json`)
   - User settings with profile, preferences, and security sections
   - Toggle switches and input fields
   - Tags: settings, profile, preferences, dashboard

### Marketing Templates

3. **Landing Page** (`landing-page.json`)
   - Hero section with CTA button
   - Feature cards layout
   - Tags: landing, marketing, hero, features

4. **Pricing Table** (`pricing-table.json`)
   - Three-tier pricing layout
   - Popular badge highlight
   - Tags: pricing, plans, subscription, marketing

### Authentication Templates

5. **Login Form** (`login-form.json`)
   - Clean login form with social authentication
   - Forgot password link
   - Tags: login, authentication, form, signin

### E-commerce Templates

6. **Product Card** (`product-card.json`)
   - Product card with image, title, and price
   - Add to cart button and wishlist icon
   - Tags: ecommerce, product, card, shop

### Mobile Templates

7. **Mobile App Home** (`mobile-app-home.json`)
   - Mobile app home screen (375x812)
   - Quick actions and recent activity
   - Bottom navigation
   - Tags: mobile, app, home, navigation

### Messaging Templates

8. **Chat Interface** (`chat-interface.json`)
   - Modern chat UI with message bubbles
   - Chat header with avatar
   - Input field with send button
   - Tags: chat, messaging, conversation, communication

## Template Format

Each template is a JSON file with the following structure:

```json
{
  "name": "Template Name",
  "description": "Template description",
  "category": "category-name",
  "version": "1.0.0",
  "objects": [
    {
      "type": "rect",
      "id": "unique-id",
      "left": 0,
      "top": 0,
      "width": 100,
      "height": 100,
      "fill": "#ffffff"
    }
  ]
}
```

## Adding New Templates

1. Create a new JSON file in the `templates/` directory
2. Follow the template format above
3. Add the template to the `initializeTemplates()` function in `TemplateGallery.tsx`
4. Include appropriate metadata (id, name, description, category, tags)

Example:

```typescript
{
  id: 'my-template',
  name: myTemplate.name,
  description: myTemplate.description,
  category: myTemplate.category,
  thumbnail: '/assets/templates/my-template-thumb.png',
  design: myTemplate.objects,
  tags: ['tag1', 'tag2', 'tag3'],
}
```

## Template Categories

Current categories:
- `dashboard` - Dashboard and admin interfaces
- `marketing` - Landing pages and marketing materials
- `authentication` - Login, signup, and auth forms
- `ecommerce` - Product cards, shopping interfaces
- `mobile` - Mobile app screens
- `messaging` - Chat and communication interfaces

## Future Enhancements

- Template preview rendering
- Template thumbnail generation
- Template versioning
- Community template submissions
- Template customization wizard
