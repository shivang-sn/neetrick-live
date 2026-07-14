import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token || !getSecret()) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig) return false;

  const expectedSig = sign(expires);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  const expiresAt = Number(expires);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}
