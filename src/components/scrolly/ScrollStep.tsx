import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollStepProps {
  /** index reported to the parent when this step crosses the trigger line */
  index: number;
  onActive: (index: number) => void;
  children: ReactNode;
  className?: string;
}

/**
 * One narrative step in a scrollytelling column. Fires `onActive(index)` when it
 * crosses a horizontal trigger band near the vertical middle of the viewport —
 * the same "waypoint" idea Scrollama uses. The sticky graphic listens to the
 * active index and changes state accordingly.
 */
export default function ScrollStep({
  index,
  onActive,
  children,
  className,
}: ScrollStepProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onActive(index);
        }
      },
      {
        // A thin band centered vertically: a step is "active" while it sits in
        // the middle third of the viewport.
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onActive]);

  return (
    <div ref={ref} className={className} data-step={index}>
      {children}
    </div>
  );
}
