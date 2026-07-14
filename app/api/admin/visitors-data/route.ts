import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { readVisitors } from "@/lib/visitor-store";

export const runtime = "nodejs";

export async function GET() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const visitors = readVisitors().slice().reverse();
  return NextResponse.json({ ok: true, visitors });
}
