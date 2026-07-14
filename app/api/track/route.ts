import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import { appendVisitor } from "@/lib/visitor-store";

export const runtime = "nodejs";

type TrackBody = {
  path?: string;
  userAgent?: string;
  gpsLat?: number;
  gpsLon?: number;
};

// Reverse-geocodes precise GPS coords (only present when the visitor granted
// location permission) into area/city/state/pincode via OpenStreetMap's free
// Nominatim service. IP-based lookup alone can't resolve to this precision.
async function reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "Neetrick-Website-VisitorAnalytics/1.0 (sales@neetrick.com)",
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const addr = data.address || {};
    return {
      area: addr.suburb || addr.neighbourhood || addr.village || undefined,
      city: addr.city || addr.town || addr.county || undefined,
      state: addr.state || undefined,
      pincode: addr.postcode || undefined,
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let body: TrackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const geo = ip !== "unknown" ? geoip.lookup(ip) : null;

  const ua = new UAParser(body.userAgent || req.headers.get("user-agent") || "");
  const { os, browser, device } = ua.getResult();

  const hasGps = typeof body.gpsLat === "number" && typeof body.gpsLon === "number";
  const reverse = hasGps ? await reverseGeocode(body.gpsLat!, body.gpsLon!) : null;

  appendVisitor({
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    path: body.path || "/",
    ip,
    city: reverse?.city || geo?.city || undefined,
    region: reverse?.state || geo?.region || undefined,
    country: geo?.country || undefined,
    lat: geo?.ll?.[0],
    lon: geo?.ll?.[1],
    gpsLat: hasGps ? body.gpsLat : undefined,
    gpsLon: hasGps ? body.gpsLon : undefined,
    area: reverse?.area,
    pincode: reverse?.pincode,
    os: os.name ? `${os.name} ${os.version || ""}`.trim() : undefined,
    browser: browser.name ? `${browser.name} ${browser.version || ""}`.trim() : undefined,
    device: device.type || "desktop",
  });

  return NextResponse.json({ ok: true });
}
