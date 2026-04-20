# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

**Deploy to Vercel:**
```bash
npx vercel@latest --yes --scope ashots-projects-c4d91a4b --prod
```

## Architecture

Next.js 16 app with App Router (`src/app/`). Three pages:
- `/` — Home (hero, stats, about, marquee, dishes, reviews, experience, CTA)
- `/menu` — Menu with categorized items
- `/contact` — Reservation form with n8n webhook integration

Shared components in `src/components/`: `Navbar.tsx` (scroll-aware, pill-shaped on scroll) and `Footer.tsx`.

All pages are `"use client"` and use Framer Motion extensively for scroll-triggered reveals, parallax, counters, and hover effects.

## Styling — Critical Rules

**This project uses inline `style={{}}` for most layout (padding, margins, gaps, colors).** Do NOT replace inline styles with Tailwind classes — inline styles have higher CSS specificity and replacing them breaks layout.

For responsive overrides, use CSS media queries in `globals.css` with `!important` to override inline styles. Responsive utility classes (`.r-container`, `.r-section`, `.r-gap`, etc.) are defined there with a 768px breakpoint.

Tailwind CSS v4 with inline `@theme` block in `globals.css` defines design tokens (colors, fonts). No separate `tailwind.config.ts`.

## Design Tokens

Dark luxury theme with gold accents:
- Background: `#070707` / Surface: `#0F0F0F`, `#1A1A1A`
- Gold: `#C8A97E` (primary), `#E8D5B5` (light), `#A08456` (dark)
- Text: `#F5F5F5` / Muted: `#A3A3A3`

Three fonts: Bebas Neue (`--font-heading`), Inter (`--font-body`), Great Vibes (`--font-script`).

## Integrations

**Reservation form** (`/contact`) posts to n8n webhook (`NEXT_PUBLIC_N8N_WEBHOOK_URL`). The n8n workflow formats the data and sends it to a Telegram group. Workflow configs are in `n8n/`.

## Deployment

- **Vercel**: https://steaknchill.vercel.app
- **GitHub**: https://github.com/issac5000/steaknchill
- Path alias: `@/*` → `./src/*`
