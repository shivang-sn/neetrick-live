import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { readVisitors } from "@/lib/visitor-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const POLL_MS = 1500;
// Vercel kills a serverless function after its max duration; close the
// stream a little before that so it's a clean end rather than an abrupt
// cut-off. EventSource reconnects automatically, so the client barely
// notices - it just opens a fresh stream and gets a new "init" snapshot.
const MAX_STREAM_MS = 45_000;

function sseMessage(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function GET() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(sseMessage(event, data)));
      };

      const knownIds = new Set<string>();
      const startedAt = Date.now();

      try {
        const initial = await readVisitors();
        initial.forEach((v) => knownIds.add(v.id));
        send("init", initial.slice().reverse());
      } catch {
        send("error", { message: "Failed to load visitor data." });
      }

      while (!closed && Date.now() - startedAt < MAX_STREAM_MS) {
        await new Promise((r) => setTimeout(r, POLL_MS));
        if (closed) break;
        try {
          const current = await readVisitors();
          for (const v of current) {
            if (!knownIds.has(v.id)) {
              knownIds.add(v.id);
              send("visitor", v);
            }
          }
        } catch {
          // Transient read failure - skip this tick, try again next poll.
        }
      }

      if (!closed) controller.close();
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
