import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: 'var(--pad)',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontStyle: 'italic',
            color: 'var(--gold-300)',
            marginBottom: '1rem',
          }}
        >
          nothing grows here
        </p>
        <p style={{ opacity: 0.75, marginBottom: '2rem' }}>
          This path led off the edge of the field.
        </p>
        <Link
          to="/"
          style={{
            borderBottom: '1px solid var(--gold-300)',
            paddingBottom: 2,
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: '1.2rem',
          }}
        >
          Walk back home →
        </Link>
      </div>
    </div>
  );
}
