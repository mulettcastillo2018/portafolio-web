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
  - MediaPipe
  - Vitest
  - Playwright
  - GitHub Actions
  - Docker
  - Vercel
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
- **Human review**: a queue of sessions to review and, for each one, a filterable timeline where every event shows the signal that cites it. The reviewer decides between "no irregularity" and "needs investigation" (which requires explaining why), and everything is audited. Students see their own facts in "My proctoring data", without the signals or the outcome.
- **Camera and audio in the browser**: MediaPipe counts faces twice per second and Web Audio measures the sound level; images and audio never leave the device. Students test their devices before starting and always see the same thing that is being measured.
- **Minors**: the institution records the guardian's authorization, with the notice version and where the signed form is kept. Minors can only turn on what was authorized, and they still decide.
- **Production**: a nonce-based content security policy, rate limits, automatic deletion of evidence according to each institution's retention, metrics for administrators, a Docker image validated in CI and a demo mode for the public demo.

## My role alongside the AI

I started from a 31-section product specification and directed Claude Code phase by phase: first the analysis and architecture, then five build phases, each one closed with tests and a review in the browser.

The product and ethics decisions were mine:

- **No audio or video recording** in this version: camera and microphone are processed in the browser and only events travel.
- **Declining the camera never creates a signal.** An exam cannot be conditioned on handing over sensitive data.
- **Signals come from deterministic, auditable rules.** The AI only drafts, and its text goes through guardrails before it is shown.
- **Minors without a recorded guardian authorization** take exams without camera or microphone.
- **Evidence deletes itself** when the retention promised in the consent notice ends, even for sessions nobody reviewed: what was promised to the student comes first, and the platform warns before it expires.

Every technical decision is documented with its reason and its alternative: 50 decisions in the repository.

## By the numbers

- 24 data models and 34 screens.
- 140 unit tests, 77 integration tests against the real database and 18 end-to-end tests with Playwright, some with two browsers at once (student and teacher) and a simulated camera.
- Continuous integration on GitHub Actions: types, lint, integration, end-to-end and the Docker image on every change.
- Built from October 1 to 11, 2026, in 36 commits and 8 phases.

## What I learned

- **Responsible AI is a design, not a filter.** Separating detection, interpretation and decision made every piece verifiable and kept the AI from accusing anyone.
- **Guardrails are tested like any other rule.** Forbidden words, the obligation to cite signals and the template fallback have their own tests, including a fake provider that tries to accuse.
- **Measure before optimizing.** A delay of several seconds on every batch of events came from database round trips. The analysis now runs after the response is sent.
- **A privacy promise is verified on the network.** Turning on the content security policy revealed that MediaPipe tries to send usage statistics to a Google server; the policy blocks it. "Images never leave the device" doesn't depend on a library's good will.
- **Diagnose with data, not assumptions.** A camera that "disappeared" during tests turned out to be the browser's capture service restarting; logging every request and process showed it, and automatic reconnection came out of it.

## Status

All eight phases are done and on GitHub, with continuous integration passing (including the Docker image). The public demo, with sample accounts that reset every night, is ready to be published on Vercel with Neon. The AI summary works with an Anthropic API key; without one, the system uses the template.
