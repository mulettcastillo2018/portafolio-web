---
title: Comidas Rápidas — real-time ordering for restaurants
summary: A complete restaurant system. Waiters take orders on their phones, the kitchen dispatches dish by dish in real time and customers order from their table's QR code. Management handles the cash register, inventory, costs, Colombian e-invoicing (DIAN) and multiple branches.
stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand
  - Node.js
  - Express
  - Socket.IO
  - PostgreSQL (Neon)
  - Prisma
  - Zod
  - JWT + bcrypt
  - Alanube (DIAN)
  - Web Audio API
  - QR codes
  - Claude Code
role: Product owner and technical lead, built with Claude Code
year: 2026
image: /images/projects/comidas-rapidas.jpg
featured: true
order: 2
links:
  demo: ""
  repo: https://github.com/mulettcastillo2018/comidas-rapidas
---

## The problem

In a fast-food restaurant, waiters and the kitchen talk out loud or on paper. Orders get lost, nobody knows which dish is running late, and two waiters can end up serving the same table. Behind the service there is a whole operation (cash register, inventory, costs, tips and invoicing) that usually lives in notebooks and spreadsheets.

## The solution

A system with roles for waiters, kitchen, a public display and management, all connected in real time with Socket.IO.

- **Real-time service**: the waiter opens a table with its diners and takes each person's order. The kitchen receives and dispatches **dish by dish**, with sound alerts for new, ready and delayed orders.
- **Customers take part**: with their table's QR code they see the menu, prepare an order for the waiter to confirm, or call the waiter. With the counter QR code they order for pickup and track their order with an estimated time.
- **Cash register**: per-person pre-bill, voluntary tip, split payments (cash, card, Nequi, Daviplata, bank transfer), register closings reconciled per waiter, and a supervisor PIN for losses and cancellations.
- **Business**: cost and profit per product, ingredient-level inventory with recipes, combos and promotions, own and third-party app deliveries, expenses, income statement, break-even point, shifts, tip sharing and a loyalty points program.
- **Colombian electronic invoicing (DIAN)** and POS documents through Alanube.
- **Multiple branches**: each with its own tables, staff, kitchen, inventory and register. A general administrator sees them all.
- **Interface with its own design system**: color, shadow and motion tokens on Tailwind 4, a light theme for service and a deep dark theme for the kitchen and the dining-room screen, checked on phone, tablet, desktop and TV.

## My role alongside the AI

I directed Claude Code phase by phase: first a complete minimum product, then my own integrity and security roadmap, and then three business phases. The agent wrote the code, the migrations and the tests.

The decisions that changed the design were mine, because they come from how a real restaurant works:

- The kitchen dispatches **dish by dish**, not whole orders. That changed the entire state model.
- **Two waiters never serve the same table**, and the administrator can reassign it if a waiter gets sick.
- The first diner **is** the person responsible for the table. Counting them separately threw off the table's capacity.
- A customer who leaves without paying is recorded as an **authorized loss with a PIN**, not as a fake sale.
- **Multiple branches**, with a general administrator and per-branch administrators.

I also required evidence. Every phase closed with end-to-end tests against the real API, including concurrent operations (two waiters opening the same table, two payments at once), role and branch permissions, and real-time events.

## By the numbers

- 40 data models, 27 migrations and 126 API routes.
- 26 screens.
- More than 400 automated end-to-end checks across 18 suites, plus unit tests. The tests create their own data and delete it when they finish, even if they fail.
- Built on September 27 and 28, 2026, in 20 commits.

## What I learned

- **Business knowledge can't be delegated.** The agent proposes reasonable designs, but rules like "dish by dish" or "one waiter per table" only come from knowing the operation.
- **Test with real concurrency.** The most serious bugs showed up when two people did the same thing at the same time, not in the normal flow.
- **Prioritize by business value.** After the minimum product, the sales report and the register closing were worth more than any visual polish.

## Status

Works end to end locally. Electronic invoicing was tested against a simulator of the Alanube API; it still needs to be connected to their sandbox with real credentials. In October the whole interface was redesigned section by section without changing functionality, and verified with a real click-through (order, kitchen, delivery, bill and payment). It has continuous integration on GitHub Actions: every change runs the unit and end-to-end tests against a throwaway database and checks that the server shuts down gracefully. It is ready to deploy with the repository's deployment guide; the public demo is still pending.
