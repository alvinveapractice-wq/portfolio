# Portfolio — Alvin Moncada

The one-page portfolio and case studies for a virtual assistant working in inbox
management and AI-assisted business operations: business template systems,
marketing content products, and visual design assets.

Built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Deployed on
Vercel.

## What is here

- `/` — the offer, four service lines, about, the flagship build, and a library
  of 26 openable visuals in horizontal carousels.
- `/work/inbox-zero` — the flagship build in full: before/after screenshots, the
  walkthrough video, the SOP, templates and filter list as PDFs.
- `/work/templates` — seven business operations kits, with ten downloadable files.
- `/work/contents` — content and campaign packs, with four downloadable files.
- `/work/visual` — sticker packs, wall art and brand kits, with six downloadable files.
- `/og.png` — the social preview image.

## Content lives in one place

- `src/content/site.ts` — name, contact details, availability, facts, the four
  service lines, and the process.
- `src/content/showcase.ts` — the three visual collections and their images.
- `src/content/work.ts` — case studies: summary, metrics, facts, media, gallery,
  downloadable files, prose sections, honesty label.

Adding a build means adding one object to `work` and its assets to
`public/work/<slug>/`. The home page and the route both render from that data.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm start
```

## Deploy

Push to GitHub and import the repository in Vercel. No environment variables are
required. Set `NEXT_PUBLIC_SITE_URL` if the site moves to a custom domain, so
canonical and Open Graph URLs follow it.

## Screenshots for review

`scripts/shoot.mjs` captures desktop and mobile screenshots of the home page and
the case study with `puppeteer-core` against a running dev server. It is a review
tool, not part of the site.

## Evidence policy

Every build on this site is self-directed practice and is labelled as such. No
paid client work is claimed, and no real client data is used. A service appears
once its proof passes the same gate: files, a screenshot you can open, a
recording, a case study, a README, and an honesty label.

The library in `/work/showcase` publishes the file itself, a preview image, and
a guide where one exists. Where a case study or a recording is still being
written, the service line says "Practice build" rather than "Available now".
