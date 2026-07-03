import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  mobile?: string;
  company?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
  budget?: string;
  interests?: string[];
  message?: string;
  company_website?: string; // honeypot (must stay empty)
  source?: string;
};

// --- tiny in-memory rate limiter (per server instance) ---
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_HITS;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (v = "") =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (body.company_website && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // --- server-side validation ---
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const mobile = (body.mobile || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !mobile || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  const digits = mobile.replace(/[^\d]/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid mobile number." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  // Test mode: send to a throwaway Ethereal inbox and return a preview URL.
  // Enable by setting SMTP_TEST=1 — lets you verify the full flow without real
  // credentials. Never active unless the flag is explicitly set.
  const testMode = process.env.SMTP_TEST === "1";

  let transporter;
  let fromUser = SMTP_USER || "sales@neetrick.com";

  if (testMode) {
    const testAcc = await nodemailer.createTestAccount();
    fromUser = testAcc.user;
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: { user: testAcc.user, pass: testAcc.pass },
    });
  } else {
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { ok: false, error: "Email is not configured on the server." },
        { status: 500 }
      );
    }
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }

  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const interests = (body.interests || []).join(", ") || "—";

  const row = (label: string, value?: string) =>
    `<tr>
       <td style="padding:8px 12px;background:#f6f5f2;font-weight:600;white-space:nowrap;vertical-align:top">${label}</td>
       <td style="padding:8px 12px;border-bottom:1px solid #eee">${esc(value || "—")}</td>
     </tr>`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:auto;color:#111">
    <h2 style="margin:0 0 4px">New enquiry — Neetrick.com</h2>
    <p style="margin:0 0 16px;color:#666;font-size:13px">${esc(when)} IST · Source: ${esc(body.source || "contact")}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${row("Name", name)}
      ${row("Email", email)}
      ${row("Mobile", mobile)}
      ${row("Company", body.company)}
      ${row("Country", body.country)}
      ${row("State", body.state)}
      ${row("City", body.city)}
      ${row("Pincode", body.pincode)}
      ${row("Budget", body.budget)}
      ${row("Services", interests)}
      ${row("Message", message)}
    </table>
  </div>`;

  try {
    const info = await transporter.sendMail({
      from: `"Neetrick Website" <${fromUser}>`,
      to: CONTACT_TO || SMTP_USER || fromUser,
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry from ${name} — Neetrick.com`,
      html,
    });
    if (testMode) {
      return NextResponse.json({
        ok: true,
        preview: nodemailer.getTestMessageUrl(info),
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
