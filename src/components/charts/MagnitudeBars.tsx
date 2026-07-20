import { useRef, useState } from 'react';
import { scaleLinear, scaleBand } from 'd3';
import ChartFrame from './ChartFrame';
import { US_PARTICIPATION } from '../../data/ultimate';

const W = 720;
const ML = 132;
const MR = 64;
const TOP = 8;
const BOT = 30;
const ROW = 40;

const BLUE = '#3987e5';
const RED = '#e66767';

export default function MagnitudeBars() {
  const plotRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  const data = [...US_PARTICIPATION].sort((a, b) => b.millions - a.millions);
  const H = TOP + data.length * ROW + BOT;

  const x = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.millions)) * 1.08])
    .range([ML, W - MR]);
  const y = scaleBand<string>()
    .domain(data.map((d) => d.sport))
    .range([TOP, H - BOT])
    .padding(0.32);

  const move = (e: React.MouseEvent, text: string) => {
    const r = plotRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, text });
  };

  const fmt = (m: number) => (m >= 10 ? m.toFixed(1) : m.toFixed(2)) + 'M';

  return (
    <ChartFrame
      kicker="how small is small"
      title="…and it was already tiny"
      note="U.S. participants by sport (2024). Ultimate is a rounding error next to the games it’s often compared to — about 1 player for every 18 basketball players."
      legend={[
        { label: 'ultimate', color: RED },
        { label: 'other sports', color: BLUE },
      ]}
      source="SFIA 2024 U.S. Topline Participation Report"
      sourceUrl="https://sfia.org/resources/sfias-topline-participation-report-shows-247-1-million-americans-were-active-in-2024/"
      tableHead={['Sport', 'U.S. participants (millions)']}
      tableRows={data.map((d) => [d.sport + (d.note ? ` (${d.note})` : ''), d.millions])}
    >
      <div ref={plotRef} style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart: U.S. participants by sport in 2024, in millions.">
          <g className="v-axis">
            {x.ticks(5).map((t) => (
              <g key={t}>
                <line x1={x(t)} x2={x(t)} y1={TOP} y2={H - BOT} stroke="#ffffff12" />
                <text x={x(t)} y={H - BOT + 18} textAnchor="middle">
                  {t}M
                </text>
              </g>
            ))}
          </g>

          {data.map((d) => {
            const yy = y(d.sport)!;
            const bh = y.bandwidth();
            const bw = x(d.millions) - ML;
            const emphasize = d.sport === 'Ultimate';
            return (
              <g
                key={d.sport}
                className="v-bar"
                onMouseMove={(e) => move(e, `${d.sport}: ${fmt(d.millions)}${d.note ? ` (${d.note})` : ''}`)}
                onMouseLeave={() => setTip(null)}
              >
                <rect
                  x={ML}
                  y={yy}
                  width={Math.max(bw, 2)}
                  height={bh}
                  rx={4}
                  fill={emphasize ? RED : BLUE}
                />
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
                <text
                  className="v-value"
                  x={ML + bw + 8}
                  y={yy + bh / 2}
                  textAnchor="start"
                  dominantBaseline="central"
                >
                  {fmt(d.millions)}
                </text>
              </g>
            );
          })}
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
