import Reveal from "@/components/Reveal";
import TechStackGrid from "@/components/services/TechStackGrid";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import type { ServiceDetail } from "@/lib/content";

export default function ServiceDetailSections({ detail }: { detail: ServiceDetail }) {
  return (
    <>
      {/* Introduction */}
      <section className="container-x section-pad pt-0">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="display text-fluid-h2">{detail.introHeading}</h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {detail.introParagraphs.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <p className="text-fluid-body text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="container-x section-pad pt-0">
        <div className="kicker mb-12">{detail.buildTitle}</div>
        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
          {detail.buildItems.map((group, i) => (
            <Reveal key={group.title} delay={(i % 2) * 0.08}>
              <article className="border-t border-line pt-6">
                <h3 className="display text-2xl">{group.title}</h3>
                {group.text && (
                  <p className="mt-3 text-muted">{group.text}</p>
                )}
                <ul className="mt-6 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-4 py-1.5 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tech / tools / platforms grid */}
      <section className="container-x section-pad pt-0">
        <div className="kicker mb-12">{detail.gridTitle}</div>
        <TechStackGrid groups={detail.gridGroups} />
      </section>

      {/* Process */}
      <section className="container-x section-pad pt-0">
        <div className="kicker mb-12">Our Process</div>
        <ProcessTimeline steps={detail.process} />
      </section>
    </>
  );
}
