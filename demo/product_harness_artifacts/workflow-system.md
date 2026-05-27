# Workflow System: HamroStay AI

## 1. Product Persona
- **What it is:** HamroStay AI is an infrastructure distribution node that converts raw localized verbal and written inputs into authoritative, structured semantic identities for global travel indexes.
- **The One Promise:** *"I spoke into my phone for two minutes in my native dialect, and within moments my homestay was live, fully optimized, and discoverable by international travelers on AI search engines."*
- **The Boundary (What it refuses to do):** HamroStay AI strictly refuses to operate as a consumer-facing travel marketplace, booking intermediary, or manual travel agency; it acts solely as a localized infrastructure engine.

## 2. Design Token Library

```text
GRID_UNIT: 8px
RADIUS_SM: 4px
RADIUS_MD: 8px
RADIUS_LG: 16px
FONT_FAMILY: Plus Jakarta Sans
TYPE_SCALE_BODY: 14px
TYPE_SCALE_H1: 28px
TYPE_SCALE_H2: 20px
TYPE_SCALE_H3: 16px
SPACING_XS: 4px
SPACING_SM: 8px
SPACING_MD: 16px
SPACING_LG: 24px
SPACING_XL: 40px
COLOR_PRIMARY: #D35400
COLOR_SECONDARY: #2E4053
COLOR_SURFACE: #FFFFFF
COLOR_BACKGROUND: #F8F9F9
COLOR_TEXT_PRIMARY: #1C2833
COLOR_TEXT_SECONDARY: #5D6D7E
COLOR_SUCCESS: #27AE60
COLOR_WARNING: #F39C12
COLOR_ERROR: #C0392B
```

- **COLOR_PRIMARY (#D35400):** Warm terracotta orange mirroring traditional Himalayan clay, signaling warmth and accessibility for non-technical rural hosts.
- **COLOR_SECONDARY (#2E4053):** Reliable deep slate blue providing structural contrast, conveying high precision and data security.
- **COLOR_SURFACE (#FFFFFF):** Clean white canvas base maximizing text isolation and element crispness under outdoor glare.
- **COLOR_BACKGROUND (#F8F9F9):** Neutral slate tint eliminating high contrast display exhaustion.
- **COLOR_TEXT_PRIMARY (#1C2833):** Charcoal tone satisfying accessibility thresholds under any outdoor physical setting.
- **COLOR_TEXT_SECONDARY (#5D6D7E):** Soft gray reserved exclusively for operational subtext and secondary tracking markers.
- **COLOR_SUCCESS (#27AE60):** True emerald variant serving as visual sign-off for completed API synchronizations.
- **COLOR_WARNING (#F39C12):** Balanced amber calling out processing synchronization latency exceptions.
- **COLOR_ERROR (#C0392B):** Crimson standard alerting operators to structural validation payload failures.

## 3. End-to-End User Journeys

### Journey 1: The Native Host Audio Intake & Optimization Loop (Happy Path)

1. **User Intent:** A rural homestay host wants to list their property's newly introduced traditional dining options across global networks using a simple mobile web app.
2. **Screen:** `S02-dashboard`
3. **System Action:** User clicks the primary microphone capture action button on `S02-dashboard`, transitioning to `S03-audio-intake`. The user records a 90-second voice note in colloquial Romanized Nepali describing their food and room setups. Upon submission, an async processing layer is spun up.
4. **Next State:** Transition to `S04-processing-state`. System shows a real-time extraction pipeline executing. Within 4 seconds, the pipeline resolves, saving the structured output to local cache and forwarding the user to `S05-review-hub` displaying the human copy, semantic FAQs, and valid schema outputs.

### Journey 2: Network Timeout Handling on High-Density Schema Broadcast (Unhappy Branching Path)

1. **User Intent:** A field coordinator attempts to broadcast a verified asset profile to global discovery networks from a high-altitude location with degraded connectivity.
2. **Screen:** `S05-review-hub`
3. **System Action:** Coordinator clicks the "Broadcast Distribution" button. The system initiates an HTTP POST request to the downstream distribution graph.
4. **Next State:** The network link drops during transit, breaching the 3000ms Time-To-First-Byte (TTFB) latency budget threshold. The background worker halts gracefully, intercepts the failure, commits a local payload copy to `localStorage` cache [ASSUMPTION], and surfaces an isolated error card inline on `S05-review-hub` with an intuitive "Retry with Local Cache" trigger.

## 4. Screen Inventory

- **S01-auth:** Unified access portal utilizing passwordless OTP verification for hosts and coordinators. States: Default, Loading, Error. Adjacent: Out to `S02-dashboard`.
- **S02-dashboard:** Core administrative center displaying current inventory list and optimization scores. States: Default, Empty, Loading, Partial-Data. Adjacent: In from `S01-auth`, Out to `S03-audio-intake`, `S05-review-hub`.
- **S03-audio-intake:** Multi-modal intake modal engineered for streaming audio or rapid unstructured text input. States: Default, Recording, Processing, Error. Adjacent: In from `S02-dashboard`, Out to `S04-processing-state`.
- **S04-processing-state:** Technical execution visualizer displaying deterministic multi-layer generation progress. States: Default (Loading), Error, Success. Adjacent: In from `S03-audio-intake`, Out to `S05-review-hub`.
- **S05-review-hub:** Multi-tab preview center displaying human-facing copy, semantic FAQs, and JSON-LD schema layers. States: Default, Partial-Data, Success, Error. Adjacent: In from `S04-processing-state`, Out to `S06-distribution-status`.
- **S06-distribution-status:** Global network synchronization board showcasing crawl statuses across independent discovery engines. States: Default, Loading, Error, Success. Adjacent: In from `S05-review-hub`, Out to `S02-dashboard`.

## 5. Component Inventory

- **PrimaryButton:** Props: `variant`, `state`, `icon`. Used on: `S01-auth` through `S06-distribution-status`.
- **OptimizationCard:** Props: `title`, `score`, `status`. Used on: `S02-dashboard`.
- **IntakeConsole:** Props: `mode`, `duration`, `isRecording`. Used on: `S03-audio-intake`.
- **PipelineVisualizer:** Props: `activeStep`, `stepsStatus`. Used on: `S04-processing-state`.
- **AssetPreviewTabs:** Props: `activeTab`, `payload`. Used on: `S05-review-hub`.

## 6. Interaction Specs

- **Multi-Layer Extraction Pipeline Invalidation:** Ingestion from `S03-audio-intake` kicks off long-polling tasks inside `S04-processing-state`. Target operational latency is 400ms per layer transition with full pipeline convergence within 2400ms. If processing timeouts strike, status maps to `failed` and exposes a distinct retry trigger card.
- **Optimistic Distribution Synchronization:** Tapping broadcast within `S05-review-hub` forces local network status metrics to immediately display as `Synchronizing` within 100ms. If the physical connection handshake hits a 3000ms fallback cutoff, the UI gracefully flags the state error and registers offline cached retry loops.

## 7. Maker-Checker Audit Log

- **Slow Network (3s+ TTFB):** Handled. Web worker catches timeouts past 3000ms threshold, halts execution and offers local state storage offload options.
- **Upstream API Malformed JSON:** Handled. Catch blocks inspect payload layouts inside `S05-review-hub`. Invalid extractions fall back to partial data configurations protecting safe text rendering.
- **Mid-Form Refresh Recovery:** Handled. Inputs preserve character arrays directly to `localStorage` schemas dynamically, recovering parameters seamlessly on reset actions.
- **Contextless Deep-Link Arrival:** Handled. Application routers identify authorization scopes; invalid sessions route implicitly back to `S01-auth`.
- **Non-English/Emoji Input Ingestion:** Handled. Ingestion cleans arrays into UTF-8 formats, retaining localized structural expressions while dividing decorative tokens out.
- **Screen Widths Below 360px:** Handled. Flex-box layout modules utilize dynamic percentage-bound assignments, sizing fluidly down to 320px containers.
- **Screen-Reader Accessibility Optimization:** Handled. Element systems employ native, highly explicit semantic HTML mappings with `aria-live` assertive markup applied to variable status labels.

---

## 8. Developer Handoff Package

### What you are receiving

| File | Contents |
|---|---|
| `workflow-system.md` | This document — product persona, design tokens, user journeys, screen inventory, component inventory, interaction specs, maker-checker audit log |
| `workflow-stitch-pack.md` | Six Stitch frame prompts (S01–S06), each under 4500 characters, ready to paste into Google Stitch |

### Decisions that are locked

- **Screen count and IDs:** Six screens (S01-auth through S06-distribution-status). Adding or removing screens requires re-running Stage 03.
- **Design token set:** All color, spacing, radius, and typography values in Section 2 are final. Stage 04 agents will reference these directly — do not override them in code.
- **Failure modes:** All seven error states in Section 7 are contractual. Every one must be handled in the implementation; none are optional.
- **Mobile-first viewport:** 360px is the primary design target. Desktop layout is out of scope for this build cycle.
- **Product boundary:** HamroStay AI is an infrastructure engine only — no booking, no payments, no marketplace features in this sprint.

### Decisions that are still open

- **Backend hosting provider:** Firebase Hosting is the default assumption, but no architecture decision has been made. Confirm with the developer before Stage 04.
- **Audio processing pipeline:** The ingestion pipeline in S03-audio-intake is described functionally but the underlying model (Gemini, Whisper, or other) is not specified. Stage 04 must decide.
- **OTP provider:** S01-auth uses passwordless OTP but the SMS provider (Twilio, Firebase Auth, or local gateway) is unspecified.
- **Distribution API targets:** S06-distribution-status references "global discovery engines" without naming specific APIs. Stage 04 must enumerate the target endpoints.

### First question the developer should ask

> "Which audio transcription model and API are we using for S03-audio-intake — and do we have API keys ready before Stage 04 starts?"

This is the critical path dependency. Everything in Sections 3–7 downstream of audio ingestion is blocked until this is answered.
