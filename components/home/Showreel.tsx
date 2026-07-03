"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/providers/SoundProvider";
import AnimatedTitle from "../AnimatedTitle";

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Play/pause based on viewport visibility (saves CPU).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  // Subtle parallax/scale on scroll.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = (center - window.innerHeight / 2) / window.innerHeight;
        const scale = 1 - Math.min(Math.abs(dist), 0.5) * 0.12;
        el.style.transform = `translateY(${dist * -24}px) scale(${scale})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    play("click");
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    play("click");
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onTime = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    v.currentTime = frac * v.duration;
  };

  return (
    <section ref={sectionRef} className="section-pad">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="kicker mb-4">Showreel</div>
          <AnimatedTitle text="See us in motion." className="text-fluid-h2" accentWords={["motion."]} />
        </div>
        <p className="max-w-sm text-fluid-body text-muted">
          A glimpse of the brands, products, and campaigns we&apos;ve shipped.
        </p>
      </div>

      <div
        ref={frameRef}
        className="group relative overflow-hidden rounded-2xl border border-line bg-surface will-change-transform"
        style={{ transition: "transform 0.1s linear" }}
      >
        <video
          ref={videoRef}
          className="aspect-video w-full cursor-none object-cover"
          src="/video/hero.mp4"
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={onTime}
          onClick={togglePlay}
          data-cursor="view"
          data-cursor-label={playing ? "Pause" : "Play"}
        />

        {/* Center play/pause button (visible when paused or on hover) */}
        <button
          onClick={togglePlay}
          data-cursor="link"
          aria-label={playing ? "Pause" : "Play"}
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white transition-opacity duration-300"
          style={{ opacity: playing ? 0 : 1 }}
        >
          {playing ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Controls bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
          <button
            onClick={togglePlay}
            data-cursor="link"
            aria-label={playing ? "Pause" : "Play"}
            className="text-white"
          >
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Scrubber */}
          <div
            onClick={seek}
            data-cursor="link"
            className="group/bar relative h-2 flex-1 cursor-pointer rounded-full bg-white/25"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={toggleMute}
            data-cursor="link"
            aria-label={muted ? "Unmute" : "Mute"}
            className="text-white"
          >
            {muted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 9v6h4l5 5V4L8 9H4z" />
                <path d="M16 9l4 6M20 9l-4 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 9v6h4l5 5V4L8 9H4z" />
                <path d="M16 8a5 5 0 0 1 0 8" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
