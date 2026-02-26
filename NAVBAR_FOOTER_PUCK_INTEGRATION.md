# Navbar and Footer - Puck Editor Integration

## What's New

### 1. **Navbar is Now Editable**
- Navigate to `/puck/edit` and you'll see Navbar as the first component
- You can edit:
  - Logo text and image URL
  - Logo link
  - Navigation links (add, remove, reorder)
  - Mark any link as a CTA button (styled differently)

### 2. **Footer is Now Editable**
- Footer appears as the last component in the editor
- You can edit:
  - Logo, description
  - Column 1 & 2 links (fully customizable)
  - Social media links (Facebook, Instagram, LinkedIn, Twitter, YouTube)
  - Social section heading

### 3. **Dark Mode Support in Editor**
- The editor now properly supports light/dark theme switching
- Theme changes are applied to the preview area
- Components will render with appropriate dark mode styles
- Use the theme switcher in the Navbar component within the preview

## How to Test

1. **Refresh your browser** at `http://localhost:3001/puck/edit` (Ctrl+Shift+R)

2. **You should now see:**
   - Navbar component at the top
   - All your existing page sections in the middle
   - Footer component at the bottom

3. **Test Navbar Editing:**
   - Click on the Navbar in the left sidebar or preview
   - Edit the logo text, navigation links
   - Add or remove links
   - Mark a link as "CTA Button" to style it differently

4. **Test Footer Editing:**
   - Scroll to the Footer in the editor
   - Edit the description, add/remove links
   - Change social media platforms and URLs

5. **Test Dark Mode:**
   - Toggle the theme switcher (sun/moon icon in the Navbar within the preview)
   - Watch as components change to dark mode styling
   - Images and colors should adapt appropriately

## New Components Created

### NavbarClient.tsx
Client-side Navbar component that accepts props instead of fetching from Strapi. Fully editable in Puck.

### FooterClient.tsx
Client-side Footer component that accepts props instead of fetching from Strapi. Fully editable in Puck.

## Technical Details

- **Theme Synchronization**: Uses MutationObserver to apply theme classes to Puck's preview iframe
- **Global Styles**: Editor imports `globals.css` to ensure preview area has all Tailwind styles
- **ThemeProvider**: Wraps the entire editor to provide theme context
- **Initial Data**: Editor now starts with Navbar and Footer pre-populated

## Publishing Changes

After editing Navbar or Footer:
1. Click the **Publish** button in the top-right
2. Your changes save to `puck-data.json`
3. The home page (`/`) will now render your customized Navbar and Footer

## Important Notes

- The editable Navbar/Footer in Puck are separate from the ones in `layout.tsx`
- To see your changes on the home page, the Puck data must be published
- The main site still uses the server-side Navbar/Footer from Strapi when Puck data is not available
- For production, you may want to update `layout.tsx` to use Puck data if available

## Next Steps

If you want the entire site (not just the home page) to use the Puck-editable Navbar and Footer:
1. Update `layout.tsx` to load Puck data
2. Conditionally render `NavbarClient` and `FooterClient` with Puck data
3. Fallback to server-side components when Puck data is not available
