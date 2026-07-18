# Portraits — the sad poem

The poem essay (`src/pages/posts/SadPoem.tsx`) ships with drawn black-and-white
placeholder portraits so the site looks finished out of the box. To use your own
photography:

1. Drop image files in this folder, e.g. `01.jpg`, `02.jpg`, `03.jpg`, `04.jpg`.
2. Open `src/pages/posts/SadPoem.tsx` and edit the `PORTRAITS` array:

   ```ts
   const PORTRAITS: (string | null)[] = [
     import.meta.env.BASE_URL + 'images/portraits/01.jpg',
     import.meta.env.BASE_URL + 'images/portraits/02.jpg',
     import.meta.env.BASE_URL + 'images/portraits/03.jpg',
     import.meta.env.BASE_URL + 'images/portraits/04.jpg',
   ];
   ```

   Leave any entry as `null` to keep the placeholder for that frame.

Notes

- Color photos are fine — grayscale + contrast is applied in CSS, so they read
  as black and white automatically.
- Portrait orientation (4:5) works best; images are `object-fit: cover`.
- `PORTRAIT_FOR_STANZA` in the same file controls which portrait shows for each
  stanza — adjust it if you add more photos or stanzas.
