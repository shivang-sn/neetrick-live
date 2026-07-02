import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { WORK } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Neetrick",
  description: "Selected projects across web, branding, apps, and marketing.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Selected work"
        title={<>Work that moves the numbers.</>}
        intro="A selection of brands, products, and growth engines we've shipped."
      />
      <section className="container-x grid gap-8 pb-24 md:grid-cols-2">
        {WORK.map((w, i) => (
          <Reveal key={w.slug} delay={(i % 2) * 0.08}>
            <Link
              href={`/work/${w.slug}`}
              data-cursor="view"
              data-cursor-label="View"
              className="group block overflow-hidden rounded-xl"
            >
              <div
                className="flex aspect-[4/3] items-center justify-center transition-transform duration-700 group-hover:scale-105"
                style={{ background: w.color }}
              >
                <span className="display text-4xl text-text/80">{w.name}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="display text-2xl">{w.name}</h3>
                <span className="kicker">{w.year}</span>
              </div>
              <div className="mt-2 flex gap-2">
                {w.tags.map((t) => (
                  <span key={t} className="kicker">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
