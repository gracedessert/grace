import ChartFrame from './ChartFrame';
import { SPIRIT_CATEGORIES, SPIRIT_TYPICAL } from '../../data/ultimate';

const W = 720;
const H = 120;
const ML = 24;
const MR = 24;
const TRACK_Y = 52;
const TRACK_H = 20;
const BLUE = '#3987e5';

/** 0–20 Spirit-of-the-Game scale: opponents rate each other after every game. */
export default function SpiritMeter() {
  const x = (v: number) => ML + (v / 20) * (W - ML - MR);
  const ticks = [0, 4, 8, 12, 16, 20];

  return (
    <ChartFrame
      kicker="the data no other sport has"
      title="After every game, opponents grade each other 0–20"
      note="Spirit of the Game is scored across five categories, 0–4 each. It’s the closest thing to a number for “were these people decent to play against?” — and even at the World Championships the average sits around 10."
      source="WFDF — Spirit of the Game rules & scoring"
      sourceUrl="https://wfdf.sport/spirit-of-the-game/sotg-rules-scoring/"
      tableHead={['Spirit category', 'Points']}
      tableRows={SPIRIT_CATEGORIES.map((c) => [c, '0–4'])}
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A 0 to 20 Spirit of the Game scale with a typical score near 10.">
        {/* track */}
        <rect x={ML} y={TRACK_Y} width={W - ML - MR} height={TRACK_H} rx={10} fill="#ffffff14" />
        {/* fill to typical */}
        <rect x={ML} y={TRACK_Y} width={x(SPIRIT_TYPICAL) - ML} height={TRACK_H} rx={10} fill={BLUE} />
        {/* segment dividers every 4 points */}
        {[4, 8, 12, 16].map((v) => (
          <line key={v} x1={x(v)} x2={x(v)} y1={TRACK_Y - 4} y2={TRACK_Y + TRACK_H + 4} stroke="#0d0d0c" strokeWidth={2} />
        ))}
        {/* ticks */}
        <g className="v-axis">
          {ticks.map((t) => (
            <text key={t} x={x(t)} y={TRACK_Y + TRACK_H + 22} textAnchor="middle">
              {t}
            </text>
          ))}
        </g>
        {/* typical marker */}
        <g>
          <line x1={x(SPIRIT_TYPICAL)} x2={x(SPIRIT_TYPICAL)} y1={TRACK_Y - 18} y2={TRACK_Y + TRACK_H + 4} stroke="#fff" strokeWidth={2} />
          <text className="v-value" x={x(SPIRIT_TYPICAL)} y={TRACK_Y - 24} textAnchor="middle">
            ≈ typical game (10)
          </text>
        </g>
      </svg>

      <ul className="spirit-cats">
        {SPIRIT_CATEGORIES.map((c) => (
          <li key={c}>
            <span className="spirit-cats__pts">0–4</span>
            {c}
          </li>
        ))}
      </ul>
    </ChartFrame>
  );
}
