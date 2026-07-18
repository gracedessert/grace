import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A thin reading-progress bar fixed to the top of the viewport, tied to the
 * whole-page scroll. Color is passed per essay so each world keeps its accent.
 */
export default function ProgressBar({ color = '#eab758' }: { color?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: color,
        zIndex: 100,
      }}
    />
  );
}
