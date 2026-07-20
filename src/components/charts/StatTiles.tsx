import { DECLINE_TILES } from '../../data/ultimate';
import './charts.css';

/**
 * Hero stat tiles — for the decline headline, where the public data is a few
 * striking anchor numbers rather than a dense series (a chart would be dishonest
 * padding; the dataviz guidance says use tiles when the number *is* the story).
 */
export default function StatTiles() {
  return (
    <div className="tiles">
      {DECLINE_TILES.map((t) => (
        <div key={t.label} className={`tile tile--${t.tone ?? 'neutral'}`}>
          <div className="tile__value">{t.value}</div>
          <div className="tile__label">{t.label}</div>
        </div>
      ))}
    </div>
  );
}
