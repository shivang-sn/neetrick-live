"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

export default function HeroParticles() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      background: { color: "transparent" },
      particles: {
        number: { value: 70, density: { enable: true } },
        color: { value: "#743bfb" },
        links: {
          enable: true,
          color: "#743bfb",
          distance: 140,
          opacity: 0.22,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.7,
          direction: "none",
          outModes: { default: "bounce" },
        },
        size: { value: { min: 1, max: 3 } },
        opacity: { value: { min: 0.2, max: 0.6 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 170, links: { opacity: 0.5 } },
        },
      },
    }),
    []
  );

  // Reduced motion: render a static purple gradient instead of animation.
  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 20%, rgba(116,59,251,0.28), transparent 70%)",
        }}
      />
    );
  }

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="hero-particles"
        options={options}
        className="absolute inset-0"
      />
    </ParticlesProvider>
  );
}
