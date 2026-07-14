"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, CONSENT_EVENT } from "./CookieConsent";

const GPS_ASKED_KEY = "geo-permission-asked";

export default function VisitorTracker() {
  const pathname = usePathname();
  const gps = useRef<{ lat: number; lon: number } | null>(null);
  // The consent-listener effect below only runs once (mount), so its
  // closure would otherwise pin `pathname` to whatever it was on first
  // render. Route through a ref that's always current instead.
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  const send = () => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathRef.current,
        userAgent: navigator.userAgent,
        gpsLat: gps.current?.lat,
        gpsLon: gps.current?.lon,
      }),
      keepalive: true,
    }).catch(() => {});
  };

  const track = () => {
    if (pathRef.current?.startsWith("/admin")) return;
    if (localStorage.getItem(CONSENT_KEY) !== "accepted") return;

    const askedAlready = sessionStorage.getItem(GPS_ASKED_KEY);
    if (!askedAlready && "geolocation" in navigator) {
      sessionStorage.setItem(GPS_ASKED_KEY, "1");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          gps.current = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          send();
        },
        () => send(),
        { timeout: 4000 }
      );
    } else {
      send();
    }
  };

  // Fire on every page view (mount + client-side route change).
  useEffect(() => {
    track();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Fire immediately if the visitor accepts cookies mid-session (no reload).
  useEffect(() => {
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") track();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
