"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { useSound } from "@/providers/SoundProvider";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 300 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const toggleMenu = () => {
    play("shutter");
    setOpen((o) => !o);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open
            ? "bg-bg/70 backdrop-blur-xl border-b border-line"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-[clamp(1.25rem,5vw,6rem)] py-5">
          <Magnetic>
            <Link
              href="/"
              data-cursor="link"
              onClick={() => play("click")}
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/light-header-logo.svg"
                alt="Neetrick"
                className="logo-dark h-7 w-auto md:h-8"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/dark-header-logo.svg"
                alt="Neetrick"
                className="logo-light h-7 w-auto md:h-8"
              />
            </Link>
          </Magnetic>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              data-cursor="link"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex items-center gap-3"
            >
              <span className="kicker hidden sm:block">
                {open ? "Close" : "Menu"}
              </span>
              <span className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border border-line transition-colors group-hover:border-accent">
              <span
                className={`h-px w-5 bg-text transition-all duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-text transition-all duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu — driven by inline styles so it never
          depends on Tailwind JIT generating arbitrary clip-path utilities. */}
      <div
        className="fixed inset-0 z-40 overflow-hidden bg-bg"
        style={{
          clipPath: open
            ? "circle(150% at 100% 0)"
            : "circle(0% at 100% 0)",
          transition: "clip-path 0.7s cubic-bezier(0.76,0,0.24,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="flex h-[100dvh] flex-col justify-center gap-[1.2vh] px-[clamp(1.25rem,5vw,6rem)] pb-[3vh] pt-[max(6rem,12vh)]">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => {
                  play("click");
                  setOpen(false);
                }}
                data-cursor="link"
                className="menu-item group relative block overflow-hidden border-b border-line"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(50px)",
                  transition: `opacity 0.5s ease ${
                    0.25 + i * 0.07
                  }s, transform 0.6s cubic-bezier(0.2,1,0.3,1) ${
                    0.25 + i * 0.07
                  }s`,
                }}
              >
                {/* sliding purple fill box */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
                <span className="relative flex items-center gap-6 py-[1.1vh]">
                  <span className="kicker w-10 transition-colors group-hover:text-bg">
                    0{i + 1}
                  </span>
                  <span className="display text-[clamp(1.6rem,6.4vh,6.5rem)] leading-none transition-colors duration-300 group-hover:text-bg">
                    {l.label}
                  </span>
                </span>
              </Link>
            ))}
          </nav>

          <div
            className="flex flex-col justify-between gap-4 sm:flex-row"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 0.5s ease 0.6s",
            }}
          >
            <a
              href={`mailto:${SITE.email}`}
              data-cursor="link"
              className="text-muted hover:text-accent"
            >
              {SITE.email}
            </a>
            <span className="text-muted">{SITE.location}</span>
            <div className="flex gap-4 kicker">
              <a href="#" data-cursor="link" className="hover:text-accent">Instagram</a>
              <a href="#" data-cursor="link" className="hover:text-accent">LinkedIn</a>
              <a href="#" data-cursor="link" className="hover:text-accent">X</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
