export type ShowcaseItem = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

export type ShowcaseCollection = {
  id: string;
  no: string;
  title: string;
  kicker: string;
  blurb: string;
  items: ShowcaseItem[];
};

const base = "/work/showcase";

export const showcase: ShowcaseCollection[] = [
  {
    id: "templates",
    no: "02",
    title: "AI Business Templates & Systems",
    kicker: "Operating kits for the work that repeats",
    blurb:
      "Seven editable kits covering the jobs a small business repeats every week — content planning, client onboarding, CRM, inventory, invoicing, project tracking and sales follow-up. Each kit ships as a spreadsheet or document with a guide that says what to type in and what to check.",
    items: [
      {
        src: `${base}/templates/content-planning.webp`,
        alt: "AI-powered content planning bundle — source-to-content matrix, tone and platform adaptation, reusable content library and a multi-platform publishing calendar.",
        label: "Content planning",
        caption:
          "Source brief → repurposing matrix → platform adaptation → review → approved library → publishing calendar.",
      },
      {
        src: `${base}/templates/client-onboarding.webp`,
        alt: "Client onboarding kit suite — intake questionnaire, welcome and expectations pack, project kickoff brief, access assets and handoff tracker.",
        label: "Client onboarding",
        caption:
          "Intake questionnaire, welcome pack, kickoff brief, access handoff and tracker — the first week of a client, written down.",
      },
      {
        src: `${base}/templates/crm-trackers.webp`,
        alt: "CRM spreadsheet toolkit — lead and prospect tracker, sales pipeline and deal tracker, customer interaction log and account health tracker.",
        label: "CRM & pipeline",
        caption:
          "Lead tracker, deal pipeline, interaction log and account health — four sheets that replace four separate memories.",
      },
      {
        src: `${base}/templates/inventory-sheets.webp`,
        alt: "Inventory management sheets — stock level and reorder tracker, inventory movement log, purchase order tracker and stock count reconciliation.",
        label: "Inventory",
        caption:
          "Stock levels, movement log, purchase orders and shrinkage reconciliation — the same four ledgers from the store floor, in a spreadsheet.",
      },
      {
        src: `${base}/templates/invoice-expense.webp`,
        alt: "Invoice and expense tracker toolkit — invoice register and payment tracker, business expense tracker, monthly budget and cash flow tracker, client billing summary.",
        label: "Invoices & expenses",
        caption:
          "Invoice register, expense tracker, cash-flow sheet and a client billing summary — money in and money out, one place.",
      },
      {
        src: `${base}/templates/project-management-os.webp`,
        alt: "Notion Project Management OS dashboard — project overview, task and milestone tracker, team workload planner, risk and decision log, meetings and documentation.",
        label: "Project OS (Notion)",
        caption:
          "A Notion workspace import pack: dashboard, milestones, workload, risks, decisions and meeting notes.",
      },
      {
        src: `${base}/templates/sales-lead-trackers.webp`,
        alt: "Sales and lead tracker templates — lead tracker, sales pipeline tracker, sales outreach and follow-up tracker, sales performance dashboard.",
        label: "Sales & lead tracking",
        caption:
          "Lead, pipeline, outreach follow-up and a performance dashboard — the outreach rhythm on one screen.",
      },
    ],
  },
  {
    id: "contents",
    no: "03",
    title: "AI Contents & Marketing Products",
    kicker: "Copy, campaigns and calendars, ready to edit",
    blurb:
      "Caption packs, a ten-email campaign library, carousel sets, short-form video scripts and a month of social calendars. The output is editable copy with the structure already decided — hook, body, CTA, hashtags and a posting slot.",
    items: [
      {
        src: `${base}/contents/calendar-product-neon.webp`,
        alt: "Neon 30-day product and service content calendar infographic with content pillars, a 30-day calendar grid, hook ideas, caption templates and posting times.",
        label: "30-day calendar",
        caption:
          "A full month of product and service content: pillars, a 30-day grid, hook ideas, caption templates and posting times.",
      },
      {
        src: `${base}/contents/calendar-education.webp`,
        alt: "Educational social media content calendar with topic banks and a weekly posting plan.",
        label: "Educational calendar",
        caption: "Educational content calendar — a topic bank and a weekly plan that does not need re-inventing.",
      },
      {
        src: `${base}/contents/calendar-personal-brand.webp`,
        alt: "Personal branding content calendar with weekly themes and post templates.",
        label: "Personal brand calendar",
        caption: "Personal branding calendar — themes, formats and prompts for a consistent voice.",
      },
      {
        src: `${base}/contents/calendar-community.webp`,
        alt: "Community content calendar dashboard showing engagement prompts and weekly schedule.",
        label: "Community calendar",
        caption: "Community content dashboard — engagement prompts, replies and weekly schedule.",
      },
      {
        src: `${base}/contents/email-campaign-templates.webp`,
        alt: "Email marketing campaign templates cover page — 10 ready-to-customise email templates across welcome, nurture, sales and retention.",
        label: "Email campaigns",
        caption:
          "Ten ready-to-customise email templates across welcome, nurture, sales and retention — subject lines, preview text and CTAs included.",
      },
      {
        src: `${base}/contents/script-gmail.webp`,
        alt: "Short-form video script guide for organising your Gmail inbox.",
        label: "Script · Gmail inbox",
        caption: "Short-form video script — organising your Gmail inbox, hook to CTA.",
      },
      {
        src: `${base}/contents/script-youtube.webp`,
        alt: "Short-form video script guide for YouTube content creation.",
        label: "Script · YouTube",
        caption: "Short-form video script — YouTube content creation, hook to CTA.",
      },
      {
        src: `${base}/contents/script-facebook.webp`,
        alt: "Short-form video script guide for Facebook marketing content.",
        label: "Script · Facebook",
        caption: "Short-form video script — Facebook marketing content, hook to CTA.",
      },
      {
        src: `${base}/contents/script-product-promo.webp`,
        alt: "Short-form video script for creating effective product promotions.",
        label: "Script · Product promo",
        caption: "Short-form video script — promoting a product without a hard sell.",
      },
      {
        src: `${base}/contents/script-storytelling.webp`,
        alt: "Storytelling and personal branding video script guide.",
        label: "Script · Storytelling",
        caption: "Short-form video script — storytelling and personal branding.",
      },
      {
        src: `${base}/contents/script-viral-hooks.webp`,
        alt: "Viral short-form video hook guide with hook formulas.",
        label: "Script · Viral hooks",
        caption: "Short-form video script — engagement and viral-style hooks.",
      },
      {
        src: `${base}/contents/carousel-bookkeeping.webp`,
        alt: "Instagram carousel on moving from bookkeeping chaos to clarity.",
        label: "Carousel · Bookkeeping",
        caption: "Instagram carousel — moving bookkeeping from chaos to clarity.",
      },
      {
        src: `${base}/contents/carousel-automation-journey.webp`,
        alt: "Instagram carousel telling a real story about an automation journey.",
        label: "Carousel · Automation story",
        caption: "Instagram carousel — a real story about an automation journey.",
      },
    ],
  },
  {
    id: "visual",
    no: "04",
    title: "AI Visual & Design Assets",
    kicker: "Sticker packs, wall art and brand directions",
    blurb:
      "Themed digital sticker packs and a minimalist wall-art set, exported as transparent PNG, SVG and print-ready PDF with a usage guide and a product cover. Brand identity work is still at concept-board stage and is labelled as such.",
    items: [
      {
        src: `${base}/visual/stickers-cute-sheet.webp`,
        alt: "Cute and kawaii digital sticker sheet — 16 sticker designs on an A4 printable sheet.",
        label: "Cute & kawaii stickers",
        caption:
          "16 transparent PNG stickers plus matching SVG files and an A4 printable sheet.",
      },
      {
        src: `${base}/visual/stickers-cute-cover.webp`,
        alt: "Cute and kawaii digital sticker pack product cover.",
        label: "Cute & kawaii cover",
        caption: "Product cover and preview — how a digital pack is presented for sale.",
      },
      {
        src: `${base}/visual/stickers-minimal-sheet.webp`,
        alt: "Minimalist productivity digital sticker sheet — 16 sticker designs on an A4 printable sheet.",
        label: "Minimalist productivity",
        caption: "A minimalist productivity set — planners, lists and focus marks.",
      },
      {
        src: `${base}/visual/stickers-retro-sheet.webp`,
        alt: "Retro and vintage digital sticker sheet — 16 sticker designs on an A4 printable sheet.",
        label: "Retro & vintage",
        caption: "A retro and vintage set — badges, labels and dated flourishes.",
      },
      {
        src: `${base}/visual/stickers-botanical-sheet.webp`,
        alt: "Botanical and nature digital sticker sheet — 16 sticker designs on an A4 printable sheet.",
        label: "Botanical & nature",
        caption: "A botanical set — leaves, stems and pressed-flower shapes.",
      },
      {
        src: `${base}/visual/wall-art-gallery.webp`,
        alt: "Minimalist typography motivational wall art gallery sheet showing six printable prints.",
        label: "Wall art set",
        caption:
          "Six minimalist motivational prints — progress, focus, opportunities, time, starting and less noise.",
      },
    ],
  },
];
