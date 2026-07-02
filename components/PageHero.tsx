export default function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="container-x pb-16 pt-40">
      <div className="kicker mb-6">{kicker}</div>
      <h1 className="display text-fluid-h1 max-w-5xl">{title}</h1>
      {intro && (
        <p className="mt-8 max-w-xl text-fluid-body text-muted">{intro}</p>
      )}
    </section>
  );
}
