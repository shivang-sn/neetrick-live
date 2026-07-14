"use client";

import Link from "next/link";
import { useSound } from "@/providers/SoundProvider";
import Reveal from "../Reveal";
import AnimatedTitle from "../AnimatedTitle";

// Mission - five independent points, one per tile
const COL_A = [
  { color: "#2a1a4d", text: "Build scalable digital products" },
  { color: "#1a2440", text: "Design brands that convert" },
  { color: "#3a2718", text: "Engineer growth that compounds" },
  { color: "#2a1a4d", text: "Ship fast, without cutting corners" },
  { color: "#1a2440", text: "One partner for brand and code" },
];
// Vision - five independent points, one per tile
const COL_B = [
  { color: "#1a2440", text: "Smart tricks, better everyday" },
  { color: "#3a2718", text: "Outcomes over vanity metrics" },
  { color: "#2a1a4d", text: "Small team, senior craft" },
  { color: "#1a2440", text: "Jamnagar roots, global reach" },
  { color: "#3a2718", text: "Technology and creativity, unified" },
];

function Tile({ color, text }: { color: string; text: string }) {
  return (
    <div
      className="relative flex aspect-[4/5] w-full items-center justify-center rounded-lg"
      style={{
        background: `linear-gradient(145deg, ${color}, #0f0d16)`,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Fixed light text: tiles are always a dark gradient regardless of
          site theme, so this stays legible in both light and dark mode. */}
      <span className="display line-clamp-2 px-3 text-center text-xl leading-tight text-white/90 sm:text-2xl">
        {text}
      </span>
    </div>
  );
}

export default function AboutTeaser() {
  const { play } = useSound();
  return (
    <section className="section-pad overflow-hidden">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="kicker mb-6">05 - Studio</div>
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
          <div className="vcol vcol-up ">
            {[...COL_A, ...COL_A].map((t, i) => (
              <Tile key={i} color={t.color} text={t.text}/>
            ))}
          </div>
          <div className="vcol vcol-down">
            {[...COL_B, ...COL_B].map((t, i) => (
              <Tile key={i} color={t.color} text={t.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
