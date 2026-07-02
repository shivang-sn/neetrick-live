"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { WORK } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";
import Reveal from "../Reveal";
import AnimatedTitle from "../AnimatedTitle";

export default function WorkSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  const onMove = (e: React.MouseEvent) => {
    if (previewRef.current) {
      previewRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) rotate(-4deg)`;
    }
  };

  return (
    <section className="section-pad relative" onMouseMove={onMove}>
      <div className="mb-12 flex items-end justify-between">
        <div>
          <div className="kicker mb-4">03 — Selected work</div>
          <AnimatedTitle
            text="Recent projects"
            className="text-fluid-h2"
          />
        </div>
        <Link
          href="/work"
          data-cursor="link"
          onClick={() => play("click")}
          className="hidden text-accent transition-transform hover:translate-x-1 md:block"
        >
          View all work →
        </Link>
      </div>

      <div>
        {WORK.map((w, i) => (
          <Reveal key={w.slug} delay={i * 0.05}>
            <Link
              href={`/work/${w.slug}`}
              data-cursor="view"
              data-cursor-label="View"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => play("click")}
              className="group flex items-center justify-between gap-6 border-t border-white/10 py-8 last:border-b"
            >
              <div className="flex items-baseline gap-6">
                <span className="kicker">{w.year}</span>
                <h3
                  className="display text-[clamp(1.75rem,6vw,4.5rem)] transition-all duration-300 group-hover:translate-x-3"
                  style={{ color: hovered === i ? "var(--accent)" : undefined }}
                >
                  {w.name}
                </h3>
              </div>
              <div className="hidden gap-2 md:flex">
                {w.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Floating looping-video preview that follows the cursor */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-80 overflow-hidden rounded-lg md:block"
        style={{
          opacity: hovered !== null ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {WORK.map((w, i) => (
          <video
            key={w.slug}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: hovered === i ? 1 : 0, background: w.color }}
            src={w.video}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          />
        ))}
      </div>
    </section>
  );
}
