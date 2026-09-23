import type { ReactNode } from 'react';
import Link from '@/components/site-link';
import { SiteHeader } from '@/components/site-header';
import { visibleSummaries } from '@/lib/articles';
import { RandomThought } from '@/components/random-thought';
import { VisitStats } from '@/components/visit-stats';

export function BlogLayout({
  children,
  active,
  right,
  left,
  wide = false,
}: {
  children: ReactNode;
  active: string;
  right?: ReactNode;
  left?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="blog-page">
      <SiteHeader active={active} />
      <div className={`blog-grid ${wide ? 'graph-layout' : ''} ${left ? 'article-grid' : ''} ${right === null ? 'no-right-sidebar' : ''}`}>
        {left ? <aside className="article-toc-sidebar" aria-label="文章目录">{left}</aside> : <aside className="left-sidebar framed" aria-label="个人信息">
          <div className="profile-block">
            <div className="avatar-placeholder">
              <img src="/retenir-avatar.jpg" alt="Retenir 的头像" width="72" height="72" />
            </div>
            <h2>Retenir</h2>
            <p>
              这个世界太想听年少有为的故事了，但漫慢来，比快快
            </p>
          </div>
          <div className="sidebar-block">
            <h3>最近在做</h3>
            <ul className="doing-list">
              <li>AI</li>
              <li>科研</li>
              <li>竞赛</li>
            </ul>
          </div>
          <div className="sidebar-block profile-links">
            <a href="https://github.com/Retenir8" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <Link href="/about#contact">
              联系我 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </aside>}
        <main id="main-content" className="main-panel framed">
          {children}
        </main>
        {right !== null && <aside className="right-sidebar" aria-label="辅助信息">
          {right ?? (
            <>
              <section className="sidebar-block framed recent-sidebar">
                <h3>近期</h3>
                {visibleSummaries.slice(0, 3).map((post) => (
                  <Link href={`/articles/${post.slug}`} key={post.slug}>
                    <time>{post.date.slice(5)}</time>
                    <span>{post.title}</span>
                  </Link>
                ))}
              </section>
              <RandomThought />
            </>
          )}
        </aside>}
      </div>
      <footer className="blog-footer">
        <span>© 2026 Retenir 的博客</span>
        <VisitStats />
        <span>慢慢记录，保持好奇。</span>
      </footer>
    </div>
  );
}

export function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="page-heading">
      <span className="heading-line" aria-hidden="true" />
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function RecentContent() {
  return (
    <>
      <PageHeading
        title="近期发布"
        description="这里记录最近更新的文章和内容。"
      />
      <div className="post-list">
        {visibleSummaries.map((post) => (
          <article className="post-item" key={post.slug}>
            <div className="post-meta">
              <time dateTime={post.dateISO}>{post.date}</time>
              <span> / </span>
              <Link href={`/archive?category=${encodeURIComponent(post.tag)}`}>
                {post.tag}
              </Link>
            </div>
            <h2>
              <Link href={`/articles/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
            <Link
              className="text-link read-post"
              href={`/articles/${post.slug}`}
            >
              阅读全文 <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
      <div className="list-end">
        <span />
        暂时就写到这里
        <span />
      </div>
    </>
  );
}
