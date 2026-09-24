---
title: "How I think about automation when working with AI coding assistants"
date: "2026-09-23"
summary: "Some practical ideas on integrating AI coding assistants (Claude Code, Copilot, Cursor) into an automation workflow without losing control over code quality."
tags: ["automation", "AI", "productivity"]
---

AI coding assistants don't replace engineering judgment — they accelerate it. When I automate a process, I follow a workflow similar to this:

## 1. Understand the manual process before automating it

Before writing a single line of code, I map out the current process: what data comes in, which steps repeat, where human errors happen. An AI assistant can generate code fast, but if the problem isn't well understood, it just automates the chaos faster.

## 2. Use the assistant to explore, not just to write

I use Claude Code, Copilot, or Cursor to explore several ways of solving a problem in minutes instead of hours: different data structures, different libraries, different approaches. This leaves me more time to decide which approach is right, instead of writing everything from scratch.

## 3. Review, test, and keep control

All AI-assisted code goes through review: tests, line-by-line reading of critical logic, and style adjustments so the project stays maintainable long-term. Speed shouldn't come at the cost of reliability.

## 4. Document the why, not the what

When code is clear, it doesn't need to explain what it does. But when there's a non-obvious decision (an external constraint, an edge case), I document it — with or without AI help, that part always requires human judgment.

---

This is just the first blog post. I'll keep sharing concrete automation case studies as I build them out.
