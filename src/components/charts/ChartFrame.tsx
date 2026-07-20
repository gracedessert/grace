import { useId, useState, type ReactNode } from 'react';
import './charts.css';

export interface LegendItem {
  label: string;
  color: string;
}

interface ChartFrameProps {
  title: string;
  kicker?: string;
  /** short prose beneath the title */
  note?: string;
  legend?: LegendItem[];
  source: string;
  sourceUrl?: string;
  /** accessible table fallback */
  tableHead: string[];
  tableRows: (string | number)[][];
  children: ReactNode;
}

/**
 * Shared wrapper for every chart: a titled <figure> with an optional legend,
 * the chart itself, a "show the numbers" table toggle (accessibility — identity
 * is never color-only, and the data is always readable), and a cited source.
 */
export default function ChartFrame({
  title,
  kicker,
  note,
  legend,
  source,
  sourceUrl,
  tableHead,
  tableRows,
  children,
}: ChartFrameProps) {
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();

  return (
    <figure className="chart">
      <figcaption className="chart__head">
        {kicker && <p className="chart__kicker">{kicker}</p>}
        <h3 className="chart__title">{title}</h3>
        {note && <p className="chart__note">{note}</p>}
      </figcaption>

      {legend && legend.length > 0 && (
        <ul className="chart__legend" aria-hidden>
          {legend.map((l) => (
            <li key={l.label}>
              <span className="chart__swatch" style={{ background: l.color }} />
              {l.label}
            </li>
          ))}
        </ul>
      )}

      <div className="chart__plot">{children}</div>

      <div className="chart__foot">
        <button
          type="button"
          className="chart__toggle"
          aria-expanded={showTable}
          aria-controls={tableId}
          onClick={() => setShowTable((s) => !s)}
        >
          {showTable ? 'Hide the numbers' : 'Show the numbers'}
        </button>
        <span className="chart__source">
          Source:{' '}
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          ) : (
            source
          )}
        </span>
      </div>

      {showTable && (
        <div className="chart__table-wrap" id={tableId}>
          <table className="chart__table">
            <thead>
              <tr>
                {tableHead.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
}
