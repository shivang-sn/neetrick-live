"use client";

import { useEffect, useState } from "react";
import { useSound } from "@/providers/SoundProvider";
import Magnetic from "./Magnetic";
import Toast from "./Toast";

const BUDGETS = ["< ₹1L", "₹1–5L", "₹5–15L", "₹15L+"];
const INTERESTS = ["Web", "App", "Branding", "Marketing", "SEO", "Cloud"];

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB
const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ContactForm({
  compact = false,
  role,
}: {
  compact?: boolean;
  role?: string;
}) {
  const { play } = useSound();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const toastHeading = compact ? "Application received!" : "Message sent!";
  const toastMessage = compact
    ? "Thanks for applying — we'll review your profile and reach out if it's a match."
    : "Thanks for reaching out — we'll get back to you within one business day.";

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 6000);
    return () => clearTimeout(t);
  }, [toast]);

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
    experience: "",
    currentCtc: "",
    expectedCtc: "",
    currentCompany: "",
    linkedin: "",
    portfolio: "",
  });
  const [budget, setBudget] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggle = (v: string) => {
    play("hover", 60);
    setInterests((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  };

  const onCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCvError("");
    if (file) {
      if (!CV_TYPES.includes(file.type)) {
        setCvError("Please upload a PDF or Word document.");
        setCv(null);
        e.target.value = "";
        return;
      }
      if (file.size > MAX_CV_SIZE) {
        setCvError("File is too large (max 5MB).");
        setCv(null);
        e.target.value = "";
        return;
      }
    }
    setCv(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (compact && !cv) {
      setError("Please attach your CV.");
      return;
    }
    setSending(true);
    // Hard timeout so the button never hangs indefinitely.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    const source = compact ? "careers" : "contact";
    try {
      let res: Response;
      if (compact) {
        // Careers form: multipart so the CV file can ride along as an attachment.
        const fd = new FormData();
        Object.entries({
          ...form,
          budget: budget || "",
          source,
          role: role || "",
        }).forEach(([k, v]) => fd.append(k, v));
        interests.forEach((i) => fd.append("interests", i));
        if (cv) fd.append("cv", cv);
        res = await fetch("/api/contact", {
          method: "POST",
          signal: controller.signal,
          body: fd,
        });
      } else {
        const payload = { ...form, budget: budget || "", interests, source };
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        play("chime");
        setSent(true);
        setToast(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[contact] request failed", err);
      if ((err as Error)?.name === "AbortError") {
        setError("This is taking too long. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  };

  if (sent) {
    return (
      <>
        <Toast
          show={toast}
          heading={toastHeading}
          message={toastMessage}
          onClose={() => setToast(false)}
        />
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="display text-fluid-h3 text-accent">
            {compact ? "Application received!" : "Thank you!"}
          </div>
          <p className="mt-4 max-w-sm text-muted">{toastMessage}</p>
        </div>
      </>
    );
  }

  const field =
    "w-full border-b border-line bg-transparent py-3 text-text outline-none transition-colors focus:border-accent placeholder:text-muted";

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
        {compact && (
          <input
            required
            placeholder="City *"
            autoComplete="address-level2"
            value={form.city}
            onChange={set("city")}
            className={field}
          />
        )}
      </div>

      {compact && (
        <div className="grid gap-6 sm:grid-cols-2">
          <input
            required
            placeholder="Total experience (e.g. 3 years) *"
            value={form.experience}
            onChange={set("experience")}
            className={field}
          />
          <input
            required
            placeholder="Current company *"
            autoComplete="organization"
            value={form.currentCompany}
            onChange={set("currentCompany")}
            className={field}
          />
        </div>
      )}

      {compact && (
        <div className="grid gap-6 sm:grid-cols-2">
          <input
            required
            placeholder="Current CTC *"
            value={form.currentCtc}
            onChange={set("currentCtc")}
            className={field}
          />
          <input
            required
            placeholder="Expected CTC *"
            value={form.expectedCtc}
            onChange={set("expectedCtc")}
            className={field}
          />
        </div>
      )}

      {compact && (
        <div className="grid gap-6 sm:grid-cols-2">
          <input
            required
            type="url"
            placeholder="LinkedIn URL *"
            autoComplete="url"
            value={form.linkedin}
            onChange={set("linkedin")}
            className={field}
          />
          <input
            type="url"
            placeholder="Portfolio URL"
            autoComplete="url"
            value={form.portfolio}
            onChange={set("portfolio")}
            className={field}
          />
        </div>
      )}

      {compact && (
        <div>
          <label className="block text-sm text-muted">
            <span className="mb-2 block">Updated CV — PDF or Word, max 5MB *</span>
            <input
              required
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={onCvChange}
              className="w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-white"
            />
          </label>
          {cv && !cvError && (
            <p className="mt-2 text-xs text-muted">{cv.name}</p>
          )}
          {cvError && <p className="mt-2 text-xs text-red-400">{cvError}</p>}
        </div>
      )}

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
                  borderColor: budget === b ? "var(--accent)" : "var(--border)",
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
                    : "var(--border)",
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
        placeholder={
          compact
            ? "Anything else you'd like us to know *"
            : "Tell us about your project *"
        }
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
