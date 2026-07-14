"use client";

import { useEffect, useRef } from "react";

// HeroV2 background (Option 3): giant slow-drifting ghost typography plus a
// liquid cursor-trail blob. Pure DOM/CSS - no canvas, no per-frame distance
// math - so unlike the old particle network there's no perf gating needed.
export default function HeroGhostField() {
  const stageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;
    if (!stage || !layer) return;

    const blobs = Array.from({ length: 5 }, (_, i) => {
      const el = document.createElement("div");
      el.className = "hero-ghost-blob";
      const size = 90 - i * 12;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = String(0.5 - i * 0.08);
      layer.appendChild(el);
      return { el, x: 0, y: 0, size };
    });

    let mx = stage.clientWidth / 2;
    let my = stage.clientHeight / 2;
    blobs.forEach((b) => {
      b.x = mx;
      b.y = my;
    });

    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    stage.addEventListener("mousemove", onMove);

    let raf = 0;
    let running = true;
    const animate = () => {
      if (!running) return;
      let px = mx;
      let py = my;
      blobs.forEach((b) => {
        b.x += (px - b.x) * 0.12;
        b.y += (py - b.y) * 0.12;
        b.el.style.transform = `translate(${b.x - b.size / 2}px, ${
          b.y - b.size / 2
        }px)`;
        px = b.x;
        py = b.y;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(animate);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      stage.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      blobs.forEach((b) => b.el.remove());
    };
  }, []);

  return (
    <div ref={stageRef} aria-hidden className="absolute inset-0 overflow-hidden">
      <svg width="0" height="0">
        <filter id="heroV2Goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b" />
          <feColorMatrix
            in="b"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
          />
        </filter>
      </svg>

      <div className="hero-ghost-row hero-ghost-row-1">
        BUILD&nbsp;&nbsp;&middot;&nbsp;&nbsp;GROW&nbsp;&nbsp;&middot;&nbsp;&nbsp;BUILD&nbsp;&nbsp;&middot;&nbsp;&nbsp;GROW
      </div>
      <div className="hero-ghost-row hero-ghost-row-2">
        SMARTER&nbsp;&nbsp;&middot;&nbsp;&nbsp;TRICKS&nbsp;&nbsp;&middot;&nbsp;&nbsp;SMARTER
      </div>

      <div
        ref={layerRef}
        className="absolute inset-0"
        style={{ filter: "url(#heroV2Goo)" }}
      />
    </div>
  );
}
