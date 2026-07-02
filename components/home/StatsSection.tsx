"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { play } = useSound();
  const decimals = value % 1 !== 0 ? 1 : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const dur = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(value * eased);
            if (t < 1) requestAnimationFrame(tick);
            else {
              setDisplay(value);
              play("count");
            }
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, play]);

  return (
    <div ref={ref} className="border-t border-[#1c1c20] pt-6">
      <div className="display text-[clamp(3rem,8vw,6rem)] leading-none">
        {display.toFixed(decimals)}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="kicker mt-4">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-pad">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Counter key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
