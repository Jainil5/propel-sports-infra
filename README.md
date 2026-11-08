# Propel Sports Infra

Marketing website for **Propel Sports Infra Pvt Ltd** — a sports surface products
manufacturing brand. Built with React, Vite and Framer Motion.

## Quick start

Requires Node `^20.19 || >=22.12` (`.nvmrc` pins 24 — run `nvm use` if you have nvm)
and npm. Nothing else: photography and hero footage are committed in `public/`,
and the site runs fully without environment variables.

```bash
git clone <your-remote-url> propel-sports-infra
cd propel-sports-infra
npm ci           # exact versions from package-lock.json
npm run dev      # http://localhost:5173
```

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server with HMR at `localhost:5173`    |
| `npm run build`   | Production build → `dist/`                 |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | oxlint over the source                    |

Optional: connect your own Supabase project for visitor analytics, lead capture
and the private `/admin` dashboard — see below. Without it, tracking is skipped
and the contact form falls back to a pre-filled email.

## Stack

- **React 19 + Vite** — app framework and dev tooling
- **Framer Motion** — scroll reveals, parallax hero, 3D tilt cards, magnetic
  buttons, count-up stats, marquees and page transitions
- **React Router** — client-side routing
- **Supabase** — visitor analytics, lead capture and the private `/admin` dashboard
- **Google Fonts** — Archivo (display), Inter (body), IBM Plex Mono (labels)

## Structure

```
src/
  components/   Nav (mega menu), Footer, Motion helpers, Shared UI
  data/         site.js, services.js (12 systems), products.js (9 products)
  pages/        Home, About, Catalog (index + detail), Projects,
                Certificates, Blog, Contact, Legal, NotFound
public/images/  brand photography
public/videos/  home hero footage (rally + court loops)
```

## Content

Products, services, projects, certificates and blog posts mirror the source
catalogue, rebranded to Propel Sports Infra. Edit the data files in `src/data/`
and the arrays in `src/pages/` to update copy.

## Analytics, leads & admin

The site records pageviews (path, referrer, session, device, coarse geo) and
WhatsApp clicks, and stores quote requests as leads. Everything lives in your
own Supabase project; visitors can only insert, never read.

Setup:

1. Create a Supabase project, then run `supabase/schema.sql` in its SQL Editor.
2. Authentication → Users → add an admin user (email + password, confirmed).
3. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY`, then restart the dev server.
4. Sign in at `/admin` — traffic chart, top pages, devices, countries, referrers,
   recent visits and lead management (status updates, search, filters, CSV export).

Without `.env` the site works normally: tracking is skipped, the contact form
falls back to a pre-filled email, and `/admin` shows the setup instructions.

## Home hero & cursor

The home hero opens on an outdoor pickleball rally, then rack-focuses into a
slow push-in on an aerial court loop. Phones skip the rally and start on the
court loop (lighter 360p rendition); reduced-motion visitors get a still poster.
On mouse devices the pointer becomes a spinning pickleball with a motion trail,
hover ring and click pulse.

Footage: Pexels — [outdoor rally](https://www.pexels.com/video/outdoor-pickleball-match-at-shopping-mall-37318760/),
[aerial courts](https://www.pexels.com/video/aerial-view-of-outdoor-pickleball-matches-37165624/)
(free license, stored locally in `public/videos/`).

## Notes

- Motion respects `prefers-reduced-motion`.
- Installable as a PWA; mobile gets a bottom tab bar and splash intro.
- Layout is verified down to 375px wide.