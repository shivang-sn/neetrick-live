import { notFound } from "next/navigation";
import { ROLES } from "@/lib/content";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export default function RoleDetail({ params }: { params: { slug: string } }) {
  const role = ROLES.find((r) => r.slug === params.slug);
  if (!role) notFound();

  return (
    <>
      <section className="container-x pb-12 pt-40">
        <div className="kicker mb-6">
          {role.dept} · {role.location} · {role.type}
        </div>
        <h1 className="display text-fluid-h1 max-w-4xl">{role.title}</h1>
      </section>

      <section className="section-pad grid gap-16 md:grid-cols-2">
        <div className="space-y-10">
          <div>
            <div className="kicker mb-3">About the role</div>
            <p className="text-fluid-body text-muted">
              You&apos;ll join a small, senior team and own work end-to-end. We
              care about craft, speed, and outcomes — and we give you the room to
              do your best work.
            </p>
          </div>
          <div>
            <div className="kicker mb-3">What you&apos;ll do</div>
            <ul className="space-y-2 text-muted">
              <li>— Lead projects from brief to launch</li>
              <li>— Collaborate across design, engineering, and marketing</li>
              <li>— Push the quality bar on everything we ship</li>
            </ul>
          </div>
          <div>
            <div className="kicker mb-3">What we look for</div>
            <ul className="space-y-2 text-muted">
              <li>— 3+ years of relevant experience</li>
              <li>— A portfolio you&apos;re proud of</li>
              <li>— Ownership mindset and sharp communication</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="kicker mb-6">Apply</div>
          <ContactForm compact role={role.title} />
        </div>
      </section>
    </>
  );
}
