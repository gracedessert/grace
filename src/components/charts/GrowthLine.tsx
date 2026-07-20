import { useRef, useState } from 'react';
import { scaleLinear, line as d3line, area as d3area } from 'd3';
import ChartFrame from './ChartFrame';
import { WFDF_MEMBER_COUNTRIES, WFDF_ACTIVE_PLAYER_GROWTH } from '../../data/ultimate';

const W = 720;
const H = 300;
const ML = 44;
const MR = 64;
const TOP = 24;
const BOT = 36;
const BLUE = '#3987e5';

export default function GrowthLine() {
  const plotRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  const data = WFDF_MEMBER_COUNTRIES;
  const x = scaleLinear().domain([2010, 2025]).range([ML, W - MR]);
  const y = scaleLinear().domain([0, 140]).range([H - BOT, TOP]);

  const line = d3line<{ year: number; countries: number }>()
    .x((d) => x(d.year))
    .y((d) => y(d.countries));
  const area = d3area<{ year: number; countries: number }>()
    .x((d) => x(d.year))
    .y0(y(0))
    .y1((d) => y(d.countries));

  const move = (e: React.MouseEvent, text: string) => {
    const r = plotRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, text });
  };

  return (
    <ChartFrame
      kicker="the twist"
      title="But everywhere else, it’s booming"
      note={`Countries with a national flying-disc federation more than doubled in fifteen years. WFDF reports active players grew ${WFDF_ACTIVE_PLAYER_GROWTH} in a single year (2023→24). The sport isn’t dying — it’s just leaving the U.S. spotlight.`}
      source="World Flying Disc Federation"
      sourceUrl="https://en.wikipedia.org/wiki/World_Flying_Disc_Federation"
      tableHead={['Year', 'WFDF member countries']}
      tableRows={data.map((d) => [d.year, d.countries])}
    >
      <div ref={plotRef} style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart: WFDF member countries grew from 53 in 2010 to 126 in 2025.">
          <defs>
            <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity="0.35" />
              <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="v-axis">
            {y.ticks(4).map((t) => (
              <g key={t}>
                <line x1={ML} x2={W - MR} y1={y(t)} y2={y(t)} stroke="#ffffff12" />
                <text x={ML - 10} y={y(t)} textAnchor="end" dominantBaseline="central">
                  {t}
                </text>
              </g>
            ))}
            {data.map((d) => (
              <text key={d.year} x={x(d.year)} y={H - BOT + 20} textAnchor="middle">
                {d.year}
              </text>
            ))}
          </g>

          <path d={area(data) ?? ''} fill="url(#growthFill)" />
          <path d={line(data) ?? ''} fill="none" stroke={BLUE} strokeWidth={3} strokeLinecap="round" />

          {data.map((d) => (
            <g
              key={d.year}
              onMouseMove={(e) => move(e, `${d.year}: ${d.countries} countries`)}
              onMouseLeave={() => setTip(null)}
            >
              <circle cx={x(d.year)} cy={y(d.countries)} r={6} fill={BLUE} stroke="#0d0d0c" strokeWidth={2} />
              <text
                className="v-value"
                x={x(d.year)}
                y={y(d.countries) - 14}
                textAnchor="middle"
              >
                {d.countries}
              </text>
            </g>
          ))}
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
