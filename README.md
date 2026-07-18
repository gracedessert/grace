# grace

A scrollytelling personal-essay journal — the kind of scroll-driven storytelling
you see on [pudding.cool](https://pudding.cool), reframed as a writing space.
The home is Ireland at golden hour (sun flares, a stag, pink flowers with
thorns); each essay is its own visual world. The first two:

- **Golden Hour** — a walk at dusk where the landscape transforms as you scroll:
  the sun arcs from noon to dusk, the sky shifts, a stag steps in, the flowers
  bloom.
- **The Weight of Quiet** — a sad poem in stark black and white, with portraits
  that crossfade between stanzas.

Built with **Vite + React + TypeScript** and **Framer Motion**. All imagery is
generated SVG/CSS — no external assets — so it runs fast and looks finished out
of the box. Real photography can be dropped in later (see below).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173/grace/
```

Other scripts:

```bash
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
```

## Deploy (GitHub Pages)

A workflow at `.github/workflows/deploy.yml` builds and publishes on every push
to `main` (and on manual dispatch). **One-time setup:** in the repo, go to
**Settings → Pages → Build and deployment → Source: GitHub Actions**. After that,
the site publishes to:

```
https://gracedessert.github.io/grace/
```

The `base` is set to `/grace/` in `vite.config.ts`. If you rename the repo,
update that value. Client-side deep links work on Pages via the
`public/404.html` redirect + the restore snippet in `index.html`.

## Add a new essay

1. Create a component in `src/pages/posts/YourEssay.tsx` — give it its own look.
   Reuse the building blocks:
   - `Scrollytelling` (`src/components/scrolly/`) — the sticky-graphic +
     scrolling-steps pattern. Pass `renderSticky(active)` and a `steps` array.
   - `Reveal`, `ProgressBar`, and the art in `src/components/art/`.
2. Register it in `src/data/posts.ts` (slug, title, subtitle, date, accent,
   swatch colors). The router and the home index pick it up automatically.

## Use real photography (the poem)

The poem ships with drawn black-and-white placeholder portraits. To use your own,
drop images in `public/images/portraits/` and edit the `PORTRAITS` array in
`src/pages/posts/SadPoem.tsx`. See `public/images/portraits/README.md` for the
exact snippet. Grayscale + contrast is applied in CSS, so color photos become
black and white automatically.

## Accessibility

- Honors `prefers-reduced-motion`: heavy animation freezes and all text is shown
  at once instead of being gated behind scroll.
- Scrollytelling has a mobile fallback — the graphic sits behind the text with a
  scrim so each story still reads as one column on small screens.

## Structure

```
src/
  data/posts.ts              essay registry → routes + home index
  components/
    scrolly/                 Scrollytelling, ScrollStep, Reveal, ProgressBar
    art/                     GoldenScene, Deer, ThornedFlower, PlaceholderPortrait, …
    layout/                  Nav, Footer
  pages/
    Home.tsx                 golden-hour landing + essay index
    EssayHost.tsx            resolves :slug and frames the essay
    posts/GoldenHour.tsx     warm scrollytelling essay
    posts/SadPoem.tsx        black-and-white poem world
```
