import { showcase } from "@/content/showcase";
import type { ShowcaseItem } from "@/content/showcase";

export type WorkMedia = {
  before?: { src: string; width: number; height: number; alt: string; caption: string };
  after?: { src: string; width: number; height: number; alt: string; caption: string };
  wide?: { src: string; width: number; height: number; alt: string; caption: string };
};

export type Work = {
  slug: string;
  number: string;
  kicker: string;
  title: string;
  summary: string;
  year: string;
  status: string;
  metrics: { value: string; label: string }[];
  facts: { label: string; value: string }[];
  media: WorkMedia;
  gallery?: ShowcaseItem[];
  video?: { src: string; poster: string; length: string; title: string };
  files?: { label: string; href: string; note: string }[];
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  honesty: string;
};

const galleryOf = (id: string): ShowcaseItem[] =>
  showcase.find((collection) => collection.id === id)?.items ?? [];

export const work: Work[] = [
  {
    slug: "inbox-zero",
    number: "01",
    kicker: "Inbox management",
    title: "Inbox Zero Kit",
    summary:
      "A shared inbox with no labels and no written routine. Seven labels, eight filters, a 15-minute daily procedure, and three reply templates — ending with the inbox at zero.",
    year: "2026",
    status: "Practice build · shipped",
    metrics: [
      { value: "8 → 0", label: "unread to inbox zero" },
      { value: "4", label: "left in Action" },
      { value: "2 / 2", label: "Finance / Reference" },
      { value: "3:31", label: "walkthrough" },
    ],
    facts: [
      { label: "Scope", value: "8 messages, 7 labels, 8 filters" },
      { label: "Built in", value: "Three working days" },
      { label: "Tools", value: "Gmail, Google Sheets, Chrome print-to-PDF" },
      { label: "Deliverables", value: "SOP, templates, filter list, recording" },
      { label: "Status", value: "Self-directed practice build" },
    ],
    media: {
      before: {
        src: "/work/inbox-zero/before.png",
        width: 1920,
        height: 873,
        alt: "Gmail inbox with eight unread messages in one list, before any labels were applied.",
        caption: "Before: eight messages, one list, nothing sorted.",
      },
      after: {
        src: "/work/inbox-zero/after.png",
        width: 1920,
        height: 868,
        alt: "The same Gmail inbox at zero, with labels holding four Action, two Finance and two Reference messages.",
        caption: "After: inbox zero, with the mail living under the labels.",
      },
      wide: {
        src: "/work/inbox-zero/labels.png",
        width: 1920,
        height: 865,
        alt: "The seven-label Gmail tree, numbered 01-Action through 07-Archive.",
        caption:
          "Seven labels, numbered so they sort in the order the work happens. Labels are tags, not folders: all eight messages carry 03-Clients, four also carry 01-Action.",
      },
    },
    video: {
      src: "/work/inbox-zero/walkthrough.mp4",
      poster: "/work/inbox-zero/poster.jpg",
      length: "3 minutes 31 seconds",
      title: "Inbox Zero walkthrough",
    },
    files: [
      {
        label: "Daily triage SOP",
        href: "/work/inbox-zero/triage-sop.pdf",
        note: "Two pages: the five decisions, the 15-minute routine, the definition of done.",
      },
      {
        label: "Reply templates",
        href: "/work/inbox-zero/templates.pdf",
        note: "Acknowledgment, follow-up, delay notice — each with a date and one next step.",
      },
      {
        label: "Filter list",
        href: "/work/inbox-zero/filters.pdf",
        note: "All eight Gmail filters, with their exact criteria and actions.",
      },
    ],
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "The sandbox began the way most small-business inboxes do: one list, eight unread messages, no labels, and no written answer to the question \"what happens to this one?\". Invoices, newsletters, security notices, and client requests all arrived together.",
          "The goal was not a tidy screenshot. It was a routine someone else could pick up on a Monday morning without asking me anything.",
        ],
      },
      {
        heading: "The build",
        paragraphs: [
          "Seven labels separate who the mail is from what happens next: 01-Action, 02-Waiting, 03-Clients, 04-Finance, 05-Admin, 06-Reference, 07-Archive. The numbering is deliberate — labels sort alphabetically, so the number decides the order they appear in the sidebar.",
          "Eight Gmail filters remove the predictable mail before it reaches the inbox: billing to Finance, newsletters and machine notices to Reference, urgent subjects to Action. The filters handle volume; the SOP handles judgment.",
        ],
        list: [
          "Billing and receipts → 04-Finance",
          "Newsletters, calendar notices, machine mail → 06-Reference (skip the inbox)",
          "Urgent subject lines → 01-Action",
          "Client mail → 03-Clients, always, in addition to the state label",
        ],
      },
      {
        heading: "The decisions the SOP fixes",
        paragraphs: [
          "The daily procedure is fifteen minutes: two to scan, eight to triage, three to chase, two to close. The rule underneath it is one touch — an email is opened once and decided once.",
          "A message that needs an answer today stays in Action. One that needs someone else goes to Waiting with a date. Money mail is filed in Finance. Anything finished leaves the inbox.",
          "The meeting invitation sits in Action because it asks for a reply, not because it is urgent. The invoice and receipt sit in Finance because they are records, not tasks. That distinction is the whole system.",
        ],
      },
      {
        heading: "What the recording shows",
        paragraphs: [
          "The walkthrough opens on the unread inbox, shows the label tree and the eight filters, then triages the eight messages live. It ends on an empty inbox with Action holding four, Finance two, and Reference two.",
          "It is three and a half minutes rather than the ninety seconds planned, because the narration is read at a working pace. Nothing was cut to make it look faster.",
        ],
      },
      {
        heading: "Result, and what it proves",
        paragraphs: [
          "Inbox zero at the end of the run, with every message still findable under a label. The definition of done is written down: the inbox is empty, and Action holds only what will be finished today.",
          "What it proves is method, not volume: a taxonomy that separates identity from state, filters that remove predictable mail, a written procedure, and templates that answer in the first sentence. The eight messages are sample data — \"Bitcoin Lab\" is a test sender, not a client.",
        ],
      },
    ],
    honesty:
      "Self-directed practice build in a synthetic sandbox mailbox. \"Bitcoin Lab\" is test data, not a client. No paid client work is claimed and no real client data is used. The method is the deliverable; the eight messages exist to make it visible.",
  },

  {
    slug: "templates",
    number: "02",
    kicker: "AI business templates & systems",
    title: "Business Operations Kits",
    summary:
      "Seven editable kits for the work a small business repeats — content planning, client onboarding, CRM, inventory, invoicing, project tracking and sales follow-up. Thirty-five spreadsheets, seven CSV import tables, and a written guide for each.",
    year: "2026",
    status: "Practice build · in progress",
    metrics: [
      { value: "07", label: "operating kits" },
      { value: "35", label: "spreadsheet templates" },
      { value: "05", label: "kits openable now" },
      { value: "07", label: "CSV tables for Notion import" },
    ],
    facts: [
      { label: "Scope", value: "7 kits · 35 spreadsheets · 7 CSV tables" },
      { label: "Structure", value: "Template + guide, every kit" },
      { label: "Formats", value: "XLSX · DOCX · CSV · Markdown" },
      { label: "Published", value: "10 files open for download" },
      { label: "Status", value: "Self-directed practice build" },
    ],
    media: {},
    gallery: galleryOf("templates"),
    files: [
      {
        label: "Notion Project OS — setup guide",
        href: "/work/templates/project-management-os-setup-guide.md",
        note: "How to import the seven CSV tables into a Notion workspace, in order.",
      },
      {
        label: "Notion Project OS — import map",
        href: "/work/templates/project-management-os-import-map.md",
        note: "Which CSV becomes which database, and what each one is for.",
      },
      {
        label: "Client onboarding — intake questionnaire",
        href: "/work/templates/client-onboarding-intake-questionnaire.xlsx",
        note: "The editable questionnaire a client fills in before the work starts.",
      },
      {
        label: "Client onboarding — questionnaire guide",
        href: "/work/templates/client-onboarding-intake-questionnaire-guide.docx",
        note: "What to do with each answer, and what to check before moving on.",
      },
      {
        label: "Lead & prospect tracker",
        href: "/work/templates/lead-and-prospect-tracker.xlsx",
        note: "Live sheet: status, source, next action, follow-up date.",
      },
      {
        label: "Lead & prospect tracker — guide",
        href: "/work/templates/lead-and-prospect-tracker-guide.docx",
        note: "How the sheet is meant to be worked, column by column.",
      },
      {
        label: "Stock level & reorder tracker",
        href: "/work/templates/stock-level-reorder-tracker.xlsx",
        note: "Reorder points and quantities — the version of this I used on the store floor.",
      },
      {
        label: "Stock level & reorder tracker — guide",
        href: "/work/templates/stock-level-reorder-tracker-guide.docx",
        note: "How to set a reorder point, and what to do when stock is short.",
      },
      {
        label: "Invoice register & payment tracker",
        href: "/work/templates/invoice-register-payment-tracker.xlsx",
        note: "Issued, due, paid and overdue, with a status column.",
      },
      {
        label: "Invoice register & payment tracker — guide",
        href: "/work/templates/invoice-register-payment-tracker-guide.docx",
        note: "The weekly check that keeps the register from going stale.",
      },
    ],
    sections: [
      {
        heading: "Why kits and not templates",
        paragraphs: [
          "A template is a form. A kit is a form plus the procedure around it — what to type in, what order, what to check, and what \"finished\" looks like. Every kit here ships as two files: the editable sheet, and a guide that says what each column is for and what happens next.",
          "The inventory tracker is the clearest example. The columns are the ones I actually used during two years of night shifts: what moved, what sat still, what had to be reordered before the morning delivery, and what was quietly shrinking on the shelf.",
        ],
      },
      {
        heading: "What is in the seven kits",
        paragraphs: [
          "Each kit follows the same shape — a tracker, a companion tracker or log, a reference sheet, and a guide — so a client who learns one of them has learned the pattern.",
        ],
        list: [
          "AI-powered content planning — source intake, repurposing matrix, platform adaptation, reusable library, publishing calendar",
          "Client onboarding kits — intake questionnaire, welcome and expectations pack, project kickoff brief, access and handoff tracker",
          "CRM spreadsheets — lead and prospect tracker, sales pipeline and deal tracker, interaction and follow-up log, account health tracker",
          "Inventory management — stock level and reorder tracker, movement and transaction log, purchase order tracker, stock count and shrinkage reconciliation",
          "Invoice and expense trackers — invoice register, business expense tracker, monthly budget and cash flow, client billing summary",
          "Project management dashboards — a Notion workspace import pack of seven CSV tables covering projects, tasks, workload, risks, decisions and meetings",
          "Sales and lead trackers — lead tracker, pipeline tracker, outreach and follow-up tracker, sales performance dashboard",
        ],
      },
      {
        heading: "What is published, and what is not yet",
        paragraphs: [
          "Ten files are open for download right now: the Notion setup guide and import map, and the questionnaire, lead tracker, stock tracker and invoice register — each with its guide.",
          "The remaining kits are built but not yet published, because the guide and the template have not been checked against each other line by line. Publishing a template without its guide would make the kit half a kit.",
        ],
      },
      {
        heading: "How these were made",
        paragraphs: [
          "Each template was written around a real task, then filled with sample rows and tested against a realistic week of work. Where a sheet had no honest use, it was cut rather than kept for symmetry.",
          "The Notion pack is the exception worth explaining: it is seven CSV files, imported in order, each becoming one database. The import map ships with it because an import in the wrong order produces a workspace that looks broken.",
        ],
      },
    ],
    honesty:
      "Self-directed practice build. Every kit was written for this portfolio and tested with sample data only. No client data is used, no client result is claimed, and published files are the working versions — not a licensed commercial product.",
  },

  {
    slug: "contents",
    number: "03",
    kicker: "AI contents & marketing products",
    title: "Content & Campaign Packs",
    summary:
      "Caption packs, a ten-email campaign library, carousel sets, short-form video scripts and a month of social calendars — thirteen published visuals. The structure is already decided, so what is left is your voice and your offer.",
    year: "2026",
    status: "Practice build · in progress",
    metrics: [
      { value: "13", label: "visuals published" },
      { value: "10", label: "email campaign templates" },
      { value: "04", label: "social content calendars" },
      { value: "06", label: "short-form video scripts" },
    ],
    facts: [
      { label: "Scope", value: "Captions, email, carousels, scripts, calendars" },
      { label: "Formats", value: "PDF · DOCX · PNG" },
      { label: "Published", value: "4 files open for download" },
      { label: "Structure", value: "Hook · body · CTA · hashtags · slot" },
      { label: "Status", value: "Self-directed practice build" },
    ],
    media: {},
    gallery: galleryOf("contents"),
    files: [
      {
        label: "Email marketing campaign templates",
        href: "/work/contents/email-marketing-campaign-templates.pdf",
        note: "Ten templates across welcome, nurture, sales and retention — with subject lines, preview text and CTAs.",
      },
      {
        label: "AI-generated caption packs",
        href: "/work/contents/ai-generated-caption-packs.docx",
        note: "Caption and hashtag sets by platform and content type.",
      },
      {
        label: "Caption & hashtag generator",
        href: "/work/contents/caption-and-hashtag-generator.docx",
        note: "The prompt structure behind the caption packs, written down so it can be reused.",
      },
      {
        label: "Video script hook & title prompts",
        href: "/work/contents/video-script-hook-and-title-prompts.docx",
        note: "Hook formulas and title patterns for short-form video, ready to drop into a script.",
      },
    ],
    sections: [
      {
        heading: "The problem these solve",
        paragraphs: [
          "Most small businesses do not need more ideas. They need the next thirty days already decided — what goes out, on which platform, with which hook, and what the call to action is. The blank content calendar is where the week quietly dies.",
          "Every pack here arrives with that decision made. You replace the offer, the name and the specifics; the shape, the hook and the slot stay.",
        ],
      },
      {
        heading: "What is in the library",
        paragraphs: [
          "Four social content calendars — educational, personal branding, product and service, and community. Each is a month of slots with the content pillar, the format, the hook and the CTA already placed.",
          "Six short-form video script guides covering Facebook, YouTube, product promotion, storytelling, personal branding and viral hooks. Two Instagram carousel sets. Ten email campaign templates. A caption and hashtag pack, plus the prompt structure behind it.",
        ],
      },
      {
        heading: "The product and service calendar",
        paragraphs: [
          "The 30-day product and service calendar is the densest piece in the library. It carries nine content pillars — showcase, education, problem-solution, social proof, behind the scenes, offers, Q&A, industry insights — and a 30-day grid that fills every slot.",
          "It also ships the supporting material: hook ideas for the first three seconds, caption templates by pillar, on-screen text ideas, and posting times set for Philippine hours with a note about audience overlap.",
        ],
      },
      {
        heading: "How these were written",
        paragraphs: [
          "Each calendar was filled with a sample offer end to end and then read as a client would — out of order, mid-week, with no time to think. The gaps that showed up are the ones that got fixed.",
          "Where a template needed a number I did not have, it says so rather than inventing one. A placeholder that admits it is a placeholder is more useful than a confident wrong figure.",
        ],
      },
    ],
    honesty:
      "Self-directed practice build. All brands, names, offers and results inside these files are fictional sample content written for the portfolio. No audience, follower count, revenue or client campaign is claimed.",
  },

  {
    slug: "visual",
    number: "04",
    kicker: "AI visual & design assets",
    title: "Sticker Packs, Wall Art & Brand Kits",
    summary:
      "Four themed digital sticker packs and a six-piece minimalist wall-art set, exported as transparent PNG, SVG and print-ready PDF with a usage guide and a product cover. Brand identity work is still at concept-board stage and is labelled as such.",
    year: "2026",
    status: "Practice build · in progress",
    metrics: [
      { value: "04", label: "sticker packs" },
      { value: "16", label: "transparent PNGs per pack" },
      { value: "06", label: "wall art prints" },
      { value: "03", label: "formats: PNG, SVG, PDF" },
    ],
    facts: [
      { label: "Per pack", value: "16 PNG (1200×1200) + 16 SVG + A4 PDF" },
      { label: "Also included", value: "Product cover, preview, usage guide" },
      { label: "Wall art", value: "6 motivational prints, JPG + print-ready PDF" },
      { label: "Published", value: "6 files open for download" },
      { label: "Status", value: "Self-directed practice build" },
    ],
    media: {},
    gallery: galleryOf("visual"),
    files: [
      {
        label: "Cute & kawaii — A4 sticker sheet",
        href: "/work/visual/cute-kawaii-sticker-sheet-a4.pdf",
        note: "The printable sheet: 16 designs on one A4 page, marked for actual-size printing.",
      },
      {
        label: "Cute & kawaii — usage guide",
        href: "/work/visual/cute-kawaii-usage-guide.pdf",
        note: "What is in the pack, how to use each file, and the palette.",
      },
      {
        label: "Minimalist productivity — A4 sticker sheet",
        href: "/work/visual/minimalist-productivity-sticker-sheet-a4.pdf",
        note: "The second themed pack, print-ready and sized to the same A4 layout.",
      },
      {
        label: "Retro & vintage — A4 sticker sheet",
        href: "/work/visual/retro-vintage-sticker-sheet-a4.pdf",
        note: "The third themed pack — badges, labels and dated flourishes.",
      },
      {
        label: "Botanical & nature — A4 sticker sheet",
        href: "/work/visual/botanical-nature-sticker-sheet-a4.pdf",
        note: "The fourth themed pack — leaves, stems and pressed-flower shapes.",
      },
      {
        label: "Minimalist wall art — usage guide",
        href: "/work/visual/minimalist-wall-art-usage-guide.pdf",
        note: "The six prints, their sizes, and what to check before printing.",
      },
    ],
    sections: [
      {
        heading: "What a pack actually contains",
        paragraphs: [
          "Sixteen individual transparent PNG stickers at 1200 × 1200 px, sixteen matching SVG files for scaling and recolouring, one A4 print-ready sticker sheet, a sheet preview, a product cover, and a usage guide that names every theme in the set.",
          "That structure is the same for all four packs. Cute and kawaii runs cat, cloud, strawberry, bubble tea, flower, sun, heart, star, avocado, toast, ghost, moon, cupcake, teddy bear, rainbow and gift. Minimalist productivity, retro and vintage, and botanical follow the same build.",
        ],
      },
      {
        heading: "The wall art set",
        paragraphs: [
          "Six minimalist typography prints — Progress Over Perfection, Create Your Own Opportunities, Stay Focused, Make Time for What Matters, One Day or Day One, and Less Noise, More Meaning. High-resolution JPGs in common print ratios, vector print-ready PDF exports, and SVG masters.",
          "The set is deliberately restrained: black on cream, one idea per sheet. It was designed to hang in a home office without arguing with the person working in it.",
        ],
      },
      {
        heading: "Brand identity kits — still concepts",
        paragraphs: [
          "Six brand directions exist as concept boards: AURORA for luxury and wellness, NEXORA for modern tech, LUMORA for organic and wellness, JOYVIBE for playful and creative studios, VYRON for corporate consulting, and TERRALIS for vintage artisan goods.",
          "They are concept boards, and they are labelled that way. A board covers logo concepts and variations, a colour palette with hex values, typography pairing, graphic direction, mockups and a mini style guide — but the logos, fonts and usage rules have not been cleared for commercial use, and no trademark check has been run.",
        ],
      },
      {
        heading: "Quality checks, and what they caught",
        paragraphs: [
          "Each pack was checked for transparent backgrounds, correct rendering, readable text, sheet margins, filename agreement with the inventory, and whether the archive contents match what the guide claims.",
          "The wall art needed the most work: pixel dimensions and intended physical print size were re-checked per export, because DPI metadata alone does not establish print quality, and PDF page sizes and margins were verified at 100% scale.",
        ],
      },
    ],
    honesty:
      "Self-directed practice build. AI-assisted ideation and visual production, reviewed and edited by hand. Brand boards are concepts, not cleared commercial identities — fonts, licences and trademark availability have not been verified. Decorative assets only; no character or trademark packs.",
  },
];

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}
