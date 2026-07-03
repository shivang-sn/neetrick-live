"use client";

import { useEffect, useState } from "react";
import { useSound } from "@/providers/SoundProvider";

export default function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    if (sessionStorage.getItem("neetrick-loaded")) {
      setHidden(true);
      return;
    }

    play("boot");

    const total = 2600;
    const start = Date.now();
    let finished = false;
    let interval: ReturnType<typeof setInterval> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (interval) clearInterval(interval);
      setCount(100);
      setDone(true);
      play("shutter");
      finishTimer = setTimeout(() => {
        setHidden(true);
        sessionStorage.setItem("neetrick-loaded", "1");
      }, 1000);
    };

    interval = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t >= 1) finish();
    }, 30);

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", esc);

    return () => {
      if (interval) clearInterval(interval);
      if (finishTimer) clearTimeout(finishTimer);
      window.removeEventListener("keydown", esc);
    };
  }, [play]);

  if (hidden) return null;

  const p = count / 100;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-bg"
        style={{ opacity: done ? 0 : 1, transition: "opacity 0.5s ease" }}
      >
        {/* Traveling percentage: top-left -> top-right, stops at 100 */}
        <div
          className="display absolute top-8 text-[clamp(2.5rem,7vw,5.5rem)] leading-none tabular-nums"
          style={{
            left: "clamp(1.25rem, 5vw, 4rem)",
            transform: `translateX(calc(${p} * (100vw - 100% - clamp(2.5rem, 10vw, 8rem))))`,
          }}
        >
          {count}
          <span className="text-accent">%</span>
        </div>

        {/* Centered logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo.svg"
            alt="Neetrick"
            className="logo-dark w-[min(70vw,420px)]"
            style={{ animation: "loaderLogo 1s cubic-bezier(0.2,1,0.3,1) both" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-on-light.svg"
            alt="Neetrick"
            className="logo-light w-[min(70vw,420px)]"
            style={{ animation: "loaderLogo 1s cubic-bezier(0.2,1,0.3,1) both" }}
          />
          <div
            className="mt-10 h-px w-[min(60vw,360px)] overflow-hidden bg-surface-2"
          >
            <div
              className="h-full bg-accent"
              style={{ width: `${count}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </div>
      </div>

      {/* Shutter panels */}
      <div className="pointer-events-none absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-bg"
            style={{
              transform: done ? "translateY(-101%)" : "translateY(100%)",
              transition: `transform 0.8s cubic-bezier(0.76,0,0.24,1) ${
                i * 0.06
              }s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loaderLogo {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
