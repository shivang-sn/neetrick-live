import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const steps = [
    "Audit & discovery",
    "Strategy & scope",
    "Design & build",
    "Launch & optimise",
  ];

  return (
    <>
      <section className="container-x pb-16 pt-40">
        <div className="kicker mb-6">{service.no} — Service</div>
        <h1 className="display text-fluid-h1 max-w-4xl">{service.title}</h1>
        <p className="mt-8 max-w-xl text-fluid-body text-muted">
          {service.promise}
        </p>
      </section>

      <section className="section-pad grid gap-16 md:grid-cols-2">
        <div>
          <div className="kicker mb-6">What&apos;s included</div>
          <ul className="space-y-4">
            {service.deliverables.map((d) => (
              <Reveal key={d} as="li" className="flex items-center gap-4 border-b border-[#1c1c20] pb-4">
                <span className="text-accent">✦</span>
                <span className="display text-2xl">{d}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <div className="kicker mb-6">Our approach</div>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <Reveal key={step} as="li" delay={i * 0.05} className="flex gap-4">
                <span className="kicker text-accent">0{i + 1}</span>
                <span className="text-fluid-body">{step}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad text-center">
        <h2 className="display text-fluid-h2">Need this for your brand?</h2>
        <Link
          href="/contact"
          data-cursor="link"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-4 font-medium text-white"
        >
          Get a quote →
        </Link>
      </section>
    </>
  );
}
