import Reveal from "@/components/Reveal";

export default function TechStackGrid({
  groups,
}: {
  groups: { title: string; items: string[] }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, i) => (
        <Reveal key={group.title} delay={i * 0.08}>
          <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface-2 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-accent hover:shadow-[0_25px_60px_-25px_rgba(116,59,251,0.5)]">
            {/* glossy hover sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* giant faint index number */}
            <div className="display pointer-events-none absolute -right-2 -top-5 text-8xl leading-none text-[color-mix(in_srgb,var(--text)_6%,transparent)] transition-colors duration-500 group-hover:text-[color-mix(in_srgb,var(--accent)_16%,transparent)]">
              0{i + 1}
            </div>

            <div className="relative">
              <h3 className="display text-xl transition-colors duration-300 group-hover:text-accent">
                {group.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-muted transition-colors duration-300 group-hover:text-text"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
