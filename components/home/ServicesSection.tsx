"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { play } = useSound();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
            play("enter", 500);
          }
        });
      },
      { threshold: 0.6 }
    );
    panelRefs.current.forEach((p) => p && obs.observe(p));
    return () => obs.disconnect();
  }, [play]);

  return (
    <section className="section-pad">
      <div className="kicker mb-12">02 — What we do</div>
      <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
        {/* Sticky list */}
        <div className="hidden md:block">
          <div className="sticky top-32">
            <ul className="space-y-3">
              {SERVICES.map((s, i) => (
                <li
                  key={s.slug}
                  className="flex items-baseline gap-4 transition-all duration-300"
                  style={{
                    opacity: active === i ? 1 : 0.3,
                    transform: active === i ? "translateX(12px)" : "none",
                  }}
                >
                  <span className="kicker">{s.no}</span>
                  <span
                    className="display text-2xl transition-colors"
                    style={{ color: active === i ? "var(--accent)" : undefined }}
                  >
                    {s.title}
                  </span>
                  {active === i && (
                    <span className="h-px flex-1 bg-accent" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Panels */}
        <div>
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              data-idx={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] flex-col justify-center border-b border-white/10"
            >
              <div className="kicker mb-4 md:hidden">{s.no}</div>
              <h3 className="display text-fluid-h2">{s.title}</h3>
              <p className="mt-4 max-w-md text-fluid-body text-muted">
                {s.promise}
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-muted"
                  >
                    {d}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${s.slug}`}
                data-cursor="link"
                onClick={() => play("click")}
                className="mt-8 inline-flex w-max items-center gap-2 text-accent transition-transform hover:translate-x-1"
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
