"use client";

import Marquee from "../Marquee";

const CLIENTS = [
  "ATLAS",
  "VOLTEDGE",
  "SAFFRON",
  "COASTAL CO.",
  "NORTHWIND",
  "LUMEN",
  "KAYA",
  "ORBIT",
];

export default function Trust() {
  return (
    <section className="border-b border-line py-10">
      <p className="kicker mb-6 text-center">Trusted by ambitious teams</p>
      <Marquee
        items={CLIENTS}
        duration={30}
        separator="✦"
        className="display text-[clamp(1.25rem,3vw,2rem)] text-faint"
      />
    </section>
  );
}
