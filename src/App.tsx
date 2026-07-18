import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import EssayHost from './pages/EssayHost';
import NotFound from './pages/NotFound';

/** Scroll to top on every route change (SPA nav otherwise keeps scroll pos). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/essays/:slug" element={<EssayHost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
