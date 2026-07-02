"use client";

import { useEffect, useRef } from "react";

// Large heading with a word-by-word clip-reveal on scroll-in.
// Uses IntersectionObserver + CSS transitions (no rAF) so it animates reliably.
export default function AnimatedTitle({
  text,
  className = "",
  accentWords = [],
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  accentWords?: string[];
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          words.forEach((w, i) => {
            w.style.transitionDelay = `${i * 0.06}s`;
            w.style.transform = "translateY(0)";
            w.style.opacity = "1";
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clean = (w: string) => w.replace(/[.,]/g, "").toLowerCase();

  return (
    <Tag
      ref={ref}
      className={`display ${className}`}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{ overflow: "hidden", display: "inline-flex", paddingBottom: "0.08em" }}
        >
          <span
            data-word
            style={{
              display: "inline-block",
              transform: "translateY(110%)",
              opacity: 0,
              transition:
                "transform 0.8s cubic-bezier(0.2,1,0.3,1), opacity 0.8s ease",
              marginRight: "0.25em",
              color: accentWords.map(clean).includes(clean(word))
                ? "var(--accent)"
                : undefined,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
