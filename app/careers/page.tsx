import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { ROLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers — Neetrick",
  description: "Build smarter with us. Open roles at Neetrick in Jamnagar & remote.",
};

const PERKS = [
  { title: "Real ownership", text: "Lead projects end-to-end, not just tickets." },
  { title: "Senior team", text: "Learn from people who've shipped a lot." },
  { title: "Flexible work", text: "Jamnagar studio or remote — your call." },
  { title: "Growth budget", text: "Courses, tools, and conferences on us." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers"
        title={<>Build smarter with us.</>}
        intro="We're a small, senior team that ships premium work. If that sounds like you, let's talk."
      />

      <Marquee
        items={["DESIGN", "ENGINEERING", "MARKETING", "CONTENT", "STRATEGY"]}
        duration={24}
        className="display border-y border-line py-5 text-[clamp(1.5rem,4vw,3rem)] text-faint"
      />

      <section className="section-pad grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PERKS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} className="border-t border-line pt-6">
            <h3 className="display text-2xl">{p.title}</h3>
            <p className="mt-3 text-muted">{p.text}</p>
          </Reveal>
        ))}
      </section>

      <section className="container-x pb-24">
        <div className="kicker mb-8">Open roles</div>
        {ROLES.map((r) => (
          <Link
            key={r.slug}
            href={`/careers/${r.slug}`}
            data-cursor="link"
            className="group grid items-center gap-4 border-t border-line py-8 last:border-b md:grid-cols-[1fr_auto_auto_auto]"
          >
            <span className="display text-2xl transition-colors group-hover:text-accent md:text-3xl">
              {r.title}
            </span>
            <span className="kicker">{r.dept}</span>
            <span className="kicker">{r.location}</span>
            <span className="text-accent transition-transform group-hover:translate-x-2">
              Apply →
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
