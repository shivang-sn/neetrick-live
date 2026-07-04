"use client";

import Link from "next/link";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";

export default function Footer() {
  const { play } = useSound();

  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="section-pad !pb-12">
        <div className="grid gap-12 md:grid-cols-[1fr] mb-12 items-center justify-center">
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/light-footer-logo.svg"
              alt="Neetrick"
              className="logo-dark h-34 w-auto sm:h-24 md:h-34"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/dark-footer-logo.svg"
              alt="Neetrick"
              className="logo-light h-34 w-auto sm:h-24 md:h-34"
            />
          </div>
          <div className="text-center"><h3 className="display text-fluid-h3 ">
              Got a brief? <br /> Let&apos;s make something smarter.
            </h3>
            <Magnetic className="mt-6 inline-block">
              <Link
                href="/contact"
                data-cursor="link"
                onClick={() => play("click")}
                className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white"
              >
                Start a project
              </Link>
            </Magnetic></div>
        </div>
        <div className="grid gap-12 md:grid-cols-[1fr_1fr_1fr]">

          <div className="text-center">
            <div className="kicker mb-4">Menu</div>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor="link"
                    onMouseEnter={() => play("hover", 60)}
                    className="text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <div className="kicker mb-4">Services</div>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    data-cursor="link"
                    onMouseEnter={() => play("hover", 60)}
                    className="text-muted transition-colors hover:text-text"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <div className="kicker mb-4">Contact</div>
            <ul className="space-y-2 text-muted">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-cursor="link"
                  className="hover:text-text"
                >
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.phone}</li>
              <li>{SITE.location}</li>
            </ul>
            <div className="mt-4 flex gap-4 kicker justify-center">
              <a href="#" data-cursor="link" className="hover:text-accent">IG</a>
              <a href="#" data-cursor="link" className="hover:text-accent">IN</a>
              <a href="#" data-cursor="link" className="hover:text-accent">X</a>
            </div>
          </div>
        </div>
      </div>

      <Marquee
        items={["SMARTER TRICKS", "BETTER EVERYDAY"]}
        duration={25}
        className="display border-y border-line py-6 text-[clamp(2rem,7vw,5rem)] text-faint"
      />

      <div className="flex flex-col items-center justify-between gap-4 px-[clamp(1.25rem,5vw,6rem)] py-6 text-xs text-muted md:flex-row">
        <span>
          © {new Date().getFullYear()} {SITE.name}. Made in Jamnagar.
        </span>
        <button
          onClick={() => {
            play("click");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          data-cursor="link"
          className="hover:text-accent"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
