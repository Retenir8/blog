import type { ReactNode } from 'react';
import Link from '@/components/site-link';
import { SiteHeader } from '@/components/site-header';
import { visibleSummaries } from '@/lib/articles';
import { RandomThought } from '@/components/random-thought';

export function BlogLayout({
  children,
  active,
  right,
  wide = false,
}: {
  children: ReactNode;
  active: string;
  right?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="blog-page">
      <SiteHeader active={active} />
      <div className={`blog-grid ${wide ? 'graph-layout' : ''}`}>
        <aside className="left-sidebar framed" aria-label="个人信息">
          <div className="profile-block">
            <div className="avatar-placeholder" aria-label="头像占位">
              我
            </div>
            <h2>用户名</h2>
            <p>
              一句话自我介绍占位。
              <br />
              记录、思考、慢慢生长。
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
            <span>
              GitHub <small>待补充</small>
            </span>
            <Link href="/about#contact">
              联系我 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </aside>
        <main id="main-content" className="main-panel framed">
          {children}
        </main>
        <aside className="right-sidebar" aria-label="辅助信息">
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
        </aside>
      </div>
      <footer className="blog-footer">
        <span>© 2026 个人博客</span>
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
        {visibleSummaries.map((post, index) => (
          <article className="post-item" key={post.slug}>
            <div className="post-meta">
              <time dateTime={post.dateISO}>{post.date}</time>
              <span> / </span>
              <Link href={`/archive?category=${encodeURIComponent(post.tag)}`}>
                {post.tag}
              </Link>
              {index === 0 && <span className="pinned-label">置顶</span>}
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
