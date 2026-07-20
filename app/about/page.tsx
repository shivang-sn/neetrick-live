import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About - Neetrick",
  description: "An IT + marketing studio headquartered in Jamnagar, Gujarat.",
};

const TRENDS = [
  {
    no: "01",
    title: "AI-Native Products",
    text: "We build AI into the product itself - personalization, automation, and smart workflows - instead of bolting on a chatbot after launch.",
  },
  {
    no: "02",
    title: "Headless & Composable",
    text: "Decoupled front-ends and composable commerce stacks that scale without vendor lock-in.",
  },
  {
    no: "03",
    title: "Motion-First Design",
    text: "Interfaces that respond, animate, and feel alive - not static pages people scroll past.",
  },
  {
    no: "04",
    title: "Privacy-First Marketing",
    text: "First-party data and consent-driven tracking, built for a cookieless web.",
  },
  {
    no: "05",
    title: "Performance as a Feature",
    text: "Core Web Vitals and load speed treated as a growth lever, not an afterthought.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Studio"
        title={
          <>
            We&apos;re Neetrick. <span className="text-accent">Smart tricks, real results.</span>
          </>
        }
      />

      <section className="section-pad grid gap-12 md:grid-cols-2">
        <h2 className="display text-fluid-h3">
          Equal parts engineers and marketers.
        </h2>
        <p className="text-fluid-body text-muted">
          Most agencies are good at one thing. We built Neetrick to be good at
          the whole journey - brand, product, and growth - so ambitious teams
          don&apos;t have to stitch five vendors together. From our base on the
          coast of Gujarat, we ship work that&apos;s as effective as it is
          beautiful.
        </p>
      </section>

      <section className="section-pad">
        <div className="kicker mb-10">What we value</div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.05}
              className="rounded-xl border border-line p-6 transition-colors hover:border-accent"
            >
              <h3 className="display text-2xl text-accent">{v.title}</h3>
              <p className="mt-3 text-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="kicker mb-10">What&apos;s shaping our work</div>
        {TRENDS.map((t, i) => (
          <Reveal
            key={t.no}
            delay={i * 0.05}
            className="grid grid-cols-[auto_1fr] gap-8 border-t border-line py-8 last:border-b"
          >
            <span className="kicker text-accent">{t.no}</span>
            <div>
              <h3 className="display text-2xl">{t.title}</h3>
              <p className="mt-2 text-fluid-body text-muted">{t.text}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
