---
title: ExamGuard AI — online exams with responsible proctoring
summary: Online exam platform for schools and universities with assisted proctoring. It detects facts in the browser, interprets them with transparent rules and leaves the decision to a person. Claude drafts a summary that cites every signal and never claims that someone cheated.
stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - next-intl
  - PostgreSQL (Neon)
  - Prisma
  - Better Auth
  - Zod
  - Claude API
  - Vitest
  - Playwright
  - GitHub Actions
  - Claude Code
role: Product owner and technical lead, built with Claude Code
year: 2026
image: /images/projects/examguard-ai.jpg
featured: true
order: 0
links:
  demo: ""
  repo: https://github.com/mulettcastillo2018/examguard-ai
---

## The problem

Online exams need proctoring, but many tools record camera and microphone, use facial recognition and end up flagging a student for a glance or an unstable connection. Schools also have minors, whose data requires a guardian's authorization (Colombian Law 1581 of 2012).

## The solution

A complete exam platform with one rule that drives the whole design: **detection → interpretation → human decision**. The system never says "cheated"; at most it says "review recommended", with facts anyone can verify.

- **Exams**: a question bank with five question types, an exam builder with per-student accommodations, a time window and duration enforced by the server, versioned autosave (it keeps working offline) and a single active device per attempt.
- **Grading and results**: automatic and manual grading, the best score counts when there are several attempts, and grades are published once the exam is closed, without revealing the correct answers.
- **Live proctoring**: the browser records facts (tab switches, loss of focus, inactivity, leaving full screen, disconnections and, for pasted text, only how many characters) and the teacher sees them on a monitor that refreshes every 5 seconds. A simulator makes it possible to demo it without a camera.
- **Transparent interpretation**: deterministic domain agents and a rule engine with each institution's thresholds turn events into signals with clear explanations, for example: "3 tab switches or window focus losses were recorded in less than 10 minutes, between 08:10 and 08:14".
- **AI with guardrails**: Claude drafts a summary for the reviewer from the signals, with no names or personal data. The text must cite every signal ([S1], [S2]…) and is rejected if it attributes intent, guilt or emotions. In that case, or if the API fails, a factual template is used.

## My role alongside the AI

I started from a 31-section product specification and directed Claude Code phase by phase: first the analysis and architecture, then five build phases, each one closed with tests and a review in the browser.

The product and ethics decisions were mine:

- **No audio or video recording** in this version: camera and microphone are processed in the browser and only events travel.
- **Declining the camera never creates a signal.** An exam cannot be conditioned on handing over sensitive data.
- **Signals come from deterministic, auditable rules.** The AI only drafts, and its text goes through guardrails before it is shown.
- **Minors without a recorded guardian authorization** take exams without camera or microphone.

Every technical decision is documented with its reason and its alternative: 34 decisions in the repository.

## By the numbers

- 21 data models and 27 screens.
- 117 unit tests, 58 integration tests against the real database and 17 end-to-end tests with Playwright, some with two browsers at once (student and teacher).
- Continuous integration on GitHub Actions: types, lint, integration and end-to-end on every change.
- Built from October 1 to 9, 2026, in 25 commits.

## What I learned

- **Responsible AI is a design, not a filter.** Separating detection, interpretation and decision made every piece verifiable and kept the AI from accusing anyone.
- **Guardrails are tested like any other rule.** Forbidden words, the obligation to cite signals and the template fallback have their own tests, including a fake provider that tries to accuse.
- **Measure before optimizing.** A delay of several seconds on every batch of events came from database round trips. The analysis now runs after the response is sent.

## Status

In development: phases 1 to 5 of 8 are done and on GitHub, with continuous integration passing. Still to come are human review with a timeline (phase 6), camera and audio with the guardian consent record (phase 7) and production (phase 8). The AI summary works with an Anthropic API key; without one, the system uses the template.
