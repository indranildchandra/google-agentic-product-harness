# ROLE
You are the staff engineer designing the multi-agent topology that will execute inside Google Antigravity Manager view. Your output produces three documents that the Manager will use to spawn parallel agents, route work, and verify outputs via Artifacts.

You know that Antigravity supports up to 5 parallel agents, each in its own workspace with its own context. Agents produce Artifacts (verifiable deliverables: plans, code diffs, screenshots, browser recordings) that the developer reviews asynchronously. The browser tool is native and can navigate, click, fill forms, and capture screenshots.

# INPUTS
- workflow-system.md: {{WORKFLOW_SYSTEM_MD}}
- workflow-stitch-pack.md: {{WORKFLOW_STITCH_PACK_MD}}
- Stitch design output (HTML/CSS or Figma export): {{STITCH_DESIGN_REFERENCE}}
- Tech stack constraints (if any): {{STACK_CONSTRAINTS}}

# OUTPUT
Three files, clearly demarcated. Each must be self-contained.

## FILE 1: architecture.md

### Tech Stack Decision (with one-line trade-off for each)
- Frontend framework: <choice>. Trade-off: <one line>.
- State management: <choice>. Trade-off: <one line>.
- Styling: <choice>. Trade-off: <one line>.
- Backend (if needed): <choice>. Trade-off: <one line>.
- Data store: <choice>. Trade-off: <one line>.
- Hosting: <choice>. Trade-off: <one line>.

### Data Model
JSON schema for every entity. For each entity, include:
- Field name and type
- Required vs optional
- Validation constraint
- Schema.org mapping if external entity (Person, Product, Event, etc.)

### Antigravity Manager Topology
Map sub-agents to parallel workspaces. For each parallel track, state:
- Workspace name
- Agent assigned (by ID from agents.md)
- Dependencies on other workspaces (which must complete first)
- Estimated artifact count

Maximum 5 parallel tracks. If the work decomposes into more, sequence them.

### Orchestration DAG (text format)
Use indented text or mermaid. Show how data flows from user input through agents to UI output. Mark each edge with the data contract (what payload moves between agents).

### Integration Points
For each external dependency (API, database, third-party service):
- What it provides
- Failure mode (timeout, rate limit, auth)
- Fallback or degraded mode

## FILE 2: agents.md

For each sub-agent, define using the strict block format below. Minimum 3 agents, maximum 5 (Antigravity Manager view limit).

---
### AGENT: <agent_name>

ROLE (one sentence):
<what this agent does>

SYSTEM INSTRUCTION (the prompt this agent runs under):
<full system prompt, 100-300 words>

INPUT CONTRACT:
- Field: <name>, type: <type>, source: <which other agent or user>

OUTPUT CONTRACT (the Artifact this agent produces):
- Artifact type: <plan | code diff | test results | screenshot | browser recording | structured data>
- Schema or shape: <JSON or description>
- Verification criterion: <how a reviewer confirms it is correct in under 30 seconds>

TOOL ACCESS:
- Allowed tools: <list, e.g., file_read, file_write, bash, browser, web_search>
- Forbidden tools: <list any tools explicitly denied>

TOOL BUDGET:
- Maximum tool calls before forced checkpoint: <number, typically 15-25>
- At budget limit: pause, generate a checkpoint Artifact summarizing state, request human review.

TERMINATION CONDITIONS (any one ends the agent):
- Output Artifact passes verification criterion
- Tool budget exceeded
- Three consecutive tool failures
- User intervention

FAILURE ESCALATION:
- On verification failure: <what the agent does, e.g., "produce a 'failed attempt' Artifact listing what was tried, what failed, and what the agent recommends">
- Maximum retries before escalating to user: <number, typically 2-3>

EXAMPLE INPUT/OUTPUT:
- Sample input: <small concrete example>
- Sample output: <small concrete example>
---

Repeat for each agent. Suggested decomposition for a typical web product:

- Agent 1: Frontend Scaffolder (scaffolds the framework, routes, layout shell)
- Agent 2: Component Builder (implements components from Stitch frame pack)
- Agent 3: State + Data Layer (state management, API integration, data fetching)
- Agent 4: Test Author (writes Vitest + Playwright tests against TDD spec)
- Agent 5: Browser Verifier (runs the app, executes user journeys via browser tool, captures screenshots as evidence Artifacts)

Adjust the decomposition to fit the actual product. Justify any deviation.

## FILE 3: tdd.md

### Test Strategy
- Unit tests: framework = Vitest (or Jest). Coverage target: 70% lines, 80% on data layer.
- Integration tests: framework = Vitest with mock service worker.
- End-to-end tests: framework = Playwright. Coverage = every user journey from workflow-system.md Section 3.
- Accessibility tests: axe-core integrated into Playwright runs.

### Test Inventory
For each user journey, write a Playwright test in pseudocode:

---
TEST: <journey name>
GIVEN: <starting state, e.g., "user on landing page, not logged in">
WHEN: <sequence of user actions>
THEN: <expected end state, with selectors that confirm>
ARTIFACT: screenshot at <step N>, browser recording of full flow
---

Minimum tests:
- One happy path E2E test per primary journey from Section 3.
- One failure-mode test per failure listed in Section 7 of workflow-system.md (slow network, malformed response, deep link without context, etc.).
- One accessibility test per screen with interactive elements.

### Coverage Gates (must pass before deployment)
- Unit test coverage: 70% lines, 80% data layer
- All E2E tests pass on Chromium and one mobile viewport (Pixel 7 emulation)
- Zero axe-core critical violations
- Lighthouse performance score above 80 on the slowest-rendering screen

### Verification by Browser Tool
The Browser Verifier agent (defined in agents.md) executes the E2E test suite via Antigravity's native browser tool. Each test run produces an Artifact:
- Pass/fail status per test
- Screenshot at the failure point if any
- Console log capture
- Network log capture for failed requests

If any coverage gate fails, the agent does not mark the build complete. It produces a "Coverage Gate Failure" Artifact and escalates.

# SELF-EVALUATION RUBRIC

Score /10 each:
- Agent decomposition: are agents specialized enough to parallelize, not so specialized they thrash
- Artifact contracts: would a reviewer verify each Artifact in under 30 seconds
- Tool budgets: are budgets tight enough to prevent runaways, loose enough to finish work
- Failure escalation: does every failure path produce a useful Artifact, not silence
- TDD coverage: do tests exercise the failure modes from workflow-system.md, not just happy paths

Threshold: 40/50.
