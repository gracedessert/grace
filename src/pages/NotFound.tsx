import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "var(--pad)",
      }}
    >
      <div>
        <p style={{ opacity: 0.75, marginBottom: "2rem" }}>
          This page does not exist.
        </p>
        <Link
          to="/"
          style={{
            borderBottom: "1px solid var(--gold-300)",
            paddingBottom: 2,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "1.2rem",
          }}
        >
          back home →
        </Link>
      </div>
    </div>
  );
}
