import { BrowserRouter, Routes, Route, Link, useParams, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { allPosts, getPost, relatedPosts, allTags } from './lib/posts';
import { SubscribeForm } from './components/SubscribeForm';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <header className="site-header">
        <div className="container site-header-inner">
          <Link to="/" className="brand">Vuelo Labs</Link>
          <nav className="nav">
            <Link to="/blog">Writing</Link>
            <a href="https://linguist.vuelolabs.com" target="_blank" rel="noopener">
              Linguist
            </a>
            <Link to="/subscribe">Subscribe</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} · Built by Vuelo Labs</div>
      </footer>
    </div>
  );
}

function Landing() {
  const recent = allPosts().slice(0, 3);
  return (
    <Shell>
      <section className="hero">
        <div className="container">
          <p className="section-eyebrow" style={{ marginBottom: '1rem' }}>Built by Vuelo Labs</p>
          <h1>An AI-enabled analyst, sharing the journey.</h1>
          <p className="lede">
            I'm Liam. Analyst by trade. I write about what it's actually like to do this job
            now — AI in the loop, real stakeholders, finite warmth — and the small moves that
            seem to help.
          </p>
          <p className="lede" style={{ fontSize: '1rem', opacity: 0.8 }}>
            Lived experience. AI-assisted. Take what's useful, leave what's not.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Writing</p>
          <h2>Recent writing.</h2>
          <p className="section-lede">
            Things I've actually tried. Not advice. Not prescriptive. Just how I fared.
          </p>
          <ul className="post-list">
            {recent.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="post-card">
                  <div className="post-date">{formatDate(p.date)}</div>
                  <h3 className="post-title">{p.title}</h3>
                  {p.subtitle && <p className="post-subtitle">{p.subtitle}</p>}
                  {p.tags.length > 0 && (
                    <ul className="tag-list tag-list--inline">
                      {p.tags.map((t) => (
                        <li key={t}><span className="tag-pill tag-pill--sm">{t}</span></li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/blog" className="section-cta">All writing →</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Newsletter</p>
          <h2>Get the next one.</h2>
          <p className="section-lede">
            Essays straight to your inbox. None of the Medium overhead — no paywall,
            no algorithm, no chrome. Just the writing. Unsubscribe whenever.
          </p>
          <SubscribeForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Projects</p>
          <h2>Linguist</h2>
          <div className="linguist-card">
            <h3>A cleaner way to work with the machine.</h3>
            <p>
              Linguist is where I go on, at length, about getting work done with AI without
              burning your warmth on the bot. A sustainable way to interact with machines cleanly.
            </p>
            <a
              href="https://linguist.vuelolabs.com"
              target="_blank"
              rel="noopener"
              className="section-cta"
            >
              Visit Linguist →
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}

function BlogIndex() {
  const [params, setParams] = useSearchParams();
  const activeTag = params.get('tag');
  const tags = allTags();
  const posts = allPosts().filter((p) => !activeTag || p.tags.includes(activeTag));

  function selectTag(tag: string | null) {
    if (!tag) setParams({});
    else setParams({ tag });
  }

  return (
    <Shell>
      <section className="hero">
        <div className="container">
          <h1>Writing</h1>
          <p className="lede">
            Essays on analytics, decisions, and doing useful work. Originally published on Medium.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tag-filter">
            <button
              type="button"
              className={`tag-pill tag-pill--button ${!activeTag ? 'is-active' : ''}`}
              onClick={() => selectTag(null)}
            >
              all ({allPosts().length})
            </button>
            {tags.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                className={`tag-pill tag-pill--button ${activeTag === tag ? 'is-active' : ''}`}
                onClick={() => selectTag(tag)}
              >
                {tag} ({count})
              </button>
            ))}
          </div>
          {posts.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', marginTop: '2rem' }}>
              No posts tagged <strong>{activeTag}</strong> yet.
            </p>
          ) : (
            <ul className="post-list">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="post-card">
                    <div className="post-date">{formatDate(p.date)}</div>
                    <h3 className="post-title">{p.title}</h3>
                    {p.subtitle && <p className="post-subtitle">{p.subtitle}</p>}
                    {p.tags.length > 0 && (
                      <ul className="tag-list tag-list--inline">
                        {p.tags.map((t) => (
                          <li key={t}><span className="tag-pill tag-pill--sm">{t}</span></li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Shell>
  );
}

function PostView() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  if (!post) {
    return (
      <Shell>
        <section className="hero">
          <div className="container">
            <p>Post not found. <Link to="/blog">Back to writing</Link></p>
          </div>
        </section>
      </Shell>
    );
  }
  const related = relatedPosts(post.slug);
  return (
    <Shell>
      <article>
        <header className="post-hero">
          <div className="container">
            <div className="post-date">{formatDate(post.date)}</div>
            <h1>{post.title}</h1>
            {post.subtitle && <p className="post-subtitle">{post.subtitle}</p>}
            {post.tags.length > 0 && (
              <ul className="tag-list">
                {post.tags.map((t) => (
                  <li key={t}>
                    <Link to={`/blog?tag=${t}`} className="tag-pill tag-pill--link">{t}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>
        <div className="container">
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>
          {post.canonical && (
            <p className="post-footer">
              Originally published on{' '}
              <a href={post.canonical} target="_blank" rel="noopener">Medium</a>.
            </p>
          )}
          {related.length > 0 && (
            <section className="related">
              <p className="section-eyebrow">Related</p>
              <ul className="related-list">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="post-card">
                      <div className="post-date">{formatDate(p.date)}</div>
                      <h3 className="post-title">{p.title}</h3>
                      {p.subtitle && <p className="post-subtitle">{p.subtitle}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Link to="/blog" className="back-link">← All writing</Link>
        </div>
      </article>
    </Shell>
  );
}

function SubscribePage() {
  return (
    <Shell>
      <section className="hero">
        <div className="container">
          <h1>Subscribe.</h1>
          <p className="lede">
            Essays straight to your inbox, without the Medium overhead. One a week, roughly.
            Lived experience. Not advice. Pick what's useful, ignore the rest.
          </p>
          <p className="lede" style={{ fontSize: '1rem', opacity: 0.8 }}>
            No paywall, no algorithm, no upsell. Unsubscribe with one click.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SubscribeForm />
          <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Your email is stored with{' '}
            <a href="https://resend.com" target="_blank" rel="noopener" style={{ color: 'var(--accent-gold)' }}>
              Resend
            </a>
            . Used only to send these essays.
          </p>
        </div>
      </section>
    </Shell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<PostView />} />
        <Route path="/posts/:slug" element={<PostView />} />
        <Route path="/subscribe" element={<SubscribePage />} />
      </Routes>
    </BrowserRouter>
  );
}
