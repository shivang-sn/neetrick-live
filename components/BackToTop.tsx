"use client";

import { useEffect, useState } from "react";
import { useSound } from "@/providers/SoundProvider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        play("click");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      data-cursor="link"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg/80 text-text shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent hover:text-accent md:bottom-8 md:right-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
