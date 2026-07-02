"use client";

export default function Marquee({
  items,
  duration = 30,
  reverse = false,
  className = "",
  separator = "·",
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee ${reverse ? "reverse" : ""}`}
        style={{ ["--duration" as any]: `${duration}s` }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6">{item}</span>
            <span className="text-accent">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
