import { useRef, useState } from 'react';
import { scaleLinear, scaleBand } from 'd3';
import ChartFrame from './ChartFrame';
import { CORE_CHANGE_2023 } from '../../data/ultimate';

const W = 720;
const ML = 132; // room for sport labels
const MR = 54; // room for value labels
const TOP = 8;
const BOT = 30;
const ROW = 40;

const BLUE = '#3987e5';
const RED = '#e66767';

export default function DivergingBars() {
  const plotRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  const data = [...CORE_CHANGE_2023].sort((a, b) => a.pct - b.pct);
  const H = TOP + data.length * ROW + BOT;

  const maxAbs = Math.max(...data.map((d) => Math.abs(d.pct)));
  const x = scaleLinear()
    .domain([-maxAbs * 1.15, maxAbs * 1.15])
    .range([ML, W - MR]);
  const y = scaleBand<string>()
    .domain(data.map((d) => d.sport))
    .range([TOP, H - BOT])
    .padding(0.32);

  const zeroX = x(0);

  const move = (e: React.MouseEvent, text: string) => {
    const r = plotRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, text });
  };

  return (
    <ChartFrame
      kicker="the headline"
      title="Ultimate is the fastest-shrinking team sport in America"
      note="Change in U.S. core participants, 2022 → 2023. Ultimate lost a fifth of its committed players in a single year — the steepest drop of any team sport SFIA tracks."
      legend={[
        { label: 'gained players', color: BLUE },
        { label: 'lost players', color: RED },
      ]}
      source="SFIA 2024 Team Sports Report (via SGB Media)"
      sourceUrl="https://sgbonline.com/exec-ten-takeaways-from-sfias-2024-team-sports-report/"
      tableHead={['Sport', 'Core-player change, 2022→23']}
      tableRows={data.map((d) => [d.sport, `${d.pct > 0 ? '+' : ''}${d.pct}%`])}
    >
      <div ref={plotRef} style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart: change in U.S. core participants by team sport, 2022 to 2023.">
          {/* x gridlines + ticks */}
          <g className="v-axis">
            {x.ticks(5).map((t) => (
              <g key={t}>
                <line x1={x(t)} x2={x(t)} y1={TOP} y2={H - BOT} stroke="#ffffff12" />
                <text x={x(t)} y={H - BOT + 18} textAnchor="middle">
                  {t > 0 ? `+${t}` : t}%
                </text>
              </g>
            ))}
          </g>

          {/* bars */}
          {data.map((d) => {
            const yy = y(d.sport)!;
            const bh = y.bandwidth();
            const isNeg = d.pct < 0;
            const bx = isNeg ? x(d.pct) : zeroX;
            const bw = Math.abs(x(d.pct) - zeroX);
            const label = `${d.pct > 0 ? '+' : ''}${d.pct}%`;
            const emphasize = d.sport === 'Ultimate';
            return (
              <g
                key={d.sport}
                className="v-bar"
                onMouseMove={(e) => move(e, `${d.sport}: ${label}`)}
                onMouseLeave={() => setTip(null)}
              >
                <rect
                  x={bx}
                  y={yy}
                  width={Math.max(bw, 1)}
                  height={bh}
                  rx={4}
                  fill={isNeg ? RED : BLUE}
                  opacity={emphasize || !isNeg ? 1 : 0.82}
                />
                {/* sport label */}
                <text
                  className="v-label"
                  x={ML - 12}
                  y={yy + bh / 2}
                  textAnchor="end"
                  dominantBaseline="central"
                  fontWeight={emphasize ? 700 : 400}
                  fill={emphasize ? RED : undefined}
                >
                  {d.sport}
                </text>
                {/* value label */}
                <text
                  className="v-value"
                  x={isNeg ? bx - 8 : bx + bw + 8}
                  y={yy + bh / 2}
                  textAnchor={isNeg ? 'end' : 'start'}
                  dominantBaseline="central"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* zero line */}
          <line className="v-zero" x1={zeroX} x2={zeroX} y1={TOP} y2={H - BOT} />
        </svg>
        {tip && (
          <div className="chart__tip" style={{ left: tip.x, top: tip.y }}>
            <strong>{tip.text}</strong>
          </div>
        )}
      </div>
    </ChartFrame>
  );
}
