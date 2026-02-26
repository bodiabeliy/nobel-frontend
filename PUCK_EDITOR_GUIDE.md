# Puck Visual Editor Integration

## Overview

Your Next.js application now includes **Puck**, an open-source visual page editor that allows you to build and customize pages using drag-and-drop components.

## Features

- ✅ Visual drag-and-drop page editor
- ✅ Edit component properties (text, colors, sizes, etc.)
- ✅ Live preview while editing
- ✅ Compatible with existing Strapi CMS integration
- ✅ All your existing React components are available in the editor

## How to Use

### Accessing the Editor

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Puck editor at: **http://localhost:3000/puck/edit**

### Building Pages

1. **Add Components**: 
   - From the left sidebar, drag and drop components onto the canvas
   - Available components include:
     - Hero
     - HomeValueSection
     - StatsSection
     - AdvantageSection
     - RecommendedProperties
     - InsightsSection
     - ExperienceSection
     - MarketsSection
     - WhyJoinSection
     - ContactSection
     - Container

2. **Edit Component Properties**:
   - Click on any component in the canvas
   - The right sidebar will show all editable fields
   - Modify text, colors, padding, and other properties
   - See changes in real-time

3. **Rearrange Components**:
   - Drag components up or down to reorder them
   - Remove components by clicking the trash icon

4. **Publish Changes**:
   - Click the "Publish" button in the top-right corner
   - Your changes will be saved and visible on the homepage

### Component Details

#### Hero
- **Heading**: Main banner text
- **Subheading**: Secondary text below heading

#### StatsSection
- **Heading & Subheading**: Section titles
- **Stats**: Array of statistics with values and labels
  - Add/remove stats dynamically
  - Edit each stat's value and label

#### AdvantageSection
- **Heading & Subheading**: Section titles
- **Items**: Array of advantage cards
  - Icon: Emoji or text icon
  - Heading: Card title
  - Text: Card description

#### MarketsSection
- **Heading & Subheading**: Section titles
- **Markets**: Array of market links
  - Name: Market display name
  - Href: Link URL

## Data Storage

- Page data is stored in `puck-data.json` at the project root
- Each page path (e.g., "/") has its own data entry
- Data is loaded when you visit the editor
- Changes are saved when you click "Publish"

## Integration with Strapi

The integration maintains your existing Strapi CMS setup:

1. **Priority Order**:
   - If Puck data exists for a page → Uses Puck rendering
   - If no Puck data → Falls back to Strapi content
   - If Strapi is unavailable → Uses hardcoded fallback data

2. **How to Switch Back to Strapi**:
   - Delete the entry for your page in `puck-data.json`
   - Or remove all content from the Puck editor and save

## Customization

### Adding New Components

1. **Define the component in `puck.config.tsx`**:
   ```tsx
   MyNewComponent: {
     fields: {
       title: { type: "text", label: "Title" },
       color: { 
         type: "select", 
         label: "Color",
         options: [
           { value: "blue", label: "Blue" },
           { value: "red", label: "Red" }
         ]
       }
     },
     defaultProps: {
       title: "Default Title",
       color: "blue"
     },
     render: ({ title, color }) => {
       return <MyComponent title={title} color={color} />;
     }
   }
   ```

2. **Add the component to the Props type** at the top of `puck.config.tsx`

### Available Field Types

- `text`: Single-line text input
- `textarea`: Multi-line text input
- `select`: Dropdown with predefined options
- `number`: Numeric input
- `array`: List of items (great for repeating elements)
- `radio`: Radio button selection
- `external`: Connect to external data sources (Strapi, APIs)

## Styling with Tailwind

Components use Tailwind CSS classes. To modify styles:

1. **Predefined Styles**: Use select fields with Tailwind class options
   ```tsx
   padding: {
     type: "select",
     options: [
       { value: "p-4", label: "Small" },
       { value: "p-8", label: "Large" }
     ]
   }
   ```

2. **Dynamic Values**: Use inline styles for truly dynamic values
   ```tsx
   render: ({ padding }) => (
     <div style={{ padding: `${padding}px` }}>
       Content
     </div>
   )
   ```

## Production Deployment

⚠️ **Important**: Before deploying to production:

1. **Secure the Editor**: Add authentication to `/puck/edit`
   - Only authorized users should access the editor
   
2. **Database Storage**: Replace file-based storage with a database
   - Update `src/app/api/puck/route.ts` to use your database
   - Options: PostgreSQL, MongoDB, MySQL, etc.

3. **API Protection**: Add API route authentication
   - Protect POST requests to `/api/puck`

## Troubleshooting

### Editor won't load
- Check browser console for errors
- Ensure `@puckeditor/core` is installed correctly
- Clear browser cache and reload

### Changes not saving
- Check file permissions on `puck-data.json`
- Look for API errors in the console
- Verify the `/api/puck` route is working

### Components not appearing
- Check `puck.config.tsx` for syntax errors
- Ensure components are properly imported
- Restart the dev server

## Resources

- [Puck Documentation](https://puckeditor.com/docs)
- [Puck GitHub](https://github.com/puckeditor/puck)
- [Live Demo](https://demo.puckeditor.com/edit)
- [Discord Community](https://discord.gg/D9e4E3MQVZ)

## Support

For questions or issues with Puck integration:
1. Check the [Puck documentation](https://puckeditor.com/docs)
2. Join the [Puck Discord](https://discord.gg/D9e4E3MQVZ)
3. Open an issue on [GitHub](https://github.com/puckeditor/puck/issues)
