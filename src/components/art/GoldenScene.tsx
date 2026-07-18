import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion';
import GrainOverlay from './GrainOverlay';
import { CLIFFS_IMG } from '../../data/media';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './golden-scene.css';

// A scatter of lens-flare dots strung along the sun's optical axis, plus a few
// ambient bokeh motes. left/top are % of the scene; size in px; o = opacity.
const FLARE_DOTS = [
  { left: 122, top: 50, size: 26, o: 0.75 },
  { left: 158, top: 50, size: 12, o: 0.5 },
  { left: 210, top: 50, size: 20, o: 0.6 },
  { left: 275, top: 50, size: 36, o: 0.45 },
  { left: 330, top: 50, size: 14, o: 0.4 },
  { left: 402, top: 50, size: 48, o: 0.3 },
  { left: -70, top: 50, size: 12, o: 0.5 },
  { left: -150, top: 50, size: 22, o: 0.35 },
];
const BOKEH = [
  { left: '12%', top: '26%', size: 90, o: 0.1 },
  { left: '82%', top: '18%', size: 60, o: 0.14 },
  { left: '68%', top: '70%', size: 120, o: 0.08 },
  { left: '30%', top: '62%', size: 46, o: 0.12 },
  { left: '90%', top: '52%', size: 30, o: 0.16 },
];

/**
 * The golden-hour world: a color photograph of the Cliffs of Moher with a
 * warm-to-dusk light wash and a bright sun + lens flare + scattered light dots
 * overlaid. Driven by `progress` (0..1): the sun arcs across the sky and the
 * light wash deepens from midday gold to dusk. Home uses `idle` (slow drift);
 * the Golden Hour essay drives `progress` from the active scroll step.
 */
export default function GoldenScene({
  progress = 0.72,
  idle = false,
  hero = false,
}: {
  /** target sun position, 0 (dawn) .. 1 (dusk). Ignored when `idle`. */
  progress?: number;
  /** slowly drift through the golden band on its own (home hero). */
  idle?: boolean;
  /** hero layout tweaks (kept for API compatibility with callers). */
  hero?: boolean;
}) {
  const reduced = useReducedMotion();

  const raw = useMotionValue(idle ? 0.72 : progress);
  const p = useSpring(raw, { stiffness: 60, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    if (reduced) {
      raw.set(idle ? 0.74 : progress);
      return;
    }
    if (idle) {
      const controls = animate(raw, [0.66, 0.84, 0.7], {
        duration: 34,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      });
      return () => controls.stop();
    }
    const controls = animate(raw, progress, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [progress, idle, reduced, raw]);

  // Sun arc: left→right across the sky, low at the ends, higher near midday.
  const sunX = useTransform(p, [0, 1], ['16%', '84%']);
  const sunY = useTransform(p, [0, 0.5, 1], ['58%', '20%', '66%']);
  const sunScale = useTransform(p, [0, 0.5, 1], [0.9, 1, 1.3]);

  // Warm light wash: gold at midday deepening to rose/dusk as the sun sets.
  const goldWash = useTransform(p, [0.4, 0.72, 1], [0.35, 0.62, 0.32]);
  const duskWash = useTransform(p, [0.68, 1], [0, 0.7]);
  // Flare strength peaks in the golden band.
  const flare = useTransform(p, [0.35, 0.75, 1], [0.4, 1, 0.7]);

  return (
    <div className={`gscene${hero ? ' gscene--hero' : ''}`}>
      {/* fallback color sits behind the photo so the layout never reads empty */}
      <div className="gscene__fallback" />
      <div
        className="gscene__photo"
        style={{ backgroundImage: `url("${CLIFFS_IMG}")` }}
      />

      {/* warm-to-dusk light wash */}
      <motion.div className="gscene__wash gscene__wash--gold" style={{ opacity: goldWash }} />
      <motion.div className="gscene__wash gscene__wash--dusk" style={{ opacity: duskWash }} />

      {/* ambient bokeh motes */}
      <div className="gscene__bokeh" aria-hidden>
        {BOKEH.map((b, i) => (
          <span
            key={i}
            style={{ left: b.left, top: b.top, width: b.size, height: b.size, opacity: b.o }}
          />
        ))}
      </div>

      {/* sun + rays + lens-flare dots */}
      <motion.div
        className="gscene__sun-wrap"
        style={{ left: sunX, top: sunY, scale: sunScale }}
      >
        <motion.div className="gscene__rays" style={{ opacity: flare }} />
        <div className="gscene__sun" />
        <motion.div className="gscene__flare" style={{ opacity: flare }}>
          {FLARE_DOTS.map((d, i) => (
            <span
              key={i}
              style={{
                left: `${d.left}%`,
                width: d.size,
                height: d.size,
                marginTop: -d.size / 2,
                opacity: d.o,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <GrainOverlay opacity={0.06} blend="soft-light" />
    </div>
  );
}
