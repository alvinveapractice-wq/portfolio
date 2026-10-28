"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function clock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * A deliberately small player: poster thumbnail, a translucent play button,
 * and a custom control bar.
 *
 * The native controls are not used. Chrome renders its own centred play
 * button over a poster (which would sit under ours) and its overflow menu
 * carries a download entry. Drawing the controls ourselves removes the
 * download affordance instead of merely hiding it.
 */
export function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showBar, setShowBar] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => undefined);
    setStarted(true);
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setStarted(true);
    } else {
      video.pause();
    }
  }, []);

  const seekTo = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrent(value);
  }, []);

  const fullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
    else video.requestFullscreen().catch(() => undefined);
  }, []);

  // space / arrows, but never while a form control has focus
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName)) return;
      const video = videoRef.current;
      if (!video) return;
      if (event.key === " " || event.key === "k") {
        event.preventDefault();
        toggle();
      }
      if (event.key === "ArrowRight") seekTo(Math.min(duration, video.currentTime + 5));
      if (event.key === "ArrowLeft") seekTo(Math.max(0, video.currentTime - 5));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, seekTo, duration]);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className="video-player"
      onMouseEnter={() => setShowBar(true)}
      onMouseLeave={() => setShowBar(false)}
      onContextMenu={(event) => event.preventDefault()}
    >
      <video
        ref={videoRef}
        poster={poster}
        preload="none"
        playsInline
        draggable={false}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setStarted(false);
          setCurrent(0);
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser cannot play this video. The same steps are written up in the case study.
      </video>

      {!started && (
        <button
          type="button"
          className="video-play"
          onClick={play}
          aria-label={`Play the ${title}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.72-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
          </svg>
        </button>
      )}

      {started && (
        <div className="video-controls" data-visible={showBar}>
          <button
            type="button"
            className="video-ctl"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.72-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
              </svg>
            )}
          </button>

          <input
            type="range"
            className="video-scrub"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(event) => seekTo(Number(event.target.value))}
            style={{ ["--pct" as string]: `${pct}%` }}
            aria-label="Seek"
          />

          <span className="video-time">
            {clock(current)} / {clock(duration)}
          </span>

          <button
            type="button"
            className="video-ctl"
            onClick={fullscreen}
            aria-label="Full screen"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
