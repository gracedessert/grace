import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../data/posts';
import Nav from '../components/layout/Nav';
import NotFound from './NotFound';

/**
 * Resolves :slug to an essay, sets the tab title, and frames it with the
 * masthead. The essay component owns its own world (background, footer, tone).
 */
export default function EssayHost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} — grace`;
    return () => {
      document.title = 'grace — essays told through scroll';
    };
  }, [post]);

  if (!post) return <NotFound />;

  const Essay = post.component;
  return (
    <div className={post.mono ? 'world-mono' : undefined} style={{ background: 'var(--bg)' }}>
      <Nav tone={post.mono ? 'dark' : 'light'} />
      <main id="main">
        <Essay />
      </main>
    </div>
  );
}
