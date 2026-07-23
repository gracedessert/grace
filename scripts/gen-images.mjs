/**
 * Generate web-sized image variants for the essays from full-res source photos.
 *
 * Source photos live in `images-src/<essay>/` (kept out of the deployed bundle);
 * this writes right-sized, progressive JPEGs into `public/images/<essay>/`:
 *
 *   <name>-sm.jpg    768px  — phones + slow networks (srcset small candidate)
 *   <name>-md.jpg   1280px  — desktop / high-DPR (the full image; frame is ~544px)
 *   <name>-lqip.jpg   32px  — tiny blurred placeholder shown before -md loads
 *
 * `sharp` is a dev-only tool and intentionally NOT a project dependency (the site
 * build doesn't need it). To (re)generate, install it once, then run:
 *
 *   npm i -D sharp && node scripts/gen-images.mjs
 */
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join, parse } from "node:path";

const ESSAYS = ["happy-travelers"];

const VARIANTS = [
  { suffix: "sm", width: 768, quality: 72 },
  { suffix: "md", width: 1280, quality: 80 },
  { suffix: "lqip", width: 32, quality: 45 },
];

for (const essay of ESSAYS) {
  const src = join("images-src", essay);
  const out = join("public", "images", essay);
  mkdirSync(out, { recursive: true });

  const files = readdirSync(src).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const { name } = parse(file);
    for (const v of VARIANTS) {
      const dest = join(out, `${name}-${v.suffix}.jpg`);
      await sharp(join(src, file))
        .rotate() // honor EXIF orientation from phone cameras
        .resize({ width: v.width, withoutEnlargement: true })
        .jpeg({ quality: v.quality, mozjpeg: true, progressive: true })
        .toFile(dest);
      console.log("wrote", dest);
    }
  }
  console.log(`done: ${essay} (${files.length} source images)`);
}
