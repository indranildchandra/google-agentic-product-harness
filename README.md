# google-agentic-product-harness

A Google-native agentic prompt harness for first-time founders. Seven sequential prompt templates that take you from a raw startup idea to a deployed, tested product — using Gemini 3 Pro, Google Antigravity, and NotebookLM.

---

## What this is

This harness is a structured sequence of prompts, not a codebase. Each prompt is a standalone agent instruction designed to produce a specific artifact that feeds the next stage. Run them in order. Each prompt tells you which model to use and what inputs it needs.

**The artifact chain:** every stage produces one or more `.md` files. Those files are the exact content you paste or upload when the next stage asks for its inputs. Nothing is lost between stages — the chain is self-contained.

**Who this is for:** stages 01–03 are accessible to any founder — no coding required. Stages 04–06 use Google Antigravity (Google's autonomous multi-agent coding environment) and produce agent definitions, architecture specs, and test suites — you will need a technical co-founder or developer to run and verify those outputs. Stage 07 is back to non-technical: it runs inside NotebookLM.

---

## The seven-stage pipeline

| # | Prompt | Model | Input | Output |
|---|--------|-------|-------|--------|
| 01 | [Market Researcher](prompts/01-market-researcher.md) | Gemini 3 Pro | Raw idea, target geography, target audience | `market-research.md` — TAM/SAM/SOM, personas, tailwinds/headwinds, GO/HOLD/NO-GO verdict |
| 02 | [Idea Validator](prompts/02-idea-validator.md) | Gemini 3 Pro | `market-research.md` | `idea-validation.md` — competitive matrix, moat analysis, pre-mortem, defensibility score |
| 03 | [Workflow Generator](prompts/03-workflow-generator.md) | Gemini 3 Pro | `market-research.md` + `idea-validation.md` | `workflow-system.md` (architecture truth) + `workflow-stitch-pack.md` (one Stitch prompt per screen) |
| 04 | [Agentic SDLC Architect](prompts/04-agentic-sdlc-architect.md) | Gemini 3 Pro | `workflow-system.md` + `workflow-stitch-pack.md` + Stitch design output | `architecture.md` + `agents.md` + `tdd.md` |
| 05 | [Build Planner](prompts/05-build-planner.md) | Gemini 3 Pro (Antigravity Planning Mode) | `architecture.md` + `agents.md` + `tdd.md` + Stitch design output | `build-plan.md` — phased execution plan for Antigravity Manager view |
| 06 | [Build Reviewer](prompts/06-build-reviewer.md) | Gemini 3 Pro + browser tool | Live deployment URL + all upstream `.md` files | `issues.md` + `backlog.md` — severity-triaged bugs and feedable next-sprint backlog |
| 07 | [Pitch Deck Generator](prompts/07-pitch-deck-generator.md) | NotebookLM | All upstream `.md` files as sources | 10-slide investor pitch deck following the Sequoia seed template |

---

## How to run it

### Prerequisites

- Access to Gemini 3 Pro (for stages 01–06)
- Access to Google Antigravity (for stages 04–06)
- Access to NotebookLM (for stage 07)
- Access to Google Stitch (for stage 03 design output)

### Step-by-step

1. **Copy the prompt** from the relevant file in `prompts/`.
2. **Paste it into the correct model** (each prompt file specifies which one in its ROLE section).
3. **Answer the questions** — each prompt opens with an input collection step that asks for what it needs. Paste document content inline or upload files when prompted.
4. **Save the output** as the filename specified in the prompt (e.g. `market-research.md`) into your project directory.
5. **The next stage reads it automatically** — stages 04–06 check the filesystem first and only ask if a file is missing.

Stages 01–03 are linear and synchronous — run them in Gemini chat one at a time. Stages 04–06 can run as parallel agents inside Antigravity Manager view.

### Model settings

| Stage | Temperature | Thinking budget | Grounding |
|-------|-------------|-----------------|-----------|
| 01, 02, 04 | 0.4 | High | Google Search on |
| 03, 05, 06 | 0.4 | Medium | Google Search on (06 only) |
| 07 | 0.7 | — | NotebookLM sources |

---

## What makes these prompts different

**Grounding is mandatory.** Every quantitative claim in stages 01–02 must be tagged `[VERIFIED: source, year]` or `[ASSUMPTION: reasoning]`. No untagged numbers.

**Self-critique is enforced.** Stages 01–04 use a three-pass structure: draft, grade against a rubric (scored out of 50, threshold 40), revise the weakest sections. The model shows its score.

**Stitch-aware output.** Stage 03 splits workflow output into a system doc and a per-screen frame pack where each Stitch prompt is under 4500 characters — Stitch's working limit before it starts dropping components.

**Agents have contracts.** Stage 04 defines each Antigravity sub-agent with explicit tool budgets, termination conditions, failure escalation paths, and verifiable Artifact contracts. Agents that finish without producing a checkable Artifact are not considered done.

**Circuit breakers are built in.** Stage 05 caps retries at 3. After 3 failures, the agent produces a "Stuck Agent" Artifact and pauses — it does not loop silently.

**Audit output is feedable.** Stage 06 produces backlog items as ready-to-paste Antigravity prompts. The output of a review cycle is the direct input of the next build cycle.

**Portable.** The grounding and structured-output mechanics map to Claude (`web_search` + structured output) and GPT (function calling + browsing). Stages 04–05 are Antigravity-native but can be run manually with Cursor.

---

## Repository structure

```text
prompts/                        # The seven prompt templates
  01-market-researcher.md
  02-idea-validator.md
  03-workflow-generator.md
  04-agentic-sdlc-architect.md
  05-build-planner.md
  06-build-reviewer.md
  07-pitch-deck-generator.md
```

---

## License

MIT
