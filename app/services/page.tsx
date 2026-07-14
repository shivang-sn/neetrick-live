import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services - Neetrick",
  description: "IT and marketing services: web, apps, branding, ads, SEO, cloud.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="What we do"
        title={<>One partner for brand, build, and growth.</>}
        intro="Six capabilities, one team. Mix and match into a retainer, a project, or a sprint."
      />
      <section className="container-x pb-24">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              data-cursor="link"
              className="group grid items-center gap-6 border-t border-line py-12 last:border-b md:grid-cols-[auto_1fr_auto]"
            >
              <span className="kicker">{s.no}</span>
              <div>
                <h2 className="display text-fluid-h3 transition-colors group-hover:text-accent">
                  {s.title}
                </h2>
                <p className="mt-2 max-w-md text-muted">{s.promise}</p>
              </div>
              <span className="text-accent transition-transform group-hover:translate-x-2">
                Explore →
              </span>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
