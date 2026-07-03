import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export const runtime = "nodejs";

// ---------- helpers ----------
function makeTransport(port: number): Transporter {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    requireTLS: port === 587,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

type SmtpErr = {
  code?: string;
  responseCode?: number;
  response?: string;
  command?: string;
  message?: string;
};

// Health check + optional live SMTP auth test.
// GET /api/contact            -> { configured }
// GET /api/contact?verify=1   -> also attempts SMTP login (465 then 587)
export async function GET(req: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const configured = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS);

  const wantVerify = new URL(req.url).searchParams.get("verify") === "1";
  if (!wantVerify || !configured) {
    return NextResponse.json({
      configured,
      host: SMTP_HOST || null,
      port: SMTP_PORT || null,
      testMode: process.env.SMTP_TEST === "1",
    });
  }

  // Try to authenticate on 465, then 587.
  for (const port of [465, 587]) {
    try {
      await makeTransport(port).verify();
      return NextResponse.json({ configured, smtpOk: true, port });
    } catch (err) {
      const e = err as SmtpErr;
      if (port === 587) {
        return NextResponse.json({
          configured,
          smtpOk: false,
          code: e.code,
          responseCode: e.responseCode,
          response: e.response,
          message: e.message,
        });
      }
    }
  }
  return NextResponse.json({ configured, smtpOk: false });
}

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
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
  const testMode = process.env.SMTP_TEST === "1";

  const to = CONTACT_TO || SMTP_USER || "sales@neetrick.com";
  const subject = `New enquiry from ${name} — Neetrick.com`;
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
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

  // ---------- 1) Test mode (Ethereal) ----------
  if (testMode) {
    const testAcc = await nodemailer.createTestAccount();
    const t = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: { user: testAcc.user, pass: testAcc.pass },
    });
    const info = await t.sendMail({
      from: `"Neetrick Website" <${testAcc.user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject,
      html,
    });
    return NextResponse.json({ ok: true, preview: nodemailer.getTestMessageUrl(info) });
  }

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { ok: false, error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  // ---------- 2) Titan SMTP with 465 -> 587 fallback ----------
  const preferred = Number(SMTP_PORT) === 587 ? [587, 465] : [465, 587];
  let lastErr: SmtpErr | undefined;
  for (const port of preferred) {
    try {
      await makeTransport(port).sendMail({
        from: `"Neetrick Website" <${SMTP_USER}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject,
        html,
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      lastErr = err as SmtpErr;
      console.error(
        `[contact] SMTP send failed on port ${port}:`,
        "code=", lastErr.code,
        "responseCode=", lastErr.responseCode,
        "response=", lastErr.response,
        "command=", lastErr.command
      );
    }
  }

  // ---------- 3) Optional Resend fallback ----------
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Neetrick <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject,
          html,
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true, via: "resend" });
      console.error("[contact] Resend failed:", res.status, await res.text());
    } catch (err) {
      console.error("[contact] Resend threw:", err);
    }
  }

  return NextResponse.json(
    { ok: false, error: "Could not send your message. Please try again." },
    { status: 500 }
  );
}
