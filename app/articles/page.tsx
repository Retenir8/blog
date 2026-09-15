import type { Metadata } from 'next';
import { ArticleExplorer } from '@/components/article-explorer';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '文章｜个人博客',
  description: '浏览关于技术、产品、思考方法与数字生活的全部文章。',
};

export default function ArticlesPage() {
  return (
    <main>
      <div className="page-nebula" aria-hidden="true" />
      <SiteHeader active="articles" />
      <section className="inner-hero">
        <p className="section-kicker">ALL NOTES</p>
        <h1>文章</h1>
        <p>筛选主题，或从一个关键词开始探索。</p>
      </section>
      <section className="content-section">
        <ArticleExplorer articles={articles} />
      </section>
      <SiteFooter />
    </main>
  );
}
