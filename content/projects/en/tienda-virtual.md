---
title: Online store — Colombian e-commerce
summary: Online store with Wompi payments, cash on delivery, DIAN electronic invoicing and what Colombia's consumer and data-protection laws (1480 and 1581) require. After building it, I commissioned a technical audit and directed, phase by phase, the fixes and everything still missing to sell in Colombia, with 309 automated checks running in continuous integration.
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
  - Alanube (DIAN)
  - Resend
  - GitHub Actions
  - Claude Code
role: Product owner and technical lead, built with Claude Code
year: 2026
image: /images/projects/tienda-virtual.jpg
featured: true
order: 1
links:
  demo: https://tienda-mulett.vercel.app
  repo: https://github.com/mulettcastillo2018/tienda-virtual
---

## The problem

An online store for Colombia needs more than a catalog. It has to take the payment methods people actually use (cards, PSE bank transfers, Nequi or cash on delivery), keep discounts under control without losing track of past prices, answer customer requests and complaints (PQRS) within the deadline set by Colombia's Consumer Protection Act (Law 1480 of 2011), issue electronic invoices to the tax authority (DIAN) and process personal data only with consent (Law 1581 of 2012).

## The solution

A Next.js frontend and an Express + TypeScript REST API on PostgreSQL, with Prisma as the ORM.

- **Catalog and checkout**: price and brand filters, a 4-image gallery per product and step-by-step checkout. Customers can buy without an account (the order is tracked through a signed link) and pay with **Wompi** or cash on delivery in the cities the store chooses.
- **Payments that don't get lost**: if a payment is declined, the customer can retry with another method. If they don't pay in time, the order expires on its own, the items go back to their cart and the stock is released.
- **Day-to-day operation**: orders by status (paid, processing, shipped, delivered) with an audit log, the address copied into the order and a 7, 30 or 90-day sales dashboard.
- **Discount traceability**: every sale is linked to the discount campaign that was active at the time, so any past price can be explained.
- **After-sales by the book**: PQRS handled by a legal team within 15 business days; right of withdrawal and payment reversal with business-day deadlines that skip Colombian holidays.
- **Electronic invoicing**: through Alanube, with VAT per product (19%, 5% or exempt) and an automatic credit note on refunds.
- **Personal data**: consent recorded with the policy version, offers opted into separately with an unsubscribe link in every email, data download and account deletion.
- **Growth**: server-rendered pages for Google (metadata, sitemap and structured data), reviews only from customers who bought and received the product, and abandoned-cart reminders only for customers who opted into offers.
- **Extras**: flash deals, Google and Facebook sign-in (OAuth 2.0), Spanish and English, and dark mode across the whole app, admin panel included.

## My role alongside the AI

I built the store by directing Claude Code, an AI coding agent. The agent proposed the architecture and wrote the code and the tests. My job was different:

- **I defined the product and the Colombian business rules.** The legal team for PQRS, discount traceability, exactly 4 images per product and reviews only from buyers were my decisions.
- **I asked for an audit before adding more features.** The agent reviewed the whole codebase and delivered a [technical and business report](https://github.com/mulettcastillo2018/tienda-virtual/blob/main/docs/analisis-2026-09-28.pdf) (in Spanish) with findings and a phased roadmap. I set the order: version control first, then payments, accounts and files.
- **I cross-checked with another AI.** An external review found a race condition: two simultaneous purchases could sell the same last unit. It was fixed with an atomic decrement inside the checkout transaction (`updateMany ... WHERE stock >= quantity`) and verified with real concurrent purchases.
- **I followed the roadmap to the end.** I approved, phase by phase, day-to-day operation, growth and legal formalization; each one went to the live demo only with continuous integration green.
- **I required evidence.** Every phase closed with tests that create their own data and delete it when they finish.

## What was fixed after the audit

- **Payments**: idempotent Wompi webhook with amount validation. A declined payment no longer cancels the order, and the store queries the Wompi API directly instead of relying on the webhook alone.
- **Accounts**: sessions revoked instantly when a user is deactivated or their role changes, rate limits, OAuth with `state` and no automatic account linking, and security headers.
- **Files**: each file's type is checked by its actual content, not its extension. PQRS attachments are private and served through signed links.
- **Quality**: continuous integration on GitHub Actions, with a fresh database on every change.

## By the numbers

- 28 data models, 24 migrations and 110 API routes.
- 32 screens, in two languages and with dark mode.
- 309 automated checks in 15 suites that run on every change.
- Built September 24–26, 2026. Audit and fixes on the 28th and 29th. Operation, growth and legal formalization, October 11–13.

## What I learned

- **An audit halfway through is worth more than one more feature.** The store "worked", but it failed in real situations: a declined payment cancelled the order even if the customer wanted to retry with another method.
- **Cross-review between models works.** A second model caught a concurrency bug the first one hadn't considered.
- **Environment limits are a design input too.** Webhooks can't reach a local development machine. Querying the Wompi API directly solved that and, along the way, found a test payment that had never been recorded.
- **The law is a product requirement too.** A cart reminder looks like just another marketing feature, but it is a commercial message: it needs prior consent, a policy that mentions it and an unsubscribe that works without signing in.

## Status

Live demo at [tienda-mulett.vercel.app](https://tienda-mulett.vercel.app) (Vercel, Render and Neon), with payments in Wompi's sandbox: you can buy with the test card `4242 4242 4242 4242` or the Nequi test number `3991111111`. The API runs on a free plan, so the first visit can take about a minute. Every item in the technical report is done. Selling for real needs owner decisions, not code: a real legal name and tax ID, a lawyer's review of the legal texts, DIAN enablement through Alanube, a Wompi merchant account and an own domain for emails. Google and Facebook sign-in is implemented but not yet tested with real credentials.
