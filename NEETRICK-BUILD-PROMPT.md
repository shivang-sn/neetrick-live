# NEETRICK — MASTER BUILD PROMPT
### Framer-Level · Award-Grade · IT + Marketing Agency Website
*Single-file build bible. Paste whole, or feed section-by-section to your generation tool / dev team.*

---

## HOW TO USE THIS FILE
1. **PART 0** is the global foundation (stack, design system, sound engine, cursor, motion, loader, nav, footer). Build it first — every page depends on it.
2. **PART 1–9** are the pages. Each page is broken into sections with: **Goal · Layout · Type · Motion · Sound · Micro-interactions · Copy · Responsive**.
3. **PART 10** is deliverables + definition of done.
4. Replace all placeholder copy/images/sounds with real assets (locations noted in README section).

---

# PART 0 — GLOBAL FOUNDATION (applies to every page)

```
ROLE
Act as a creative director + lead front-end engineer with 20 years of award-winning
agency work (Awwwards Site of the Day / FWA / CSS Design Awards caliber). Build a
premium, kinetic, art-directed website for "Neetrick", an IT + marketing agency
headquartered in Jamnagar, Gujarat, India. Zero template feel. No plain Bootstrap
grids. Every section is intentional, editorial, and alive with motion + sound.

TAGLINE (hero): "Smarter tricks. Better everyday."

QUALITY BAR (match the polish, not the layouts):
grainandmortar.com · kudos.framer.media · wearedaima.framer.website ·
pilcommunication.com/careers
```

### TECH STACK
```
- Next.js (App Router) + TypeScript
- Tailwind CSS (design tokens as CSS variables)
- GSAP + ScrollTrigger + SplitText (text reveals, pinning, parallax, line draws)
- Lenis (smooth scroll, raf-synced to ScrollTrigger)
- Framer Motion (route + component transitions)
- Howler.js (global sound engine)
- next/font (self-hosted fonts), next/image (optimized media)
- Embla or custom GSAP for sliders / horizontal scroll
```

### DESIGN SYSTEM (tokens — expose ALL as CSS variables in :root)
```
Mode: dark-primary with deliberate light "breath" sections.

Palette:
  --bg:        #0A0A0B    (near-black base)
  --surface:   #121214
  --text:      #F4F2EC    (warm off-white)
  --muted:     #8A8A86
  --accent:    #C6F432    (electric lime — THE single accent, commit to it)
  --accent-2:  #1B1B1F    (subtle contrast blocks)
  (Provide a light-theme inversion for "breath" sections.)

Type:
  Display: "Clash Display" or "General Sans"  (oversized headings)
  Body:    "Satoshi" or "Inter"
  Mono:    "JetBrains Mono"  (labels, numbers, kickers, index tags)
  Fluid scale via clamp():
    h1 clamp(3rem, 8vw, 9rem); h2 clamp(2rem,5vw,5rem); body clamp(1rem,1.1vw,1.25rem)
  Tight tracking on display; generous line-height on body.

Texture: subtle animated film-grain/noise overlay on dark sections
  (low opacity, pointer-events:none, gentle flicker).

Spacing: 8pt system. Generous whitespace. Asymmetric / broken-grid layouts,
  overlapping elements, oversized section index numbers (01 / 02 / 03).

Radius: mostly sharp/editorial; pills only for buttons + tags.
```

### GLOBAL CUSTOM CURSOR
```
- Replace native cursor with a custom blended-mode dot + trailing ring (lerp follow).
- States:
    default      → small dot
    link/CTA     → ring expands + magnetic pull
    work/media   → ring grows into labeled pill ("VIEW" / "DRAG" / "PLAY")
    text input   → I-beam
- Disabled on touch devices (feature-detect).
```

### GLOBAL SOUND ENGINE (signature feature — designer-grade, NEVER annoying)
```
- AudioProvider (React context) on Howler.js. Single config map for easy swapping.
- Persistent animated speaker toggle (top-right). Default OFF + one-time tasteful
  "Sound on?" nudge. Persist choice in localStorage.
- NEVER autoplay before a user gesture (browser policy). Master volume low.
  Everything debounced / rate-limited.
- Sound map (files in /public/sounds, listed in README):
    boot.mp3        loader counter ambience / boot hum
    shutter.mp3     curtain/shutter reveal + menu open/close + page transitions
    hover.mp3       link/button hover (soft tick ~80ms)
    click.mp3       CTA press (satisfying click)
    enter.mp3       section enters viewport (gentle whoosh, throttled 1/section)
    scrolltick.mp3  ultra-subtle scroll texture, rate-limited
    count.mp3       soft tone when a stat counter finishes
    chime.mp3       form submit success
- All cues respect the toggle AND prefers-reduced-motion (silent when reduced).
```

### MOTION PRIMITIVES (reuse everywhere)
```
- Lenis smooth scroll, raf-synced with ScrollTrigger.
- Text reveal: SplitText lines, clip-path/mask wipe + y-translate, stagger.
- Section reveal: opacity + y + slight blur-in on enter; staggered children.
- Parallax: decorative shapes + media at varied speeds.
- Magnetic: buttons, nav links, logo (translate toward cursor, spring back).
- Marquees: infinite seamless loops; speed reacts subtly to scroll velocity.
- Pinning: sticky service/process sections with progress-driven content swaps.
- Route transitions: shutter/curtain wipe in accent color + wordmark flash.
- Reusable hooks: useSound(), useMagnetic(), useScrollReveal(), useCounter(),
  useCursor(), useLenis().
```

### ACCESSIBILITY & PERFORMANCE (non-negotiable)
```
- Semantic HTML5, full keyboard nav, visible focus, ARIA on toggles/menus, alt text.
- prefers-reduced-motion: disable heavy motion + sound cues, keep content usable.
- next/image, lazy media, font preload, code-split GSAP/Howler, zero CLS.
- Lighthouse 90+ across the board. SEO meta + per-route OG images.
```

### SITEMAP
```
/ (Home) · /work · /work/[slug] · /services · /services/[slug] · /about ·
/careers · /careers/[slug] · /contact · /insights · /insights/[slug] · 404
```

### BUILD ORDER
```
tokens → providers (Audio, Cursor, Lenis) → loader → nav/footer →
Home sections → Work → Services → About → Careers → Contact → Insights → 404
```

---

# GLOBAL LOADER (first paint only)

```
LOADER (sessionStorage guard — first visit per session only)
- Goal: a ~2s premium moment that earns trust before the hero.
- Layout: full-screen --bg overlay. Centered giant number counter + small
  rotating kicker line + thin accent progress bar.
- Sequence:
    1. Number counts 0 → 100 (eased ~2.2s); % digit ticks; progress bar fills in sync.
    2. Kicker cycles words: "Strategy · Design · Build · Grow".
    3. At 100: "Neetrick" wordmark snaps in via clip-path wipe + accent flash.
    4. Shutter reveal: 4–5 vertical panels slide away (staggered), exposing the
       hero already animating beneath. Plays shutter.mp3.
- Sound: soft boot.mp3 hum during count; shutter.mp3 on reveal.
- Accessibility: skippable (Esc / tap); reduced-motion = instant fade;
  never blocks content for crawlers.
```

---

# GLOBAL NAV + FOOTER

```
STICKY NAV
- Left: animated "Neetrick" logo (magnetic; subtle mark draw on load).
- Center/right: Work · Services · About · Careers · Insights · Contact.
- Far right: sound toggle (animated bars) + magnetic CTA pill "Let's talk".
- Behavior: transparent over hero → frosted/solid --surface on scroll; hides on
  scroll-down, reveals on scroll-up. Links: accent underline draw + hover.mp3.
- Mobile / overlay menu: hamburger → full-screen --bg overlay via shutter panels.
  Oversized link list, staggered clip reveal, hovered link previews a thumbnail,
  mini-contact + socials inside. Open/close = shutter.mp3.

FOOTER (global)
- Huge animated "Neetrick" wordmark (fills / parallax-shifts on scroll).
- Columns: nav · services · social · legal.
- Big CTA line: "Got a brief? Let's make something smarter."
- Contact: hello@neetrick.com · Jamnagar, Gujarat, India · phone.
- Bottom marquee: "SMARTER TRICKS · BETTER EVERYDAY ·" looping.
- Back-to-top magnetic button (smooth Lenis scroll) · live year · "Made in Jamnagar".
- Newsletter input → chime.mp3 on submit.
```

---

# PART 1 — HOME PAGE (the showpiece)

### SECTION 1 — HERO
```
Goal:   Instant "serious creative agency" hit.
Layout: Full viewport, asymmetric. Oversized headline left/center; small meta
        column (HQ, est. year) offset; animated accent shape (blob/orbit) with
        parallax; scroll cue at bottom.
Motion: Headline animates line-by-line (SplitText clip reveal):
          "Smarter tricks." / "Better everyday."
        Accent shape slow-rotate + parallax; meta fades in staggered.
        Magnetic CTA. Beneath: infinite services marquee reacting to scroll velocity.
Sound:  enter.mp3 settle on load; hover.mp3 on CTA.
Copy:   Sub — "An IT + marketing studio in Jamnagar building brands, products,
          and growth engines that actually move numbers."
        Marquee — "WEB · APPS · BRANDING · SEO · PERFORMANCE MARKETING · CONTENT ·"
Mobile: Headline scales down via clamp; meta stacks; shape simplifies.
```

### SECTION 2 — TRUST / CLIENTS
```
Goal:   Social proof in one glance.
Layout: Thin band; kicker "Trusted by ambitious teams"; grayscale logo marquee
        (placeholders) that colorize on hover.
Motion: Seamless dual-row marquee, opposite directions.
```

### SECTION 3 — INTRO STATEMENT (light "breath" section)
```
Goal:   Define who Neetrick is in one strong paragraph.
Layout: Inverted light theme. One large editorial paragraph; key words in accent.
        Big index "01 — Who we are".
Motion: Word-by-word highlight reveal on scroll (muted → text fill).
Copy:   "We're Neetrick — equal parts engineers and marketers. We design the brand,
        build the product, and run the growth, so you get one partner instead of
        five vendors."
```

### SECTION 4 — SERVICES (pinned, scroll-driven) — FLAGSHIP INTERACTION
```
Goal:   Showcase capability with the hero interaction of the site.
Layout: Pin the section. As user scrolls, the right-side visual + description swap
        through 6 services while a left-side sticky list highlights the active one.
Services:
  01 Web & App Development · 02 Brand & Identity · 03 Performance Marketing ·
  04 SEO & Content · 05 Social & Creative · 06 IT & Cloud Solutions
Each panel: big number, title, one-line promise, 3 bullet deliverables, accent
  hover reveal, "Explore →" to /services/[slug].
Motion: ScrollTrigger pin + progress; visuals cross-fade/clip; active list item
  slides an accent bar; subtle parallax on visuals.
Sound:  enter.mp3 (throttled) as each service activates.
Mobile: Convert pin to stacked accordion/cards (no broken pinning).
```

### SECTION 5 — SELECTED WORK (editorial showcase)
```
Goal:   Prove craft with real projects.
Layout: Asymmetric list of 4–6 projects (NOT a grid). Each row: oversized project
        name, client, tags, year. On hover, floating image preview follows cursor
        with parallax + slight skew.
Motion: Rows reveal staggered; hover preview lerps to cursor; row text shifts on
        hover. Cursor becomes "VIEW" pill. "View all work →" magnetic button.
Sound:  hover.mp3 per row; click.mp3 on open (shutter wipe → /work/[slug]).
```

### SECTION 6 — PROCESS (horizontal scroll)
```
Goal:   Show how engagements run.
Layout: GSAP horizontal scroll. Steps: 01 Discover · 02 Strategy · 03 Build · 04 Grow.
        A connecting line draws as you scroll horizontally.
Each step: number, title, short copy, small animated icon/illustration.
Motion: Pin + translateX driven by vertical scroll; line draw via ScrollTrigger;
        cards parallax in.
Sound:  scrolltick.mp3 (very subtle) while panning.
Mobile: Convert to vertical stepped timeline with line draw.
```

### SECTION 7 — IMPACT / STATS
```
Goal:   Quantify credibility.
Layout: 3–4 oversized counters with mono labels:
          250+ Projects · 90+ Clients · 4.2× Avg ROI · 9 Yrs Experience.
Motion: Count up on enter (useCounter); accent underline draw on finish.
Sound:  count.mp3 as each counter completes.
```

### SECTION 8 — ABOUT TEASER + LOCATION
```
Goal:   Humanize + plant the Jamnagar HQ.
Layout: Split. Left: brand story snippet + "Headquartered in Jamnagar, Gujarat"
        with a stylized map pin / minimal map accent. Right: team teaser collage
        with parallax.
Motion: Parallax images; map pin pulse; text reveal.
Copy:   "From the coast of Gujarat to brands across the globe."  CTA "About us →".
```

### SECTION 9 — TESTIMONIALS
```
Goal:   Voice of the client.
Layout: Auto-advancing premium quote slider OR vertical quote marquee. Large quote,
        client name, role, logo. Accent quotation mark.
Motion: Crossfade/slide with progress dots; drag-enabled (cursor "DRAG").
```

### SECTION 10 — CAREERS TEASER
```
Goal:   Funnel talent.
Layout: Bold band "We're hiring." + hover-reveal list of open roles (ref
        pilcommunication.com/careers energy). Each role hover reveals dept + location.
CTA:    "See open roles →" to /careers.
```

### SECTION 11 — BIG CTA BAND
```
Goal:   Convert.
Layout: Full-width, oversized "Let's build something smarter." + magnetic pill
        "Start a project". Accent shape morph in background. Email shown.
Motion: Text reveal; magnetic CTA; shape parallax.
Sound:  click.mp3 on CTA.
(Then global footer.)
```

---

# PART 2 — WORK / PORTFOLIO

### /work — LISTING
```
Hero:   "Selected Work" oversized + filter chips (All · Web · Branding · Marketing
        · Apps) + animated project count.
Grid:   Editorial broken layout (varied card sizes). Hover plays a muted preview
        reel or image zoom + "VIEW" cursor. Tags + year per card.
Motion: Filter re-layout animates (FLIP); staggered reveal on scroll.
Sound:  hover.mp3 per card; click.mp3 on open.
```

### /work/[slug] — CASE STUDY
```
Hero:        Full-bleed cover; title clip-reveal; meta row (client, year, services, role);
             scroll cue.
Overview:    The brief + the challenge; editorial 2-col with pull quote.
Approach:    Alternating image/text scroll blocks with parallax media.
Results:     Stat counters (traffic ↑, conversions ↑, ROI) → count.mp3.
Gallery:     Large media; cursor "DRAG" horizontal scroller.
Testimonial: Client quote.
Next:        Full-bleed teaser auto-suggesting the next case study with a shutter
             transition. Sticky "Back to work".
```

---

# PART 3 — SERVICES

### /services — OVERVIEW
```
Hero:     "What we do" + one-liner; accent shape.
Body:     6 services as large stacked sections (alternating layout); each with
          number, title, promise, deliverables list, mini case link, "Explore →".
Engage:   "How we engage" mini-process recap (retainer / project / sprint).
CTA band.
```

### /services/[slug] — SERVICE DETAIL
```
Hero:        Service name clip-reveal + value prop + index.
Included:    "What's included" animated checklist reveal.
Approach:    Numbered steps with line-draw.
Stack:       "Tools & stack" tech logo marquee.
Related:     2–3 case study teasers.
Close:       Pricing/engagement note + CTA "Get a quote".
```

---

# PART 4 — ABOUT

### /about
```
Hero:     "We're Neetrick." + mission line, big.
Story:    Editorial long-form with word-highlight reveal; founding in Jamnagar,
          the IT+marketing duality, the philosophy behind "smarter tricks".
Values:   4–5 value cards (Clever · Honest · Outcome-obsessed · Fast · Crafted)
          with hover flip / accent reveal.
Team:     Photo grid; hover desaturate→color + name/role slide-in; parallax.
Culture:  Image marquee of studio life in Jamnagar.
Location: Stylized map of Jamnagar HQ + address + "Visit us".
Timeline: Animated milestones (founded → growth → today) with line draw.
CTA band.
```

---

# PART 5 — CAREERS  (ref pilcommunication.com/careers, Neetrick-branded)

### /careers
```
Hero:     "Build smarter with us." + culture one-liner + perks marquee.
Why:      4 perk blocks (growth · ownership · learning · balance) reveal.
Life:     Image collage / video with parallax.
Roles:    Accordion or hover-expand list grouped by dept. Each row: title, dept,
          location (Jamnagar / Remote), type. Hover reveals summary + "Apply →".
Process:  "How hiring works" 4-step line-draw.
CTA:      "Don't see your role? Pitch us." → contact.
```

### /careers/[slug] — ROLE DETAIL
```
Header:   Title, dept, location, type. Sticky "Apply" button.
Body:     About the role · responsibilities · requirements · nice-to-haves · perks.
Form:     name, email, portfolio/CV upload, message → chime.mp3 on success.
```

---

# PART 6 — CONTACT

### /contact
```
Hero:   "Let's talk." oversized + "Tell us about your project."
Split:
  Left  → Premium form (single elegant OR multi-step): name, email, company,
          budget range (pill selector), services interested (multi-select chips),
          message. Floating labels, focus accent glow, validation states.
          Submit → success state with chime.mp3 + accent burst (confetti-lite).
  Right → hello@neetrick.com · phone · Jamnagar HQ address · socials ·
          response-time note · embedded stylized map.
FAQ:    Accordion (engagement, timelines, pricing).
Footer.
```

---

# PART 7 — INSIGHTS (optional blog)

### /insights — LISTING
```
Hero:   "Insights" + category filter. Featured post large + editorial card list.
Cards:  Hover reveal + reading time; staggered reveal.
```

### /insights/[slug]
```
Header:   Big title clip-reveal; meta (author, date, read time); cover.
Progress: Reading-progress accent bar at top.
Body:     Clean editorial typography, pull quotes, code/image blocks.
Close:    Share row · related posts · newsletter CTA.
```

---

# PART 8 — 404

```
404:
- Playful oversized "404" with kinetic/glitch text.
- Line: "This trick disappeared."
- Magnetic "Back home" button + brand wordmark.
- On-brand, fun, fast.
```

---

# PART 9 — DELIVERABLES & DEFINITION OF DONE

### DELIVERABLES
```
- Full Next.js (App Router, TS) project; one component per section; clean structure:
    app/ · components/ · lib/ · hooks/ · providers/ · public/
- Centralized tokens (colors, fluid type scale, spacing) + sound config map.
- Hooks: useSound · useMagnetic · useScrollReveal · useCounter · useCursor · useLenis.
- Placeholder content, images, and /public/sounds/*.mp3 — all easy to swap.
- README: setup, asset locations, how to add/replace sounds, theming guide.
```

### DEFINITION OF DONE
```
- Every section animates on scroll; loader + shutter transitions work.
- Sound toggle persists and never autoplays; custom cursor + magnetic buttons live.
- Fully responsive (mobile reflows, no broken pins).
- prefers-reduced-motion respected.
- Lighthouse 90+; SEO + OG per route; no console errors.
```

---

## ASSET CHECKLIST (replace placeholders before launch)
```
- Logo / wordmark (SVG)
- Brand fonts (licensed, self-hosted)
- 6 service visuals/icons
- 4–6 case studies (covers, galleries, results)
- Team photos + studio/BTS photos (Jamnagar)
- Client logos
- 8 sound files in /public/sounds (boot, shutter, hover, click, enter,
  scrolltick, count, chime) — royalty-free
- Real copy for hero, about story, services, careers roles, testimonials
- OG/social images per route
- Jamnagar HQ map embed + address + contact details
```

---

*End of master prompt. Build PART 0 first, then the loader, then Home top-to-bottom, then remaining pages. Premium quality throughout.*
