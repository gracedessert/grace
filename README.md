# grace

Personal essays.

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
to `main` (and on manual dispatch).

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

## Accessibility

- Honors `prefers-reduced-motion`: heavy animation freezes and all text is shown
  at once instead of being gated behind scroll.
- Scrollytelling has a mobile fallback — the graphic sits behind the text with a
  scrim so each story still reads as one column on small screens.
