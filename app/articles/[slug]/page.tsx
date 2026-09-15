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
      <div className="page-nebula article-nebula" aria-hidden="true" />
      <SiteHeader active="articles" />

      <article className="article-page">
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

        <div className="glass-card article-body">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <nav className="article-pagination" aria-label="文章导航">
          {previousArticle ? (
            <a className="glass-card page-link previous" href={`/articles/${previousArticle.slug}`}>
              <span><ArrowLeft size={14} /> 上一篇</span>
              <strong>{previousArticle.title}</strong>
            </a>
          ) : <span />}
          {nextArticle ? (
            <a className="glass-card page-link next" href={`/articles/${nextArticle.slug}`}>
              <span>下一篇 <ArrowRight size={14} /></span>
              <strong>{nextArticle.title}</strong>
            </a>
          ) : <span />}
        </nav>
      </article>

      <SiteFooter />
    </main>
  );
}
