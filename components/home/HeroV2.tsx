"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";
import Marquee from "../Marquee";
import Magnetic from "../Magnetic";
import HeroScrollBadge from "./HeroScrollBadge";
import HeroGhostField from "./HeroGhostField";

export default function HeroV2() {
  const { play } = useSound();
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Kinetic mouse-parallax on the headline.
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${
        x * 5
      }deg) translateZ(0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-0 pt-32">
      {/* Giant drifting ghost typography + liquid cursor blob (Option 3) */}
      <div className="absolute inset-0 z-0">
        <HeroGhostField />
      </div>

      {/* Accent glow */}
      <div className="pointer-events-none absolute right-[-10%] top-[8%] h-[60vh] w-[60vh] rounded-full bg-[color-mix(in_srgb,var(--accent)_25%,transparent)] blur-[130px]" />

      {/* Clickable scroll badge */}
      <div className="absolute right-[6%] top-[14%] z-10 hidden md:block">
        <HeroScrollBadge />
      </div>

      <div className="container-x relative z-10">
        <div className="kicker mb-8 flex gap-6">
          <span>Est. 2026</span>
          <span>-</span>
          <span>{SITE.location}</span>
        </div>

        <h1
          ref={titleRef}
          className="display text-fluid-h1"
          style={{ transition: "transform 0.3s ease-out", transformStyle: "preserve-3d" }}
        >
          <span className="reveal-line glitch-line" data-text="Smart tricks.">
            <span
              style={{
                display: "inline-block",
                animation:
                  "heroReveal 1s cubic-bezier(0.2,1,0.3,1) 0.3s both",
              }}
            >
              Smart tricks.
            </span>
          </span>
          <span className="reveal-line glitch-line" data-text="Better everyday.">
            <span
              style={{
                display: "inline-block",
                animation:
                  "heroReveal 1s cubic-bezier(0.2,1,0.3,1) 0.45s both",
              }}
            >
              Better <span className="text-accent">everyday.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-fluid-body text-muted">
            {SITE.description}
          </p>
          <Magnetic>
            <Link
              href="/contact"
              data-cursor="link"
              onClick={() => play("click")}
              className="rounded-full bg-accent px-7 py-4 font-medium text-white"
            >
              Start a project →
            </Link>
          </Magnetic>
        </div>
      </div>

      <Marquee
        items={[
          "WEB",
          "APPS",
          "BRANDING",
          "SEO",
          "PERFORMANCE MARKETING",
          "CONTENT",
        ]}
        duration={22}
        className="display relative z-10 mt-16 border-y border-line py-5 text-[clamp(1.5rem,4vw,3rem)]"
      />

      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(110%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
