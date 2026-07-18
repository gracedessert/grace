import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  /** seconds of delay before the reveal begins */
  delay?: number;
  /** how far it travels in, px */
  y?: number;
  className?: string;
  as?: 'div' | 'p' | 'section' | 'li' | 'h2' | 'h3';
}

/**
 * Fades and slides its children in when they scroll into view, once.
 * Respects prefers-reduced-motion by rendering fully visible with no transform.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
