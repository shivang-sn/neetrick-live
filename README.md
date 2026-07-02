# Neetrick — Agency Website

A premium, Framer-level website for **Neetrick**, an IT + marketing agency in Jamnagar, Gujarat.
Built from [`NEETRICK-BUILD-PROMPT.md`](./NEETRICK-BUILD-PROMPT.md).

> **Smarter tricks. Better everyday.**

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
