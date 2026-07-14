import fs from "fs";
import path from "path";

// Simple JSON-file visitor log. Fine for a low-traffic single-instance
// deployment; if you move to serverless/multi-instance hosting, swap this
// for a real database - the filesystem here won't be shared or persistent.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "visitors.json");
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

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function appendVisitor(record: VisitorRecord) {
  ensureFile();
  let list: VisitorRecord[] = [];
  try {
    list = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    list = [];
  }
  list.push(record);
  if (list.length > MAX_RECORDS) {
    list = list.slice(list.length - MAX_RECORDS);
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export function readVisitors(): VisitorRecord[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}
