import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoldenScene from '../components/art/GoldenScene';
import Reveal from '../components/scrolly/Reveal';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';
import { posts } from '../data/posts';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './home.css';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <div id="main">
      <Nav tone="light" />

      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="hero__scene">
          <GoldenScene idle hero />
          <div className="hero__scrim" />
        </div>

        <div className="hero__copy">
          <motion.p
            className="hero__eyebrow"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            essays told through scroll
          </motion.p>
          <motion.h1
            className="hero__title"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            grace
          </motion.h1>
          <motion.p
            className="hero__tagline"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Country light that only stays a moment, and the quieter, darker rooms
            it leaves behind.
          </motion.p>
        </div>

        <motion.div
          className="hero__cue"
          aria-hidden
          animate={reduced ? undefined : { y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>scroll</span>
          <span className="hero__cue-line" />
        </motion.div>
      </section>

      {/* ---------------- intro ---------------- */}
      <section className="intro">
        <div className="measure">
          <Reveal as="p" className="intro__lede">
            This is a journal kept in weather. Some entries are written at golden
            hour, when the whole field turns to honey and even the thorns look
            soft. Others are written after dark.
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Each piece is built to be <em>scrolled</em> — the images move as you
            read, the way memory does. Take your time. There is no hurry in a
            field.
          </Reveal>
        </div>
      </section>

      {/* ---------------- essay index ---------------- */}
      <section className="index">
        <Reveal as="h2" className="index__heading">
          The essays
        </Reveal>
        <ul className="index__list">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.06} className="card-wrap">
              <Link
                to={`/essays/${post.slug}`}
                className={`card${post.mono ? ' card--mono' : ''}`}
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

      <Footer />
    </div>
  );
}
