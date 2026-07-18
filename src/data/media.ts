/**
 * Photography used across the site. These are hotlinked from Wikimedia Commons
 * (stable CDN, free licenses). Swap a URL here to change the picture everywhere
 * it is used — nothing else needs to change. If you prefer to self-host, drop a
 * file in `public/images/` and point the URL at
 * `import.meta.env.BASE_URL + 'images/your-file.jpg'`.
 *
 * Credits (see CREDITS.md):
 * - Cliffs: "Cliffs of Moher, Ireland" via Wikimedia Commons.
 * - Portrait: "Sadness" (Ellen Terry, 1864) by Julia Margaret Cameron —
 *   public domain, via Wikimedia Commons.
 */

// Color photograph of the Cliffs of Moher — the golden-hour world.
export const CLIFFS_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cliffs_of_Moher%2C_Ireland_%288577753321%29.jpg/1280px-Cliffs_of_Moher%2C_Ireland_%288577753321%29.jpg';
export const CLIFFS_SRC =
  'https://commons.wikimedia.org/wiki/File:Cliffs_of_Moher,_Ireland_(8577753321).jpg';

// Black-and-white portrait — the poem world.
export const PORTRAIT_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sadness%2C_by_Julia_Margaret_Cameron.jpg/1024px-Sadness%2C_by_Julia_Margaret_Cameron.jpg';
export const PORTRAIT_SRC =
  'https://commons.wikimedia.org/wiki/File:Sadness,_by_Julia_Margaret_Cameron.jpg';
