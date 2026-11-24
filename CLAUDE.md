# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing site for Sunnyside (Sunnyside Solutions LLC), Grant Bellar's software studio in Wichita, Kansas, live at sunnyside.sh. Sunnyside sells web software on a flat monthly subscription: clients send requests one at a time, each one is built and shipped, and plans can be paused. Grant does all the work himself; the site speaks as "we" for the studio and says plainly that Grant builds every request.

The live site is four files in the root directory:

- `index.html` - Single page: hero with an example request queue, "On the record" stats strip, how it works, work (six case studies), the menu of what people ask for, who builds it, pricing, FAQ, the dark closer with the contact form, footer
- `privacy.html` - Privacy page, same header and footer
- `styles.css` - All styling, using CSS custom properties in `:root`
- `script.js` - Sends the contact form to Formspree with `fetch`, and makes the plan buttons preselect a plan in the form

Images live in `images/`. `grant.jpg` (1000x1250, 4:5, EXIF stripped) is used for the founder block and og:image. The other images are used only by `designs/`.

## Design

The look is the "C2 / Day" frame in the Suncraft Paper file, renamed from Suncraft to Sunnyside (https://app.paper.design/file/01M80M3P5X62XMQR5S9NK6MPHB/p-1-0/9Y-0):
- White page, ink `#111`, one accent: sun orange `#FF4F00`. Body greys `#444` and `#666`, hairlines `#eee`
- The dark closer, contact form and footer use near-black `#0C0B09` with cream `#F2EBDD` text and dust `#A8A092`
- Bricolage Grotesque 700 with tight negative tracking for headlines and big numbers; Geist for body and buttons; Geist Mono uppercase for labels, states and small facts (Google Fonts)
- Square corners, 1px ink hairlines between every section, solid ink or orange buttons
- The mark is a half sun on a horizon line next to the lowercase "sunnyside" wordmark, inline SVG in the header, footer and `favicon.svg`
- The sun motif carries the request states: queued is a bare horizon line, building is a half sun, shipped is a full sun
- The closer has an ASCII-art sun in Geist Mono with an orange glow
- Breakpoints at 1180px, 860px (header nav hides, everything stacks) and 520px
- No dark mode

## Content Rules

- Every number on the page comes from real past work. Do not add placeholder stats, request counts, turnaround averages or testimonials.
- Clients and companies are never named or described in case studies; the problem, what we built and what changed carry each one.
- The hero queue is labelled "Example queue" because its items are illustrations, not real requests.

## Contact Form

Posts to `https://formspree.io/f/xrbapzlz`. Fields: email, link, need, plan, message. Without JavaScript it falls back to a normal form post.

## Development

No build process, dependencies, or tests. Run a local server from the repo root:

```
python3 -m http.server 8000
```

## Deployment

`Dockerfile` builds a Caddy image serving the root files and `images/`. When adding a new top-level file or directory the live site needs, add it to the `COPY` lines. `designs/` is not deployed.

## Design Mockups

`designs/` holds earlier rebrand explorations (variations A through G, palettes, marks and fonts) from before the subscription site. They are reference only and are not part of the live site.
