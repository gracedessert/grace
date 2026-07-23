import { Link } from "react-router-dom";
import "./nav.css";

/**
 * A minimal fixed masthead. `tone` lets a dark/mono essay flip the text color.
 */
export default function Nav({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <header className={`nav nav--${tone}`}>
      <Link to="/" className="nav__mark">
        grace
      </Link>
    </header>
  );
}
