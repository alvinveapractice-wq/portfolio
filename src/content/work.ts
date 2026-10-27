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
  video?: { src: string; poster: string; length: string; title: string };
  files?: { label: string; href: string; note: string }[];
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  honesty: string;
};

export const work: Work[] = [
  {
    slug: "inbox-zero",
    number: "01",
    kicker: "Email operations",
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
];

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}
