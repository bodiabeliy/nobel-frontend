# Puck Visual Editor - Complete User Guide

## 🎨 Overview

Your Puck editor now has comprehensive modern UI editing capabilities. You can build custom pages from scratch using flexible components with full design control.

## 📍 Accessing the Editor

Navigate to: **http://localhost:3001/puck/edit**

---

## 🧩 Available Components

### **Navigation Components**
- **Navbar** - Editable header with logo and navigation links
- **Footer** - Editable footer with links and social media icons

### **Page Sections** (Pre-built)
- Hero, Home Value Section, Stats Section, Advantage Section
- Recommended Properties, Insights Section, Experience Section
- Markets Section, Why Join Section, Contact Section

### **Layout Components** (NEW! ⭐)
- **Section** - Flexible container with DropZone for nesting components
- **Columns** - Create 2/3/4 column layouts with nested components
- **Spacer** - Add custom spacing between elements

### **Content Components** (NEW! ⭐)
- **Heading** - H1-H6 headings with full typography control
- **Text** - Rich text paragraphs with styling

###  **Media Components** (NEW! ⭐)
- **ImageComponent** - Images with **upload or URL** support

### **Interactive Components** (NEW! ⭐)
- **Button** - Customizable buttons with multiple variants

---

## 🎯 How to Use the Editor

### **Three-Panel Layout**

**1. Left Sidebar (Blocks Panel)** - RED BORDER in your screenshot
   - Lists all available components
   - Drag components from here onto the canvas
   - Scroll to see all components

**2. Center Canvas (Preview)** - Middle area
   - Shows live preview of your page
   - **Click any element to select it** ← THIS IS KEY!
   - Drag elements to reorder them
   - See changes in real-time

**3. Right Sidebar (Properties Panel)** - GREEN BORDER in your screenshot
   - Shows properties for the selected component
   - **Click any element first, then edit here**
   - All styling options appear here
   - Changes update instantly

### **Top Bar**
- **Undo/Redo** buttons (arrows)
- **Responsive preview** (device icons)
- **Publish** button (blue, top-right) to save changes

---

## 🔨 Building Custom Layouts

### **Step-by-Step Workflow**

**STEP 1: Create a Container**
1. Drag **Section** from left sidebar to canvas
2. Click the Section to select it
3. In right sidebar, configure:
   - Background Color → Click to use **Color Picker!** 🎨
   - Background Image → Click **Upload** button to add image 📸
   - Padding Top: `4rem`
   - Padding Bottom: `4rem`
   - Border Radius: `0.5rem` (optional)
   - Box Shadow: `0 4px 6px rgba(0,0,0,0.1)` (optional)

**STEP 2: Add Content Inside Section**
1. Drag **Heading** ONTO the Section (you'll see a drop zone)
2. Click the Heading to select it
3. In right sidebar:
   - Text: "Your Title Here"
   - Level: H2
   - Font Size: `2rem`
   - Color: Use color picker
   - Text Align: Center

4. Drag **Text** below the Heading
5. Click the Text to select it
6. In right sidebar:
   - Content: Type your paragraph
   - Font Size: `1rem`
   - Color: `#4B5563`
   - Text Align: Center

7. Drag **Button** below the Text
8. Click the Button
9. Configure:
   - Text: "Learn More"
   - Link URL: `/about`
   - Variant: Primary
   - Size: Medium
   - Align: Center

**STEP 3: Add Spacing**
- Drag **Spacer** between elements
- Click the Spacer
- Set Height: `2rem`

### **Creating Multi-Column Layouts**

**Example: 3-Column Feature Section**

1. **Drag Section** to canvas
   - Set background color: `#F9FAFB`
   - Set padding: `4rem` top and bottom

2. **Drag Columns INTO the Section**
   - Click Columns to select
   - In right sidebar:
     - Number of Columns: **3**
     - Gap: `2rem`
     - Stack on Mobile: **Yes**
     - Vertical Align: Top

3. **Fill EACH Column** (Column 1, then Column 2, then Column 3):\n   
   **For Column 1:**
   - Drag **ImageComponent** into Column 1's drop zone
   - Click the Image → Upload a photo
   - Drag **Heading** below image in Column 1
   - Click Heading → Set text, H3, centered
   - Drag **Text** below heading in Column 1
   - Click Text → Add description

   **Repeat for Columns 2 and 3** with different content

---

## 🎨 Advanced Features

### **🎨 Color Picker** (NEW!)
When you click a color field, you get TWO modes:

**Color Picker Mode** (Default):
- Visual color selector
- 25+ quick color presets
- Live preview
- Transparent button

**Manual Mode**:
- Enter any CSS color:
  - `#FF5733` (hex)
  - `rgb(255, 87, 51)` (rgb)
  - `rgba(255, 87, 51, 0.8)` (with opacity)
  - `transparent` (named)
  - Gradients: `linear-gradient(to right, #FF5733, #C70039)`

### **📸 Image Upload** (NEW!)
Click any image field to see TWO modes:

**URL Mode**:
- Paste image URL from anywhere
- Example: `https://images.unsplash.com/photo-...`

**Upload Mode** (⭐ RECOMMENDED):
- Click "Upload" button
- Select image from your computer
- Max size: 5MB
- Formats: JPG, PNG, GIF, WebP
- Preview shows immediately
- Images saved to `/public/uploads/`
- Remove with × button

### **📐 Spacing Control**
Use CSS units for precise spacing:
- `rem` - **Recommended** (1rem = 16px)
  - `1rem` = 16px
  - `2rem` = 32px
  - `4rem` = 64px
- `px` - Fixed pixels
  - `20px`, `50px`
- `%` - Percentage
  - `50%`, `100%`

### **🎯 Click to Edit**
**IMPORTANT**: You must **click an element first** before editing:

1. Click element on canvas ← **MUST DO THIS**
2. Right sidebar shows properties
3. Edit any property
4. See live update on canvas
5. Click another element to edit something else

---

## 💾 Saving & Publishing

1. Make all your changes
2. Click **"Publish"** (blue button, top-right)
3. Your changes save to `puck-data.json`
4. Visit `http://localhost:3001/` to see live result

---

## 📋 Complete Property Reference

### **Section Container**
- Background Color (color picker)
- Background Image (upload/URL)
  - Background Size: cover/contain/auto
  - Background Position: center/top/bottom/left/right
- Padding (top/bottom/left/right separately)
- Margin (top/bottom)
- Max Width: full/xl/lg/md
- Text Alignment: left/center/right
- Min Height
- Border Radius: `0.5rem`, `1rem`
- Box Shadow: CSS shadow values

### **Columns**
- Number of Columns: 2/3/4
- Gap Between Columns: `1rem`, `2rem`, `3rem`
- Stack on Mobile: Yes/No
- Vertical Alignment: top/center/bottom/stretch

### **Heading**
- Text Content (textarea)
- Heading Level: H1/H2/H3/H4/H5/H6
- Font Size: `2rem`, `3rem`, `24px`
- Font Weight: normal/medium/semibold/bold/extrabold
- Color (color picker)
- Text Alignment: left/center/right
- Margin Top/Bottom
- Letter Spacing: `normal`, `0.05em`
- Text Transform: none/uppercase/lowercase/capitalize

### **Text Paragraph**
- Content (textarea for multi-line)
- Font Size: `1rem`, `18px`
- Font Weight: normal/medium/semibold/bold
- Color (color picker)
- Text Alignment: left/center/right/justify
- Line Height: `1.6`, `1.8`
- Margin Top/Bottom
- Max Width: `100%`, `800px`

### **ImageComponent**
- Image (upload/URL)
- Alt Text (for accessibility)
- Width: `100%`, `500px`
- Height: `auto`, `300px`
- Object Fit: cover/contain/fill/none
- Border Radius: `0`, `0.5rem`, `9999px` (circle)
- Box Shadow
- Margin Top/Bottom
- Alignment: left/center/right

### **Button**
- Button Text
- Link URL: `/about`, `#contact`, `https://...`
- Variant: primary/secondary/outline/ghost
- Size: small/medium/large
- Full Width: Yes/No
- Background Color (override, color picker)
- Text Color (override, color picker)
- Border Radius: `0.375rem`
- Padding X/Y (horizontal/vertical)
- Font Size
- Font Weight: normal/medium/semibold/bold
- Box Shadow
- Alignment: left/center/right
- Margin Top/Bottom

### **Spacer**
- Height: `1rem`, `2rem`, `50px`, `100px`

---

## ✨ Best Practices

### **Building a Page from Scratch**
1. **Navbar** (drag first, configure logo and links)
2. **Section** (hero with background image)
   - **Heading** (H1, large, centered)
   - **Text** (subheading)
   - **Button** (CTA)
3. **Section** (features)
   - **Columns** (3 columns)
     - Each column: **ImageComponent** + **Heading** + **Text**
4. **Spacer** (between sections)
5. **Section** (call-to-action)
6. **Footer** (drag last, configure links)

### **Design Consistency**
- Use same colors throughout (save favorites in color picker)
- Keep font sizes consistent:
  - H1: `3rem`
  - H2: `2.5rem`
  - H3: `2rem`
  - Body: `1rem`
- Use consistent spacing (always `4rem` for section padding)
- Align similarly (all centered OR all left-aligned)

### **Performance**
- Compress images before uploading
- Use JPG for photos, PNG for graphics with transparency
- Keep images under 500KB when possible
- Use appropriate sizes (don't upload 4K for thumbnails)

---

## 🐛 Troubleshooting

**Q: I don't see my new components in the sidebar**
- Refresh the page (Ctrl/Cmd + R)
- Check browser console for errors

**Q: I can't edit a component**
- **Make sure you CLICKED it first!**
- The component should have a blue outline when selected
- Then look at right sidebar for properties

**Q: Can't drag components into Section/Columns**
- Look for the **drop zone** (dashed border area)
- Drag component directly ONTO the drop zone
- You should see a highlight when hovering correctly

**Q: My image won't upload**
- Check file size (max 5MB)
- Ensure format is JPG/PNG/GIF/WebP
- Try URL mode as alternative
- Check browser console for errors

**Q: Colors not applying**
- Make sure you clicked the component first
- Use color picker mode for guaranteed valid colors
- For custom colors, use valid CSS format

**Q: Changes not saving**
- Click the blue **"Publish"** button (top-right)
- Look for success message
- Check browser console for errors
- Visit the site to confirm changes

---

## 🚀 Quick Start Examples

### **Example 1: Simple Hero Section**
```
Section
├─ backgroundColor: #003366
├─ paddingTop: 5rem
├─ paddingBottom: 5rem
└─ [Components inside]
    ├─ Heading (H1, "Welcome", white, 3rem, centered)
    ├─ Spacer (2rem)
    ├─ Text ("Your description", white, 1.25rem, centered)
    ├─ Spacer (2rem)
    └─ Button ("Get Started", primary, large, centered)
```

### **Example 2: Three Features**
```
Section
├─ backgroundColor: #F9FAFB
├─ padding: 4rem (all sides)
└─ Columns (3 columns, 2rem gap)
    ├─ Column 1: Image + Heading + Text
    ├─ Column 2: Image + Heading + Text
    └─ Column 3: Image + Heading + Text
```

### **Example 3: Call-to-Action Banner**
```
Section
├─ backgroundImage: upload photo
├─ paddingTop: 6rem
├─ paddingBottom: 6rem
└─ [Components]
    ├─ Heading (H2, white, centered)
    ├─ Spacer (1rem)
    ├─ Text (white, centered)
    ├─ Spacer (2rem)
    └─ Button (outline variant, white text)
```

---

## 🎓 Pro Tips

1. **Click First, Edit Second** - Always select element before editing
2. **Use Drop Zones** - Drag INTO Section/Columns drop zones
3. **Color Picker** - Much easier than typing hex codes
4. **Upload Images** - More reliable than URLs
5. **Use Spacers** - Better than manual margin adjustments
6. **Save Often** - Click Publish frequently
7. **Preview Responsively** - Test mobile view (use top icons)
8. **Start Simple** - Build one section at a time
9. **Nest Components** - Section → Columns → Content
10. **Undo Exists** - Use undo button if you mess up

---

## 📞 Need Help?

**Common Questions:**
- "Where do I edit X?" → Click the element first, then check right sidebar
- "How do I add X?" → Drag from left sidebar to canvas
- "How do I change color?" → Click element, then click color field for picker
- "How do I upload?" → Click image field, switch to Upload mode
- "Where's my component?" → Look in left sidebar, it should be there
- "Why can't I drag here?" → Make sure you're on a drop zone (Section/Columns)

---

## 🎉 You're Ready!

Your editor has **everything needed** for modern page building:
- ✅ Layout system (Section + Columns)
- ✅ Typography control (Heading + Text)
- ✅ Media support (ImageComponent with upload)
- ✅ Interactive elements (Button with variants)
- ✅ Design tools (Color picker, spacing control)
- ✅ All pre-built page sections (Hero, Stats, etc.)

**Start building →** Click elements → Edit properties → Publish!

Happy editing! 🚀
