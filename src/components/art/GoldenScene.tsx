import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion';
import HillsLayer from './HillsLayer';
import Deer from './Deer';
import ThornedFlower from './ThornedFlower';
import GrainOverlay from './GrainOverlay';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './golden-scene.css';

/**
 * The golden-hour countryside — a single scene driven by `progress` (0..1).
 * As progress advances the sun arcs across the sky (rise → peak → set), the sky
 * shifts dawn → noon → gold → dusk, a stag fades in, and the foreground flowers
 * bloom. Home uses it near-static (idle drift); the Golden Hour essay drives
 * `progress` from the active scroll step.
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
  /** hero layout: tuck the stag to the lower right, clear of centered text. */
  hero?: boolean;
}) {
  const reduced = useReducedMotion();

  // Smoothly animate toward the target progress so stepping feels like a glide.
  const raw = useMotionValue(idle ? 0.72 : progress);
  const p = useSpring(raw, { stiffness: 60, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    if (reduced) {
      raw.set(idle ? 0.74 : progress);
      return;
    }
    if (idle) {
      // Stay within the warm golden band so the hero never reads as cold noon.
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

  // Sun arc: left→right across the sky, low at the ends and high at midday.
  const sunX = useTransform(p, [0, 1], ['14%', '86%']);
  const sunY = useTransform(p, [0, 0.5, 1], ['70%', '20%', '74%']);
  const sunScale = useTransform(p, [0, 0.5, 1], [0.85, 1, 1.25]);

  // Phase crossfades: dawn, noon, golden, dusk.
  const dawn = useTransform(p, [0, 0.28], [1, 0]);
  const noon = useTransform(p, [0.1, 0.35, 0.62], [0, 1, 0]);
  const golden = useTransform(p, [0.5, 0.75, 0.95], [0, 1, 0.5]);
  const dusk = useTransform(p, [0.72, 1], [0, 1]);

  // Warm haze + flare strength peaks in the golden band.
  const flare = useTransform(p, [0.35, 0.75, 1], [0.15, 0.85, 0.55]);
  // Stag fades in over the back hill in the second half.
  const deerOpacity = useTransform(p, [0.32, 0.5], [0, 1]);
  const deerX = useTransform(p, [0.32, 1], ['-2%', '10%']);
  // Foreground blooms open up as the walk goes on.
  const bloom = useTransform(p, [0.15, 0.7], [0.7, 1.08]);

  return (
    <div className={`gscene${hero ? ' gscene--hero' : ''}`}>
      {/* --- sky phases --- */}
      <motion.div className="gscene__sky gscene__sky--dawn" style={{ opacity: dawn }} />
      <motion.div className="gscene__sky gscene__sky--noon" style={{ opacity: noon }} />
      <motion.div className="gscene__sky gscene__sky--golden" style={{ opacity: golden }} />
      <motion.div className="gscene__sky gscene__sky--dusk" style={{ opacity: dusk }} />

      {/* --- sun + rays + flare --- */}
      <motion.div
        className="gscene__sun-wrap"
        style={{ left: sunX, top: sunY, scale: sunScale }}
      >
        <motion.div className="gscene__rays" style={{ opacity: flare }} />
        <div className="gscene__sun" />
        <motion.div className="gscene__flare" style={{ opacity: flare }}>
          <span style={{ left: '120%' }} />
          <span style={{ left: '210%', width: 18, height: 18 }} />
          <span style={{ left: '300%', width: 34, height: 34 }} />
          <span style={{ left: '-90%', width: 12, height: 12 }} />
        </motion.div>
      </motion.div>

      {/* --- hills, back to front --- */}
      <HillsLayer
        className="gscene__hill gscene__hill--far"
        color="#8a5a4a"
        d="M0 120 C 220 60 420 140 640 100 C 860 60 1040 130 1200 90 L1200 400 L0 400 Z"
      />
      <HillsLayer
        className="gscene__hill gscene__hill--mid"
        color="#5c3f36"
        d="M0 150 C 260 90 460 170 700 130 C 940 90 1080 160 1200 130 L1200 400 L0 400 Z"
      />

      {/* --- the stag on the mid ridge --- */}
      <motion.div
        className="gscene__deer"
        style={{ opacity: deerOpacity, x: deerX }}
      >
        <Deer color="#241611" />
      </motion.div>

      {/* --- foreground hill --- */}
      <HillsLayer
        className="gscene__hill gscene__hill--near"
        color="#2b1c16"
        d="M0 210 C 300 150 520 230 760 190 C 980 155 1100 210 1200 195 L1200 400 L0 400 Z"
      />

      {/* --- foreground flowers with thorns --- */}
      <motion.div className="gscene__flowers" style={{ scale: bloom }}>
        <ThornedFlower className="gscene__flower gscene__flower--1" sway={7} />
        <ThornedFlower
          className="gscene__flower gscene__flower--2"
          bloom="#f0b0c1"
          bloomDeep="#c25275"
          sway={5.5}
        />
        <ThornedFlower
          className="gscene__flower gscene__flower--3"
          bloom="#e88aa4"
          sway={8}
        />
      </motion.div>

      <GrainOverlay opacity={0.05} blend="soft-light" />
    </div>
  );
}
