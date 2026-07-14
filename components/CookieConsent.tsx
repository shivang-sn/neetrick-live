"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-changed";

export default function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY)) return;
    setVisible(true);
  }, []);

  if (pathname?.startsWith("/admin")) return null;
  if (!visible) return null;

  const choose = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-5 text-sm text-muted sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left">
          We use cookies and similar technologies to understand how visitors
          use this site (approximate location, device, and pages viewed) and
          improve your experience.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => choose("declined")}
            data-cursor="link"
            className="rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-text"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            data-cursor="link"
            className="rounded-full bg-accent px-4 py-2 text-xs font-medium text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
