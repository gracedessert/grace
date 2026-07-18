/**
 * A subtle film-grain overlay rendered from SVG turbulence — no image asset.
 * `opacity` and `blend` let each world tune it (warm dust vs. harsh mono grain).
 */
export default function GrainOverlay({
  opacity = 0.06,
  blend = 'overlay',
}: {
  opacity?: number;
  blend?: React.CSSProperties['mixBlendMode'];
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: blend,
        zIndex: 5,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        backgroundSize: '140px 140px',
      }}
    />
  );
}
