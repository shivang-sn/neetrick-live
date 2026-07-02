"use client";

import { useEffect, useRef } from "react";
import { useSound } from "@/providers/SoundProvider";

// Scroll-reveal wrapper: fades + lifts children into view, plays a soft cue.
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  sound = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  sound?: boolean;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const { play } = useSound();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity 0.9s cubic-bezier(0.2,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.2,1,0.3,1) ${delay}s`;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            if (sound) play("enter", 600);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, y, sound, play]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
