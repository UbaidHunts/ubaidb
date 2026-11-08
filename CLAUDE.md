# CLAUDE.md

Context for Claude Code working in this repo: the code, its conventions and its
constraints. There is no README — it was removed deliberately, so don't add one
back without being asked.

## What this is

The personal academic site of **Ubaid Bakhtiar**, ECE PhD candidate at the
University of Maryland, College Park, in the Computer Architecture and Systems
Lab (CASL) under Dr. Bahar Asgari. Research: closing the gap between peak and
achievable performance on sparse AI and scientific-computing accelerators via
data scheduling, multi-tenancy, and dynamic reconfiguration. Graduating May 2027.
Also an Applied Scientist intern at Annapurna Labs, Amazon (May 2026 – present),
on mixture-of-experts LLMs on Trainium.

Four hand-written static pages. `index.html` and `beyond.html` both carry
**real** content — publications, numbers, links, photos, his own prose.
`blog.html` is a "Coming soon…" page and `posts/first-post.html` is still
**placeholder**; he writes those himself.

Never invent biographical facts, publication metadata, result numbers, or
affiliations. Everything factual on `index.html` traces to `assets/cv.pdf` or a
paper's own abstract. If you need a fact that isn't in those, ask.

The visual language is a "desk" metaphor: a dark warm background with light
paper cards sitting on it at slight rotations, masking-tape strips, a
handwriting face for asides. It is a deliberate reimplementation of the design
language of `aliawais.dev`, not a copy of its code or content.

## Hard constraints

- **No build step, no dependencies, no framework.** Plain HTML, one CSS file,
  one small IIFE of vanilla JS. Do not introduce npm, a bundler, Tailwind, React,
  or a static site generator. If a task seems to need one, say so and ask first.
- **Content lives in HTML, not JS.** Publications and posts must be in the
  markup so Google Scholar and other crawlers can read them. Never move content
  into a JS data array that renders client-side.
- **Works from `file://`.** No ES modules, no `fetch`, no absolute paths.
  `main.js` is ES5-style on purpose.
- **No new files without reason.** Prefer extending the existing four pages and
  one stylesheet.

## Layout

```
index.html            home, in this order: hero, #education, #experience,
                      #publications, #tools, #awards, #service, #contact.
                      Education and work experience come before the rest on
                      purpose — he asked for that order.
                      #research (4 first-author project cards) is COMMENTED OUT
                      in place, and its nav link removed from all pages.
                      Its inner `<!-- ─── Chasoň ─── -->` markers had to be
                      deleted first, since HTML comments cannot nest.
beyond.html           hobbies: #gaming (Batman), #reading (bookshelf),
                      #video-games (COMMENTED OUT until the clip arrives),
                      #wall (The Wall-CASL photo wall)
blog.html             a "Coming soon…" page. The featured card and the dated
                      archive list are COMMENTED OUT in place as templates;
                      `<section id="posts">` itself stays live because the skip
                      link targets it.
posts/first-post.html one post; also the live reference for every .prose element
styles.css            tokens in :root, then components, in section banners
main.js               scroll reveal, scroll-spy, nav hairline, footer year
(favicons live in assets/images/favicon-*.png)
.gitignore            .DS_Store and editor cruft
assets/
  cv.pdf              the only document outside the subfolders, and the
                      authoritative source for every fact on index.html;
                      replaced 2026-10-29 from ~/Downloads/resume_ubaidb.pdf.
                      Note: ~/Downloads is blocked by macOS TCC for this
                      process — ask the user to copy files out of it.
  images/             EVERY image lives here. Nothing image-shaped belongs
                      loose in assets/ any more.
    portrait.jpg      900px tall; shot in front of the White House
    urdu-name.webp    his name hand-lettered in Urdu, 740x300. A scan of ink on
                      paper, so it is blended onto the hero sheet in CSS rather
                      than cut out — see the hero notes below.
    location-pin.png  80px map pin, used in the hero photo caption
    logo-amazon.svg   vector, from Wikimedia Commons. The wordmark paths
                      inherit the root `style="fill:#ede4d6"` (changed from
                      #221f1f so it reads on the dark page); the two swoosh
                      paths carry their own #ff9900. Edit that one declaration
                      and nothing else — reformatting the file corrupted a
                      letter path once already.
    logo-casl.png     640x479, downscaled from the 2732px original at
                      casl.cs.umd.edu/logo.png. Already transparent.
    logo-lums.png     350x286
    University_of_Maryland_seal.svg
    batcave-*.jpg     the desk and the figurine shelves, on beyond.html
    cover-*.jpg       three book covers, ~300px tall, on the bookshelf
    wall-*.jpg        five CASL photos for #wall, 800px long edge, ~600 KB the
                      lot. Never cropped square — a labmate sits at the edge of
                      every frame. Originals were deleted after downscaling.
    figures/*.png     5 architecture diagrams, downscaled to 1600px wide. Only
                      referenced from the commented-out #research cards.
  posters/*.pdf       acamar-micro24, chason-micro25, pipirima-dac25,
                      procyon-dac26 (no Segin poster)
  slides/*.pptx       same slugs, 4 of them — 53 MB total, see below
```

`assets/papers/` is gone: every PDF link points at the ACM DL or IEEE Xplore
instead, so the five local copies were unreferenced and were deleted. Same for
`index_template.html`, the generic scaffold the site was built from.

Asset filenames are lowercase kebab-case `{project}-{venue}{yy}`. The originals
came from `github.com/UbaidHunts/ubaidb` (an academicpages fork whose root
`index.html` was the live site); that repo is cloned for reference at
`/Users/ubaidb/Documents/ubaidb-old-ref/repo` and is disposable.

`assets/images/figures/segin-architecture.png` is present but unused — Segin is
second-author, so it appears only in the publication list. It's there if a Segin
card ever gets added.

**The slides are heavy.** Four `.pptx` files total ~53 MB, which dominates the
repo. If size becomes a problem, export them to PDF and update the five
`assets/slides/*.pptx` links rather than dropping them.

## Conventions

- **The contact card's social icons are inline SVG**, not image files. The
  glyph paths were lifted from the icon fonts his old site already shipped
  (Academicons for Google Scholar, Ionicons for GitHub and LinkedIn), converted
  with `translate(0,448) scale(1,-1)` inside a `0 0 512 512` viewBox — both
  fonts are units-per-em 512, ascent 448, and font glyphs are y-up from the
  baseline. They use `fill="currentColor"` so they inherit the card's ink
  colour. Do not redraw brand marks from memory; reuse these or a real icon set.
- **Accent is yellow (#F9DA5B).** `--accent` / `--accent-bright` are ~89-93%
  lightness, so they only work on the dark desk. Anything on light paper — tag
  text, card kickers, `.field dt`, `.detail summary`, prose bullets and
  blockquote rules — must use `--accent-deep` (46% L) or it will be invisible.
  Solid buttons are a bright fill with `--ink` text, not the reverse. He asked
  for yellow as an experiment, so it may well revert; changing the three tokens
  back is most of the job, but re-check the paper-surface cases listed above.
- **Tokens first.** All colour and type decisions live in `:root` at the top of
  `styles.css` (`--desk*`, `--paper*`, `--ink*`, `--chalk*`, `--accent*`, the
  `--text-*` clamp scale). Change a token rather than hardcoding a value in a
  component. Colours are `oklch()` and mixed with `color-mix(in oklab, …)`.
- **The hero is a cream ruled sheet; the rest of the page is dark.**
  `.hero--paper` on `index.html` carries the same ruled ground as the Chasoň
  card, so every child colour is overridden to ink. `<body class="has-paper-hero">`
  turns the sticky nav cream-on-ink, and hides the `.site-nav__name` wordmark,
  while `data-past-hero="false"` — an attribute `main.js` sets from an
  IntersectionObserver on the hero, with rootMargin offset by the nav height.
  Once the hero scrolls out from under the nav it flips to `"true"` and the dark
  treatment plus the wordmark take over. Those rules key on an explicit
  `="false"`, never `:not(…="true")`, so with JS off the attribute is absent,
  neither matches, and the dark/visible defaults hold. Two more gotchas: the nav
  must carry the paper colour itself (it is in normal flow above the hero, so
  `transparent` lets the dark body show through), and the `em` in
  `.hero__statement` is brown, not the accent, because yellow on cream is
  invisible.
  A framed graph-paper variant was tried and rejected; this flat ruled one is
  what he wants. `--text-name` is larger than `--text-hero` on purpose: the
  name leads, the statement sits under it as a subheading.
- **Paper surfaces.** `.paper` plus a texture modifier: `--light`, `--grey`,
  `--kraft`, `--ruled`, `--graph`. Ruled is for short card text; long-form prose
  uses `--light` because the rules hurt readability at length.
- **Text utilities.** `.mono-label` for every uppercase eyebrow/kicker/meta
  line, `.marker` for the handwriting face, `.tag` for pills. Headings get
  `--font-display` (Fraunces) globally; body is Inter.
- **Placeholders.** `<div class="placeholder-asset">` is a dashed hatched slot
  standing in for an image. `data-ground="desk"` for slots on the dark
  background, `data-ground="paper"` for slots on a card. Replacing one means
  deleting it and dropping in an `<img>` with a real `alt`. `index.html` has
  none left; `beyond.html` and the post template still use them.
- **Images.** Always set `width`/`height` (intrinsic pixels, prevents layout
  shift) and `loading="lazy"` on anything below the fold. Architecture diagrams
  are transparent PNGs, so `.work-card__figure img` gives them an opaque backing
  — otherwise the ruled/graph sheet shows through their labels. Decorative
  images in the hero collage take `alt=""` since the collage is
  `aria-hidden="true"`.
- **Reveal on scroll.** Add `class="reveal"` to opt in; `main.js` sets
  `data-reveal` and CSS animates it. Elements without the class are always
  visible. Anything revealed must be readable with JS disabled — the pending
  state is only applied by JS, so this holds by construction.
- **Comments.** The HTML carries `<!-- EDIT: ... -->` markers and banner
  comments per section; these are instructions for the owner and should be kept
  accurate when sections change. Do not add explanatory comments beyond that,
  and do not comment what the code obviously does.
- **Rotations.** Several components are tilted a fraction of a degree. Every one
  must be reset in the `prefers-reduced-motion` block near the bottom of
  `styles.css`. Use `rotate: 0deg`, not `rotate: none` (invalid).

## The nav is duplicated four times

There is no templating. The `<header class="site-nav">` block appears verbatim
in all four pages, with two differences per page:

1. The page's own link carries `aria-current="page"`.
2. Paths are relative to the file: `index.html` uses `#research`,
   `beyond.html`/`blog.html` use `index.html#research`, and `posts/*.html` use
   `../index.html#research` plus `../styles.css` and `../main.js`.

**Any nav change must be applied to all four files.** The scroll-spy in
`main.js` deliberately filters to links whose `href` starts with `#`, so
cross-page links keep their hardcoded `aria-current` and `document.getElementById`
never receives a filename.

Nav order mirrors the page: Education, Experience, Publications |
Beyond research, Blog, Contact (no Research link — that section is commented
out). Education and Experience are marked
`<li data-optional>` and hidden under 46rem; what remains wraps to a second row
rather than overflowing. Adding another top-level nav item will reintroduce
mobile overflow — re-run the 390px iframe check after any nav change.
`.nav-divider` separates in-page anchors from other-page links.

## Verifying changes

There is no test suite, so changes are verified by rendering. Chrome is at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Node is v18, so
Playwright is unavailable.

```bash
cd /Users/ubaidb/Documents/ubaidb-phd
python3 -m http.server 8000 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
  --window-size=1440,1200 --screenshot=/tmp/out.png \
  --virtual-time-budget=6000 http://localhost:8000/index.html
```

Notes on this workflow, learned the hard way:

- `--force-prefers-reduced-motion` is needed or `.reveal` elements below the
  fold screenshot as blank.
- A tall `--window-size` captures a long page in one shot, but **a narrow one
  does not test mobile** — the headless window has a minimum width, so the
  layout is wider than the screenshot and content looks falsely clipped. To test
  a narrow viewport, load the page in a 390px-wide `<iframe>` from a scratch
  probe page and screenshot that, then delete the probe file.
- `sips --cropOffset` is not a reliable absolute offset; prefer several
  screenshots at different `--window-size` heights over cropping one tall image.
- A `<code>` inside `<pre>` legitimately exceeds the viewport — `pre` has
  `overflow-x: auto`. Only `documentElement.scrollWidth` exceeding the viewport
  is a real overflow bug.

## Publication ordering — deliberate, do not "fix"

`#publications` is **not** in reverse-chronological order. He asked for it
grouped by venue prestige:

1. MICRO (Chasoň 2025, Acamar 2024)
2. DAC (Procyon 2026, Pipirima 2025)
3. Everything else (Segin / IEEE CAL 2025)
4. Under review (Orkaria, Lyra, Myla, Lepus)
5. In progress (Asterope, Topology-aware MoE Load Balancer)

The `#research` cards follow the same order, which is why Procyon (2026) appears
after Acamar (2024). Newest-first looks like a bug here but is not.

Each entry's venue block is three stacked lines: `.pub__conf` (accent colour),
`.pub__place` (city), `.pub__year`. Entries under review or in progress carry
only a `.pub__conf` of "Under review" / "In progress" — no place, no year, no
links. Do not guess a venue for them.

**Paper links point at publishers, not local PDFs.** The "PDF" link on every
entry and every research card is the ACM DL or IEEE Xplore URL; `assets/papers/`
was deleted once nothing referenced it. Slides and posters are still served
locally. Chasoň, Procyon and Pipirima also carry a **Presentation** link to a
talk on YouTube — bare `youtu.be/<id>`, with the `?si=` share token stripped.

**Titles are tuned to hold a single line** at desktop width: `.pub__title` is
`1rem` and `#publications` carries `section--wide` (82rem container instead of
72rem). Both exist only so the longest title (Acamar, 129 chars) does not wrap.
Measure before changing either — do not add `white-space: nowrap`, which
truncates. To check, load the page in a 1440px iframe and compare each
`.pub__title` height against its computed `line-height`.

## Known gaps

- `#approach` (three beliefs) was deleted, not hidden — don't re-add it.
  Personal opinions and hobby copy are his to write; don't draft them for him.
- No `assets/images/og.jpg` yet, so link previews have no image. Needs 1200×630;
  the five `og:image` meta tags already point at that path.
- The commented-out `#video-games` section on `beyond.html` is waiting on a
  gameplay clip. Before committing a video, settle format (landscape vs
  phone-portrait), playback (autoplay-muted-loop vs controls) and file size —
  a clip can easily outweigh everything else here. Instructions for dropping it
  in are in that section's comment wrapper; it expects `assets/video/`.
- `posts/first-post.html` is still entirely placeholder, and `blog.html` says
  "Coming soon…" with its post list commented out.
- `git init` has been run on branch `main`. Nothing is committed and there is no
  remote.
- The slides are the whole weight of the repo now: 53 MB of `.pptx` against
  about 14 MB of everything else.

## Deployment

Static hosting, no config: GitHub Pages from repo root, or Cloudflare
Pages/Netlify with an empty build command. Canonical and Open Graph URLs
currently point at `https://ubaidhunts.github.io/ubaidb/`, his existing GitHub
Pages address; update every page's `<head>` if the site moves.
