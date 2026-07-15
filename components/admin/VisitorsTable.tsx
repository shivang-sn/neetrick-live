"use client";

import { useEffect, useState } from "react";

type VisitorRecord = {
  id: string;
  timestamp: string;
  path: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  gpsLat?: number;
  gpsLon?: number;
  area?: string;
  pincode?: string;
  os?: string;
  browser?: string;
  device?: string;
};

export default function VisitorsTable() {
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [connected, setConnected] = useState(false);
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const source = new EventSource("/api/admin/visitors-stream");

    source.addEventListener("init", (e) => {
      const data = JSON.parse((e as MessageEvent).data) as VisitorRecord[];
      setVisitors(data);
      setError("");
      setLoaded(true);
      setConnected(true);
    });

    source.addEventListener("visitor", (e) => {
      const v = JSON.parse((e as MessageEvent).data) as VisitorRecord;
      setVisitors((prev) => [v, ...prev]);
      setFlashIds((prev) => new Set(prev).add(v.id));
      setTimeout(() => {
        setFlashIds((prev) => {
          const next = new Set(prev);
          next.delete(v.id);
          return next;
        });
      }, 2000);
    });

    source.addEventListener("error", (e) => {
      // A named "error" SSE event from the server (a Redis read failure
      // mid-stream) - distinct from EventSource's own connection onerror.
      if ((e as MessageEvent).data) setError("Failed to load visitor data.");
    });

    source.onerror = () => {
      // The stream closes every ~45s by design (Vercel function duration
      // limit) and EventSource reconnects automatically - this just means
      // "briefly between streams," not a real failure.
      setConnected(false);
    };

    return () => source.close();
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-xs text-muted">
        <span className="relative flex h-2 w-2">
          {connected && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              connected ? "bg-accent" : "bg-muted"
            }`}
          />
        </span>
        {connected ? "Live" : "Connecting..."}
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[960px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="px-3 py-3">Time</th>
              <th className="px-3 py-3">Page</th>
              <th className="px-3 py-3">IP</th>
              <th className="px-3 py-3">Location (IP)</th>
              <th className="px-3 py-3">GPS</th>
              <th className="px-3 py-3">Area / Pincode</th>
              <th className="px-3 py-3">Device</th>
              <th className="px-3 py-3">OS</th>
              <th className="px-3 py-3">Browser</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((v) => (
              <tr
                key={v.id}
                className={`border-b border-line transition-colors duration-1000 last:border-b-0 ${
                  flashIds.has(v.id) ? "bg-accent/10" : ""
                }`}
              >
                <td className="whitespace-nowrap px-3 py-3">
                  {new Date(v.timestamp).toLocaleString()}
                </td>
                <td className="px-3 py-3">{v.path}</td>
                <td className="px-3 py-3">{v.ip}</td>
                <td className="px-3 py-3">
                  {[v.city, v.region, v.country].filter(Boolean).join(", ") || "-"}
                </td>
                <td className="px-3 py-3">
                  {v.gpsLat != null && v.gpsLon != null
                    ? `${v.gpsLat.toFixed(4)}, ${v.gpsLon.toFixed(4)}`
                    : "-"}
                </td>
                <td className="px-3 py-3">
                  {[v.area, v.pincode].filter(Boolean).join(" · ") || "-"}
                </td>
                <td className="px-3 py-3">{v.device || "desktop"}</td>
                <td className="px-3 py-3">{v.os || "-"}</td>
                <td className="px-3 py-3">{v.browser || "-"}</td>
              </tr>
            ))}
            {loaded && visitors.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-10 text-center text-muted">
                  No visitors recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
