# Portraits — the sad poem

The poem essay uses a black-and-white portrait defined in `src/data/media.ts`
(`PORTRAIT_IMG`). By default it hotlinks Julia Margaret Cameron's *Sadness*
(1864) from Wikimedia Commons.

To use your own photograph:

1. Drop an image file in this folder, e.g. `portrait.jpg`.
2. In `src/data/media.ts`, set:

   ```ts
   export const PORTRAIT_IMG = import.meta.env.BASE_URL + 'images/portraits/portrait.jpg';
   ```

Notes

- Color photos are fine — grayscale + contrast is applied in CSS, so the image
  reads as black and white automatically.
- Portrait orientation (4:5) works best; the image is `object-fit: cover`.
