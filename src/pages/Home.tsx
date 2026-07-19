import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./home.css";

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <div id="main">
      {/* <Nav tone="light" /> */}

      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="hero__copy">
          <motion.p
            className="hero__eyebrow"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            personal essays
          </motion.p>
          <motion.h1
            className="hero__title"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            grace
          </motion.h1>
        </div>
      </section>
    </div>
  );
}
