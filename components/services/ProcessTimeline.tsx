"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline({
  steps,
}: {
  steps: { no: string; title: string; text: string }[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-scrubbed (not a one-shot reveal): each tween's progress is tied
  // directly to scroll position via `scrub`, so scrolling down draws the
  // line/reveals cards and scrolling back up retracts them in lockstep.
  useGSAP(
    () => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 80%",
              end: "bottom 35%",
              scrub: 0.5,
            },
          }
        );
      }

      steps.forEach((_, i) => {
        const card = cardRefs.current[i];
        const badge = badgeRefs.current[i];
        if (!card) return;
        const trigger = {
          trigger: card,
          start: "top 88%",
          end: "top 55%",
          scrub: 0.5,
        };
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "none", scrollTrigger: trigger }
        );
        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0 },
            { opacity: 1, ease: "none", scrollTrigger: trigger }
          );
        }
      });
    },
    { scope: wrapRef, dependencies: [steps] }
  );

  return (
    <div ref={wrapRef} className="relative">
      {/* Connecting line - track + scroll-scrubbed accent draw */}
      <svg
        aria-hidden
        className="absolute left-[27px] w-[2px] overflow-visible max-sm:hidden"
        style={{ top: 28, height: "calc(100% - 56px)" }}
        preserveAspectRatio="none"
      >
        <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" />
        <line
          ref={lineRef}
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke="var(--accent)"
          strokeWidth="2"
          pathLength={100}
          strokeDasharray={100}
        />
      </svg>

      <div className="space-y-6 sm:space-y-8">
        {steps.map((step, i) => (
          <div key={step.no} className="relative flex flex-col gap-4 sm:flex-row sm:gap-6">
            <div className="relative z-10 h-14 w-14 shrink-0">
              {/* base (muted) badge */}
              <div
                className="display absolute inset-0 flex items-center justify-center rounded-full border-2 text-sm"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {step.no}
              </div>
              {/* accent badge, crossfades in as this step scrolls into view */}
              <div
                ref={(el) => {
                  badgeRefs.current[i] = el;
                }}
                className="display absolute inset-0 flex items-center justify-center rounded-full border-2 bg-bg text-sm opacity-0"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                {step.no}
              </div>
            </div>

            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="flex-1"
            >
              <div className="group h-full rounded-2xl border border-line bg-surface-2 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_-25px_rgba(116,59,251,0.5)] sm:p-8">
                <h3 className="display text-xl transition-colors duration-300 group-hover:text-accent">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
