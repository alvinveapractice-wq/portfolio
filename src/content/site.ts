const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000";

export const site = {
  name: "Alvin Moncada",
  role: "Virtual assistant — email, content and web",
  email: "alvinmoncada.va@gmail.com",
  phone: "+63 970 680 0720",
  /**
   * The phone number is not printed as plain text on the site. A bare number
   * on a public page is a harvested list for cold-call spam; behind a chat
   * link it stays one tap away for a real client and invisible to a scraper.
   * It is still printed on the resume, which only reaches people who asked
   * for it.
   */
  whatsapp: "https://wa.me/639706800720",
  location: "Philippines · GMT+8",
  availability: "40 hrs/week · four-hour overlap with US and AU",
  github: "https://github.com/alvinveapractice-wq",
  response: "I reply within 24 hours, Monday to Saturday.",
  intro:
    "I build the systems small businesses run on: a sorted inbox, a month of content, the templates behind the week, and a page that takes the enquiry. Then I write the procedure down so it survives without me.",
  about: [
    "I spent two years on the front line of a convenience store — checkout, stock, and the daily sales record — where a missed entry becomes a wrong order the following week. That is where I learned that a written procedure beats memory.",
    "Now I do the remote version of that work. One inbox, sorted, with a routine someone else could follow. Alongside it, I build the kits and assets a small business reaches for every week — SOPs, onboarding packs, trackers, content calendars, sticker packs, wall art — and the pages that put them to work. Each one an editable file, not a screenshot of somebody else's idea.",
    "Everything on this site is a practice build I made for myself. No client results are claimed and no client data is used.",
    "Criminology graduate, 2024. Based in the Philippines, working GMT+8.",
  ],
  facts: [
    ["Based", "Philippines · GMT+8"],
    ["Capacity", "40 hrs/week"],
    ["Overlap", "4 hours with US and AU"],
    ["Background", "2 years frontline operations"],
    ["Tools", "Gmail · Sheets · Docs · Notion · Next.js · ChatGPT"],
    ["Education", "Criminology, 2024"],
  ],
} as const;

export type ServiceStatus = "available" | "practice";

export type Service = {
  no: string;
  title: string;
  summary: string;
  status: ServiceStatus;
  statusLabel: string;
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
    statusLabel: "Available",
    engagement: "Monthly retainer · 10 hrs/week",
    href: "/work/inbox-zero",
  },
  {
    no: "02",
    title: "Social content",
    summary:
      "Caption packs, carousel sets, short-form video scripts and 30-day calendars — written to a brief and laid out ready to schedule, not a folder of ideas.",
    status: "available",
    statusLabel: "Available",
    engagement: "Per batch · monthly calendar",
    href: "/work/contents",
  },
  {
    no: "03",
    title: "Visual assets",
    summary:
      "Brand identity concept boards, themed sticker packs and printable wall art — exported as PNG, SVG and print-ready PDF, each with a usage guide.",
    status: "available",
    statusLabel: "Available",
    engagement: "Per set",
    href: "/work/visual",
  },
  {
    no: "04",
    title: "Business templates",
    summary:
      "Reusable operating kits for the work that repeats — SOPs, client onboarding, CRM and inventory trackers, project dashboards, sales trackers. Editable files with instructions, not a template shop.",
    status: "available",
    statusLabel: "Available",
    engagement: "Fixed scope",
    href: "/work/templates",
  },
  {
    no: "05",
    title: "Landing pages",
    summary:
      "One page that loads fast, works on a phone, and takes the booking or enquiry — deployed, measured, and handed over with the source.",
    status: "available",
    statusLabel: "Available",
    engagement: "Fixed scope",
  },
  {
    no: "06",
    title: "Funnels",
    summary:
      "The page, a lead magnet, a thank-you step and three follow-up emails, with every step tracked so you know where people stop.",
    status: "practice",
    statusLabel: "Coming soon",
    engagement: "Fixed scope",
  },
];

/**
 * Booking options shown in the "Book a call" dialog.
 *
 * google.appointmentUrl — your Google Calendar *appointment schedule* link.
 *   Google Calendar → Settings → Appointment schedules → New. Set the
 *   conference to Google Meet and this link becomes the zero-friction option:
 *   the client picks a slot, Google attaches the Meet link, and the event saves
 *   to your calendar automatically. Leave it empty and the dialog falls back to
 *   the plain event editor, which still works but adds one click.
 *
 * calendly.url — your Calendly event link (calendly.com → your event → Share).
 */
export const booking = {
  google: {
    label: "Google Meet",
    note: "Pick a slot and the Meet link is added automatically.",
    appointmentUrl: process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL ?? "",
    email: "alvinmoncada.va@gmail.com",
    minutes: 20,
  },
  calendly: {
    label: "Calendly",
    note: "Use my Calendly calendar instead.",
    url: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  },
} as const;

/** Slots offered in Philippine time (GMT+8). */
export const callSlots = ["09:00", "11:00", "14:00", "17:00", "20:00", "22:00"];

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
