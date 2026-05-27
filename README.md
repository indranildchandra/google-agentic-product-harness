# google-agentic-product-harness

A Google-native agentic prompt harness for first-time founders. Eight sequential prompt templates that take you from a raw startup idea to a deployed, tested product — using Gemini 3.1 Pro, Google Antigravity, and NotebookLM.

---

## What this is

This harness is a structured sequence of prompts, not a codebase. Each prompt is a standalone agent instruction designed to produce a specific artifact that feeds the next stage. Run them in order. Each prompt tells you which model to use and what inputs it needs.

**The artifact chain:** every stage produces one or more `.md` files. Those files are the exact content you paste or upload when the next stage asks for its inputs. Nothing is lost between stages — the chain is self-contained. Stages 01–05 also append any `[ASSUMPTION]` tags they produce to a shared `.product-harness/assumptions.md`, which Stage 07 reads before auditing to surface compounding risk across the full pipeline.

**Who this is for:** stages 01–03 are accessible to any founder — no coding required. Stages 04–07 use Google Antigravity (Google's autonomous multi-agent coding environment) and produce agent definitions, architecture specs, test suites, and a running codebase — you will need a technical co-founder or developer to run and verify those outputs. Stage 08 is back to non-technical: it runs inside NotebookLM.

---

## The eight-stage pipeline

| # | Prompt | Model | Input | Output |
|---|--------|-------|-------|--------|
| 01 | [Market Researcher](prompts/01-market-researcher.md) | Gemini 3.1 Pro | Raw idea, target geography, target audience | `market-research.md` — TAM/SAM/SOM, personas, tailwinds/headwinds, GO/HOLD/NO-GO verdict |
| 02 | [Idea Validator](prompts/02-idea-validator.md) | Gemini 3.1 Pro | `market-research.md` | `idea-validation.md` — competitive matrix, moat analysis, pre-mortem, defensibility score |
| 03 | [Workflow Generator](prompts/03-workflow-generator.md) | Gemini 3.1 Pro | `market-research.md` + `idea-validation.md` | `workflow-system.md` (architecture truth) + `workflow-stitch-pack.md` (one Stitch prompt per screen) |
| 04 | [Agentic SDLC Architect](prompts/04-agentic-sdlc-architect.md) | Gemini 3.5 Flash (Antigravity) | `workflow-system.md` + `workflow-stitch-pack.md` + Stitch Design DNA (via MCP) | `architecture.md` + `agents.md` + `tdd.md` |
| 05 | [Build Planner](prompts/05-build-planner.md) | Gemini 3.5 Flash (Antigravity Planning Mode) | `architecture.md` + `agents.md` + `tdd.md` + Stitch design output | `build-plan.md` — phased execution plan for Antigravity Manager view |
| 06 | [Build Executor](prompts/06-build-executor.md) | Gemini 3.5 Flash (Antigravity) | `build-plan.md` + all Stage 04 files | Running codebase + `changelog.md` — live record of what was built, phase by phase |
| 07 | [Build Reviewer](prompts/07-build-reviewer.md) | Gemini 3.5 Flash + browser tool | Live deployment URL + `changelog.md` + all upstream `.md` files | `issues.md` + `backlog.md` — severity-triaged bugs and feedable next-sprint backlog |
| 08 | [Pitch Deck Generator](prompts/08-pitch-deck-generator.md) | NotebookLM | All upstream `.md` files as sources | 10-slide investor pitch deck following the [Sequoia seed template](https://www.sequoiacap.com/article/writing-a-business-plan/) |

---

## Pipeline overview

```text
Your startup idea
      │
      ▼
┌────────────────────────────────────────────────────────┐
│ 01  MARKET RESEARCHER                  Gemini 3.1 Pro  │
│     TAM/SAM/SOM · Personas · GO/HOLD/NO-GO             │
└──────────────────┬─────────────────────────────────────┘
          NO-GO ───┘  stop or revise assumptions
          GO
          │
          ▼
┌───────────────────────────────────────────────────────┐
│ 02  IDEA VALIDATOR                     Gemini 3.1 Pro │
│     Competitive Matrix · Moat · Defensibility Score   │
└──────────────────┬────────────────────────────────────┘
                   │
                   ▼
┌───────────────────────────────────────────────────────┐
│ 03  WORKFLOW GENERATOR                 Gemini 3.1 Pro │
│     Screen Inventory · Tokens · Stitch Frame Pack     │
└──────────────────┬────────────────────────────────────┘
                   │  workflow-stitch-pack.md
                   ▼
     ┌──────────────────────────────────────────────────────┐
     │   GOOGLE STITCH                                      │
     │   Paste frame prompts · Design DNA generated         │
     └─────────────────┬────────────────────────────────────┘
                       │  Stitch MCP auto-ingests Design DNA
        ╔══════════════╧════════════════════════╗
        ║   HAND OFF TO DEVELOPER               ║
        ║   Install Stitch MCP in Antigravity   ║
        ║   Verify bridge · paste API key       ║
        ╚══════════════╤════════════════════════╝
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│ 04  AGENTIC SDLC ARCHITECT  Gemini 3.5 Flash (Antigravity)   │
│     Architecture · Agent Topology · TDD Spec                 │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────┐
│ 05  BUILD PLANNER    Gemini 3.5 Flash (Antigravity)  │
│     Phased Plan · Parallel Workspaces · Autonomy     │
└──────────────────┬───────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────┐
│ 06  BUILD EXECUTOR   Gemini 3.5 Flash (Antigravity)  │
│     Phase-by-Phase Build · Verify · changelog.md     │
└──────────────────┬───────────────────────────────────┘
                   │
                   ▼
┌───────────────────────────────────────────────────────┐
│ 07  BUILD REVIEWER       Gemini 3.5 Flash + browser   │
│     Live Audit · issues.md · backlog.md               │
└──────────────────┬────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 08  PITCH DECK GENERATOR               NotebookLM   │
│     Sequoia Template · Source-Grounded · 10 Slides  │
└──────────────────┬──────────────────────────────────┘
                   │
          investor feedback?
          └─► return to the stage that owns
              the challenged assumption
```

---

## See it live — HamroStay AI demo

The `demo/` folder contains a complete end-to-end run of this harness against a real startup idea: **HamroStay AI**, a localized AI distribution engine that turns rural Nepali homestay hosts' voice notes into structured, AI-discoverable property listings.

Every artifact below was produced by running the eight prompts in order — no manual editing between stages.

| Stage | What happened | Live link |
|---|---|---|
| 01–03 | Market Researcher → Idea Validator → Workflow Generator in Gemini 3.1 Pro | [Gemini chat transcript](https://gemini.google.com/share/4a0c8ad17a67) |
| 03 → Stitch | Pasted the six Stitch frame prompts into Google Stitch | [Live Stitch project](https://stitch.withgoogle.com/projects/9198422885981226206) |
| 04–06 | Agentic SDLC Architect → Build Planner → Build Executor in Antigravity | `demo/example_project/` |
| 08 | All `.md` files from Stage 01 to 03 uploaded to NotebookLM, Pitch Deck Generator run | [Pitch deck](https://docs.google.com/presentation/d/1tNHDM2Rez33Tm4qBRmsVdYZIBDZ-M8z6/view) |

---

### Harness artifacts — the chain in full

These are the exact files produced by stages 01–03. Each feeds the next stage with no edits.

| File | Stage | What it contains |
|---|---|---|
| [demo_problem_statement.md](demo/demo_problem_statement.md) | Input | Raw startup idea submitted to Stage 01 |
| [market-research.md](demo/product_harness_artifacts/market-research.md) | 01 | TAM $25.2M global / $864K Nepal SAM, 3 personas, GO verdict, 45/50 self-score |
| [idea-validation.md](demo/product_harness_artifacts/idea-validation.md) | 02 | Competitive matrix (4 players), 4 defensibility moats, 3 pre-mortem failure modes, 42/50 defensibility score |
| [workflow-system.md](demo/product_harness_artifacts/workflow-system.md) | 03 | Product persona, design token library, 2 user journeys, 6-screen inventory, interaction specs, maker-checker audit log, developer handoff package |
| [workflow-stitch-pack.md](demo/product_harness_artifacts/workflow-stitch-pack.md) | 03 | Six Stitch frame prompts (S01–S06), each under 4500 chars, ready to paste into Google Stitch |
| [assumptions.md](demo/product_harness_artifacts/assumptions.md) | 01–03 | 8 structured assumptions (A01–A08) with claim, section, risk-if-wrong, and validation status |
| [geminichat-log.md](demo/geminichat-log.md) | 01–03 | Gemini chat transcript showing raw response from stages 01 to 03, and every self-critique pass |

---

### Stitch mobile screens — generated from the frame prompts above

Six high-fidelity mobile screens produced by pasting `workflow-stitch-pack.md` prompts directly into [Google Stitch](https://stitch.withgoogle.com/projects/9198422885981226206). No manual design work.

<table width="100%">
<tr>
<td align="center" width="33%"><b>S01 — Auth Portal</b><br><img src="demo/stitch_mobile_design_artifacts/screen1/screen.png" alt="S01 — Unified Access Portal" width="100%"/></td>
<td align="center" width="33%"><b>S02 — Dashboard</b><br><img src="demo/stitch_mobile_design_artifacts/screen2/screen.png" alt="S02 — Core Infrastructure Hub" width="100%"/></td>
<td align="center" width="34%"><b>S03 — Audio Intake</b><br><img src="demo/stitch_mobile_design_artifacts/screen3/screen.png" alt="S03 — Localization Capture Terminal" width="100%"/></td>
</tr>
<tr>
<td align="center" width="33%"><b>S04 — Processing State</b><br><img src="demo/stitch_mobile_design_artifacts/screen4/screen.png" alt="S04 — Pipeline Execution Monitor" width="100%"/></td>
<td align="center" width="33%"><b>S05 — Review Hub</b><br><img src="demo/stitch_mobile_design_artifacts/screen5/screen.png" alt="S05 — Semantic Asset Control Center" width="100%"/></td>
<td align="center" width="34%"><b>S06 — Distribution Status</b><br><img src="demo/stitch_mobile_design_artifacts/screen6/screen.png" alt="S06 — Global Index Integration Panel" width="100%"/></td>
</tr>
</table>

**Design topology** — the token and component architecture underlying all six screens:

![Design topology](demo/stitch_mobile_design_artifacts/technical_grounding/technical_grounding.png)

---

### Stage 08 outputs — NotebookLM

**Pitch deck** — 10 slides following the [Sequoia seed template](https://sequoiacap.com/article/writing-a-business-plan/), generated by uploading all upstream `.md` files as NotebookLM sources and running the Stage 08 prompt. No manual slide creation.

[View the full pitch deck →](https://docs.google.com/presentation/d/1tNHDM2Rez33Tm4qBRmsVdYZIBDZ-M8z6/view)

**Mind map** — auto-generated by NotebookLM from the same source set. Useful as a visual reference for the elevator pitch and for spotting how the market, moat, and product workflow connect across stages.

![HamroStay AI — NotebookLM mind map](demo/notebooklm_artifacts/HamroStay%20AI%20-%20Mind%20Map.png)

---

## How to run it

### Prerequisites

- Access to Gemini 3.1 Pro (for stages 01–03)
- Access to Gemini 3.5 Flash (for stages 04–07)
- Access to Google Antigravity (for stages 04–07)
- Access to NotebookLM (for stage 08)
- Access to Google Stitch (for stage 03 design output)
- A Stitch API key (for MCP bridge between Stitch and Antigravity at Stage 04) — see [codelab](https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch#0)
- Node.js 24.x (required for Antigravity stages 04–07) — see `install_scripts/` or open [installation-guide.html](installation-guide.html) for the full interactive setup walkthrough

### Step-by-step

1. **Copy the prompt** from the relevant file in `prompts/`.
2. **Paste it into the correct model** (each prompt file specifies which one in its ROLE section).
3. **Answer the questions** — each prompt opens with an input collection step that asks for what it needs. Paste document content inline or upload files when prompted.
4. **Save the output** into `.product-harness/` in your project directory (e.g. `.product-harness/market-research.md`). This keeps all generated artifacts in one folder that can be excluded from production deployments via `.gitignore` or CI/CD ignore rules.
5. **The next stage reads it automatically** — stages 04–07 check `.product-harness/` first and only ask if a file is missing.

Before running stages 04–07 in Antigravity, ensure Node.js 24.x is installed. Run `install_scripts/setup-node-linux-mac.sh` (macOS/Linux) or `install_scripts/setup-node-win.ps1` (Windows) — each script detects an existing install and skips if already on Node 24.

Stages 01–03 are linear and synchronous — run them in Gemini chat one at a time. Stages 04–07 run inside Antigravity. Stages 04–05 can run as parallel agents inside Antigravity Manager view. Stage 06 executes sequentially phase by phase and logs each step to `.product-harness/changelog.md`.

### Stitch → Antigravity MCP bridge (between Stage 03 and Stage 04)

Stage 03 produces `workflow-stitch-pack.md` — a set of frame prompts you paste into [Google Stitch](https://stitch.withgoogle.com/) to generate high-fidelity UI screens. Instead of manually exporting assets, the **Stitch MCP server** lets Antigravity fetch the Design DNA (design tokens, layout metadata, component specs) directly from your Stitch project. Follow the [Google Codelab: Design-to-Code with Antigravity and Stitch](https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch#0) to set this up — the steps are:

1. In Google Stitch, go to **Profile → Stitch settings → API key → Create key**. Copy and store the key securely.
2. Open Antigravity IDE. Press **CMD+E** (Mac) or **CTRL+E** (Windows) to open Agent Manager → **MCP Servers**.
3. Open the MCP store via the `...` dropdown. Search **"Stitch"** → **Install** → paste your API key when prompted.
4. Verify the bridge: type `List my Stitch projects.` in the Agent chat. If it returns your project name, the connection is live.
5. Stage 04 agents can now call `fetch Design DNA` and Antigravity will pull layout, tokens, and component metadata straight from Stitch — no manual export needed.

### Model settings

| Stage | Temperature | Thinking budget | Grounding |
|-------|-------------|-----------------|-----------|
| 01, 02 | 0.4 | High | Google Search on |
| 03 | 0.4 | Medium | — |
| 04, 05, 06 | — | — | Antigravity execution environment (Gemini 3.5 Flash) |
| 07 | — | — | Antigravity browser tool (Gemini 3.5 Flash) |
| 08 | 0.7 | — | NotebookLM sources |

---

## What makes these prompts different

**Grounding is mandatory.** Every quantitative claim in stages 01–02 must be tagged `[VERIFIED: source, year]` or `[ASSUMPTION: reasoning]`. No untagged numbers.

**Self-critique is enforced.** Stages 01–04 use a three-pass structure: draft, grade against a rubric (scored out of 50, threshold 40), revise the weakest sections. The model shows its score.

**Stitch-aware output.** Stage 03 splits workflow output into a system doc and a per-screen frame pack where each Stitch prompt is under 4500 characters — Stitch's working limit before it starts dropping components.

**Agents have contracts.** Stage 04 defines each Antigravity sub-agent with explicit tool budgets, termination conditions, failure escalation paths, and verifiable Artifact contracts. Agents that finish without producing a checkable Artifact are not considered done.

**Circuit breakers are built in.** Stages 05 and 06 cap retries at 3. After 3 failures, the agent records a FAILED entry and pauses — it does not loop silently.

**Execution is logged phase by phase.** Stage 06 writes a `changelog.md` entry after every phase with verification evidence — not a summary at the end. If the build is interrupted at any point, the changelog reflects exactly how far it got.

**Audit output is feedable.** Stage 07 reads `changelog.md` alongside the live deployment, so every bug can be traced back to the phase that introduced it. Backlog items are written as ready-to-paste prompts for the next build cycle.

**Kill signal propagates.** If Stage 01 returns NO-GO, the pipeline stops and asks the user to either revise the idea or consciously accept the risk before Stage 02 runs. Stage 02 also checks the incoming verdict and refuses to run on a NO-GO.

**Input validation at every boundary.** Stages 02–07 open by checking that incoming documents have all required sections. Missing sections are flagged before any analysis runs — not discovered halfway through.

**Assumptions are aggregated.** Every `[ASSUMPTION]` tag produced across stages 01–05 is appended to `.product-harness/assumptions.md` using a structured format: assumption ID, claim, source section, risk level (High / Medium / Low), and validation status (⬜ Unvalidated by default). Stage 07 reads this file before auditing and updates the status of each assumption against live behavior.

**Developer handoff is explicit.** Stage 03 ends with a one-page handoff package: what the developer receives, which decisions are locked, which are still open, and the first question they should ask.

**Feedback loop closes the cycle.** Stage 08 ends with a structured investor-feedback routing table — each objection maps back to the upstream stage that owns the challenged assumption, so the pipeline can be re-entered cleanly rather than patching the deck. The pitch structure follows the [Sequoia seed template](https://www.sequoiacap.com/article/writing-a-business-plan/) — Sequoia's publicly documented framework covering Purpose, Problem, Solution, Why Now, Market, Competition, Business Model, Team, Financials, and Vision.

**Portable.** The grounding and structured-output mechanics map to Claude (`web_search` + structured output) and GPT (function calling + browsing). Stages 04–06 are Antigravity-native but can be run manually with Cursor / Claude Code as well with minor modifications.

---

## Repository structure

```text
prompts/                            # The eight prompt templates
  01-market-researcher.md
  02-idea-validator.md
  03-workflow-generator.md
  04-agentic-sdlc-architect.md
  05-build-planner.md
  06-build-executor.md
  07-build-reviewer.md
  08-pitch-deck-generator.md

install_scripts/                    # Node.js 24.x setup for Antigravity sessions
  setup-node-linux-mac.sh           # macOS / Linux: installs nvm + Node 24, patches PATH
  setup-node-win.ps1                # Windows: installs Node 24 LTS MSI, refreshes env vars

installation-guide.html             # Interactive setup guide (open in browser) — covers Antigravity
                                    #   install, Node.js setup via scripts, Firebase project creation,
                                    #   Firebase CLI login, firebase init, build and deploy to Hosting

demo/                               # End-to-end worked example — HamroStay AI
  demo_problem_statement.md         # Raw startup idea fed into Stage 01

  geminichat-log.md                 # Gemini chat response transcript for stages 01–03
  product_harness_artifacts/        # Stage 01–03 outputs from the HamroStay AI run
    market-research.md              # Stage 01 output
    idea-validation.md              # Stage 02 output
    workflow-system.md              # Stage 03 output — product persona, screen inventory, journeys
    workflow-stitch-pack.md         # Stage 03 output — six Stitch frame prompts
    assumptions.md                  # Running assumption log (A01–A08 across stages 01–03)

  stitch_mobile_design_artifacts/   # Google Stitch output — six generated mobile screens
    screen1/ … screen6/             # Per-screen folder: screen.png, code.html, DESIGN.md
    technical_grounding/            # Design DNA reference image, DESIGN.md

  example_project/                  # React + Vite + TypeScript app scaffolded from the harness output
    src/                            # Pages, components, context, types
    public/                         # Static assets
    package.json / vite.config.ts / tsconfig.json

  notebooklm_artifacts/             # Stage 08 outputs from NotebookLM
    HamroStay AI - Deck.pdf         # 10-slide investor pitch deck (Sequoia template)
    HamroStay AI - Mind Map.png     # Auto-generated concept map from all harness sources

.product-harness/                   # Generated at runtime in your own project
  market-research.md                # Stage 01 output
  idea-validation.md                # Stage 02 output
  workflow-system.md                # Stage 03 output
  workflow-stitch-pack.md           # Stage 03 output
  architecture.md                   # Stage 04 output
  agents.md                         # Stage 04 output
  tdd.md                            # Stage 04 output
  build-plan.md                     # Stage 05 output
  assumptions.md                    # Appended by stages 01–05, read by stage 07
  changelog.md                      # Appended by stage 06, read by stage 07
  issues.md                         # Stage 07 output
  backlog.md                        # Stage 07 output
```

---

## License

[MIT](LICENSE)
