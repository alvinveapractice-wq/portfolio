import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Alvin Moncada, home">
          <strong>Alvin Moncada</strong>
          <span>Virtual assistant</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nl">
              {item.label}
            </Link>
          ))}
          <a className="nav-cta" href={`mailto:${site.email}`}>
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
