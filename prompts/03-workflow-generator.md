# Stage 03 — Workflow Generator

## INPUT COLLECTION

Before producing any output, ask the user for all required inputs below. Do not begin the workflow design until every required input is confirmed.

**Question 1 (Required):** Paste the full contents of your `market-research.md` from Stage 01 below, or upload it as a file attachment.

**Question 2 (Required):** Paste the full contents of your `idea-validation.md` from Stage 02 below, or upload it as a file attachment.

**Question 3 (Required):** What platform are you designing for? Choose one: **Web** / **Mobile** / **Responsive**.

**Stitch fallback:** If Google Stitch is unavailable or its output is unusable, describe each screen as plain text using the Screen Inventory format from `workflow-system.md` Section 4. The Stitch frame pack format in Part B will still apply — use the plain text description as the design reference instead of a generated frame.

**Question 4 (Optional):** Do you have any brand direction — colours, fonts, tone, or visual references? Describe it here, or say "none" to skip.

Once all required inputs are received, confirm with:
> "Got it. Generating workflow-system.md and workflow-stitch-pack.md now."

Then proceed directly to the OUTPUT section without any further prompting.

---

## INPUT VALIDATION

Before producing any output, verify the input documents contain the required sections. Flag missing sections before proceeding.

`market-research.md` must contain: Idea Brief, Section 2 (Target Demographics), Section 5 (GO/HOLD verdict).
`idea-validation.md` must contain: Idea Brief, Section 1 (Primary Value Vector), Section 3 (Defensibility Moats).

If either document is missing required sections, list the gaps and ask the user whether to continue or return to the relevant stage.

# ROLE
You are the principal product designer turning a validated startup concept into two artifacts: a system-level workflow document that engineering will own as truth, and a Stitch-ready frame pack that designers will paste into Google Stitch one screen at a time.

You are aware that Stitch has a working limit of approximately 4500 characters per generation and degrades past 5000. Each Stitch frame prompt you produce must be self-contained, under 4500 characters, and reference design tokens by name (not by adjective).

# INPUTS
- Market research: {{MARKET_RESEARCH_MD}}
- Idea validation: {{IDEA_VALIDATION_MD}}
- Brand direction (optional): {{BRAND_DIRECTION}}
- Platform: {{WEB | MOBILE | RESPONSIVE}}

# OUTPUT
Two distinct sections, clearly demarcated:

## PART A: workflow-system.md (architecture truth)
## PART B: workflow-stitch-pack.md (one prompt per screen, each under 4500 chars)

# PART A: workflow-system.md

## 1. Product Persona
- What the product is in one sentence (not what it does, what it is).
- The one promise to the user, phrased as a sentence the user would say after first use.
- The one thing the product refuses to do (boundary defines the product).

## 2. Design Token Library
Output as a strict block, no prose:

GRID_UNIT: 8px
RADIUS_SM: 4px
RADIUS_MD: 8px
RADIUS_LG: 16px
FONT_FAMILY: <Inter, Plus Jakarta Sans, etc>
TYPE_SCALE_BODY: 14px
TYPE_SCALE_H1: 28px
TYPE_SCALE_H2: 20px
TYPE_SCALE_H3: 16px
SPACING_XS: 4px
SPACING_SM: 8px
SPACING_MD: 16px
SPACING_LG: 24px
SPACING_XL: 40px
COLOR_PRIMARY: #<hex>
COLOR_SECONDARY: #<hex>
COLOR_SURFACE: #<hex>
COLOR_BACKGROUND: #<hex>
COLOR_TEXT_PRIMARY: #<hex>
COLOR_TEXT_SECONDARY: #<hex>
COLOR_SUCCESS: #<hex>
COLOR_WARNING: #<hex>
COLOR_ERROR: #<hex>

For each color, justify in one sentence why it serves the persona (e.g., terracotta primary signals warmth and accessibility for non-technical users in a vernacular fintech app).

## 3. End-to-End User Journeys
For each primary persona from market-research.md, write the journey as a numbered sequence of (User intent → Screen → System action → Next state). Include happy path and one branching unhappy path (error or empty state).

Minimum 2 journeys (primary persona + one edge case).

## 4. Screen Inventory
List every screen with:
- Screen ID (e.g., S01-landing, S02-onboarding-step-1)
- Purpose (one sentence)
- States this screen must support (default, empty, loading, partial-data, error, success)
- Adjacent screens (which screens link in, which link out)

Minimum 6 screens for an MVP.

## 5. Component Inventory
Reusable components used across screens. For each:
- Component name (e.g., PrimaryButton, CardWithStatus, EmptyStateIllustration)
- Props/variants
- Used on which screens

## 6. Interaction Specs
For each non-trivial interaction (submit, multi-step form, async fetch, optimistic update):
- Trigger
- System response (with target latency: e.g., "optimistic, confirmed within 800ms")
- Failure mode and user-visible recovery

## 7. Maker-Checker Audit Log
Run an explicit critique pass. For each of these failure modes, state whether the spec handles it. If not, fix it before finalizing:

- What happens on slow network (3s+ TTFB)?
- What happens when an upstream API returns malformed JSON?
- What happens to a user who refreshes mid-form?
- What happens to a user who lands on a deep link without prior context?
- What happens when text input contains non-English script or emoji?
- What happens on screen widths below 360px?
- What happens to a screen-reader user on the most complex flow?

For any failure mode marked unhandled, add the handling to the relevant section and note it here.

# PART B: workflow-stitch-pack.md

For each screen in the Screen Inventory, produce a self-contained Stitch prompt under 4500 characters. Format strictly:

---
### STITCH PROMPT: <Screen ID> — <Screen Name>

PLATFORM: <web | mobile | tablet>
VIEWPORT: <360px mobile | 768px tablet | 1280px desktop>

DESIGN TOKENS (copy from Part A):
- Font: <font name>
- Grid: 8pt
- Radius: <md/lg>
- Primary color: <hex>
- Background: <hex>
- Text primary: <hex>

LAYOUT:
- Header: <description, e.g., "fixed top bar, 64px tall, logo left, profile avatar right">
- Main content area: <grid structure, e.g., "12-column grid, 24px gutter, max-width 1200px centered">
- Footer (if applicable): <description>

COMPONENTS ON THIS SCREEN (named, with location):
1. <Component name> at <position>, behavior: <one line>
2. <Component name> at <position>, behavior: <one line>
... (list all)

STATES THIS SCREEN MUST RENDER:
- Default state: <description>
- Empty state: <description>
- Loading state: <description, e.g., "skeleton loaders matching content height">
- Error state: <description, e.g., "centered illustration + 'Try again' button + retry telemetry">

KEY INTERACTION:
- When user does <X>, system <Y>, screen shows <Z>.

ACCESSIBILITY MUST-HAVES:
- Minimum 4.5:1 contrast on body text
- Focus rings on all interactive elements
- Touch targets minimum 44x44px on mobile

OUTPUT FORMAT: Generate this screen as a single Stitch frame. Do not generate multiple variants.
---

Repeat the above block for every screen in the inventory.

# CRITICAL: Each Stitch prompt block must be testable in isolation. A designer should be able to copy any one block, paste it into Stitch, and get a usable frame without context from the others. If a screen requires understanding another screen, that's a coupling problem; restructure.

# ASSUMPTIONS LOG

After completing the output, extract every [ASSUMPTION: ...] tag from the document you just produced. Append them to `.product-harness/assumptions.md` using this format. Create the file if it does not exist.

Save PART A output as `.product-harness/workflow-system.md` and PART B output as `.product-harness/workflow-stitch-pack.md`.

---
## Stage 3 — Workflow Generator [date]

### A01: <short title for the assumption>
- **Claim:** <full assumption text>
- **Section:** <section name where it appears in this stage's output>
- **Risk if wrong:** <one sentence on what breaks if this assumption is false>
- **Status:** ⬜ Unvalidated
---

# DEVELOPER HANDOFF PACKAGE

Stage 03 is the last non-technical stage. Before handing off to a developer, produce a one-page summary:

## What the developer receives
- `workflow-system.md` — the authoritative product spec. Engineering owns this.
- `workflow-stitch-pack.md` — one Stitch-ready prompt per screen. Design owns this.
- Stitch design output (frames generated from the pack above).

## Decisions that are locked
- Screen inventory and IDs — changing these breaks the Stitch pack.
- Design token values — changing these requires regenerating all Stitch frames.
- Primary user journeys — these are the acceptance criteria for Stages 06 and 07.

## Decisions that are still open
- Tech stack (decided in Stage 04).
- Hosting and deployment target (decided in Stage 04).
- Specific component library (decided in Stage 04).

## First question to ask the developer
"Read workflow-system.md Section 7 (Maker-Checker Audit Log). Are all seven failure modes handled? If not, which ones need a product decision before you can build?"
