"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSound } from "@/providers/SoundProvider";
import AnimatedTitle from "./AnimatedTitle";

const FAQS = [
  {
    q: "How do you engage with clients?",
    a: "Three ways — a monthly retainer for ongoing brand, product, and growth work; a fixed-scope project with clear milestones; or a focused sprint to ship one thing fast. We'll recommend the right fit on our first call.",
  },
  {
    q: "What's a typical timeline?",
    a: "Most projects kick off within two weeks of sign-off. A brand or website usually ships in 4–8 weeks; growth and marketing engagements are ongoing with results compounding over the first quarter.",
  },
  {
    q: "How is pricing structured?",
    a: "Project work is quoted as a fixed price after a short discovery. Retainers are a flat monthly fee based on scope. No hidden costs — you approve the number before we start.",
  },
  {
    q: "What does your process look like?",
    a: "Discover → Strategy → Build → Grow. We dig into your business, map a sharp plan, design and engineer the work, then optimise and report so launches turn into real growth.",
  },
  {
    q: "Where are you based?",
    a: "We're headquartered in Jamnagar, Gujarat, and work with clients across India and beyond. Everything runs remotely-first, so location is never a blocker.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. After launch we offer maintenance, iteration, and growth retainers — from bug fixes and hosting to continuous marketing and new features.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { play } = useSound();

  const toggle = (i: number) => {
    play("click");
    setOpen((cur) => (cur === i ? null : i));
  };

  return (
    <section className="section-pad">
      <div className="kicker mb-4">FAQ</div>
      <AnimatedTitle
        text="Questions, answered."
        className="text-fluid-h2 mb-12"
        accentWords={["answered."]}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border transition-colors"
              style={{
                borderColor: isOpen ? "var(--accent)" : "var(--border)",
                background: isOpen ? "var(--surface-2)" : "transparent",
              }}
            >
              <button
                onClick={() => toggle(i)}
                data-cursor="link"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span
                  className="display text-lg transition-colors md:text-2xl"
                  style={{ color: isOpen ? "var(--accent)" : "var(--text)" }}
                >
                  {item.q}
                </span>
                <span
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    borderColor: isOpen ? "var(--accent)" : "var(--border)",
                    color: isOpen ? "var(--accent)" : "var(--text)",
                  }}
                >
                  {/* animated +/- */}
                  <span className="absolute h-[2px] w-3.5 rounded bg-current" />
                  <span
                    className="absolute h-[2px] w-3.5 rounded bg-current transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.2, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 pr-12 text-fluid-body text-muted">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
