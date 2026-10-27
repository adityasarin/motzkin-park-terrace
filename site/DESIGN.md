# DESIGN.md: Motzkin Park Terrace

The design contract for the site. Tokens live in `app/globals.css` `:root`; nothing outside `:root` may hold a raw colour (the OG image in `app/opengraph-image.tsx` repeats them because it cannot read CSS). Direction and reasoning: `../docs/design-direction.md`.

## The idea
**The 47-plot site plan is the fixed stage.** Half of the screen holds still, showing a lake, the site plan or the 1878 map. The other half scrolls through the facts. The visitor's one live action is choosing 3 BHK or 4 BHK and seeing where those villas sit, plot by plot.

## Colour: charcoal and sage
| Token | Value | Use |
|---|---|---|
| `--bg` | #1c1c1c | Page ground |
| `--surface` / `--surface-2` | #262626 / #303030 | Tone steps between sections (no lines) |
| `--ink` | #f1f1ef | All running text on charcoal |
| `--muted` | #a6a7a1 | Secondary notes only (≥ 4.5:1 on `--bg` and `--surface`) |
| `--accent` | #8fa68e | The action (buttons, active toggle) and the amenities field. Nowhere else |
| `--accent-ink` | #1c1c1c | Text on sage |
| `--paper` | #e2e2dd | Printed things: hero card, distance sheet, price field, dialog, forms |
| `--paper-ink` / `--paper-muted` | #1c1c1c / #4a4b46 | Text on paper |
| `--plan-*` | see CSS | Site- and floor-plan drawings only |

Proportions: charcoal is about 60% of the page, paper 25%, sage 15%. A section may switch its whole field colour; nothing fades into anything.

## Type
- Display: **Young Serif** 400, tracking −0.02em, leading 0.98, sentence case.
- Text: **Source Serif 4** 400/600, leading 1.55, 45–75 characters per line.
- Steps: `--step-small` 13–14px · `--step-body` 17–19px · `--step-lead` 20–26px · `--step-head` 32–64px · `--step-big` 40–84px (hero, pinned heading, contact rows, plan names) · `--step-display` 52–136px (figures and prices only). The footer wordmark is the one free size.
- Figures use tabular lining numerals (`.tnum`). Prices are written ₹1.48 Cr; Indian digit grouping (₹1,18,40,000).
- Every headline fits in two lines at every width.

## Space and frame
- One pair of outer margins: `--gutter` (16–32px). Sections are `--section` (96–192px) apart.
- Split stage: two equal columns 12px apart. The stage is `position: sticky` under the header and fills the rest of the viewport.
- Inner pages: stage left (5/12), reading column right (7/12, text held to 62ch).
- Radius is 0 everywhere. There is one button shape: a flat, square-cornered fill.

## Imagery
- Real pictures of Bengaluru and Karnataka from Wikimedia Commons, each credited in the footer (`components/Credits.tsx`). They are never presented as the project.
- Drawings of the project itself (site plan, floor plans) are flat filled shapes in the `--plan-*` tones, labelled "illustrative, not to scale".
- One moving picture: the Agara Lake monsoon loop, muted, played only on screen, poster only under reduced motion.
- **To replace with the project's own photographs:** keep the slot sizes. The hero stage is portrait, the stats mosaic 2:1 landscape, the amenity rows 3:4, the FAQ pair 3:4 plus a square.

## Motion
| Moment | Spec |
|---|---|
| Stage crossfade (signature) | Opacity, 1600ms, `--ease-in-out`, driven by the reading block in view |
| Hero entrance | Children rise 20px and fade in, staggered 80ms, 900ms `--ease-out`; stripe bars grow in 18ms apart |
| Section reveals | `[data-reveal]` children rise 24px, staggered 80ms, 760ms, once |
| Count-up | 47 and 2.1 count up over 1400ms with quartic ease-out |
| Floor-plan tab | 320ms fade and 6px rise on the swapped panel |
| Dialog | Spring in (360ms, `--ease-spring`), out in 160ms; Radix makes it interruptible |
| Header and mobile bar | Slide away while scrolling down below 1024px, return on scroll up (280ms) |
| Press | Buttons scale to 0.97 for 120ms |

Only transform and opacity are animated. `prefers-reduced-motion` drops all travel and the loop, and leaves content visible. Content never depends on script to appear: reveals only hide when `html.js` is set.

## Components: do and don't
- **Do** open every gated asset (cost sheet, brochure, plans, visit) through `LeadButton` → `LeadModal` with an `intent`.
- **Do** read every fact from `content/project.ts`; never type a price, count or date into a component.
- **Do** use real `<table>` for facts and prices; tables and form fields are the only things with 1px lines.
- **Don't** add eyebrows, pill badges, icon cards, gradients, glass or shadows on things at rest. The dialog and the fixed bars are the only things that float.
- **Don't** use monospace or index numbers (01/02/03).
- **Don't** set inputs below 16px (iOS zoom). Keep touch targets at least 44px.
