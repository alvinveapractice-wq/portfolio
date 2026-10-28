"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * The nav order matches the order the sections actually appear on the page:
 * hero, services, about, build, library, process, contact. The scroll-spy
 * walks these in document order, so the two lists must not drift apart.
 */
const nav = [
  { href: "/#top", label: "Home", id: "top" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#build", label: "Build", id: "build" },
  { href: "/#showcase", label: "Library", id: "showcase" },
  { href: "/#process", label: "How I work", id: "process" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function SiteHeader() {
  const [active, setActive] = useState<string | null>("top");

  // A refresh should land at the top of the page, not wherever the browser
  // last left the scroll position — and the anchor should not stick around
  // in the address bar either.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      // honour the incoming deep link once, then clean the URL
      history.replaceState(null, "", location.pathname + location.search);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
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

  // Clicking a nav item scrolls in place and leaves the address bar clean,
  // so a refresh always starts at the top instead of jumping back to the
  // last section you visited.
  const onNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const el = document.getElementById(id);
    if (!el) return; // not on this page — let the link navigate normally
    event.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", location.pathname + location.search);
    setActive(id);
  };

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
              onClick={(event) => onNavClick(event, item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
