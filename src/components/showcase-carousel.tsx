"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ShowcaseCollection, ShowcaseItem } from "@/content/showcase";

const GAP = 18;
const DRIFT_SPEED = 0.045; // px per millisecond — about 45px a second
const HOLD_MS = 5000;

export function ShowcaseCarousel({ collection }: { collection: ShowcaseCollection }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const holdUntil = useRef(0);

  const { items } = collection;
  const playing = !userPaused && !hidden;

  /** Exact distance from the first card to its duplicate — used for a seamless loop. */
  const wrapAt = useCallback(() => {
    const row = rowRef.current;
    if (!row) return 0;
    const first = row.querySelector<HTMLElement>('.shot-card:not([data-dup="true"])');
    const dup = row.querySelector<HTMLElement>('.shot-card[data-dup="true"]');
    if (!first || !dup) return 0;
    return dup.offsetLeft - first.offsetLeft;
  }, []);

  const cardStep = useCallback(() => {
    const row = rowRef.current;
    if (!row) return 1;
    const card = row.querySelector<HTMLElement>('.shot-card:not([data-dup="true"])');
    return card ? card.offsetWidth + GAP : row.clientWidth * 0.8;
  }, []);

  /** Position inside the first set, so the counter and progress stay 1..N. */
  const position = useCallback(() => {
    const row = rowRef.current;
    if (!row) return { pos: 0, wrap: 0 };
    const wrap = wrapAt();
    if (wrap <= 0) return { pos: row.scrollLeft, wrap: 0 };
    const pos = ((row.scrollLeft % wrap) + wrap) % wrap;
    return { pos, wrap };
  }, [wrapAt]);

  const sync = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const { pos, wrap } = position();
    const step = cardStep();
    const next = Math.min(items.length - 1, Math.max(0, Math.round(pos / step)));
    setIndex((prev) => (prev === next ? prev : next));
    if (barRef.current) {
      const ratio = wrap > 0 ? Math.min(1, pos / wrap) : 0;
      barRef.current.style.width = `${Math.max(4, ratio * 100)}%`;
    }
  }, [cardStep, position, items.length]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    sync();
    row.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      row.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // only drift while the row is actually on screen
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const row = rowRef.current;
      if (!row) return;
      const amount = cardStep() * dir;
      const wrap = wrapAt();
      let target = row.scrollLeft + amount;
      // stay inside the first set, looping at either end
      if (target < 0) target += wrap || 0;
      if (wrap > 0 && target > wrap) target -= wrap;
      row.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    },
    [cardStep, wrapAt],
  );

  // the slow sideways glide
  useEffect(() => {
    if (!playing || !inView || open !== null || hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (Date.now() >= holdUntil.current) {
        const row = rowRef.current;
        const wrap = wrapAt();
        if (row && wrap > 0) {
          let next = row.scrollLeft + DRIFT_SPEED * dt;
          if (next >= wrap) next -= wrap;
          if (next < 0) next += wrap;
          row.scrollLeft = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView, open, hovered, wrapAt]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // lightbox keyboard handling
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % items.length));
      if (event.key === "ArrowLeft")
        setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, items.length]);

  const hold = () => {
    holdUntil.current = Date.now() + HOLD_MS;
  };

  // A vertical wheel over the row is page scrolling, not a swipe. Only a
  // deliberate horizontal gesture should take over from the glide.
  const holdOnHorizontalWheel = (event: React.WheelEvent) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) hold();
  };

  const current = open === null ? null : items[open];

  const card = (item: ShowcaseItem, i: number, dup: boolean) => (
    <figure className="shot-card" key={dup ? `${item.src}-dup` : item.src} data-dup={dup ? "true" : undefined}>
      <button
        type="button"
        className="shot-frame"
        onClick={() => setOpen(i % items.length)}
        aria-hidden={dup ? "true" : undefined}
        tabIndex={dup ? -1 : undefined}
        aria-label={dup ? undefined : `Open ${item.label} full size`}
      >
        <Image
          src={item.src}
          alt={dup ? "" : item.alt}
          fill
          loading={i < 3 ? "eager" : "lazy"}
          sizes="(max-width: 600px) 78vw, (max-width: 900px) 50vw, 440px"
        />
      </button>
      <figcaption className="shot-cap">
        <span>{item.label}</span>
        {item.caption}
      </figcaption>
      {!dup && (
        <a
          className="shot-dl"
          href={item.download ?? item.src}
          download
          aria-label={`Download ${item.label}`}
        >
          ↓ {item.downloadKind === "image" ? "Image" : "File"}
        </a>
      )}
    </figure>
  );

  return (
    <div className="carousel">
      <div
        className="carousel-row"
        ref={rowRef}
        onPointerDown={hold}
        onTouchStart={hold}
        onWheel={holdOnHorizontalWheel}
        onKeyDown={hold}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {items.map((item, i) => card(item, i, false))}
        {items.map((item, i) => card(item, i, true))}
      </div>

      <div className="carousel-nav">
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(-1)}
          aria-label="Previous images"
        >
          ←
        </button>
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(1)}
          aria-label="Next images"
        >
          →
        </button>
        <button
          type="button"
          className="carousel-btn carousel-play"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={playing ? "Pause the slideshow" : "Play the slideshow"}
          aria-pressed={!playing}
          title={playing ? "Pause the glide" : "Resume the glide"}
        >
          {playing ? "❙❙" : "▶"}
        </button>
        <span className="carousel-count" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="carousel-progress" role="presentation">
          <i ref={barRef} style={{ width: "4%" }} />
        </div>
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          onClick={(event) => {
            // only a click on the backdrop itself closes the dialog. The
            // previous/next buttons live inside the backdrop, so without this
            // check their click bubbled up and shut the lightbox down.
            if (event.target === event.currentTarget) setOpen(null);
          }}
        >
          <div className="lightbox-head">
            <p>
              {collection.title} · {current.label}
            </p>
            <button
              type="button"
              className="carousel-btn"
              onClick={() => setOpen(null)}
              aria-label="Close full size view"
            >
              ✕
            </button>
          </div>

          <div
            className="lightbox-body"
            onClick={(event) => {
              // the empty space around the image closes the dialog; the image
              // itself does not
              if (event.target === event.currentTarget) setOpen(null);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.alt} />
          </div>

          <div className="lightbox-foot">
            <p style={{ margin: "0 0 0.8rem" }}>{current.caption}</p>
            <div className="carousel-nav" style={{ justifyContent: "center", marginTop: 0 }}>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length))}
                aria-label="Previous image"
              >
                ←
              </button>
              <span className="carousel-count">
                {(open ?? 0) + 1} / {items.length}
              </span>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setOpen((i) => (i === null ? null : (i + 1) % items.length))}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
