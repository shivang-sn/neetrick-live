import Link from "next/link";
import { notFound } from "next/navigation";
import { WORK } from "@/lib/content";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = WORK.find((w) => w.slug === params.slug);
  if (!project) notFound();
  const next = WORK[(WORK.indexOf(project) + 1) % WORK.length];

  const results = [
    { value: "+212%", label: "Organic traffic" },
    { value: "3.4×", label: "Conversion rate" },
    { value: "+180%", label: "Qualified leads" },
  ];

  return (
    <>
      <section
        className="flex min-h-[80vh] flex-col justify-end pb-12"
        style={{ background: project.color }}
      >
        <div className="container-x pt-40">
          <div className="kicker mb-6 text-text/70">{project.client}</div>
          <h1 className="display text-fluid-h1">{project.name}</h1>
          <div className="mt-8 flex flex-wrap gap-8 kicker text-text/70">
            <span>Year — {project.year}</span>
            <span>Services — {project.tags.join(", ")}</span>
            <span>Role — Brand, Build, Grow</span>
          </div>
        </div>
      </section>

      <section className="section-pad grid gap-12 md:grid-cols-2">
        <div>
          <div className="kicker mb-4">The brief</div>
          <h2 className="display text-fluid-h3">
            A legacy brand that needed to feel inevitable again.
          </h2>
        </div>
        <p className="text-fluid-body text-muted md:pt-12">
          {project.client} came to Neetrick with a tired identity and a funnel
          that leaked. We rebuilt the brand from the ground up, shipped a new
          platform, and rewired their acquisition — all under one roof.
        </p>
      </section>

      <section className="container-x grid gap-6 pb-24 md:grid-cols-3">
        {results.map((r) => (
          <Reveal key={r.label} className="border-t border-[#1c1c20] pt-6">
            <div className="display text-[clamp(2.5rem,6vw,4rem)] text-accent">
              {r.value}
            </div>
            <div className="kicker mt-2">{r.label}</div>
          </Reveal>
        ))}
      </section>

      <Link
        href={`/work/${next.slug}`}
        data-cursor="view"
        data-cursor-label="Next"
        className="block py-24 text-center transition-colors"
        style={{ background: next.color }}
      >
        <div className="kicker mb-4 text-text/70">Next project</div>
        <div className="display text-fluid-h2">{next.name} →</div>
      </Link>
    </>
  );
}
