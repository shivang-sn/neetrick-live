"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  playSound,
  setSoundEnabled,
  resumeAudio,
  getCtxState,
  SoundName,
} from "@/lib/sound";

type SoundCtx = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName, throttleMs?: number) => void;
  nudge: boolean;
  dismissNudge: () => void;
};

const Ctx = createContext<SoundCtx | null>(null);

const HOVER_SELECTOR =
  'a, button, [role="button"], [data-cursor], input[type="submit"], .hover-sound';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Sound is always enabled (there is no toggle). The browser keeps the
  // AudioContext "suspended" until the first real user gesture, so hover
  // cues become audible after the user's first click/tap/keypress.
  const [enabled] = useState(true);

  useEffect(() => {
    // Clear any stale "off" preference from older builds and force-enable.
    try {
      localStorage.removeItem("neetrick-sound");
    } catch {
      /* ignore */
    }
    setSoundEnabled(true);

    // Unlock/resume the AudioContext on the first real user gesture.
    const GESTURES = [
      "pointerdown",
      "mousedown",
      "click",
      "keydown",
      "touchstart",
    ];
    const unlock = () => {
      resumeAudio();
      if (getCtxState() === "running") {
        GESTURES.forEach((e) => window.removeEventListener(e, unlock, true));
      }
    };
    GESTURES.forEach((e) =>
      window.addEventListener(e, unlock, { capture: true })
    );

    // Global hover sound for any interactive element.
    let lastTarget: EventTarget | null = null;
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.(HOVER_SELECTOR);
      if (el && el !== lastTarget) {
        lastTarget = el;
        playSound("hover", 50);
      }
    };
    const onOut = () => {
      lastTarget = null;
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      GESTURES.forEach((e) => window.removeEventListener(e, unlock, true));
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  const toggle = useCallback(() => {
    resumeAudio();
    playSound("click");
  }, []);

  const play = useCallback((name: SoundName, throttleMs?: number) => {
    playSound(name, throttleMs);
  }, []);

  return (
    <Ctx.Provider
      value={{ enabled, toggle, play, nudge: false, dismissNudge: () => {} }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useSound() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
