import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alvin Moncada — virtual assistant for email, automation and web",
    template: "%s · Alvin Moncada",
  },
  description:
    "Philippines-based virtual assistant. I build the systems small businesses run on: a sorted inbox, an automatic hand-off, and a landing page that takes the enquiry.",
  authors: [{ name: "Alvin Moncada" }],
  keywords: [
    "virtual assistant",
    "email management",
    "inbox zero",
    "n8n automation",
    "Notion consultant",
    "landing page",
    "funnel",
    "Philippines",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alvin Moncada — virtual assistant for email, automation and web",
    description:
      "A sorted inbox, an automatic hand-off, and a landing page that takes the enquiry. Every build shown is a labelled practice project.",
    url: "/",
    siteName: "Alvin Moncada",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Alvin Moncada — your inbox at zero, your follow-up on time.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvin Moncada — virtual assistant for email, automation and web",
    description:
      "A sorted inbox, an automatic hand-off, and a landing page that takes the enquiry.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
