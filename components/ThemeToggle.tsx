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
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-[68px] items-center rounded-full border border-line px-1 transition-colors hover:border-accent"
    >
      {/* sliding knob */}
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform:
            mounted && !isDark ? "translateX(28px)" : "translateX(0px)",
        }}
      >
        {/* icon swaps with theme; render a neutral one until mounted */}
        {mounted && !isDark ? (
          // sun
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
        ) : (
          // moon
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </span>
    </button>
  );
}
