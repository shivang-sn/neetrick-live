import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center container-x">
      <div className="display text-[clamp(6rem,25vw,18rem)] leading-none">
        4<span className="text-accent">0</span>4
      </div>
      <p className="display text-fluid-h3">This trick disappeared.</p>
      <Link
        href="/"
        data-cursor="link"
        className="mt-8 inline-block rounded-full bg-accent px-8 py-4 font-medium text-white"
      >
        Back home →
      </Link>
    </section>
  );
}
