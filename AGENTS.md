# CRAD-JOS - Agent Guidelines & Operational Blueprint

## 1. Project Overview
- **Project Name:** CRAD-JOS
- **Type:** Web Application
- **Directory:** `c:/projects/crad-jos`
- **Status:** Active Development

---

## 2. Core Agent Directives & Operating Principles

1. **Always Keep Logs Updated:**
   - Every significant action, architectural decision, component creation, and milestone must be documented in [`WORKLOG.md`](file:///c:/projects/crad-jos/WORKLOG.md).
   - When finishing a task or session, update [`WORKLOG.md`](file:///c:/projects/crad-jos/WORKLOG.md) with the current state and explicit next steps.

2. **Aesthetic & UX Excellence:**
   - Follow modern, premium web design standards (curated color palettes, modern typography, glassmorphism/subtle shadows where appropriate, responsive layouts, micro-animations, and fluid state transitions).
   - Avoid generic or bare-bones MVPs; ensure interfaces look and feel polished and reactive.

3. **Code Quality & Architecture:**
   - Maintain modular, clean, and well-typed/well-structured code.
   - Follow separation of concerns: presentation components, state/data layer, API/service clients, and utility functions.
   - Preserve comments, avoid dead code, and adhere to standard formatting and linting conventions.

4. **Zero-Token Testing Mandate (NO Visual Browser Bots):**
   - NEVER use visual browser subagents (`browser_subagent`), interactive clicking loops, or multi-turn conversational chat questionnaires for verification.
   - All testing and verification MUST be executed via single-command headless CLI assertion scripts that run in sub-seconds and output a compact ASCII summary table (< 400 tokens total).

---

## 3. Standard Workflow for Any Agent Task

When starting or continuing any work in **CRAD-JOS**, follow this loop:

1. **Review Context:**
   - Check [`WORKLOG.md`](file:///c:/projects/crad-jos/WORKLOG.md) for the latest status, ongoing work, and pending items.
   - Check this [`AGENTS.md`](file:///c:/projects/crad-jos/AGENTS.md) file for established patterns and conventions.
2. **Plan & Confirm:**
   - Outline required changes, dependencies, or architectural choices before large modifications.
3. **Execute:**
   - Build modular, cohesive code with attention to UX/visual quality.
4. **Autonomous Sweep Execution:**
   - Run the headless CLI test runner (`node scripts/sweep.js` or `npm test`).
   - Ensure 100% pass rate on all invariants.
5. **Log & Sync:**
   - Append an entry in [`WORKLOG.md`](file:///c:/projects/crad-jos/WORKLOG.md) summarizing accomplishments, modified files, test table, and recommended next steps.

---

## 4. Stack & Environment Guidelines
- **Platform:** Web (Lightweight Vanilla HTML5, CSS3, ES6+ JS)
- **Runtime:** Node.js (v20+)
- **Server:** Lightweight zero-dependency HTTP server (`server.js`) on port 3000
- **Workspace:** `c:/projects/crad-jos`

---

## 5. Autonomous Sweep & Micro-Token Test Protocol (Zero-Token Audit Mandate)

> **Core Philosophy:** All testing and verification MUST be performed via headless, single-command CLI assertion scripts that run in sub-seconds and output a compact ASCII summary table (< 400 tokens total). Visual/chat testing is strictly prohibited.

### 1. Trigger Keywords & Behavior
Whenever triggered with:
- `rescan`
- `run a sweep`
- `deep rescan`
- `retest`
- `audit`
- or whenever a feature implementation/refactor has completed:
  1. **Zero Conversational Hesitation:** Do NOT ask for permission or prompt the user.
  2. **Immediate Headless Script Execution:** Execute `node scripts/sweep.js`.
  3. **Strict Output Token Efficiency:** Output ONLY a compact ASCII summary table:
     `# | Category | Invariant Name | Status (PASS/FAIL) | Detail`
  4. **Zero-Residue Guarantee:** All temporary test state must be cleaned up or run in auto-reversing sandboxes.

### 2. Micro-Token Test Archetypes
- **Archetype 1 (Kernel Invariants):** Direct in-process assertions verifying files, DOM structure, semantic tags, service definitions, JS/CSS syntax.
- **Archetype 2 (Contract-Bound Synthetic Scenario):** Headless HTTP assertions dispatching fast requests against local endpoints to verify HTTP response codes (200, 404), MIME types, and header security.
- **Archetype 3 (Transactional Sandboxes):** When databases or state stores are added, wrap mutations in auto-rollback blocks to leave 0 bytes persisted.

### 3. CLI Command
```bash
npm test
# or
node scripts/sweep.js
```
