# Brand Kit + Assets Guide

The mascots and logos have been abstracted into a semantic structure for A/B testing.

## Structure

### **Mascots**

- **Nav Mascots**: `/public/mascots/nav/mascot-{1,2,3}.png` - Small circular mascots for navbar
- **Standalone Mascots**: `/public/mascots/standalone/mascot-{1,2,3}.png` - Larger mascots for other uses

### **Logos**

- **Nav Logos**: `/public/logos/nav/logo-{type}-{variant}.png` - Horizontal logos for navbar
- **Footer Logos**: `/public/logos/footer/logo-{type}-{variant}.png` - Footer versions (include brand moto, which nobody really cares about)

Where:

- `{type}` = `minimal` | `standard` | `full`
  - **minimal**: Just "Fest Vibes AI" text
  - **standard**: Mascot + "Fest Vibes AI"
  - **full**: Mascot + "Fest Vibes AI" + "Discover. Curate. Experience."
- `{variant}` = `1` | `2` | `3` (different mascot designs)

## Add New Assets

From Canva for example:

1. **Export from Canva** with consistent naming
2. **Drop files** into the appropriate folders:
   ```
   public/
   ├── mascots/nav/mascot-3.png          # New nav mascot variant 3
   ├── logos/nav/logo-standard-3.png     # New nav logo (mascot + text)
   └── logos/footer/logo-full-3.png      # New footer logo (full branding)
   ```
3. **Assets automatically work** - no code changes needed!

## Testing Your Assets

### Quick Test (Change defaults)

Edit `/src/hooks/use-feature-flags.ts` lines 43-44:

```typescript
mascotVariant: "3", // Change to test different mascot
logoType: "full",   // Change to test different logo type
```

### PostHog A/B Testing

Set up these feature flags in PostHog:

- `mascot-variant`: "1", "2", or "3"
- `logo-type`: "minimal", "standard", or "full"

## Layout Options

The logos work with all three navbar layouts:

- **Left** (default): Logo on the left, nav links on the right
- **Right**: Nav links on the left, logo on the right
- **Center**: Logo centered on top, nav links below

## **Complete Brand Palette for Canva:**

### **Primary Background:**

- **Dark Slate**: `#0F172A`
- **Deep Purple**: `#581C87`

### **Accent Colors:**

- **Purple 500**: `#A855F7`
- **Pink 500**: `#EC4899`
- **Purple 400**: `#C084FC`
- **Pink 400**: `#F472B6`

### **Festival Theme:**

- **Light Purple Blue**: `#667EEA`
- **Deep Purple**: `#764BA2`

### **Stage Lights Theme:**

- **Coral Red**: `#FF6B6B`
- **Turquoise**: `#4ECDC4`
- **Sky Blue**: `#45B7D1`
- **Mint Green**: `#96CEB4`
- **Light Yellow**: `#FFEAA7`
