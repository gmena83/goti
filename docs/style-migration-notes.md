# Style Migration Notes

## Overview
GOTI now uses a modern, dark-first design system inspired by the Lovable project, featuring purple accents, glassmorphism effects, and smooth animations.

## Color Scheme

### Primary Colors
- **Background**: Dark blue-gray (`240 10% 3.9%`)
- **Primary/Accent**: Vibrant purple (`262 83% 58%`)
- **Foreground**: Near white (`0 0% 98%`)

### Theme
The application now uses a consistent dark theme. The previous light mode has been replaced with this premium dark aesthetic.

## New Utility Classes

### Glassmorphism
Apply modern glass effects to components:

```tsx
// Light glass effect
<div className="glass">
  {/* Semi-transparent with blur */}
</div>

// Strong glass effect
<div className="glass-strong">
  {/* More opaque with stronger blur */}
</div>
```

### Custom Scrollbar
Add styled scrollbars to scrollable containers:

```tsx
<div className="custom-scrollbar overflow-auto">
  {/* Content with custom scrollbar */}
</div>
```

### Text Gradient
Create gradient text effects:

```tsx
<h1 className="text-gradient">
  Gradient Text
</h1>
```

## Custom Animations

### Available Animations
- `animate-fade-in` - Smooth fade in with upward motion
- `animate-pulse-glow` - Pulsing opacity effect
- `animate-slide-in-left` - Slide in from the left

### Usage Example
```tsx
<div className="animate-fade-in">
  This element fades in smoothly
</div>

<button className="hover:animate-pulse-glow">
  Glowing button
</button>
```

## Typography
The application now uses **Inter** font from Google Fonts as the primary sans-serif typeface, providing a modern and clean reading experience.

## Border Radius
Default border radius has been increased from `0.5rem` to `0.75rem` for softer, more modern corners.

## Sidebar Colors
Dedicated sidebar color tokens are now available:
- `bg-sidebar` - Sidebar background
- `text-sidebar-foreground` - Sidebar text
- `bg-sidebar-primary` - Sidebar primary elements
- `border-sidebar-border` - Sidebar borders

## Migration Tips

### Updating Existing Components
1. Cards and panels can use `.glass` or `.glass-strong` for modern effects
2. Add `animate-fade-in` to elements that should animate on mount
3. Use `text-gradient` for headings and important text
4. Apply `custom-scrollbar` to any scrollable containers

### Color Usage
- Use `bg-primary` and `text-primary` for accent elements
- Use `bg-card` for card backgrounds (already has dark theme applied)
- Use `border-border` for consistent border colors
