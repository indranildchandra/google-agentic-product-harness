# Stage 02 — Idea Validator

## INPUT COLLECTION

Before producing any output, ask the user for all required inputs below. Do not begin the analysis until every required input is confirmed.

**Question 1 (Required):** Paste the full contents of your `market-research.md` from Stage 01 below, or upload it as a file attachment.

Once the input is received, confirm with:
> "Got it. Running the full competitive and moat analysis now."

Then proceed directly to the OUTPUT section without any further prompting.

---

## INPUT VALIDATION

Before running the analysis, verify that `market-research.md` contains the following sections. If any are missing, list the gaps and ask the user whether to continue with incomplete input or stop.

Required sections:
- Idea Brief
- Section 1: The Problem
- Section 3: TAM / SAM / SOM (with Fermi math)
- Section 5: Investment Thesis and Go / Hold / No-Go (must show GO or HOLD — not NO-GO)

If Section 5 shows NO-GO: stop, display the kill signal message from Stage 01, and do not proceed.

# ROLE
You are writing the investment memo for {{RAW_STARTUP_IDEA}} that goes to the Monday partner meeting at a top-tier early-stage fund. The general partners have 20 minutes. They will ask one question: "Why does this company still exist in 5 years if a well-funded incumbent decides to copy it next quarter?"

Your memo answers that question or kills the deal.

# INPUTS
- Raw idea: {{RAW_STARTUP_IDEA}}
- Market research document: {{MARKET_RESEARCH_MD}}

# MANDATORY MECHANISMS

1. Pre-mortem framing. For Section 4 (Vulnerability Analysis), do not ask "what could go wrong." Instead, write as if the company has already failed in 18 months. Reverse-engineer the three most likely failure modes. This produces sharper risk analysis than forward-looking risk listing.

2. Force-ranked moat categorization. Section 1 asks for the value proposition vector. The model must commit to one primary category and at most one secondary, not list all of them. Quantitative threshold required for each claim (e.g., "10x time reduction means from 4 hours to under 24 minutes for the same task").

3. Numerical defensibility score with breakdown. Final score is not a vibe. Each sub-dimension is scored explicitly.

4. Two-pass structure. Same as Template 1: draft, critique against rubric, revise weak sections, show delta.

# OUTPUT: idea-validation.md

## Idea Brief
Carry forward the Idea Brief from `market-research.md`. You may refine the paraphrase if the competitive analysis has sharpened your understanding of the idea — but do not contradict or narrow it without reason. Downstream agents read this as the canonical description of the startup.

## Section 1: Primary Value Vector
Commit to one primary category. At most one secondary. Each must include a quantitative threshold.

- Time Asymmetry: reduces a <X-hour/day/week> task to <Y minutes>. Magnitude: <Xx faster>.
- Cost Leadership: reduces unit cost from <₹X> to <₹Y>. Magnitude: <Xx cheaper>.
- Unsolved Paradigm: solves <specific problem> that was technically impossible before <specific enabling technology, e.g., frontier LLMs, on-device transcription, sub-200ms speech-to-speech>.

If you cannot commit to one primary category with a defensible threshold, write: "PRIMARY VECTOR UNDEFINED — return to problem definition." Do not proceed.

## Section 2: Competitive Matrix
Format as nested bullets, one block per competitor. Include status quo / manual workaround as a competitor.

For each competitor:
- Name and category (incumbent, fast-follower, indirect substitute, status quo)
- Their current solution to the same user need (one sentence)
- Their structural disadvantage that the proposed solution exploits
- Switching cost from their solution to ours (Low / Medium / High) with reasoning
- Time-to-copy if they decide to: <weeks/months/years>

Minimum 4 competitors including status quo.

## Section 3: Defensibility Moats
Identify which of the following the product builds, with evidence:

- Data flywheel: what proprietary data accumulates with usage, and how does that data improve the product specifically (not generically "we get better")
- Network effects: same-side or cross-side, with the inflection-point user count if known
- Integration stickiness: what becomes the system of record, and what would break if a user churned
- Engineering or agentic optimization moat: what specific technical artifact (latency budget, eval harness, fine-tune dataset, agent topology) is hard to replicate

For each present moat: rate strength as Strong / Moderate / Weak with reasoning. If no moat scores Strong, flag this as a yellow card.

## Section 4: Pre-Mortem (Failure Reverse-Engineering)
Imagine it is 18 months from now and the company has failed. Three most likely failure narratives, written in past tense as if reporting the autopsy:

For each failure mode:
- What killed them (one sentence)
- Earliest leading indicator that this was happening (specific metric or behavior)
- Mitigation that would have prevented it (specific action, not "iterate fast")

## Section 5: Defensibility Score (force the math)
Rate each dimension out of 10 with one-sentence justification:

- Execution viability: <score>. Justification.
- Market readiness: <score>. Justification.
- Moat strength (weighted average of Section 3): <score>.
- Founder-market fit (if known): <score>.
- Capital efficiency vs comp companies: <score>.

Total: <sum>/50.

Verdict bands:
- 40-50: Build it. Strong conviction.
- 30-39: Build it but de-risk the lowest-scoring dimension first.
- 20-29: Pre-commitment work required. Specify what would move the score above 30.
- Under 20: Do not build. Specify what would have to be true about the world.

## Section 6: Self-Critique Delta
Same as Template 1.

# WORKED MOAT EXAMPLE (reference only)

Notion's primary moat at Series A was NOT product features. It was integration stickiness. Once a team put their wiki, project tracker, and meeting notes into Notion, switching cost became weeks of migration. Network effect was secondary (templates marketplace). Data flywheel was negligible. This is the kind of crisp moat ranking the memo demands.

# FILE EXPORT

Produce this stage's output as a downloadable file attachment if your interface supports it (e.g. Gemini's "Save to Drive" or an IDE file-write tool). If attachments are not available, output the content inside a single fenced markdown code block so the user can save it directly — do not display the content as prose separately from the code block. The file must be named `idea-validation.md`.

# ASSUMPTIONS LOG

After completing the output, extract every [ASSUMPTION: ...] tag from the document you just produced. Produce the assumptions block as a downloadable file attachment named `assumptions.md` if your interface supports it, or output it inside a fenced markdown code block — do not display it as prose. The user will append this to their `.product-harness/assumptions.md` file. Use this format:

---
## Stage 2 — Idea Validator [date]

### A01: <short title for the assumption>
- **Claim:** <full assumption text>
- **Section:** <section name where it appears in this stage's output>
- **Risk if wrong:** <one sentence on what breaks if this assumption is false>
- **Status:** ⬜ Unvalidated
---

# SELF-EVALUATION RUBRIC

Score /10 each:
- Moat specificity: are moats named concretely or generically
- Pre-mortem sharpness: are failure modes specific enough to be falsifiable
- Competitive matrix completeness: status quo included, switching costs justified
- Score defensibility: would a GP nod at each sub-score or push back
- Conviction calibration: does the verdict match the evidence (no false confidence, no false hedging)

Threshold: 40/50. Below that, revise.
