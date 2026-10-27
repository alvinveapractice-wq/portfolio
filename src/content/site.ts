const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000";

export const site = {
  name: "Alvin Moncada",
  role: "Virtual assistant — email, automation and web",
  email: "alvinmoncada.va@gmail.com",
  phone: "+63 970 680 0720",
  location: "Philippines · GMT+8",
  availability: "40 hrs/week · four-hour overlap with US and AU",
  github: "https://github.com/alvinveapractice-wq",
  response: "I reply within 24 hours, Monday to Saturday.",
  intro:
    "I build the unglamorous systems small businesses run on: a sorted inbox, an automatic hand-off, and a page that takes the enquiry. Then I write the procedure down so it survives without me.",
  about: [
    "I spent two years on the front line of a convenience store — checkout, stock, and the daily sales record — where a missed entry becomes a wrong order the following week. That is where I learned that a written procedure beats memory.",
    "I am now building the remote version of that work: inbox systems, automations, and pages for small businesses. Everything shown here is a self-directed practice build in a sandbox, labelled as such. No client work is claimed, and every claim has a file behind it.",
    "Criminology graduate, 2024. Based in the Philippines, working GMT+8.",
  ],
  facts: [
    ["Based", "Philippines · GMT+8"],
    ["Capacity", "40 hrs/week"],
    ["Overlap", "4 hours with US and AU"],
    ["Background", "2 years frontline operations"],
    ["Tools", "Gmail · Sheets · Notion · n8n · Next.js"],
    ["Education", "Criminology, 2024"],
  ],
} as const;

export type Service = {
  no: string;
  title: string;
  summary: string;
  status: "available" | "soon";
  engagement: string;
  href?: string;
};

export const services: Service[] = [
  {
    no: "01",
    title: "Email management",
    summary:
      "A shared inbox sorted by who and what next, a written 15-minute daily routine, and reply templates that answer in the first sentence.",
    status: "available",
    engagement: "Monthly retainer · 10 hrs/week",
    href: "/work/inbox-zero",
  },
  {
    no: "02",
    title: "Automation with n8n",
    summary:
      "A form, inbox, or sheet event updates the next system and tells the right person — with a written note on what breaks and how it recovers.",
    status: "available",
    engagement: "Per workflow",
  },
  {
    no: "03",
    title: "Notion Ops Hub",
    summary:
      "A client portal for onboarding, deliverables, approvals, invoices, and the weekly report. Duplicated from one template, tailored to the account.",
    status: "soon",
    engagement: "Setup, then monthly upkeep",
  },
  {
    no: "04",
    title: "Landing pages",
    summary:
      "One page that loads fast, works on a phone, and takes the booking or enquiry — deployed, measured, and handed over with the source.",
    status: "available",
    engagement: "Fixed scope",
  },
  {
    no: "05",
    title: "Funnels",
    summary:
      "The page, a lead magnet, a thank-you step, and three follow-up emails, with every step tracked so you know where people stop.",
    status: "soon",
    engagement: "Fixed scope",
  },
  {
    no: "06",
    title: "AI digital creation",
    summary:
      "Social images and a short promo video to launch the page, produced from a written prompt log and edited before delivery.",
    status: "soon",
    engagement: "Per batch",
  },
];

export const processSteps = [
  {
    no: "01",
    title: "A 20-minute call",
    copy: "What lands in your inbox or on your desk, what you use now, and what you want to stop doing. No slides, no pitch deck.",
  },
  {
    no: "02",
    title: "A fixed quote",
    copy: "Scope, fee, revision limit and delivery date in writing before work starts. Anything outside that scope is a change order, quoted first.",
  },
  {
    no: "03",
    title: "The build",
    copy: "One deliverable at a time, shown while it is being built, so a wrong direction costs a day instead of a week.",
  },
  {
    no: "04",
    title: "SOP handoff",
    copy: "The written procedure, a recorded walkthrough and 14 days of support for defects. You can run it without me.",
  },
];
