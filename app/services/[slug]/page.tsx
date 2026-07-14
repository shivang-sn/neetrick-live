import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content";
import ServiceDetailSections from "@/components/services/ServiceDetailSections";

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

  return (
    <>
      <section className="container-x pb-16 pt-40">
        <div className="kicker mb-6">{service.no} - Service</div>
        <h1 className="display text-fluid-h1 max-w-4xl">{service.title}</h1>
        <p className="mt-8 max-w-xl text-fluid-body text-muted">
          {service.promise}
        </p>
      </section>

      <ServiceDetailSections detail={service.detail} />

      <section className="container-x section-pad pt-0">
        <h2 className="display text-fluid-h2">{service.detail.ctaTitle}</h2>
        <div className="mt-8 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-muted">{service.detail.ctaText}</p>
          <Link
            href="/contact"
            data-cursor="link"
            className="inline-block shrink-0 rounded-full bg-accent px-8 py-4 font-medium text-white"
          >
            Get a quote →
          </Link>
        </div>
      </section>
    </>
  );
}
