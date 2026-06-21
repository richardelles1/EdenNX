# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### EdenNX Corporate Website (`artifacts/edennx-site`)
- **Type**: React + Vite SPA (static, no backend)
- **Preview path**: `/`
- **Stack**: React, TypeScript, Tailwind CSS, react-router-dom v7 (routing), IntersectionObserver scroll-reveal animations
- **Pages**: Home (`/`), Products (`/products`), About (`/about`), Team (`/team`), Contact (`/contact`)
- **Brand**: Emerald green primary `hsl(142 52% 36%)`, light/dark mode, Inter font, radar-ring SVG background
- **Assets**: EdenNX logo and founder headshots from `attached_assets/`
- **Contact form**: posts to Web3Forms (FormData submit, no backend); delivers to info@edennx.com; client-side validation
- **Pricing (EdenScout)**: Individual $1,999/mo, Team 5-Seat $8,999/mo, Team 10-Seat $16,999/mo, Enterprise custom pricing
- **Deploy target**: Vercel via GitHub, vite.config.ts uses `BASE_PATH` env var

### API Server (`artifacts/api-server`)
- **Type**: Express 5 REST API
- **Preview path**: `/api`

## Key Commands

- `pnpm run typecheck` -- full typecheck across all packages
- `pnpm run build` -- typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` -- regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` -- push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` -- run API server locally
- `pnpm --filter @workspace/edennx-site run dev` -- run EdenNX site locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
