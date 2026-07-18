/**
 * A single pink flower on a thorned stem — the "beautiful thing that can still
 * cut you" motif. Draws a five-petal bloom, a curved stem, two leaves, and a
 * row of thorns. `sway` seconds animates a gentle breeze (0 disables it).
 */
export default function ThornedFlower({
  className,
  bloom = '#e79ab0',
  bloomDeep = '#b7466a',
  stem = '#3f5236',
  sway = 6,
}: {
  className?: string;
  bloom?: string;
  bloomDeep?: string;
  stem?: string;
  sway?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      role="img"
      aria-label="A pink flower on a thorned stem"
      preserveAspectRatio="xMidYMax meet"
      style={
        sway
          ? ({
              transformOrigin: '60px 250px',
              animation: `flower-sway ${sway}s ease-in-out infinite alternate`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* stem */}
      <path
        d="M60 250 C58 200 66 160 60 120 C56 96 60 80 60 70"
        fill="none"
        stroke={stem}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* thorns */}
      <g fill={stem}>
        <path d="M60 210 l12 -6 -10 -2 Z" />
        <path d="M62 182 l-12 -7 10 -1 Z" />
        <path d="M60 152 l12 -6 -10 -2 Z" />
        <path d="M61 128 l-12 -6 10 -2 Z" />
      </g>
      {/* leaves */}
      <path
        d="M60 176 C40 168 30 178 26 196 C46 196 56 190 60 176 Z"
        fill={stem}
      />
      <path
        d="M60 146 C82 140 92 152 94 170 C74 168 64 160 60 146 Z"
        fill={stem}
      />
      {/* bloom: five petals + center */}
      <g>
        <circle cx="60" cy="52" r="18" fill={bloom} />
        <circle cx="42" cy="60" r="16" fill={bloom} />
        <circle cx="78" cy="60" r="16" fill={bloom} />
        <circle cx="48" cy="40" r="15" fill={bloom} />
        <circle cx="72" cy="40" r="15" fill={bloom} />
        <circle cx="60" cy="50" r="9" fill={bloomDeep} />
      </g>
    </svg>
  );
}
