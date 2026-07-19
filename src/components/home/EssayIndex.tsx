import Reveal from "../scrolly/Reveal";
import { posts } from "../../data/posts";
import { Link } from "react-router-dom";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function EssayIndex() {
  return (
    <section className="index">
      <Reveal as="h2" className="index__heading">
        The essays
      </Reveal>
      <ul className="index__list">
        {posts.map((post, i) => (
          <Reveal
            as="li"
            key={post.slug}
            delay={i * 0.06}
            className="card-wrap"
          >
            <Link
              to={`/essays/${post.slug}`}
              className={`card${post.mono ? " card--mono" : ""}`}
            >
              <span
                className="card__swatch"
                style={{
                  background: `linear-gradient(135deg, ${post.swatch[0]}, ${post.swatch[1]})`,
                }}
              >
                <span className="card__kicker">{post.kicker}</span>
              </span>
              <span className="card__body">
                <span className="card__title">{post.title}</span>
                <span className="card__sub">{post.subtitle}</span>
                <span className="card__date">{fmtDate(post.date)}</span>
                <span className="card__cta" style={{ color: post.accent }}>
                  read →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
