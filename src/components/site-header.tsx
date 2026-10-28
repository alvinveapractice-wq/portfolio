"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/#top", label: "Home", id: "top" },
  { href: "/#build", label: "Build", id: "build" },
  { href: "/#showcase", label: "Library", id: "showcase" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#about", label: "About", id: "about" },
];

export function SiteHeader() {
  const [active, setActive] = useState<string | null>("top");

  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
      // walk the sections in document order, not nav order — otherwise the
      // last entry in the nav array always wins
      const sections = nav
        .map((item) => {
          const el = document.getElementById(item.id);
          return el ? { id: item.id, top: el.getBoundingClientRect().top + window.scrollY } : null;
        })
        .filter((s): s is { id: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top);

      for (const section of sections) {
        if (section.top <= line) current = section.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Alvin Moncada, home">
          <strong>Alvin Moncada</strong>
          <span>Virtual assistant</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nl"
              data-active={active === item.id}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
