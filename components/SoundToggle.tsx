"use client";

import { useSound } from "@/providers/SoundProvider";

export default function SoundToggle() {
  const { enabled, toggle, nudge } = useSound();

  return (
    <div className="relative">
      <button
        onClick={toggle}
        data-cursor="link"
        aria-label={enabled ? "Mute sound" : "Enable sound"}
        className="flex h-10 items-center gap-[3px] rounded-full border border-line px-4 hover:border-accent transition-colors"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-accent"
            style={{
              height: enabled ? `${6 + ((i % 3) + 1) * 4}px` : "4px",
              animation: enabled
                ? `bar 0.6s ease-in-out ${i * 0.12}s infinite alternate`
                : "none",
              opacity: enabled ? 1 : 0.4,
              transition: "height 0.2s ease, opacity 0.2s ease",
            }}
          />
        ))}
        <span className="kicker ml-1 !text-[10px]">
          {enabled ? "On" : "Off"}
        </span>
      </button>

      {nudge && !enabled && (
        <div className="absolute right-0 top-12 w-max rounded-full border border-accent/40 bg-surface px-4 py-2 text-xs text-text shadow-lg">
          🔊 Sound on?
        </div>
      )}

      <style>{`
        @keyframes bar {
          from { transform: scaleY(0.5); }
          to { transform: scaleY(1.4); }
        }
      `}</style>
    </div>
  );
}
