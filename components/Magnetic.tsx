"use client";

import { useRef } from "react";
import { useSound } from "@/providers/SoundProvider";

export default function Magnetic({
  children,
  className = "",
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 0.25s cubic-bezier(0.2,1,0.3,1)" }}
      onMouseMove={onMove}
      onMouseEnter={() => play("hover", 60)}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
