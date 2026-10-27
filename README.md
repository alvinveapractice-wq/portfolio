# Portfolio — Alvin Moncada

The one-page portfolio and case studies for a virtual assistant working in email
operations, automation, Notion portals, landing pages, funnels, and AI content.

Built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Deployed on
Vercel.

## What is here

- `/` — the offer, the first case study, six service lines, about, contact.
- `/work/inbox-zero` — the first build in full: before/after screenshots, the
  walkthrough video, the SOP, templates, and filter list as PDFs.
- `/og.png` — the social preview image.

## Content lives in one place

- `src/content/site.ts` — name, contact details, availability, facts, services.
- `src/content/work.ts` — case studies: summary, facts, media, sections, honesty label.

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

Every build on this site is self-directed practice in a sandbox and is labelled
as such. No paid client work is claimed, and no real client data is used. A
service appears once its proof passes the same gate as the first: files,
screenshots, a recording, a case study, a README, and an honesty label.
