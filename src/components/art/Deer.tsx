/**
 * A side-profile stag silhouette, composed from a filled body/neck/head plus
 * stroked legs and branching antlers (same color), so it reads clearly as a deer
 * at small sizes. Pure vector — no image asset.
 */
export default function Deer({
  color = '#1c140c',
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 200"
      className={className}
      role="img"
      aria-label="A stag standing in a field"
      preserveAspectRatio="xMidYMax meet"
    >
      <g
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* legs */}
        <line x1="102" y1="118" x2="97" y2="188" />
        <line x1="120" y1="120" x2="122" y2="188" />
        <line x1="156" y1="120" x2="150" y2="188" />
        <line x1="172" y1="118" x2="177" y2="188" />
      </g>

      {/* body + neck + head + tail (filled) */}
      <g fill={color}>
        <ellipse cx="134" cy="100" rx="52" ry="26" />
        {/* tail */}
        <path d="M184 92 C 194 92 196 104 188 112 L182 100 Z" />
        {/* neck */}
        <path d="M96 108 L82 84 L62 52 L80 48 L108 92 Z" />
        {/* head */}
        <ellipse cx="64" cy="48" rx="15" ry="10" transform="rotate(-18 64 48)" />
        {/* muzzle */}
        <path d="M52 54 L38 52 L42 62 L56 60 Z" />
        {/* ear */}
        <path d="M72 40 L82 34 L76 46 Z" />
      </g>

      {/* antlers */}
      <g
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* front beam sweeping up and back, with tines */}
        <path d="M62 40 C 58 24 66 14 72 4" />
        <path d="M60 30 L 50 22" />
        <path d="M65 20 L 58 9" />
        <path d="M71 9 L 80 4" />
        {/* back beam */}
        <path d="M66 38 C 74 24 86 18 98 12" />
        <path d="M76 26 L 74 12" />
        <path d="M86 20 L 90 8" />
      </g>
    </svg>
  );
}
