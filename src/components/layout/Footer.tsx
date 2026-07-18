import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`footer footer--${tone}`}>
      <p className="footer__line">
        Written in the long light. <Link to="/">Back to all essays →</Link>
      </p>
      <p className="footer__meta">grace · {year}</p>
    </footer>
  );
}
