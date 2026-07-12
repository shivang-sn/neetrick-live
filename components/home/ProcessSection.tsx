"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  // total slides: intro + steps + cta
  const totalSlides = PROCESS.length + 2;

  // useGSAP handles scope + cleanup (revert) correctly across Next.js client
  // navigation, which prevents the pin-spacer teardown crash that a plain
  // useEffect + ScrollTrigger.pin can cause.
  useGSAP(
    () => {
      if (window.innerWidth < 768) return;
      const track = trackRef.current!;
      // Scroll distance tied EXACTLY to the horizontal content width, so the
      // animation ends precisely on the last slide — no trailing dead space.
      const amount = () => track.scrollWidth - window.innerWidth;
      let lastIndex = -1;
      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + amount(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (totalSlides - 1));
            if (idx !== lastIndex) {
              lastIndex = idx;
              play("enter", 150);
            }
          },
        },
      });
    },
    { scope: sectionRef, dependencies: [play, totalSlides] }
  );

  const slideClass =
    "process-slide flex h-screen w-screen shrink-0 flex-col justify-center px-[clamp(1.25rem,5vw,6rem)] md:w-screen";

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface md:h-screen md:overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:h-screen md:w-max md:flex-row"
      >
          {/* Slide 1 — intro */}
          <div className={slideClass}>
            <div className="kicker mb-4">04 — How we work</div>
            <h2 className="display text-fluid-h1 max-w-4xl">
              A process built to <span className="text-accent">ship</span>.
            </h2>
            <p className="mt-6 max-w-md text-fluid-body text-muted">
              A clear path from first call to compounding growth.
            </p>
          </div>

          {/* Step slides */}
          {PROCESS.map((p) => (
            <div key={p.no} className={slideClass}>
              <div className="display text-[clamp(5rem,18vw,15rem)] leading-none text-accent">
                {p.no}
              </div>
              <h3 className="display mt-2 text-fluid-h2">{p.title}</h3>
              <p className="mt-4 max-w-lg text-fluid-body text-muted">
                {p.text}
              </p>
            </div>
          ))}

          {/* Final slide — CTA */}
          <div
            className={`${slideClass} items-start md:items-center md:text-center`}
          >
            <h3 className="display text-fluid-h1">
              Ready to <span className="text-accent">grow?</span>
            </h3>
            <Link
              href="/contact"
              data-cursor="link"
              onClick={() => play("click")}
              className="mt-8 inline-block rounded-full bg-accent px-8 py-4 font-medium text-white"
            >
              Start a project →
            </Link>
          </div>
        </div>
    </section>
  );
}
