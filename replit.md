# Fresh Market

A browse-only grocery showcase for product departments and weekly in-store deals.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/fresh-market/src/App.tsx` — storefront content, product catalog, category filters, and weekly finds
- `artifacts/fresh-market/src/index.css` — storefront styling and responsive layout

## Architecture decisions

- The storefront is a static, front-end showcase; it does not use the API server or database.
- Products and weekly finds are browsing content only; there is no pricing, cart, checkout, or online ordering.
- Store location, hours, and product/deal copy are sample content and should be confirmed before publishing.

## Product

Visitors can browse grocery departments, search and filter example products, and see weekly in-store highlights. Purchases happen in person, not through the website.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
