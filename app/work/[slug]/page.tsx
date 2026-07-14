import Link from "next/link";
import Image from "next/image";
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
        className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden pb-12"
        style={{ background: project.color }}
      >
        {project.image && (
          <>
            <Image
              src={project.image}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </>
        )}
        <div className="container-x relative z-10 pt-40">
          <div className="kicker mb-6 text-white/70">{project.client}</div>
          <h1 className="display text-fluid-h1 text-white">{project.name}</h1>
          <div className="mt-8 flex flex-wrap gap-8 kicker text-white/70">
            <span>Year - {project.year}</span>
            <span>Services - {project.tags.join(", ")}</span>
            <span>Role - Brand, Build, Grow</span>
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
          platform, and rewired their acquisition - all under one roof.
        </p>
      </section>

      <section className="container-x grid gap-6 pb-24 md:grid-cols-3">
        {results.map((r) => (
          <Reveal key={r.label} className="border-t border-line pt-6">
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
        className="relative block overflow-hidden py-24 text-center transition-colors"
        style={{ background: next.color }}
      >
        {next.image && (
          <>
            <Image
              src={next.image}
              alt={next.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </>
        )}
        <div className="relative z-10">
          <div className="kicker mb-4 text-white/70">Next project</div>
          <div className="display text-fluid-h2 text-white">{next.name} →</div>
        </div>
      </Link>
    </>
  );
}
