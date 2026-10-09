---
title: Online store — Colombian e-commerce
summary: Online store with Wompi payments, discount traceability, consumer-law compliant after-sales (PQRS) and an admin panel. After building it, I commissioned a technical audit and directed the fixes, with automated tests running in continuous integration.
stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand
  - Node.js
  - Express
  - PostgreSQL (Neon)
  - Prisma
  - Zod
  - JWT + bcrypt
  - OAuth 2.0
  - Wompi
  - Resend
  - GitHub Actions
  - Claude Code
role: Product owner and technical lead, built with Claude Code
year: 2026
image: /images/projects/tienda-virtual.jpg
featured: true
order: 1
links:
  demo: ""
  repo: https://github.com/mulettcastillo2018/tienda-virtual
---

## The problem

An online store for Colombia needs more than a catalog. It has to take the payment methods people actually use (cards, PSE bank transfers, Nequi), keep discounts under control without losing track of past prices, and answer customer requests and complaints (PQRS) within the deadline set by Colombia's Consumer Protection Act (Law 1480 of 2011).

## The solution

A Next.js frontend and an Express + TypeScript REST API on PostgreSQL, with Prisma as the ORM.

- **Catalog and checkout**: price and brand filters, a 4-image gallery per product, cart, and step-by-step checkout with the **Wompi** payment widget.
- **Payments that don't get lost**: if a payment is declined, the customer can retry with another method. If they don't pay in time, the order expires on its own, the items go back to their cart and the stock is released.
- **Discount traceability**: every sale is linked to the discount campaign that was active at the time, so any past price can be explained.
- **PQRS handled by a legal team**: filing, timeline, private attachments and a 15-business-day deadline. A dedicated legal role answers them, not the administrator.
- **Accounts**: email and password, or Google and Facebook via OAuth 2.0, plus password recovery.
- **Extras**: flash deals, reviews only from real buyers, Spanish and English, and dark mode across the whole app, admin panel included.

## My role alongside the AI

I built the store by directing Claude Code, an AI coding agent. The agent proposed the architecture and wrote the code and the tests. My job was different:

- **I defined the product and the Colombian business rules.** The legal team for PQRS, discount traceability, exactly 4 images per product and reviews only from buyers were my decisions.
- **I asked for an audit before adding more features.** The agent reviewed the whole codebase and delivered a [technical and business report](https://github.com/mulettcastillo2018/tienda-virtual/blob/main/docs/analisis-2026-09-28.pdf) (in Spanish) with findings and a phased roadmap. I set the order: version control first, then payments, accounts and files.
- **I cross-checked with another AI.** An external review found a race condition: two simultaneous purchases could sell the same last unit. It was fixed with an atomic decrement inside the checkout transaction (`updateMany ... WHERE stock >= quantity`) and verified with real concurrent purchases.
- **I required evidence.** Every phase closed with tests that create their own data and delete it when they finish.

## What was fixed after the audit

- **Payments**: idempotent Wompi webhook with amount validation. A declined payment no longer cancels the order, and the store queries the Wompi API directly instead of relying on the webhook alone.
- **Accounts**: sessions revoked instantly when a user is deactivated or their role changes, rate limits, OAuth with `state` and no automatic account linking, and security headers.
- **Files**: each file's type is checked by its actual content, not its extension. PQRS attachments are private and served through signed links.
- **Quality**: continuous integration on GitHub Actions, with a fresh database on every change.

## By the numbers

- 22 data models, 19 migrations and 72 API routes.
- 24 screens, in two languages and with dark mode.
- 94 automated checks that run on every change.
- Built September 24–26, 2026. Audit and fix phases on the 28th and 29th.

## What I learned

- **An audit halfway through is worth more than one more feature.** The store "worked", but it failed in real situations: a declined payment cancelled the order even if the customer wanted to retry with another method.
- **Cross-review between models works.** A second model caught a concurrency bug the first one hadn't considered.
- **Environment limits are a design input too.** Webhooks can't reach a local development machine. Querying the Wompi API directly solved that and, along the way, found a test payment that had never been recorded.

## Status

Ready to deploy: the repository includes a deployment guide. Payments are tested in Wompi's sandbox; a real merchant account is still needed. Google and Facebook sign-in is implemented but not yet tested with real credentials. Next up: complete order states, SEO and electronic invoicing.
