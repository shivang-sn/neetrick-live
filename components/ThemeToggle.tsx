"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSound } from "@/providers/SoundProvider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { play } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    play("click");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      data-cursor="link"
      aria-label={
        mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"
      }
      className="relative flex h-8 w-14 items-center rounded-full border border-line px-1 transition-colors hover:border-accent md:h-10 md:w-[68px]"
    >
      {/* sliding knob */}
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] md:h-8 md:w-8 ${
          mounted && !isDark ? "translate-x-6 md:translate-x-7" : "translate-x-0"
        }`}
      >
        {/* icon swaps with theme; render a neutral one until mounted */}
        {mounted && !isDark ? (
          // sun
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="md:h-4 md:w-4">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
        ) : (
          // moon
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="md:h-[15px] md:w-[15px]">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </span>
    </button>
  );
}
