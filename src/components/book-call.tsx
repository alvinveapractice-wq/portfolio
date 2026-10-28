"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { booking, callSlots } from "@/content/site";

const TZ = "Asia/Manila";

const pad = (n: number) => String(n).padStart(2, "0");

function ymd(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

/** Build a Google Calendar "new event" URL for the chosen slot. */
function googleEventUrl(date: string, time: string) {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const start = new Date(y, mo - 1, d, h, mi, 0);
  const end = new Date(start.getTime() + booking.google.minutes * 60000);

  const stamp = (dt: Date) =>
    `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;

  const details = [
    "A 20-minute scoping call. Bring one thing that is broken or repeating, and I will answer with what I would do first.",
    "",
    "Timezone: Philippine time (GMT+8).",
  ].join("\n");

  const params = new URLSearchParams({
    text: "Call with Alvin Moncada — virtual assistant",
    dates: `${stamp(start)}/${stamp(end)}`,
    ctz: TZ,
    details,
    location: "Google Meet",
    add: booking.google.email,
  });

  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
}

/** Calendly honours ?month=YYYY-MM&date=YYYY-MM-DD to preselect a slot. */
function calendlyUrl(url: string, date: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("month", date.slice(0, 7));
    parsed.searchParams.set("date", date);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function BookCall({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(callSlots[0]);
  // Resolved when the dialog opens, not during render: `new Date()` in the
  // render path is an unstable value for the static renderer.
  const [bounds, setBounds] = useState({ min: "", max: "" });
  // The dialog is portalled to <body>. Any ancestor with a filter,
  // backdrop-filter or transform becomes the containing block for
  // position: fixed, which would trap the panel inside the header.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  // If an appointment schedule is configured, Google handles slot picking and
  // attaches the Meet link itself. Otherwise fall back to the event editor.
  const googleHref = booking.google.appointmentUrl
    ? booking.google.appointmentUrl
    : date
      ? googleEventUrl(date, time)
      : "";
  const calendlyHref = date ? calendlyUrl(booking.calendly.url, date) : "";

  const chosen = date
    ? new Date(`${date}T${time}:00`).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "";

  const start = () => {
    const today = new Date();
    setBounds({ min: ymd(addDays(today, 1)), max: ymd(addDays(today, 31)) });
    setOpen(true);
  };

  // If a real booking page is configured, the button goes straight there.
  // One click to a calendar beats composing an email, and it removes the
  // dialog entirely from the path.
  const direct = booking.google.appointmentUrl || booking.calendly.url || "";

  if (direct) {
    return (
      <a className={className} href={direct} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <>
      <button type="button" className={className} onClick={start}>
        {children}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Book a call"
            onClick={(event) => {
              // only a click on the backdrop itself closes the dialog
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div className="modal-panel">
              <div className="modal-head">
                <div>
                  <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                    Book a call
                  </p>
                  <h3>Pick a slot. I&apos;ll confirm.</h3>
                </div>
                <button
                  type="button"
                  className="carousel-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close booking dialog"
                >
                  ✕
                </button>
              </div>

              <label className="field">
                <span>Date</span>
                <input
                  type="date"
                  value={date}
                  min={bounds.min}
                  max={bounds.max}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <div className="field">
                <span>Time — Philippine time (GMT+8)</span>
                <div className="slot-grid">
                  {callSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      className="slot"
                      data-on={slot === time}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {chosen && (
                <p className="modal-summary">
                  {chosen} · {time} · {booking.google.minutes} minutes
                </p>
              )}

              <div className="modal-actions">
                <a
                  className="btn btn-primary"
                  href={googleHref || undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!date}
                  onClick={(e) => {
                    if (!date) e.preventDefault();
                  }}
                >
                  {booking.google.label} <span className="arrow">→</span>
                </a>

                {calendlyHref ? (
                  <a
                    className="btn btn-ghost"
                    href={calendlyHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {booking.calendly.label} <span className="arrow">→</span>
                  </a>
                ) : (
                  <span className="modal-note">
                    {booking.calendly.label} link not set yet — use the Google option above.
                  </span>
                )}
              </div>

              <p className="modal-foot">
                {booking.google.appointmentUrl
                  ? "Google Calendar creates the Meet link and saves the event to my calendar."
                  : "Opens Google Calendar with the slot filled in. Add “Google Meet” as the video conference before saving."}{" "}
                Evening slots land in US morning hours.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
