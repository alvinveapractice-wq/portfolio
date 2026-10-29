# Portfolio — Alvin Moncada

The portfolio and case studies for a virtual assistant working in inbox management and
AI-assisted business operations: operating template kits, marketing content products, and
visual design assets.

Live at **https://alvinmoncada.vercel.app** — four service lines, one measured flagship
build, and 26 products you can open and take away.

Built with Next.js 16 (App Router) and TypeScript. Styled with hand-written CSS over a
Tailwind v4 preflight reset. Deployed on Vercel, auto-deployed from `master`.

## What is here

| Route | What it holds |
| --- | --- |
| `/` | The offer, the four service lines, about, the flagship build, and the product library |
| `/work/inbox-zero` | The flagship build in full: before/after, the walkthrough video, and the SOP, templates and filter list as PDFs |
| `/work/templates` | Seven business operations kits, with **13** downloadable files |
| `/work/contents` | Content and campaign packs, with **4** downloadable files |
| `/work/visual` | Sticker packs, wall art and brand kits, with **6** downloadable files |

Every one of the 26 library products carries a download link on the home page, and each
collection links to its full file list on the case study page.

## How it is put together

- `src/content/site.ts` — name, contact details, availability, facts, the four service
  lines, the booking options and the process steps.
- `src/content/showcase.ts` — the three collections, their 26 images, and the file each
  product hands over.
- `src/content/work.ts` — case studies: summary, metrics, facts, media, gallery,
  downloadable files, prose sections, and the honesty label.

Adding a build means adding one object to `work` and its assets to
`public/work/<slug>/`. The home page and the route both render from that data.

### The pieces worth knowing about

- **`src/components/video-player.tsx`** — a deliberately small player: poster thumbnail,
  a translucent play button, and a custom control bar. The native `controls` are not
  used, because Chrome draws its own centred play button over a poster and its overflow
  menu carries a download entry. Drawing the controls removes the download button rather
  than hiding it.
- **`src/components/proof-icons.tsx`** — the four proof numbers carry an icon that plays
  its meaning once on first view and once on hover. One-shot, never a loop.
- **`src/components/showcase-carousel.tsx`** — a continuous slow sideways glide with a
  seamless loop, paused by any user interaction.
- **`src/components/structured-data.tsx`** — JSON-LD (`WebSite` + `Person`). It repeats
  only what the page already says: no email, no phone number, and no reviews or ratings.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm start
```

## Environment variables

Every one of these is optional. With none of them set the site still works.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The canonical origin. Set it if the site moves to a custom domain, so canonical, Open Graph and sitemap URLs follow it. |
| `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL` | Your Google Calendar *appointment schedule* link. With one configured, "Book a call" goes straight to it and the booking dialog disappears from the path. |
| `NEXT_PUBLIC_CALENDLY_URL` | Your Calendly event link, used as the second option in the dialog. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console token. Renders `<meta name="google-site-verification">`. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools token. Renders `<meta name="msvalidate.01">`. |

The last two are read at build time, so a redeploy is needed after setting them. Leaving
them unset renders no tag at all.

## Search visibility

- `/sitemap.xml` — the home page and the four case-study routes. Statically generated.
- `/robots.txt` — allows everything and points at the sitemap.
- JSON-LD on the home page, validated against the schema.org vocabulary.

Submit the sitemap at https://search.google.com/search-console. The property must be a
**URL-prefix** property — a Domain property would need a DNS TXT record on `vercel.app`,
which is not ours to set.

## Deploy

Push to `master` and Vercel deploys it. No build-time configuration is required.

## Screenshots for review

`scripts/shoot.mjs` captures desktop and mobile screenshots of the home page and the
case study with `puppeteer-core` against a running dev server. `scripts/check-live.mjs`
does the same against the live site. They are review tools, not part of the site.

## Evidence policy

Every build on this site is self-directed practice and is labelled as such. No paid
client work is claimed, and no real client data is used.

A service line is published once its proof passes the same gate: the files themselves, a
screenshot you can open, a recording, a case study, a README, and an honesty label. Where
something is still at concept stage — brand identity work, for instance — the page says
so rather than dressing it up.
