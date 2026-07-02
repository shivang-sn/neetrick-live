"use client";

import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const { play } = useSound();
  const n = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % n), 4200);
    return () => clearInterval(t);
  }, [n]);

  const go = (i: number) => {
    play("enter", 150);
    setActive(((i % n) + n) % n);
  };

  return (
    <section className="section-pad bg-surface overflow-hidden">
      <div className="kicker mb-12">06 — What our clients say</div>

      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
        {/* Left: reviewer list, active centered & highlighted */}
        <ul className="flex flex-col gap-2">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.name}>
              <button
                data-cursor="link"
                onClick={() => go(i)}
                className="group flex w-full items-center gap-4 py-2 text-left transition-all"
                style={{
                  opacity: active === i ? 1 : 0.35,
                  transform: active === i ? "translateX(10px)" : "none",
                }}
              >
                {active === i && (
                  <span className="h-px w-8 shrink-0 bg-accent" />
                )}
                <span
                  className="display text-xl md:text-2xl"
                  style={{ color: active === i ? "var(--accent)" : undefined }}
                >
                  {t.name}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Right: active review, vertically centered, crossfading */}
        <div className="relative flex h-[46vh] min-h-[320px] items-center">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={t.name}
              className="absolute inset-0 flex flex-col justify-center transition-all duration-700"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(24px)",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <span className="display text-5xl leading-none text-accent">
                &ldquo;
              </span>
              <p className="display mt-2 max-w-3xl text-[clamp(1.5rem,3.2vw,2.75rem)] leading-tight">
                {t.quote}
              </p>
              <footer className="mt-6 kicker">
                {t.name} — {t.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
