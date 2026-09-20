import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { articles, getArticle } from '@/lib/articles';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: '文章未找到｜个人博客' };
  }

  return {
    title: `${article.title}｜个人博客`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [],
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.description,
      images: [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const articleIndex = articles.findIndex((item) => item.slug === article.slug);
  const previousArticle = articles[articleIndex + 1];
  const nextArticle = articles[articleIndex - 1];

  return (
    <main>
      <SiteHeader active="articles" />

      <article className="article-page article-page-wide">
        <a className="back-link" href="/articles">
          <ArrowLeft size={15} /> 返回全部文章
        </a>
        <header className="article-header">
          <div className="card-meta article-meta">
            <span>{article.tag}</span>
            <time dateTime={article.dateISO}>{article.date}</time>
            <i aria-hidden="true" />
            <span className="reading-time">{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.lead}</p>
        </header>

        <div className="article-reading-grid">
          <aside className="article-context" aria-label="内容位置">
            <p className="section-kicker">当前位置</p>
            <dl>
              <dt>内容类型</dt><dd>{article.type}</dd>
              <dt>所属路线</dt><dd>{article.route}</dd>
              <dt>当前节点</dt><dd>{article.node}</dd>
            </dl>
            <a href="/map">查看知识地图 <ArrowRight size={13} /></a>
          </aside>

          <div className="article-main-column">
            <div className="surface-card article-body">
              <div className="markdown-content" dangerouslySetInnerHTML={{ __html: article.html }} />
            </div>

            <nav className="article-pagination" aria-label="文章导航">
              {previousArticle ? (
                <a className="surface-card page-link previous" href={`/articles/${previousArticle.slug}`}>
                  <span><ArrowLeft size={14} /> 上一篇</span>
                  <strong>{previousArticle.title}</strong>
                </a>
              ) : <span />}
              {nextArticle ? (
                <a className="surface-card page-link next" href={`/articles/${nextArticle.slug}`}>
                  <span>下一篇 <ArrowRight size={14} /></span>
                  <strong>{nextArticle.title}</strong>
                </a>
              ) : <span />}
            </nav>
          </div>

          {article.toc.length > 0 && (
            <nav className="article-side-toc" aria-label="文章目录">
              <p className="section-kicker">本页目录</p>
              <ol>
                {article.toc.map((item) => (
                  <li className={item.level === 3 ? 'toc-subitem' : undefined} key={item.id}>
                    <a href={`#${item.id}`}>{item.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
