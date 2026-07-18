/**
 * One rolling-hills silhouette band. Stacked at different heights/colors these
 * build depth for the countryside. `d` defaults to a soft double-hill ridge.
 */
export default function HillsLayer({
  color,
  className,
  d = 'M0 90 C 180 30 320 120 520 70 C 720 20 900 100 1200 60 L1200 400 L0 400 Z',
  style,
}: {
  color: string;
  className?: string;
  d?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      style={style}
    >
      <path d={d} fill={color} />
    </svg>
  );
}
