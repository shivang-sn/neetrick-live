"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/providers/SoundProvider";

export default function HeroScrollBadge() {
  const ref = useRef<HTMLButtonElement>(null);
  const { play } = useSound();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const scrollNext = () => {
    play("click");
    const hero = ref.current?.closest("section");
    const top = hero
      ? hero.offsetTop + hero.offsetHeight
      : window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const spin = reduced ? "" : "animate-[spin_14s_linear_infinite]";
  const spinDot = reduced ? "" : "animate-[spin_9s_linear_infinite]";

  return (
    <button
      ref={ref}
      onClick={scrollNext}
      data-cursor="link"
      aria-label="Scroll to next section"
      className="relative grid h-32 w-32 place-items-center text-text transition-transform hover:scale-105"
    >
      {/* Rotating circular text */}
      <svg viewBox="0 0 100 100" className={`h-full w-full ${spin}`}>
        <defs>
          <path
            id="hero-badge-path"
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill="currentColor"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "8.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#hero-badge-path">
            Scroll down • Smarter tricks •
          </textPath>
        </text>
      </svg>

      {/* Orbiting accent dot */}
      <span className={`absolute inset-0 ${spinDot}`}>
        <span className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
      </span>

      {/* Center arrow */}
      <span
        className={`absolute grid h-9 w-9 place-items-center rounded-full bg-accent text-white ${
          reduced ? "" : "animate-bounce"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </span>
    </button>
  );
}
