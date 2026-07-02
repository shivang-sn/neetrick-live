"use client";

import { useEffect, useRef } from "react";

const TEXT =
  "We're Neetrick — equal parts engineers and marketers. We design the brand, build the product, and run the growth, so you get one partner instead of five vendors.";
const HIGHLIGHT = ["engineers", "marketers.", "brand,", "product,", "growth,"];

export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("span[data-w]");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          words.forEach((w, i) => {
            setTimeout(() => {
              w.style.opacity = "1";
            }, i * 35);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-surface text-text section-pad">
      <div className="kicker mb-10">01 — Who we are</div>
      <p
        ref={ref}
        className="display max-w-5xl text-fluid-h3 leading-[1.2]"
      >
        {TEXT.split(" ").map((word, i) => (
          <span
            key={i}
            data-w
            style={{
              opacity: 0.12,
              transition: "opacity 0.4s ease",
              color: HIGHLIGHT.includes(word) ? "var(--accent)" : undefined,
            }}
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
