"use client";

import { useEffect, useRef, useState } from "react";

export type ProofIconKind = "inbox" | "routine" | "kits" | "reply";

/**
 * Icons for the four proof numbers. Each one plays its meaning once when
 * the strip first scrolls into view, and once more on hover — a mail
 * dropping into an inbox, a clock sweeping, a deck of files fanning out,
 * a reply bubble pulsing. Never a loop: the animation runs, it ends.
 */

function InboxArt() {
  return (
    <g className="pi-a">
      {/* the message, waiting to be filed */}
      <g className="env">
        <rect x="16" y="1" width="17" height="12" rx="1.5" />
        <path d="M16 2.5 24.5 9 33 2.5" />
      </g>

      {/* the tray */}
      <path d="M6 22v14a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V22" />
      <path d="M6 22h9l3.5 5h11L33 22h9" />

      {/* zero */}
      <path className="chk" d="M17 32.5l5 5 9-11" />
    </g>
  );
}

function RoutineArt() {
  return (
    <g className="pi-b">
      {/* the written procedure */}
      <path d="M25 6h10l6 6v28a2 2 0 0 1-2 2H25a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M35 6v6h6" />
      <path className="ln l1" d="M28 22h8" />
      <path className="ln l2" d="M28 29h6" />
      <path className="ln l3" d="M28 36h9" />

      {/* the fifteen minutes */}
      <circle cx="11" cy="33" r="10" />
      <path className="hand" d="M11 33v-5" />
      <path className="hand2" d="M11 33l4 2" />
    </g>
  );
}

function KitsArt() {
  return (
    <g className="pi-c">
      <g className="s1">
        <rect x="5" y="16" width="21" height="26" rx="2" />
        <path d="M9 22h9" />
      </g>
      <g className="s2">
        <rect x="14" y="12" width="21" height="26" rx="2" />
        <path d="M18 18h9" />
      </g>
      <g className="s3">
        <rect x="23" y="8" width="21" height="26" rx="2" />
        <path d="M27 14h9" />
      </g>
    </g>
  );
}

function ReplyArt() {
  return (
    <g className="pi-d">
      <path className="bub" d="M7 7h34a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H19l-10 7v-7H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3Z" />
      <circle cx="24" cy="18" r="8.5" />
      <path className="hand" d="M24 18v-5" />
      <path className="hand2" d="M24 18l3.5 2" />
    </g>
  );
}

const ART: Record<ProofIconKind, () => React.ReactElement> = {
  inbox: InboxArt,
  routine: RoutineArt,
  kits: KitsArt,
  reply: ReplyArt,
};

export function ProofIcon({ kind, size = 38 }: { kind: ProofIconKind; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [seen, setSeen] = useState(false);

  // Play once, the first time the icon comes into view. Not on a loop.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Art = ART[kind];

  return (
    <svg
      ref={ref}
      className={`proof-icon pi-${kind}`}
      data-play={seen ? "true" : undefined}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <Art />
    </svg>
  );
}
