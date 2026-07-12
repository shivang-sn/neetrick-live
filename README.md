# Neetrick — Agency Website

A premium, Framer-level website for **Neetrick**, an IT + marketing agency in Jamnagar, Gujarat.
Built from [`NEETRICK-BUILD-PROMPT.md`](./NEETRICK-BUILD-PROMPT.md).

> **Smart tricks. Better everyday.**

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens via CSS variables)
- **GSAP + ScrollTrigger** (pinning, horizontal scroll, parallax)
- **Lenis** (smooth scroll)
- **Framer Motion** (transitions)
- **Web Audio API** sound engine (synthesized — no audio files needed)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Motion / reduced-motion
- The hero particles and marquees are **core visuals** and animate on all
  platforms. On `prefers-reduced-motion: reduce` (common on Windows with
  "Show animations" off, and Android battery saver) or low-core CPUs, the hero
  particles switch to a **lighter animated variant** (fewer particles, no links,
  slower, capped DPR) — never a dead static background.

## Theme (light / dark)
- Powered by `next-themes` (`attribute="data-theme"`, default **dark**, follows system on first visit).
- Toggle is the sun/moon switch in the header; choice persists in `localStorage`.
- Colors are CSS variables in `app/globals.css` — edit `:root`/`[data-theme="dark"]`
  and `[data-theme="light"]` blocks. Tailwind tokens: `bg`, `surface`, `surface-2`,
  `text`, `muted`, `accent`, `line` (borders), `overlay`, `faint`.

## Contact email (GoDaddy Titan → sales@neetrick.com)
- SMTP config lives in `.env.local` (git-ignored). Template: `.env.local.example`.
  ```
  SMTP_HOST=smtp.titan.email
  SMTP_PORT=465            # try 587 if 465 fails
  SMTP_USER=sales@neetrick.com
  SMTP_PASS=1507@neetrick
  CONTACT_TO=sales@neetrick.com
  ```
- **Restart the server after editing `.env.local`** — Next.js reads env only at startup.
- Health check: `GET /api/contact` → `{ "configured": true }` when SMTP env is loaded.
- **Live login test:** `GET /api/contact?verify=1` actually attempts SMTP auth
  (tries port 465, then 587) and returns `{ "smtpOk": true }` or the exact error
  code — so you can confirm the mailbox login **without** submitting the form.
  A `535` / `EAUTH` here means the password is wrong or the mailbox isn't activated.
- Sending tries port 465, and only falls back to 587 on a **connection** error.
  An **auth** failure (535 / bad password / inactive mailbox) fails the same way on
  both ports, so it returns immediately instead of doubling the wait. Timeouts are
  8s (connect) / 12s (socket), and the client aborts the request after 25s.
- **Optional Resend fallback:** if Titan SMTP can't authenticate, set
  `RESEND_API_KEY` (and optionally `RESEND_FROM`) in `.env.local`; the route will
  deliver via Resend when SMTP fails.
- Local test without real credentials: `SMTP_TEST=1 npm start`, submit the form,
  and the API returns an `ethereal.email` preview link showing the exact email.
- Real delivery needs a fully-activated mailbox + correct password (Titan returns
  `535 authentication failed` if the login is wrong or the mailbox isn't activated).

## Favicon / icons
- Favicon: `app/neetrick-icon.ico` (auto-detected by Next). To add an iOS icon, drop a
  180×180 `app/neetrick-icon.ico`.

## What's built
- **Premium loader** — 0→100 counter, rotating kicker, shutter-panel reveal (first visit per session)
- **Custom cursor** — magnetic dot + ring with `VIEW` labels on work items
- **Sound system** — synthesized hover / click / shutter / scroll / counter / chime cues. Toggle top-right, off by default with a one-time nudge, choice saved to `localStorage`. Respects `prefers-reduced-motion`.
- **Home** — Hero, Trust marquee, Intro statement, pinned Services, Selected Work (cursor-follow preview), horizontal-scroll Process, animated Stats counters, About teaser, Testimonials, Careers teaser, CTA
- **Pages** — `/work` + case studies, `/services` + detail, `/about`, `/careers` + role detail, `/contact` (multi-field form), custom `404`

## Customizing

| What | Where |
|------|-------|
| All copy, services, work, roles, stats, testimonials | `lib/content.ts` |
| Colors, fonts, spacing tokens | `app/globals.css` (`:root`) + `tailwind.config.ts` |
| Fonts | `app/layout.tsx` (swap the `next/font` imports) |
| Sound cues | `lib/sound.ts` |

### Swap colors
Edit the CSS variables in `app/globals.css`:
```css
:root {
  --bg: #0a0a0b;
  --accent: #c6f432;   /* the single accent — change to rebrand */
}
```

### Use real audio files instead of synth
The current engine in `lib/sound.ts` generates tones in-browser. To use mp3s, drop files in `public/sounds/` and swap the `players` map to play them via `Howler` or `Audio`.

## Folder structure
```
app/            routes (home, work, services, about, careers, contact, 404)
components/     Nav, Footer, Loader, Cursor, Magnetic, Marquee, Reveal, forms
components/home/ all home-page sections
lib/            content.ts (copy/data), sound.ts (audio engine)
providers/      SoundProvider (context + useSound hook)
```

## Replace before launch
- Real logo / wordmark, brand fonts (if licensed)
- Project images & case-study content (currently color blocks)
- Team / studio photos, client logos
- Real contact details, social links, Jamnagar map embed
- Wire the contact form to an email service / backend
- OG/social images per route
