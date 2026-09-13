# NPPUG site design notes

The 2026 restyle. Read this before adding a page or a section so the site keeps
looking like one thing.

## The idea

Warm, editorial, event-first. Cream ground, white cards, one purple accent. The next
meetup is the hero object on the homepage. Amber is reserved for "free" and sponsor
highlights. Dark ink bands are for emphasis, at most one per page.

No gradients, no drop shadows on cards (a soft hover shadow on event and speaker cards
is the exception), no coloured left-border accents, no emoji as icons.

## Type

- Display: Bricolage Grotesque (800 for headlines, 700 for card titles). Loaded from
  Google Fonts in `src/layouts/BaseLayout.astro`. Falls back to Segoe UI.
- Body: Instrument Sans (400/500/600/700).
- `h1` to `h4` pick up the display face automatically via `global.css`.

## Tokens

All in `@theme` in `src/styles/global.css`. Use them as Tailwind utilities:
`text-text-light`, `bg-primary-tint`, `border-border`, `bg-ink`, etc.

| Purpose | Token | Value |
| --- | --- | --- |
| Page ground | `background` | `#FBF9F5` |
| Card surface | `surface` | `#FFFFFF` |
| Hairlines | `border` | `#E6E2DA` |
| Ink / headings | `text` | `#1E1B2E` |
| Body copy | `text-light` | `#5B5870` |
| Accent | `primary` | `#7C3AED` |
| Accent tint | `primary-tint` | `#F1EBFE` |
| Free / sponsor | `secondary` | `#F59E0B` |
| Dark band | `ink` | `#1E1B2E` |
| Dark card | `ink-raised` | `#29253D` |

Product colours (`power-apps`, `power-automate`, `power-bi`, `power-pages`,
`copilot-studio`) are for small swatches only, never large fills.

## Vocabulary

Defined in `@layer components` in `global.css`. Prefer these over ad-hoc utility piles.

- Layout: `.wrap` (page width), `.section`, `.section-white`, `.section-dark`, `.page-hero`
- Headings: `.kicker` (small caps label), `.h-display`, `.h-section`, `.h-card`, `.lede`
- Buttons: `.btn` plus `.btn-primary` | `.btn-ghost` | `.btn-ghost-on-dark` | `.btn-amber`,
  sized with `.btn-sm` | `.btn-lg`
- Links: `.link-arrow` (put a 16px arrow SVG inside)
- Cards: `.card`, `.card-muted`, `.card-dark`, `.card-tint`
- Pills: `.pill`, `.pill-free`, `.pill-primary`
- Forms: `.input`, `.input-block`, `textarea.input`

Every inner page starts with `<Hero title subtitle kicker? />`.

## Content

- Site facts live in `src/config.ts` (stats, links, newsletter action). Keep the
  proof-bar numbers honest and update them quarterly.
- Events: `src/content/events/*.md`. If a speaker has no profile in
  `src/content/speakers/`, list the talk under `sessions:` (title, speaker, optional
  image) and it renders on the homepage ticket and the event page.
- Speaker cutouts go in `public/images/speakers/` as small WebP files.

## Working files

The approved design canvas and its source artboards live outside the repo at
`Desktop\NPPUG-Redesign-2026\`.
