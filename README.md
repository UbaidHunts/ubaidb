# PhD page

Static site. No build step, no dependencies — three files.

```
index.html           home — education, experience, publications, contact
beyond.html          hobbies: Batman, reading, The Wall-CASL photos
blog.html            "Coming soon…" — the post index is commented out below it
posts/first-post.html  a post, and the reference for every prose element
styles.css           design tokens at the top, components below
main.js              scroll reveal, active nav link, footer year
assets/images/favicon-*.png   batman-logo.png is the source
assets/
  cv.pdf
  images/            every image, including og.jpg when you make one
  images/figures/    architecture diagrams
  posters/           conference posters, one PDF per paper
  slides/            talk decks, one PPTX per paper
```

Images all live in `assets/images/`. Nothing image-shaped goes loose in
`assets/`.

`CLAUDE.md` sits alongside these and is loaded automatically by Claude Code —
it covers the code's conventions and constraints, so a fresh session starts with
the context instead of guessing.

The nav block is duplicated in all four pages. If you add or rename a link,
update every one of them — there's no templating. Each page marks its own nav
link with `aria-current="page"`; subpages link back with `index.html#section`.

## Preview locally

```bash
# from the repo root. --bind keeps the server off the local network.
python3 -m http.server 8000 --bind 127.0.0.1
# open http://127.0.0.1:8000
```

Opening `index.html` directly in a browser works too.

## Editing

Everything you change is marked with `<!-- EDIT: ... -->`. Sections are
delimited by banner comments.

### index.html

Content here is real, migrated from the old site and `assets/cv.pdf`.

| Section | id | How to extend |
| --- | --- | --- |
| Hero | `#top` | Name, one-line thesis, location, CV link |
| Research | `#research` | Duplicate an `<article class="work-card">` per project |
| Publications | `#publications` | Duplicate an `<li class="pub">` per paper, newest first |
| Experience | `#experience` | Duplicate an `<li class="track__item">` |
| Tools | `#tools` | Duplicate an `<article class="stack-group">` |
| Awards | `#awards` | Reuses the timeline: `<li class="track__item">` |
| Teaching & service | `#service` | Duplicate a `<article class="small-card">` |
| Approach | `#approach` | Three `<li class="belief">` — **still placeholder** |
| Contact | `#contact` | Email, links, criteria list |

To add a paper: add an `<li class="pub">` to `#publications` in the right venue
group, with the PDF link pointing at the publisher (ACM DL or IEEE Xplore — the
site keeps no local paper PDFs). Drop the poster and slides in
`assets/posters/` and `assets/slides/` using the `{project}-{venue}{yy}` naming.
If it deserves a card, copy a `work-card` block and put its figure in
`assets/images/figures/`.

### beyond.html

| Section | id | How to extend |
| --- | --- | --- |
| Currently | `#now` | Four `<div>`s in the kraft card — the cheapest thing to keep fresh |
| Hobbies | `#gaming` | Duplicate an `<article class="hobby">`; add `hobby--flip` to swap sides |
| The shelf | `#reading` | `<div class="shelf__group">` per group, `<li class="book">` per book |
| The wall | `#wall` | Duplicate a `<figure class="photo">`, or delete the section |

### blog.html and posts/

To add a post: copy `posts/first-post.html` to `posts/your-slug.html`, change
the `<head>` metadata and the body, then add an `<li class="post">` to the top
of the list in `blog.html` (and point the featured card at it if it's the
newest).

`posts/first-post.html` is written as a live reference — it demonstrates every
styled element available inside `.prose`: headings, lists, code blocks, pull
quotes, figures, tables, rules, and footnotes. Keep a copy around and delete
from it rather than writing a post from scratch.

Add `class="reveal"` to anything new that should fade in on scroll.

### Alternating research cards

Add `work-card--flip` to a `work-card` to put the figure on the left. Swap the
paper texture with `paper--ruled`, `paper--graph`, `paper--light`, `paper--grey`,
or `paper--kraft`.

### Replacing a placeholder image

Delete the `<div class="placeholder-asset">` and drop in:

```html
<img src="assets/images/figure-1.webp" alt="Describe what the figure shows." width="1200" height="900" />
```

Always write a real `alt`. For figures, say what the reader would see.

### Colours and type

Top of `styles.css`, under `:root`. `--accent` drives every red highlight;
`--desk` and `--paper*` are the background and card surfaces. Fonts load from
Google Fonts in `index.html` (Fraunces, Inter, Gochi Hand, JetBrains Mono) and
fall back to system faces if offline.

## Deploying

GitHub Pages is the least-effort option: push these files to a repo, then
Settings → Pages → deploy from `main` / root. Cloudflare Pages and Netlify also
work with no configuration — point them at the repo, leave the build command
empty, publish directory `/`.

Before publishing, replace the `your-domain.dev` URLs in the `<head>` of
`index.html` so link previews and the canonical URL are correct.
