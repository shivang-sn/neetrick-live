"use client";

import { useState } from "react";
import { useSound } from "@/providers/SoundProvider";
import Magnetic from "./Magnetic";

const BUDGETS = ["< ₹1L", "₹1–5L", "₹5–15L", "₹15L+"];
const INTERESTS = ["Web", "App", "Branding", "Marketing", "SEO", "Cloud"];

export default function ContactForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { play } = useSound();
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  const toggle = (v: string) => {
    play("hover", 60);
    setInterests((p) =>
      p.includes(v) ? p.filter((x) => x !== v) : [...p, v]
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    play("chime");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <div className="display text-fluid-h3 text-accent">Thank you!</div>
        <p className="mt-4 max-w-sm text-muted">
          We&apos;ve got your message and will reply within one business day.
        </p>
      </div>
    );
  }

  const field =
    "w-full border-b border-[#2a2a2e] bg-transparent py-3 text-text outline-none transition-colors focus:border-accent placeholder:text-muted";

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <input required placeholder="Your name" className={field} />
        <input
          required
          type="email"
          placeholder="Email"
          className={field}
        />
      </div>
      {!compact && <input placeholder="Company" className={field} />}

      {!compact && (
        <div>
          <div className="kicker mb-3">Budget</div>
          <div className="flex flex-wrap gap-3">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                data-cursor="link"
                onClick={() => {
                  play("hover", 60);
                  setBudget(b);
                }}
                className="rounded-full border px-4 py-2 text-sm transition-colors"
                style={{
                  borderColor: budget === b ? "var(--accent)" : "#2a2a2e",
                  color: budget === b ? "var(--accent)" : "var(--muted)",
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {!compact && (
        <div>
          <div className="kicker mb-3">Interested in</div>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map((it) => (
              <button
                key={it}
                type="button"
                data-cursor="link"
                onClick={() => toggle(it)}
                className="rounded-full border px-4 py-2 text-sm transition-colors"
                style={{
                  borderColor: interests.includes(it)
                    ? "var(--accent)"
                    : "#2a2a2e",
                  color: interests.includes(it)
                    ? "var(--accent)"
                    : "var(--muted)",
                }}
              >
                {it}
              </button>
            ))}
          </div>
        </div>
      )}

      <textarea
        required
        rows={4}
        placeholder="Tell us about your project"
        className={`${field} resize-none`}
      />

      <Magnetic className="inline-block">
        <button
          type="submit"
          data-cursor="link"
          className="rounded-full bg-accent px-8 py-4 font-medium text-white"
        >
          Send message →
        </button>
      </Magnetic>
    </form>
  );
}
