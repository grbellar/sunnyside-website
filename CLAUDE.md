# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Sunnyside, Grant Bellar's software studio in Wichita, Kansas. Grant turns prototypes founders build themselves into real products, and builds automations, internal tools, and dashboards for small businesses. Mobile apps are no longer the focus.

The live site is three files in the root directory:

- `index.html` - Single page: photo snapshot and link list hero, a short letter from Grant, work, and contact form
- `styles.css` - All styling, using CSS custom properties in `:root`
- `script.js` - Sends the contact form to Formspree with `fetch`, and runs the work section layouts

Images live in `images/`:
- `grant.jpg` - Hero snapshot photo, 1000x1250 (4:5), EXIF stripped
- `grant-face.jpg` - 256px square crop used in the letter signoff

## Design

The look comes from design B in `designs/b.html`:
- One pale blue `--sky` stage holds the whole page like a desk, and every piece of content sits on it as paper: the photo snapshot, the letter, the project sheets, and the contact form as a reply sheet. Only the header and footer sit outside it.
- Rotated photo snapshot with a handwritten caption
- Letter on stacked paper sheets with a yellow marker highlight and a signature
- Schibsted Grotesk for headlines, sheet titles and the wordmark; Hanken Grotesk for body text; Homemade Apple for handwriting; IBM Plex Mono only for hard facts like the work sheet numbers (Google Fonts)
- Logo is the G2c "Reflection" mark: a half sun over a horizon line with a yellow reflection, inline SVG in the header `.mark` and in `favicon.svg`
- One breakpoint at 760px where the hero stacks
- No dark mode

## Work Section

Each project is an `article.sheet` inside `.work-list` in `index.html`, with `data-offer` (used for the stack's filter chips), a `.shot` screenshot, tag, title, the problem as a one-line summary, a `.readout` with the project's key number on a strip of tractor-feed greenbar printout, and a what I built / what changed list. Clients and companies are never named or described; the problem and solution carry each sheet. Each sheet has an inline SVG illustration split into before (left) and after (right) with handwritten labels. The problem is drawn in `--trouble` red (tangles, blanks, question marks, crossed-out pieces); the solution gets one marker-yellow highlight and a blue check badge. Styles are the `.shot` classes in `styles.css`.

Two layouts read the same markup:
- Desk (default): sheets laid out in a grid, "Read the whole story" opens a dialog. A horizontal swipe row on phones. Also the layout without JavaScript.
- Stack (`?work=stack`): one sheet on a pile, swipe, drag, arrow buttons or keys, with filter chips.

## Contact Form

Posts to `https://formspree.io/f/xrbapzlz`. Fields: email, link, need, budget, message. Without JavaScript it falls back to a normal form post.

## Development

No build process, dependencies, or tests. Run a local server from the repo root:

```
python3 -m http.server 8000
```

## Deployment

`Dockerfile` builds a Caddy image serving the root files and `images/`. When adding a new top-level file or directory the live site needs, add it to the `COPY` lines. `designs/` is not deployed.

## Design Mockups

`designs/` holds the rebrand exploration: variations A through F, B1 through B10, and G1 through G6 (the live site with new fonts and logo marks, plus `logos.html` comparing the marks), G2a through G5c (refinements of G2, G3 and G5, with `marks.html` showing each mark beside its fonts), and `palette-*.html` (G2a in seven palettes, compared in `palettes.html`, and round eight in `palettes2.html`, with reasoning in `palettes.md`), and `fonts.html` (a font tester for the G2 marks in Bluebird), an index page, and `switcher.js` for moving between them. `designs/legacy/` is the previous sun/moon themed site. `designs/copy.md` has copy drafts. These are reference only and are not part of the live site.
