# Architecture & Implementation Plan: HamroStay AI Distribution Engine

This document outlines the comprehensive engineering plan to build the **HamroStay AI Distribution Engine** as a premium, state-of-the-art **React + Vite + TypeScript** web application. 

The application is modeled directly on the design specifications and screen flows retrieved from the Stitch design system.

---

## 1. Project Overview & Creative Vision

**HamroStay AI Distribution Engine** is a distribution and optimization suite tailored for premium boutique homestays in Nepal. The application goes beyond transactional utility, prioritizing a **Warm Boho / Modern Minimalist** aesthetic that mirrors a warm, grounded, and hospitable mountain lodge experience. 

### Core Product Objectives
*   **Onboard** boutique properties seamlessly.
*   **Distribute** property assets and contents across multiple booking networks.
*   **Optimize** property visibility for search engines and AI agents using Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).
*   **Analyze** local hospitality datasets and view connection entities in a specialized Knowledge Graph.

---

## 2. Design & Styling System (Warm Boho Minimalist)

The style avoids standard high-intensity "tech blues" in favor of organic, desaturated earth tones and high-end editorial typography.

### 2.1 CSS Variables / Design Tokens (`src/index.css`)
```css
:root {
  /* Color Palette */
  --color-primary: #d67d61;             /* Soft Terracotta */
  --color-primary-dim: #ffb59e;
  --color-secondary: #9caf88;           /* Soft Sage */
  --color-tertiary: #b58d72;            /* Clay / Muted Ochre */
  --color-background: #f7fafb;          /* Soft, off-white background */
  --color-background-cream: #F9F7F2;    /* Warm Cream for central layouts */
  --color-surface: #ffffff;             /* Clean white for elevated elements */
  --color-surface-warm: #F1EDE4;        /* Warm background accent */
  --color-text-main: #181c1d;           /* Deep Slate / Charcoal */
  --color-text-muted: #54433e;          /* Muted brown/gray for subtexts */
  --color-outline: #dac1ba;             /* low opacity clay outline */
  --color-error: #ba1a1a;
  --color-error-container: #ffdad6;

  /* Typography */
  --font-headline: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing Grid (8px Base) */
  --spacing-base: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 64px;

  /* Border Radius & Shapes */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Soft Ambient Elevations (No harsh drop shadows) */
  --shadow-ambient: 0 4px 20px rgba(84, 67, 62, 0.06);
  --shadow-hover: 0 10px 30px rgba(84, 67, 62, 0.1);
  --glass-blur: 10px;
}
```

### 2.2 Global Styling & UI Rules
*   **The "No-Line" Rule:** Avoid heavy 1px lines. Define boundaries by shifting background values (e.g., transitioning from `--color-background` to `--color-background-cream`).
*   **Glassmorphism navigation:** Sticky headers/sidebars should use `rgba(249, 247, 242, 0.8)` with `backdrop-filter: blur(var(--glass-blur))`.
*   **Interactive Micro-animations:** Smooth ease-in-out transitions (`200ms`) on cards, chips, and buttons. Hover actions should trigger mild scaling and warm shadow expansion.

---

## 3. Technology Stack & Directory Structure

*   **Core:** React (v18+), TypeScript, Vite (for ultra-fast dev server and bundle compilation).
*   **Routing:** React Router v6.
*   **Icons:** Lucide React (for minimalist outline icons matching the editorial style).
*   **State Management:** Standard React Context API for global distribution run metrics, active host properties, and log history.
*   **Visualizations:** React-Force-Graph or custom SVG rendering for the interactive **Knowledge Graph** screen.

### 3.1 Recommended File Structure
```
product-harnessing/
├── public/
├── src/
│   ├── assets/             # Brand logos, placeholder Nepali mountain imagery
│   ├── components/         # Shared reusable components
│   │   ├── Sidebar.tsx     # Editorial navigation sidebar
│   │   ├── Topbar.tsx      # Quick actions and user details
│   │   ├── CustomCard.tsx  # Warm shadow card container
│   │   └── ProgressBar.tsx # Cozy micro-animated distribution progress indicator
│   ├── context/
│   │   └── AppContext.tsx  # Global state (onboarding data, history logs, factory runs)
│   ├── pages/              # The 8 views retrieved from Stitch
│   │   ├── Onboarding.tsx  # New Project Onboarding
│   │   ├── Factory.tsx     # Distribution Factory
│   │   ├── Resources.tsx   # Resources Manager
│   │   ├── AeoEngine.tsx   # AEO Answer Engine
│   │   ├── GeoDataset.tsx  # GEO Dataset Explorer
│   │   ├── GraphView.tsx   # Knowledge Graph View
│   │   ├── HistoryLog.tsx  # History Audit Screen
│   │   └── HostProfile.tsx # Host Settings & Profile
│   ├── styles/
│   │   └── design-system.css
│   ├── types/
│   │   └── index.ts        # Typed interfaces
│   ├── App.tsx             # Main shell and routes wrapper
│   ├── index.css           # Typography, CSS variables, and resets
│   └── main.tsx            # App bootstrap
├── index.html
├── PLAN.md                 # This execution plan
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Comprehensive Screen Specifications & Routing

The application incorporates a permanent, editorial Sidebar layout (`--color-background-cream` background, serif headline branding, elegant navigation items) with `App.tsx` acting as the central shell layout.

### 4.1 Route Matrix & Layout Detail

```
+-------------------------------------------------------------------------+
|  HamroStay Logo   |  Active Property: Annapurna Homestay Lodge [Select] |
|  [Playfair Serif] |                                                     |
+-------------------+-----------------------------------------------------+
| (o) Onboarding    |                                                     |
| [ ] Factory       |                                                     |
| [ ] Resources     |                                                     |
| [ ] AEO Engine    |              MAIN CONTROLLER DISPLAY                |
| [ ] GEO Dataset   |              (Responsive Route Outlet)              |
| [ ] Graph         |                                                     |
| [ ] History       |                                                     |
| [ ] Host Profile  |                                                     |
+-------------------+-----------------------------------------------------+
```

---

### 4.2 Details of the 8 Core Screens

#### Screen 1: New Project Onboarding (`/onboarding` or `/`)
*   **Purpose:** Allow a boutique lodge to initialize their setup, link booking credentials, and establish their AI distribution profile.
*   **Visual Highlights:**
    *   Left-aligned, elegant `display-lg` headline with warm introduction subtext.
    *   Stepped layout card using soft tonal divisions.
    *   Form fields for lodging type, room inventory, local experiences, and custom host bios.
    *   Connectors for booking portals (Booking.com, Airbnb, Expedia) using custom switch-toggles.

#### Screen 2: Distribution Factory (`/factory`)
*   **Purpose:** The nerve center. Initiates asset distribution across channels and generates AI content layouts.
*   **Key Controls & Interactions:**
    *   "Start Distribution Run" primary Terracotta button with active animation.
    *   Live state machine displaying progress across different channels (Expedia, Tripadvisor, Google Hotel, Local Homestay Registry).
    *   A visual layout board showing generated marketing content (Nepali translations, amenities highlights, cultural packages) ready for distribution.

#### Screen 3: Resources Manager (`/resources`)
*   **Purpose:** File repository and distribution file assets (lodge imagery, legal certs, local guides).
*   **Key Controls & Interactions:**
    *   A clean grid of warm-tinted folder structures.
    *   Drag-and-drop file upload zone styled in `--color-surface-warm` with a dashed terracotta border.
    *   Metadata inspector sidebar that slides in to show file resolutions, distribution statuses, and tags (e.g., "Dining Room", "Annapurna View").

#### Screen 4: AEO Answer Engine (`/aeo`)
*   **Purpose:** Optimize answers for AI assistants (Gemini, ChatGPT, Perplexity) when tourists ask specific trip-related questions.
*   **Key Controls & Interactions:**
    *   "Interactive Simulator Query Box": allows users to type queries like: *"Where can I find an authentic Nepali homestay with mountain views near Pokhara?"*
    *   "AEO Optimization Cards": displays the current generated response and highlights areas optimized for high relevance scores.
    *   A visual scoring gauge (0-100) indicating the local property's visibility rate in AI chats.

#### Screen 5: GEO Dataset Explorer (`/geo`)
*   **Purpose:** Generative Engine Optimization dataset analyzer, showcasing local pricing models, competitor margins, and target customer demographics.
*   **Key Controls & Interactions:**
    *   An interactive datagrid listing local homestay datasets.
    *   Filter chips (e.g. "Shared Bathroom", "Organic Meals", "High Elevation") that highlight active options in Soft Sage.
    *   A minimalist mock-map component illustrating spatial visibility in local searches.

#### Screen 6: Knowledge Graph (`/graph`)
*   **Purpose:** Visualize relationships between the homestay property, nearby attractions (e.g. Phewa Lake, Sarangkot), local guides, and regional transportation nodes.
*   **Key Controls & Interactions:**
    *   Interactive SVG or canvas-based node-link diagram.
    *   Nodes representing: *Host*, *Property*, *Experience*, *Attraction*, *Liaison*.
    *   Detail panel showing connection weights on hover.

#### Screen 7: Host Settings & Profile (`/settings`)
*   **Purpose:** Full administrative panel for the host's personal details, subscription plans, notifications, and security.
*   **Key Controls & Interactions:**
    *   Profile card with soft ambient shadow.
    *   Nepali culture custom branding toggle.
    *   Tabbed interface switching between: "Host Profile", "Payouts", "Distribution Policies".

#### Screen 8: History & Audit Log (`/history`)
*   **Purpose:** Deep historical audit trail of all automated distribution runs, content revisions, and status adjustments.
*   **Key Controls & Interactions:**
    *   Chronological timeline widget with clean state-indicator badges (Success in Sage, Error in Soft Red, Pending in Clay).
    *   Filter-by-date dropdown.
    *   Search bar targeting historical text edits.

---

## 5. Development & Step-by-Step Implementation Roadmap

The engineering team will implement this system in 5 distinct phases to guarantee high fidelity and robustness:

### Phase 1: Environment & Style Foundations
*   [ ] Initialize the Vite project with React and TypeScript.
*   [ ] Set up `@types/react` and `@types/react-dom`.
*   [ ] Build out `src/index.css` incorporating the entire **Warm Boho Minimalist** color and typography tokens.
*   [ ] Import premium serif and sans-serif typography fonts.

### Phase 2: App Shell, Layout & Global Context
*   [ ] Code the main `App.tsx` shell, integrating React Router v6.
*   [ ] Build the permanent, elegant `Sidebar.tsx` navigation component using backdrop blurs.
*   [ ] Establish the `AppContext.tsx` global state to manage shared lists (properties, distribution run events, folder resources, simulation queries, and audit logs).

### Phase 3: Screen Implementations (Static Layouts first)
*   [ ] Implement `/onboarding` setup inputs and toggle credentials.
*   [ ] Build `/factory` distribution dashboards and card grids.
*   [ ] Code the folder structures and upload panels in `/resources`.
*   [ ] Establish `/aeo` simulated console panel and optimization layouts.
*   [ ] Populate `/geo` with datagrid details and filtration structures.
*   [ ] Implement `/graph` node-links base containers.
*   [ ] Construct `/settings` profile panels and billing lists.
*   [ ] Populate `/history` chronological tracking rows.

### Phase 4: Dynamic logic & Interactions
*   [ ] Simulate a distribution run in `Factory.tsx` with dynamic progression triggers (e.g., using intervals).
*   [ ] Wire search and folder switching in `Resources.tsx`.
*   [ ] Build real-time response generation and optimization rating updates inside `AeoEngine.tsx`.
*   [ ] Implement client-side filtering and sorting for `GeoDataset.tsx`.
*   [ ] Render interactive node networks using SVG rendering in `GraphView.tsx`.
*   [ ] Connect configuration updates in `HostProfile.tsx` to reflect globally.

### Phase 5: Verification & Micro-Animations
*   [ ] Verify color compliance against design variables.
*   [ ] Optimize components to ensure smooth transitions on page navigation.
*   [ ] Confirm desktop layout responsiveness (adaptive margins, single-column fallback for mobile previews).
*   [ ] Write unit verification logs.

---

## 6. Verification & Quality Checklist

### Automated Verifications
*   Run `npm run build` to confirm compilation without TypeScript warnings or bundling exceptions.
*   Check Lighthouse performance and accessibility parameters.

### User Interaction Review
*   Ensure zero harsh shadows or raw standard gray elements are used in borders/dividers.
*   Verify that clicking "Start Distribution Run" triggers animated loader chips representing active channel uploads.
*   Confirm that switching homestays changes global assets seamlessly.

---
*Created on May 26, 2026, for the HamroStay Homestay distribution initiative.*
