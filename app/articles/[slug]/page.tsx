import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { notFound } from 'next/navigation';
import { BlogLayout } from '@/components/blog-layout';
import { ArticleToc } from '@/components/article-toc';
import { visibleArticles, getArticle } from '@/lib/articles';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return visibleArticles.map((article) => ({
    slug: article.slug,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article
    ? {
        title: `${article.title}｜Retenir 的博客`,
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
      }
    : { title: '文章未找到｜Retenir 的博客' };
}
export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const collection = visibleArticles;
  const index = collection.findIndex((item) => item.slug === article.slug);
  const previous = collection[index + 1],
    next = collection[index - 1];
  return (
    <BlogLayout active="blog" left={<ArticleToc items={article.toc} />} right={null}>
      <Link className="article-back" href="/blog">
        ← 返回近期发布
      </Link>
      <header className="article-heading">
        <h1>{article.title}</h1>
        <div className="post-meta">
          <time dateTime={article.dateISO}>{article.date}</time>
          <span>·</span>
          <span>{article.tag}</span>
          <span>·</span>
          <span>{article.readingTime}</span>
        </div>
        <p>{article.lead}</p>
      </header>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
      <nav className="article-neighbors" aria-label="相关内容">
        {previous ? (
          <Link href={`/articles/${previous.slug}`}>
            <small>上一篇</small>
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/articles/${next.slug}`}>
            <small>下一篇</small>
            {next.title}
          </Link>
        ) : (
          <Link href="/archive">
            <small>继续阅读</small>查看全部内容 ↗
          </Link>
        )}
      </nav>
    </BlogLayout>
  );
}
