"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight, dependency-free 2D-canvas particle network.
// Replaces tsParticles (which was freezing some Windows/Android browsers during
// WebGL init). Work per frame is small and bounded, so it can never block the
// main thread. Reduced-motion / low-power devices get the CSS aurora instead.
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    // The canvas is lightweight (bounded 2D work per frame) so it runs on all
    // real devices - including reduced-motion ones, since motion is core to the
    // design. Only genuinely ancient single-core devices fall back to the aurora.
    const cores =
      typeof navigator !== "undefined"
        ? navigator.hardwareConcurrency || 8
        : 8;
    setUseCanvas(cores > 1);
  }, []);

  useEffect(() => {
    if (!useCanvas) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ACCENT = "116,59,251";

    let w = 0;
    let h = 0;
    let count = 0;
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // particle count scales with area, capped for perf
      count = Math.min(70, Math.floor((w * h) / 16000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };
    resize();

    let raf = 0;
    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT},0.6)`;
        ctx.fill();

        // links to nearby particles
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const a = 0.22 * (1 - Math.sqrt(d2) / 130);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${ACCENT},${a})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // link to mouse
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 170 * 170) {
          const a = 0.5 * (1 - Math.sqrt(md2) / 170);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${ACCENT},${a})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [useCanvas]);

  if (!useCanvas) {
    // Safe animated CSS aurora - no canvas/JS loop, cannot block anything.
    return <div aria-hidden className="hero-aurora absolute inset-0" />;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
