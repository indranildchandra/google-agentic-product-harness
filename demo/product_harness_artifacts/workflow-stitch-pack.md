# Workflow Stitch Pack: HamroStay AI

---

### STITCH PROMPT: S01-auth — Unified Access Portal

PLATFORM: mobile
VIEWPORT: 360px mobile

DESIGN TOKENS:
- Font: Plus Jakarta Sans
- Grid: 8pt
- Radius: 16px
- Primary color: #D35400
- Background: #F8F9F9
- Text primary: #1C2833

LAYOUT:
- Header: Fixed top bar, 56px tall, central text logo "HamroStay AI" using COLOR_PRIMARY, right-aligned language selector chip.
- Main content area: Single column layout centered vertically, 16px lateral padding bounds, standard SPACING_LG vertical gaps.
- Footer: Safe baseline area, 48px height, containing dark text links for structural terms and privacy references.

COMPONENTS ON THIS SCREEN:
1. Native Text Input field centered vertically at layout middle, placeholder: "Enter Mobile Number", bordered frame using RADIUS_MD.
2. PrimaryButton immediately below the input field, label: "Request Verification Code", background using COLOR_PRIMARY, text using COLOR_SURFACE, full width layout block.
3. Isolated Error Card bounded in layout bottom, background using #FDEDEC, text using COLOR_ERROR, default visibility hidden.

STATES THIS SCREEN MUST RENDER:
- Default state: Displays clean input field, primary interaction button enabled, language toggle defaulting to regional native scripts.
- Empty state: Same as default state.
- Loading state: PrimaryButton transforms label into a spinning loader, input container interaction state switches to read-only.
- Error state: A red bordered card appears above the input block containing clear typography: "Invalid Mobile Number Country Code. Please try again."

KEY INTERACTION:
- When user inputs a valid mobile structure and taps PrimaryButton, system fires the verification routine, switches button to loading state, and redirects to validation screen.

ACCESSIBILITY MUST-HAVES:
- Minimum 4.5:1 contrast on body text
- Focus rings on all interactive elements
- Touch targets minimum 44x44px on mobile

OUTPUT FORMAT: Generate this screen as a single Stitch frame. Do not generate multiple variants.

---

### STITCH PROMPT: S02-dashboard — Core Infrastructure Hub

PLATFORM: mobile
VIEWPORT: 360px mobile

DESIGN TOKENS:
- Font: Plus Jakarta Sans
- Grid: 8pt
- Radius: 16px
- Primary color: #D35400
- Background: #F8F9F9
- Text primary: #1C2833

LAYOUT:
- Header: Fixed top bar, 64px tall, branding logo left, right-aligned profile icon avatar with a secondary blue indicator badge.
- Main content area: Multi-layer vertical card scroll configuration, 16px structural padding, cards segmented by SPACING_MD blocks.
- Footer: Bottom navigation bar, fixed 64px height, displaying centered primary action launcher flanked by secondary asset filters.

COMPONENTS ON THIS SCREEN:
1. OptimizationCard positioned at top center, displaying large numerical layout typography "72%", integrated inline warning text tag: "3 Stays Lack AI Schema Layers".
2. Multi-row scrolling list of managed properties, each row utilizing a structural card layout using RADIUS_MD with localized status pill markers.
3. Floating Action Button centered at footer cross-section, circular diameter 56px, background using COLOR_PRIMARY, containing centralized microphone icon element.

STATES THIS SCREEN MUST RENDER:
- Default state: Displays the optimization dashboard score block alongside 3 active, row-configured property records.
- Empty state: Replaces property list with a centered graphic element and an illustrative text string: "No Homestays Registered. Tap the icon below to begin onboarding."
- Loading state: Replaces card content items with matching grey structural skeleton panels.
- Error state: Displays top-aligned notification banner with background color matching COLOR_ERROR, text displaying: "Data Synchronization Delayed. Retrying connection."

KEY INTERACTION:
- Tapping the circular floating microphone action button instantly triggers a system viewport wipe sequence, loading the audio intake console module.

ACCESSIBILITY MUST-HAVES:
- Minimum 4.5:1 contrast on body text
- Focus rings on all interactive elements
- Touch targets minimum 44x44px on mobile

OUTPUT FORMAT: Generate this screen as a single Stitch frame. Do not generate multiple variants.

---

### STITCH PROMPT: S03-audio-intake — Localization Capture Terminal

PLATFORM: mobile
VIEWPORT: 360px mobile

DESIGN TOKENS:
- Font: Plus Jakarta Sans
- Grid: 8pt
- Radius: 16px
- Primary color: #D35400
- Background: #1C2833
- Text primary: #FFFFFF

LAYOUT:
- Header: Dark contextual navigation bar, 56px height, displaying a prominent left-aligned close text link, and central tracking header text.
- Main content area: Immersive focus layout with dark styling, center-aligned visual content elements, 24px lateral padding boundaries.
- Footer: Centered interactive dashboard dock container, fixed height 120px above baseline viewport frame.

COMPONENTS ON THIS SCREEN:
1. Status Headline Block at upper middle layout section, typography text rendering: "Listening to Homestay Details...", colored text using #FFFFFF.
2. Core Audio Ingestion Ring centered in screen area, featuring concentric wave elements scaled out to 160px container dimensions, styled with COLOR_PRIMARY accents.
3. Secondary Text Fallback Trigger button aligned below the ingestion ring interface, text label reading: "Switch to Typing Input Instead".

STATES THIS SCREEN MUST RENDER:
- Default state: Ready indicator mode, concentric wave graphic sits static, central capture text reading "Tap and Speak your Property Update".
- Recording state: Wave graphic displays active variable height animation frames, tracking text displaying real-time counter metrics "01:24 / 03:00".
- Loading state: Disables input tracking layers, surfaces a centralized spinning graphic layout accompanied by text: "Finalizing Audio Stream Compilation...".
- Error state: Outer boundary ring shifts color parameters to match COLOR_ERROR, tracking message changes text string: "Audio Capture Truncated. Check microphone system permissions."

KEY INTERACTION:
- Tapping the center capture zone triggers recording activation; tapping a second time halts the hardware pipeline and forwards data to the processing cluster.

ACCESSIBILITY MUST-HAVES:
- Minimum 4.5:1 contrast on body text
- Focus rings on all interactive elements
- Touch targets minimum 44x44px on mobile

OUTPUT FORMAT: Generate this screen as a single Stitch frame. Do not generate multiple variants.

---

### STITCH PROMPT: S04-processing-state — Pipeline Execution Monitor

PLATFORM: mobile
VIEWPORT: 360px mobile

DESIGN TOKENS:
- Font: Plus Jakarta Sans
- Grid: 8pt
- Radius: 16px
- Primary color: #D35400
- Background: #F8F9F9
- Text primary: #1C2833

LAYOUT:
- Header: Minimal tracking bar tracking active flow steps, layout height 56px, close action links disabled during active background data transactions.
- Main content area: Centralized process ladder vertical array layout, 24px margin padding, lines linked by structural progress tracks.
- Footer: Isolated indicator box displaying system status logs, positioned at bottom view margin.

COMPONENTS ON THIS SCREEN:
1. PipelineVisualizer taking up the central screen area, rendering 4 linear operational rows with clear typography markers: "Dialect Transcription", "Human Copy Generation", "Semantic FAQ Mapping", "JSON-LD Entity Creation".
2. Progress Indicator Icon attached to each row, switching dynamically between a checkmark, spinning icon element, or pending dot indicator.
3. System Telemetry Label below the process ladder array, text reading: "Estimated Processing Time Remaining: 2 Seconds".

STATES THIS SCREEN MUST RENDER:
- Default state (Loading): Row 1 displays checkmark green; Row 2 displays active spinning orange indicator; Rows 3 and 4 sit in grey pending states.
- Error state: Current active row transforms progress icon into an alert indicator matching COLOR_ERROR, bottom terminal window surfaces text: "Linguistic Model Exception: Unrecognized Romanized Script Fragment."
- Success state: All 4 rows show matching green checkmarks, button block slides up at baseline reading: "Proceed to Asset Review".

KEY INTERACTION:
- Upon absolute resolution of all operational pipeline items, the dashboard dispatches an automated transition routine forwarding the view layout into the review hub.

ACCESSIBILITY MUST-HAVES:
- Minimum 4.5:1 contrast on body text
- Focus rings on all interactive elements
- Touch targets minimum 44x44px on mobile

OUTPUT FORMAT: Generate this screen as a single Stitch frame. Do not generate multiple variants.

---

### STITCH PROMPT: S05-review-hub — Semantic Asset Control Center

PLATFORM: mobile
VIEWPORT: 360px mobile

DESIGN TOKENS:
- Font: Plus Jakarta Sans
- Grid: 8pt
- Radius: 16px
- Primary color: #D35400
- Background: #F8F9F9
- Text primary: #1C2833

LAYOUT:
- Header: Fixed control bar, height 64px, back navigation arrow left, right side displaying validation score flag "98% Valid".
- Main content area: Horizontal segmented tab nav bar at top, scrolling structured content output sheet container taking up central screen area.
- Footer: Dual interaction button bar layout at bottom, fixed 72px elevation bar, split 30/70 width allocation.

COMPONENTS ON THIS SCREEN:
1. AssetPreviewTabs selector array at top section containing 4 interactive label tabs: "Marketing Copy", "FAQs", "LLM Markdown", "JSON Schema".
2. Monospace Output Console card taking up central view canvas, displaying compiled data outputs (e.g., structured JSON code snippet blocks with syntax color accents).
3. Primary Action Button set in footer row right, full tracking text label reading: "Approve & Broadcast Distribution Assets".

STATES THIS SCREEN MUST RENDER:
- Default state: Marketing Copy tab selected by default, displaying formatted text headers and descriptive paragraphs in clean multi-lingual blocks.
- Partial-data state: Renders text blocks accurately, but replaces JSON Schema view frame with a notice box stating: "Entity Layout Generation Delayed. Click to regenerate."
- Loading state: Replaces central output card body block with matching structural placeholder lines.
- Error state: Main view panel dims, surfacing a dark modal box layout saying: "Asset Validation Integrity Failure. Cannot broadcast unverified entities."

KEY INTERACTION:
- Tapping alternate selector tabs alters output console panel data tracking layers instantly within a 50ms transition envelope.

ACCESSIBILITY MUST-HAVES:
- Minimum 4.5:1 contrast on body text
- Focus rings on all interactive elements
- Touch targets minimum 44x44px on mobile

OUTPUT FORMAT: Generate this screen as a single Stitch frame. Do not generate multiple variants.

---

### STITCH PROMPT: S06-distribution-status — Global Index Integration Panel

PLATFORM: mobile
VIEWPORT: 360px mobile

DESIGN TOKENS:
- Font: Plus Jakarta Sans
- Grid: 8pt
- Radius: 16px
- Primary color: #D35400
- Background: #F8F9F9
- Text primary: #1C2833

LAYOUT:
- Header: Standard system application bar, height 56px, containing left action exit close button returning back to main profile dashboard.
- Main content area: Vertical connection grid tracking destination indexes, 16px lateral padding, structural rows separated by thin light divider bars.
- Footer: Sticky layout bar at baseline containing one primary full width structural action button container.

COMPONENTS ON THIS SCREEN:
1. Sync Status Banner at upper tier layout boundary, background using COLOR_SUCCESS, clear contrast text reading: "Synchronization Active across 4 Systems".
2. Network Integration Row list, displaying explicit branding text lines: "Google Knowledge Graph Node", "Perplexity Travel Crawl Target", "OpenAI Travel Dataset Index", "WhatsApp API Direct Channel".
3. Return Navigation Button at screen bottom, label text: "Return to Main Dashboard", background using COLOR_SECONDARY.

STATES THIS SCREEN MUST RENDER:
- Default state: Displays all integration rows with verified status pill icons matching COLOR_SUCCESS with labels reading "Indexed & Live".
- Loading state: Sync rows display pulsing loading status labels, showing active amber color accents tracking transmission progress.
- Error state: A targeting integration row flags a warning block matching COLOR_WARNING with side typography reading: "Crawl Timeout. Retrying execution in background."

KEY INTERACTION:
- Tapping the baseline return navigation button purges active state memory buffers and returns application viewport routing back to `S02-dashboard`.

ACCESSIBILITY MUST-HAVES:
- Minimum 4.5:1 contrast on body text
- Focus rings on all interactive elements
- Touch targets minimum 44x44px on mobile

OUTPUT FORMAT: Generate this screen as a single Stitch frame. Do not generate multiple variants.

---
