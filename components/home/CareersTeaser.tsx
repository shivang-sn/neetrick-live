"use client";

import Link from "next/link";
import { useState } from "react";
import { ROLES } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";
import AnimatedTitle from "../AnimatedTitle";

export default function CareersTeaser() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { play } = useSound();

  return (
    <section className="section-pad">
      <div className="mb-12 flex items-end justify-between">
        <AnimatedTitle
          text="We're hiring."
          className="text-fluid-h2"
          accentWords={["hiring."]}
        />
        <Link
          href="/careers"
          data-cursor="link"
          onClick={() => play("click")}
          className="hidden text-accent hover:translate-x-1 transition-transform md:block"
        >
          See open roles →
        </Link>
      </div>

      <ul>
        {ROLES.map((r, i) => (
          <li key={r.slug}>
            <Link
              href={`/careers/${r.slug}`}
              data-cursor="link"
              onMouseEnter={() => {
                setHovered(i);
                play("hover", 80);
              }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => play("click")}
              className="flex items-center justify-between border-t border-[#1c1c20] py-6 transition-all last:border-b"
              style={{
                paddingLeft: hovered === i ? 16 : 0,
                color: hovered === i ? "var(--accent)" : undefined,
              }}
            >
              <span className="display text-2xl md:text-3xl">{r.title}</span>
              <span className="kicker">
                {r.dept} · {r.location}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
