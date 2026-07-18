# Photography credits

Photographs are hotlinked from Wikimedia Commons. Image URLs live in
`src/data/media.ts` — swap them there to change the pictures.

## Cliffs of Moher (the golden-hour world — home + "Golden Hour")

- Source: [File:Cliffs of Moher, Ireland (8577753321).jpg](https://commons.wikimedia.org/wiki/File:Cliffs_of_Moher,_Ireland_(8577753321).jpg)
  on Wikimedia Commons.
- See the source page for the photographer and exact license. If the license is
  CC BY / CC BY-SA, keep this attribution and the link above; if you swap in a
  different image, update this entry to match its license.

## "Sadness" (the poem — "The Weight of Quiet")

- Julia Margaret Cameron, *Sadness* (portrait of Ellen Terry), 1864.
- Source: [File:Sadness, by Julia Margaret Cameron.jpg](https://commons.wikimedia.org/wiki/File:Sadness,_by_Julia_Margaret_Cameron.jpg)
  on Wikimedia Commons.
- **Public domain** (the author died in 1879; the work dates to 1864).

## Notes

- Images are served from the Wikimedia Commons CDN (`upload.wikimedia.org`) and
  are not bundled in this repository. To self-host instead, download the files,
  place them in `public/images/`, and point the URLs in `src/data/media.ts` at
  `import.meta.env.BASE_URL + 'images/<file>'`.
