"use client";

import Link from "next/link";
import { useSound } from "@/providers/SoundProvider";
import Reveal from "../Reveal";
import AnimatedTitle from "../AnimatedTitle";

const COL_A = ["#2a1a4d", "#1a2440", "#3a2718", "#2a1a4d", "#1a2440"];
const COL_B = ["#1a2440", "#3a2718", "#2a1a4d", "#1a2440", "#3a2718"];

function Tile({ c }: { c: string }) {
  return (
    <div
      className="aspect-[4/5] w-full rounded-lg"
      style={{
        background: `linear-gradient(145deg, ${c}, #0f0d16)`,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    />
  );
}

export default function AboutTeaser() {
  const { play } = useSound();
  return (
    <section className="section-pad overflow-hidden">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="kicker mb-6">05 — Studio</div>
          <AnimatedTitle
            text="From the coast of Gujarat to brands across the globe."
            className="text-fluid-h2"
            accentWords={["Gujarat", "globe."]}
          />
          <p className="mt-6 max-w-md text-fluid-body text-muted">
            Headquartered in Jamnagar, Gujarat, Neetrick blends engineering
            precision with marketing instinct. We&apos;re small, senior, and
            obsessed with outcomes.
          </p>
          <div className="mt-6 flex items-center gap-3 text-muted">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
            Jamnagar, Gujarat, India
          </div>
          <Link
            href="/about"
            data-cursor="link"
            onClick={() => play("click")}
            className="mt-8 inline-block text-accent transition-transform hover:translate-x-1"
          >
            About us →
          </Link>
        </Reveal>

        {/* Two columns scrolling in opposite directions, infinitely */}
        <div className="grid h-[70vh] grid-cols-2 gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <div className="vcol vcol-up">
            {[...COL_A, ...COL_A].map((c, i) => (
              <Tile key={i} c={c} />
            ))}
          </div>
          <div className="vcol vcol-down">
            {[...COL_B, ...COL_B].map((c, i) => (
              <Tile key={i} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
