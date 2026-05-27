---
name: Technical Grounding
colors:
  surface: '#f7f9ff'
  surface-dim: '#cfdbea'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e3effe'
  surface-container-high: '#dde9f9'
  surface-container-highest: '#d7e4f3'
  on-surface: '#111d27'
  on-surface-variant: '#594238'
  inverse-surface: '#26323d'
  inverse-on-surface: '#e7f2ff'
  outline: '#8c7166'
  outline-variant: '#e0c0b2'
  surface-tint: '#a23f00'
  primary: '#9e3d00'
  on-primary: '#ffffff'
  primary-container: '#c64f00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb595'
  secondary: '#4e6074'
  on-secondary: '#ffffff'
  secondary-container: '#cee1fa'
  on-secondary-container: '#526479'
  tertiary: '#006a35'
  on-tertiary: '#ffffff'
  tertiary-container: '#008645'
  on-tertiary-container: '#f6fff4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcd'
  primary-fixed-dim: '#ffb595'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7c2e00'
  secondary-fixed: '#d1e4fc'
  secondary-fixed-dim: '#b5c8e0'
  on-secondary-fixed: '#091d2e'
  on-secondary-fixed-variant: '#36485c'
  tertiary-fixed: '#7efba4'
  tertiary-fixed-dim: '#61de8a'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#f7f9ff'
  on-background: '#111d27'
  surface-variant: '#d7e4f3'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is built for HamroStay AI, a technical infrastructure engine that bridges the gap between rugged rural homestays and sophisticated AI-driven logistics. The personality is **authoritative yet accessible**, functioning as a reliable tool for hosts in varying environmental conditions.

The visual style is **Corporate Modern with a Minimalist edge**. It prioritizes high-contrast clarity and structural order, ensuring that data-heavy technical visualizers remain legible even in high-glare outdoor settings. It avoids unnecessary decoration, favoring functional surfaces and precise architectural lines that mirror the stability of Himalayan masonry.

## Colors
The palette is rooted in the "Terracotta Orange" primary color, symbolizing the earth and traditional construction, providing a warm but commanding presence. This is balanced by "Slate Blue" for technical precision and professional depth.

**High-contrast accessibility** is the priority. Pure charcoal text on an off-white background ensures maximum readability for users on the move. Use the Primary color for main actions and branding, and the Secondary color for navigational elements and technical metadata.

## Typography
This design system utilizes **Plus Jakarta Sans** across all levels to maintain a contemporary and friendly, yet geometric and structured feel. 

The type scale is intentionally compact to accommodate data-rich dashboards and technical interfaces. **Headline-LG** is reserved for page titles, while **Body-MD** (14px) serves as the primary reading size for maximum information density without sacrificing legibility. Use bold weights for emphasis in technical labels and status indicators.

## Layout & Spacing
The spacing logic is governed by an **8px Grid Unit**, ensuring rhythmic consistency across all components. 

The layout follows a **fluid flex-box architecture**, optimized primarily for mobile-first utility in rural areas. 
- **Mobile:** Single column layout with 16px side margins. 
- **Tablet/Desktop:** Content is organized into a 12-column grid with 24px gutters, but maintains a max-width of 1280px to prevent excessive eye travel on wide monitors.

Use the `md` (16px) spacing for standard padding within cards and containers to ensure elements have room to breathe while remaining compact.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows. This maintains a "technical" and flat aesthetic that performs better under varying screen brightness levels.

- **Level 0 (Background):** #F8F9F9 — The base canvas.
- **Level 1 (Surface):** #FFFFFF — Main content cards and containers.
- **Level 2 (Interaction):** Surface with a 1px border (#D5DBDB) and a very soft, subtle 4px blur shadow to indicate interactivity or hover states.

Visual hierarchy should be achieved through the contrast between the off-white background and pure white surfaces.

## Shapes
The shape language uses **Softened Geometry**. 
- **RADIUS_SM (4px):** Used for small interactive elements like checkboxes, radio buttons, and tags.
- **RADIUS_MD (8px):** The standard for buttons and input fields, providing a modern but sturdy feel.
- **RADIUS_LG (16px):** Reserved for large surface containers and cards, creating a clear distinction between the background and the content area.

The use of `roundedness: 2` ensures the UI feels approachable for local hosts without appearing "toy-like" or overly casual.

## Components

### Buttons
Primary buttons use the Terracotta Orange (#D35400) with white text. Secondary buttons use a Slate Blue (#2E4053) outline or ghost style. Use 8px (RADIUS_MD) corner radius and 12px vertical padding.

### Input Fields
Inputs are white with a 1px Slate Gray (#5D6D7E) border. On focus, the border shifts to Terracotta Orange with a subtle 2px glow. Labels must always be visible above the field (never just placeholders).

### Cards
Cards are the primary organizational unit. Use #FFFFFF background, RADIUS_LG (16px), and a subtle 1px border. No heavy shadows. Use internal padding of 24px (Spacing LG).

### Technical Visualizers
For AI-driven data (like occupancy predictions or logistics), use Slate Blue for the container and Emerald Green (#27AE60) for positive trend data. Graphs should use thin 1px strokes and avoid heavy fills to maintain the "infrastructure engine" aesthetic.

### Status Chips
Small, high-contrast badges using 4px (RADIUS_SM). Use semi-transparent backgrounds of the status color (Success, Warning, Error) with high-contrast dark text for readability.