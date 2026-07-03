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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    message: "",
    company_website: "", // honeypot
  });
  const [budget, setBudget] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggle = (v: string) => {
    play("hover", 60);
    setInterests((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budget: budget || "",
          interests,
          source: compact ? "careers" : "contact",
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        play("chime");
        setSent(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
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
      {/* Honeypot: hidden from users, bots tend to fill it */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={form.company_website}
        onChange={set("company_website")}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <input
          required
          placeholder="Your name *"
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          className={field}
        />
        <input
          required
          type="email"
          placeholder="Email *"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          className={field}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <input
          required
          type="tel"
          placeholder="Mobile number *"
          autoComplete="tel"
          value={form.mobile}
          onChange={set("mobile")}
          className={field}
        />
        {!compact && (
          <input
            placeholder="Company"
            autoComplete="organization"
            value={form.company}
            onChange={set("company")}
            className={field}
          />
        )}
      </div>

      {!compact && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <input
            placeholder="Country"
            autoComplete="country-name"
            value={form.country}
            onChange={set("country")}
            className={field}
          />
          <input
            placeholder="State"
            autoComplete="address-level1"
            value={form.state}
            onChange={set("state")}
            className={field}
          />
          <input
            placeholder="City"
            autoComplete="address-level2"
            value={form.city}
            onChange={set("city")}
            className={field}
          />
          <input
            placeholder="Pincode"
            autoComplete="postal-code"
            value={form.pincode}
            onChange={set("pincode")}
            className={field}
          />
        </div>
      )}

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
        placeholder="Tell us about your project *"
        value={form.message}
        onChange={set("message")}
        className={`${field} resize-none`}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Magnetic className="inline-block">
        <button
          type="submit"
          disabled={sending}
          data-cursor="link"
          className="rounded-full bg-accent px-8 py-4 font-medium text-white disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message →"}
        </button>
      </Magnetic>
    </form>
  );
}
