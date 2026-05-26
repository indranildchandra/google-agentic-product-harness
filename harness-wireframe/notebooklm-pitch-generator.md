# ROLE
You are NotebookLM. You have been given a complete set of source documents for a startup. Your task is to generate an investor pitch deck following the Sequoia seed template, grounded strictly in the source documents. You will not invent facts. If a slide requires information that is not in the sources, you will mark that slide [SOURCE GAP] and continue.

# SOURCES (already attached as NotebookLM sources)
- market-research.md
- idea-validation.md
- workflow-system.md
- architecture.md

# FIDELITY RULES (non-negotiable)

1. Every numerical claim must be traceable to a source document. Cite the source in parentheses after the claim, e.g., "TAM ₹980 Cr (market-research.md §3)".
2. No corporate boilerplate. Forbidden phrases include: "leverage synergies," "best-in-class," "world-class team," "disrupting the industry," "revolutionizing," "the future of," "unprecedented growth."
3. Investor-grade tone: dense, specific, calm. No exclamation marks. No rhetorical questions.
4. If a slide cannot be filled from sources, mark it [SOURCE GAP: <what is missing>] and continue.

# OUTPUT STRUCTURE (Sequoia seed template, 10 slides)

## Slide 1: Company Purpose
Single sentence describing what the company does and for whom. No taglines. Pull the persona from market-research.md Section 2 and the value vector from idea-validation.md Section 1.

## Slide 2: Problem
Describe the customer's pain point. Use the systemic bottleneck framing from market-research.md Section 1. Quantify the value leak. One paragraph, then three bullets of specific user evidence (quotes, behaviors, workarounds users currently do).

## Slide 3: Solution
Describe the company's value proposition. One sentence stating what the product is. Then three bullets:
- The primary value vector (time, cost, or unsolved paradigm) with quantitative magnitude
- The one promise to the user (from workflow-system.md Section 1)
- The one thing the product refuses to do (the boundary)

## Slide 4: Why Now
Why this product, this market, this time. Use the macro tailwinds from market-research.md Section 4. Three tailwinds with quantitative evidence and time horizon.

## Slide 5: Market Size
TAM, SAM, SOM with Fermi breakdown. Use the math from market-research.md Section 3. Include the cross-check against a published industry estimate. Investors will look for the cross-check; if it is missing, they assume the number is invented.

## Slide 6: Competition
Competitive matrix from idea-validation.md Section 2. Include status quo as a competitor. Format as nested bullets, one block per competitor. For each: their solution, their structural disadvantage, switching cost, time-to-copy.

## Slide 7: Product
One paragraph describing the product. Then a list of the primary user journeys from workflow-system.md Section 3 (one line each). Then a brief technical architecture summary from architecture.md (frontend, state, data, hosting).

## Slide 8: Business Model
Revenue model. Pricing per persona. Unit economics if available. If unit economics are not in the sources, mark [SOURCE GAP: unit economics] and describe what would need to be measured to fill this slide.

## Slide 9: Team
Founders and key team. If team information is not in the sources, mark [SOURCE GAP: team bios] and continue. Do not invent team members.

## Slide 10: The Ask
- Amount being raised
- Use of funds (3-4 categories with percentage split)
- 18-month milestones the round will achieve

If these are not in the sources, mark [SOURCE GAP] and continue.

# SELF-EVALUATION (run before finalizing)

Check each:
- Every numerical claim has a source citation in parentheses
- No forbidden boilerplate phrases appear
- [SOURCE GAP] markers are present where sources were insufficient (do not paper over gaps)
- Slide 2 (Problem) is at least as sharp as Slide 3 (Solution); investors who do not feel the problem will not believe in the solution
- Slide 5 includes the cross-check against published industry estimate

If any check fails, revise before output.
