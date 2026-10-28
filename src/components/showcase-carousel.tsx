"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ShowcaseCollection } from "@/content/showcase";

const GAP = 18;
const ADVANCE_MS = 4200;
const HOLD_MS = 9000;

export function ShowcaseCarousel({ collection }: { collection: ShowcaseCollection }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const holdUntil = useRef(0);

  const { items } = collection;

  const cardStep = useCallback(() => {
    const row = rowRef.current;
    if (!row) return 1;
    const card = row.querySelector<HTMLElement>(".shot-card");
    return card ? card.offsetWidth + GAP : row.clientWidth * 0.8;
  }, []);

  const sync = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    const ratio = max > 4 ? row.scrollLeft / max : 0;
    setProgress(Math.min(1, Math.max(0, ratio)));
    setAtStart(row.scrollLeft <= 4);
    setAtEnd(row.scrollLeft >= max - 4);
    const step = cardStep();
    setIndex(Math.min(items.length - 1, Math.max(0, Math.round(row.scrollLeft / step))));
  }, [cardStep, items.length]);

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

  // only auto-advance while the row is actually on screen
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const row = rowRef.current;
      if (!row) return;
      row.scrollBy({ left: cardStep() * dir, behavior: "smooth" });
    },
    [cardStep],
  );

  // auto slideshow: advances only while visible, unpaused, and not recently
  // touched by the visitor
  useEffect(() => {
    if (!playing || !inView || open !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (Date.now() < holdUntil.current) return;
      const row = rowRef.current;
      if (!row) return;
      const max = row.scrollWidth - row.clientWidth;
      if (row.scrollLeft >= max - 4) {
        row.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        step(1);
      }
    }, ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [playing, inView, open, step]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setPlaying(false);
    };
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

  const current = open === null ? null : items[open];

  return (
    <div className="carousel">
      <div
        className="carousel-row"
        ref={rowRef}
        onPointerDown={hold}
        onTouchStart={hold}
        onWheel={hold}
        onKeyDown={hold}
      >
        {items.map((item, i) => (
          <figure className="shot-card" key={item.src}>
            <button
              type="button"
              className="shot-frame"
              onClick={() => setOpen(i)}
              aria-label={`Open ${item.label} full size`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading={i < 3 ? "eager" : "lazy"}
                sizes="(max-width: 600px) 78vw, (max-width: 900px) 50vw, 440px"
              />
            </button>
            <figcaption className="shot-cap">
              <span>{item.label}</span>
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="carousel-nav">
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous images"
        >
          ←
        </button>
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next images"
        >
          →
        </button>
        <button
          type="button"
          className="carousel-btn carousel-play"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause the slideshow" : "Play the slideshow"}
          aria-pressed={!playing}
        >
          {playing ? "❙❙" : "▶"}
        </button>
        <span className="carousel-count" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="carousel-progress" role="presentation">
          <i style={{ width: `${Math.max(6, progress * 100)}%` }} />
        </div>
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          onClick={() => setOpen(null)}
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

          <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
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
