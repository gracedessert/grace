/**
 * A stark black-and-white portrait placeholder built from SVG — a
 * side-lit (Rembrandt) head and shoulders, most of the frame falling to black,
 * hair merging into shadow with a thin lit rim. Four variants (light from the
 * left/right, different turns) so the poem's crossfades read as different
 * frames. Drop a real photo into public/images/portraits/ and pass its URL to
 * SadPoem to replace these.
 */
const VARIANTS = [
  { keyX: 30, bright: '#efefef', turn: -5, flip: false },
  { keyX: 68, bright: '#d2d2d2', turn: 7, flip: true },
  { keyX: 26, bright: '#f6f6f6', turn: -11, flip: false },
  { keyX: 72, bright: '#c4c4c4', turn: 4, flip: true },
];

export default function PlaceholderPortrait({
  variant = 0,
  className,
}: {
  variant?: number;
  className?: string;
}) {
  const v = VARIANTS[variant % VARIANTS.length];
  const id = `pp${variant}`;
  // shadow falls on the side opposite the key light
  const shadowCx = v.flip ? 150 : 250;

  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="A black-and-white portrait"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${id}-key`} cx={`${v.keyX}%`} cy="32%" r="72%">
          <stop offset="0%" stopColor={v.bright} />
          <stop offset="40%" stopColor="#8c8c8c" />
          <stop offset="74%" stopColor="#232323" />
          <stop offset="100%" stopColor="#040404" />
        </radialGradient>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#131313" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <filter id={`${id}-soft`}>
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width="400" height="500" fill={`url(#${id}-bg)`} />

      <g
        transform={`translate(200 300) rotate(${v.turn}) translate(-200 -300)`}
        filter={`url(#${id}-soft)`}
      >
        {/* bust: shoulders sweeping up into the neck, as one seamless silhouette */}
        <path
          d="M56 500 C 60 430 96 378 154 372 C 176 369 179 344 180 316
             C 180 300 220 300 220 316 C 221 344 224 369 246 372
             C 304 378 340 430 344 500 Z"
          fill={`url(#${id}-key)`}
        />
        {/* head — overlaps the neck top so the jaw meets the neck */}
        <ellipse cx="200" cy="226" rx="80" ry="100" fill={`url(#${id}-key)`} />

        {/* shadow core carves the far side of the face into darkness */}
        <ellipse
          cx={shadowCx}
          cy="248"
          rx="72"
          ry="116"
          fill="#000"
          opacity="0.74"
          filter={`url(#${id}-shadow)`}
        />
        {/* soft neck shadow under the jaw */}
        <ellipse
          cx="200"
          cy="322"
          rx="60"
          ry="26"
          fill="#000"
          opacity="0.55"
          filter={`url(#${id}-shadow)`}
        />
      </g>

      {/* vignette */}
      <rect width="400" height="500" fill={`url(#${id}-vig)`} style={{ mixBlendMode: 'multiply' }} />
      <radialGradient id={`${id}-vig`} cx={`${v.keyX}%`} cy="40%" r="72%">
        <stop offset="48%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
      </radialGradient>
    </svg>
  );
}
