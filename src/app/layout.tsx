import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/content/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alvin Moncada — virtual assistant for inbox management and AI-assisted operations",
    template: "%s · Alvin Moncada",
  },
  description:
    "Philippines-based virtual assistant. A sorted inbox with a written routine, and pre-built business templates, content packs and design assets you can open and edit. 40 hrs/week, GMT+8.",
  authors: [{ name: "Alvin Moncada" }],
  keywords: [
    "virtual assistant",
    "inbox management",
    "email management",
    "inbox zero",
    "AI business templates",
    "Notion consultant",
    "content calendar",
    "digital sticker pack",
    "Philippines",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alvin Moncada — virtual assistant for inbox management and AI-assisted operations",
    description:
      "A sorted inbox, and the templates, content and design work that keeps the week moving. Every build shown is a labelled practice project.",
    url: "/",
    siteName: "Alvin Moncada",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Alvin Moncada — your inbox at zero, your week pre-built.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvin Moncada — virtual assistant for inbox management and AI-assisted operations",
    description:
      "A sorted inbox, and the templates, content and design work that keeps the week moving. 26 files you can open.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
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
