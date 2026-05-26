# google-agentic-product-harness

A Google-native agentic prompt harness for first-time founders. Eight sequential prompt templates that take you from a raw startup idea to a deployed, tested product — using Gemini 3.1 Pro, Google Antigravity, and NotebookLM.

---

## What this is

This harness is a structured sequence of prompts, not a codebase. Each prompt is a standalone agent instruction designed to produce a specific artifact that feeds the next stage. Run them in order. Each prompt tells you which model to use and what inputs it needs.

**The artifact chain:** every stage produces one or more `.md` files. Those files are the exact content you paste or upload when the next stage asks for its inputs. Nothing is lost between stages — the chain is self-contained. Stages 01–05 also append any `[ASSUMPTION]` tags they produce to a shared `assumptions.md`, which Stage 07 reads before auditing to surface compounding risk across the full pipeline.

**Who this is for:** stages 01–03 are accessible to any founder — no coding required. Stages 04–07 use Google Antigravity (Google's autonomous multi-agent coding environment) and produce agent definitions, architecture specs, test suites, and a running codebase — you will need a technical co-founder or developer to run and verify those outputs. Stage 08 is back to non-technical: it runs inside NotebookLM.

---

## The eight-stage pipeline

| # | Prompt | Model | Input | Output |
|---|--------|-------|-------|--------|
| 01 | [Market Researcher](prompts/01-market-researcher.md) | Gemini 3.1 Pro | Raw idea, target geography, target audience | `market-research.md` — TAM/SAM/SOM, personas, tailwinds/headwinds, GO/HOLD/NO-GO verdict |
| 02 | [Idea Validator](prompts/02-idea-validator.md) | Gemini 3.1 Pro | `market-research.md` | `idea-validation.md` — competitive matrix, moat analysis, pre-mortem, defensibility score |
| 03 | [Workflow Generator](prompts/03-workflow-generator.md) | Gemini 3.1 Pro | `market-research.md` + `idea-validation.md` | `workflow-system.md` (architecture truth) + `workflow-stitch-pack.md` (one Stitch prompt per screen) |
| 04 | [Agentic SDLC Architect](prompts/04-agentic-sdlc-architect.md) | Gemini 3.1 Pro | `workflow-system.md` + `workflow-stitch-pack.md` + Stitch design output | `architecture.md` + `agents.md` + `tdd.md` |
| 05 | [Build Planner](prompts/05-build-planner.md) | Gemini 3.5 Flash (Antigravity Planning Mode) | `architecture.md` + `agents.md` + `tdd.md` + Stitch design output | `build-plan.md` — phased execution plan for Antigravity Manager view |
| 06 | [Build Executor](prompts/06-build-executor.md) | Gemini 3.5 Flash (Antigravity) | `build-plan.md` + all Stage 04 files | Running codebase + `changelog.md` — live record of what was built, phase by phase |
| 07 | [Build Reviewer](prompts/07-build-reviewer.md) | Gemini 3.5 Flash + browser tool | Live deployment URL + `changelog.md` + all upstream `.md` files | `issues.md` + `backlog.md` — severity-triaged bugs and feedable next-sprint backlog |
| 08 | [Pitch Deck Generator](prompts/08-pitch-deck-generator.md) | NotebookLM | All upstream `.md` files as sources | 10-slide investor pitch deck following the Sequoia seed template |

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
     │   Paste frame prompts · Export UI / Connect MCP      │
     └─────────────────┬────────────────────────────────────┘
        ╔══════════════╧══════════╗
        ║   HAND OFF TO DEVELOPER ║
        ╚══════════════╤══════════╝
                       │
                       ▼
┌───────────────────────────────────────────────────────┐
│ 04  AGENTIC SDLC ARCHITECT             Gemini 3.1 Pro │
│     Agent Topology · Data Model · TDD Spec            │
└──────────────────┬────────────────────────────────────┘
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
│ 07  BUILD REVIEWER       Gemini 3.5 Flash + browser  │
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

## How to run it

### Prerequisites

- Access to Gemini 3.1 Pro (for stages 01–07)
- Access to Google Antigravity (for stages 04–07)
- Access to NotebookLM (for stage 08)
- Access to Google Stitch (for stage 03 design output)

### Step-by-step

1. **Copy the prompt** from the relevant file in `prompts/`.
2. **Paste it into the correct model** (each prompt file specifies which one in its ROLE section).
3. **Answer the questions** — each prompt opens with an input collection step that asks for what it needs. Paste document content inline or upload files when prompted.
4. **Save the output** into `.product-harness/` in your project directory (e.g. `.product-harness/market-research.md`). This keeps all generated artifacts in one folder that can be excluded from production deployments via `.gitignore` or CI/CD ignore rules.
5. **The next stage reads it automatically** — stages 04–07 check `.product-harness/` first and only ask if a file is missing.

Stages 01–03 are linear and synchronous — run them in Gemini chat one at a time. Stages 04–05 can run as parallel agents inside Antigravity Manager view. Stage 06 executes sequentially phase by phase and logs each step to `.product-harness/changelog.md`.

### Model settings

| Stage | Temperature | Thinking budget | Grounding |
|-------|-------------|-----------------|-----------|
| 01, 02, 04 | 0.4 | High | Google Search on |
| 03, 05 | 0.4 | Medium | — |
| 06 | — | — | Antigravity execution environment |
| 07 | — | — | Gemini 3.5 Flash + browser tool |
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

**Assumptions are aggregated.** Every `[ASSUMPTION]` tag produced across stages 01–05 is appended to a shared `assumptions.md`. Stage 07 reads this before auditing to identify which assumptions the live product has not yet validated.

**Developer handoff is explicit.** Stage 03 ends with a one-page handoff package: what the developer receives, which decisions are locked, which are still open, and the first question they should ask.

**Feedback loop closes the cycle.** Stage 08 ends with a structured investor-feedback routing table — each objection maps back to the upstream stage that owns the challenged assumption, so the pipeline can be re-entered cleanly rather than patching the deck.

**Portable.** The grounding and structured-output mechanics map to Claude (`web_search` + structured output) and GPT (function calling + browsing). Stages 04–06 are Antigravity-native but can be run manually with Cursor / Claude Code as well with minor modifications.

---

## Repository structure

```text
prompts/                        # The eight prompt templates
  01-market-researcher.md
  02-idea-validator.md
  03-workflow-generator.md
  04-agentic-sdlc-architect.md
  05-build-planner.md
  06-build-executor.md
  07-build-reviewer.md
  08-pitch-deck-generator.md

.product-harness/                # Generated at runtime — add to .gitignore or CI exclude list
  market-research.md            # Stage 01 output
  idea-validation.md            # Stage 02 output
  workflow-system.md            # Stage 03 output
  workflow-stitch-pack.md       # Stage 03 output
  architecture.md               # Stage 04 output
  agents.md                     # Stage 04 output
  tdd.md                        # Stage 04 output
  build-plan.md                 # Stage 05 output
  assumptions.md                # Appended by stages 01–05, read by stage 07
  changelog.md                  # Appended by stage 06, read by stage 07
  issues.md                     # Stage 07 output
  backlog.md                    # Stage 07 output
```

---

## License

MIT
