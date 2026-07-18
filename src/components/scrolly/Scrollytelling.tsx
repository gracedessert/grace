import { useState, type ReactNode } from 'react';
import ScrollStep from './ScrollStep';
import './scrolly.css';

interface ScrollytellingProps {
  /** the sticky graphic; receives the active step index so it can react */
  renderSticky: (active: number) => ReactNode;
  /** narrative steps, rendered in a scrolling column over/beside the graphic */
  steps: ReactNode[];
  /** align the text column: 'left' | 'right' | 'center' (over the graphic) */
  align?: 'left' | 'right' | 'center';
  className?: string;
}

/**
 * The core pudding.cool-style pattern: a graphic pinned with `position: sticky`
 * while a column of text steps scrolls past it. As each step reaches the middle
 * of the screen it becomes "active" and the graphic re-renders in response.
 *
 * On narrow screens the graphic sits behind the text (with a scrim) so the
 * story still reads as a single stacked column.
 */
export default function Scrollytelling({
  renderSticky,
  steps,
  align = 'left',
  className,
}: ScrollytellingProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={`scrolly scrolly--${align} ${className ?? ''}`}>
      <div className="scrolly__sticky" aria-hidden>
        {renderSticky(active)}
      </div>
      <div className="scrolly__steps">
        {steps.map((content, i) => (
          <ScrollStep
            key={i}
            index={i}
            onActive={setActive}
            className={`scrolly__step${active === i ? ' is-active' : ''}`}
          >
            {content}
          </ScrollStep>
        ))}
      </div>
    </div>
  );
}
