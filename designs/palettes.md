# Palettes

Round seven. Seven palettes, each applied to G2a (Young Serif, Instrument Sans, the refined horizon mark). Compare them in `palettes.html` and open each one full page from there.

## What's off with the current palette

Current colors: sky `#E6F0FF`, white paper, navy ink `#1C2B3A`, link blue `#0A5BD8`, sun `#FFC51A`, marker `#FFE45C`.

- **Three unrelated colors.** A cool sky, a saturated link blue and a warm yellow each pull in a different direction, and none of them is clearly in charge.
- **The link blue is the default software blue.** `#0A5BD8` sits close to the browser's default link color and to most SaaS buttons. It reads as generic tech, not as a one-person studio called Sunnyside.
- **Pure white paper.** Next to a warm yellow, pure white looks clinical, and a yellow disc on white is part of why the old mark read as an egg. Design guides consistently advise against pure gray and pure black and suggest adding a little color to neutrals ([Rometheme](https://rometheme.net/blog/uncategorized/the-60-30-10-color-rule-in-ui-design/)).

## Principles used

1. **60-30-10.** Roughly 60% is a neutral that sets the mood (the stage and paper), 30% is a supporting color (the ink, used for text and the mark), and 10% is the accent, used only for links and buttons ([webpop design](https://www.webpopdesign.com/60-30-10-rule-web-design-colour-palette/), [UX Collective](https://bootcamp.uxdesign.cc/the-60-30-10-color-rule-for-ui-design-32695d04a7c2)).
2. **The sun stays special.** Yellow appears only in the mark and the highlighter, never in buttons or large fills (Butter is the exception). The name already says "sunny", so the color doesn't need to repeat it everywhere.
3. **Tinted neutrals.** Paper is a warm off-white, and the ink and soft ink lean toward each palette's hue instead of being pure navy or gray. Mailchimp is a good example of this: its bright yellow gets "something solid to push against" from Peppercorn `#241C15`, a warm near-black, rather than from pure black ([Mailchimp brand assets](https://mailchimp.com/about/brand-assets/), [summary](https://www.shadcn.io/design/mailchimp/raw)).
4. **Lighter colors get less saturation.** The stage colors are pale and muted, and the strong color is saved for the accent. Perceptual color guides recommend reducing chroma as colors approach white or black, because full saturation at extreme lightness looks garish ([LogRocket on OKLCH](https://blog.logrocket.com/oklch-css-consistent-accessible-color-palettes), [Atmos](https://atmos.style/glossary/oklch-color-space)).
5. **Warmth and trust together.** Yellow reads as optimistic and warm, and blue as dependable ([Vistaprint](https://www.vistaprint.com/hub/color-psychology)). A one-person studio needs both, so most palettes set a warm sun against a cooler or deeper accent. Earthy tones like terracotta, gold and cream are associated with craft and handmade work ([Lifencolors](https://lifencolors.in/blogs/blog/the-morning-raga-palette-soft-golds-and-earthy-terracottas)).
6. **Readable everywhere.** Every text pairing clears WCAG AA (4.5:1), and dark text on the stage and paper clears 7:1 in every palette. The ratios are listed under each palette on the sheet.

## The palettes

| Palette | Stage | Paper | Ink | Accent | Sun | Idea |
|---|---|---|---|---|---|---|
| Clear morning | `#E9F0F8` | `#FFFDF8` | `#1B2A3A` | `#1F5BB8` | `#FFC226` | Today's direction, tuned. Softer sky, a deeper blue, warm paper |
| Prairie | `#F3EAD7` | `#FFFBF2` | `#2A2219` | `#2B4C7E` | `#F4B02A` | Wheat and Kansas sky. Warm ground, cool accent |
| Golden hour | `#FBE7CF` | `#FFFAF3` | `#2B1E16` | `#B0431E` | `#FFB01F` | Apricot and terracotta. Matches the orange cap in the photo |
| Dusk | `#ECE8F3` | `#FFFCF7` | `#221F3A` | `#4338A6` | `#FFB238` | Violet sits opposite yellow on the color wheel, so the sun stands out most |
| Sky and clay | `#E2ECEF` | `#FFFCF7` | `#1D2A30` | `#A8432A` | `#FFC233` | Cool backgrounds with a warm accent for actions |
| Lake | `#E4EBE3` | `#FFFDF8` | `#1E2A24` | `#2E6B57` | `#FFB627` | Sage and deep green, taken from the lake in the photo |
| Butter | `#FFEDB0` | `#FFFDF5` | `#241C15` | `#241C15` | `#FFB000` | Mailchimp's approach: a yellow stage, near-black ink and no second color |

Each palette on the sheet has an "Open in Coolors" link that loads it at [coolors.co](https://coolors.co) so you can lock the colors you like and regenerate the rest. The order there is stage, paper, ink, accent, sun, marker.

## Where I'd start

- **Prairie** is the most balanced. Warm ground and a cool accent, with the sun as the only bright color. It also ties back to Wichita.
- **Golden hour** is the warmest and most personal, because it picks up the photo.
- **Clear morning** is the safe choice if you mostly liked what you had.

## Round eight

After round seven: Clear morning and Butter were the favorites, Dusk was interesting but not quite right, and the rest were too quiet or didn't fit. Compare these in `palettes2.html`.

| Palette | Stage | Ink | Links | Buttons | Sun | Idea |
|---|---|---|---|---|---|---|
| Bluebird | `#DCEAFE` | `#172A45` | `#1E56D6` | `#1E56D6` | `#FFC21A` | Clear morning with more sky |
| Morning, one blue | `#E9F0F8` | `#1B2A3A` | `#1B2A3A` | `#1B2A3A` | `#FFC226` | Clear morning with the bright blue removed. The sky is the only blue |
| Sky and butter | `#E4EEFB` | `#1B2A3A` | `#1F5BB8` | `#FFC93C`, navy text | `#FFC226` | Clear morning with Butter's yellow on the buttons |
| Butter and sky | `#FFEDB0` | `#1E2433` | `#1E4FC2` | `#1E4FC2` | `#FFB000` | A yellow stage with cobalt actions |
| Soft butter | `#FFF3CF` | `#241C15` | `#241C15` | `#241C15` | `#FFB000` | A calmer, creamier Butter |
| Full sun | `#FFD94A` | `#1F1912` | `#1F1912` | `#1F1912` | `#FFB000` | Saturated yellow stage, the loudest option |
| Periwinkle | `#E7E9F8` | `#1E2244` | `#3A48C2` | `#3A48C2` | `#FFBE2E` | Between Clear morning and Dusk |

All seven pass WCAG AA. The lowest ratio is 5.1:1, for Bluebird's links on its stage.

## Current pick

Bluebird (`palette-bluebird.html`). The mark is still open between G2, G2a and G2c.
