import { Redis } from "@upstash/redis";

// Vercel serverless functions run on a read-only filesystem, so visitor
// records can't live in a local JSON file (that only worked in local dev).
// Stored as a capped Redis list instead - durable across deploys/invocations.
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const VISITORS_KEY = "visitors";
const MAX_RECORDS = 2000;

export type VisitorRecord = {
  id: string;
  timestamp: string;
  path: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  lat?: number;
  lon?: number;
  gpsLat?: number;
  gpsLon?: number;
  area?: string;
  pincode?: string;
  os?: string;
  browser?: string;
  device?: string;
};

export async function appendVisitor(record: VisitorRecord) {
  await redis.lpush(VISITORS_KEY, record);
  await redis.ltrim(VISITORS_KEY, 0, MAX_RECORDS - 1);
}

export async function readVisitors(): Promise<VisitorRecord[]> {
  const records = await redis.lrange<VisitorRecord>(VISITORS_KEY, 0, -1);
  // LPUSH puts the newest record at the head of the list; reverse so this
  // keeps the same oldest-first contract the previous fs-based version
  // returned (callers reverse again themselves for newest-first display).
  return records.reverse();
}
