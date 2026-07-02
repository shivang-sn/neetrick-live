"use client";

import Link from "next/link";
import { SITE } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";
import Magnetic from "../Magnetic";
import AnimatedTitle from "../AnimatedTitle";

export default function CTASection() {
  const { play } = useSound();
  return (
    <section className="relative overflow-hidden section-pad text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <AnimatedTitle
        text="Let's build something smarter."
        className="text-fluid-h1 justify-center text-center"
        accentWords={["smarter."]}
      />
      <Magnetic className="mt-10 inline-block">
        <Link
          href="/contact"
          data-cursor="link"
          onClick={() => play("click")}
          className="inline-block rounded-full bg-accent px-9 py-5 text-lg font-medium text-white"
        >
          Start a project →
        </Link>
      </Magnetic>
      <p className="mt-8 kicker">{SITE.email}</p>
    </section>
  );
}
