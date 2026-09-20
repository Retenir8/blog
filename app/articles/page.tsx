import type { Metadata } from 'next';
import { ArticleExplorer } from '@/components/article-explorer';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { articleSummaries } from '@/lib/articles';

export const metadata: Metadata = {
  title: '内容检索｜个人博客',
  description: '按关键词、主题与内容类型检索博客中的全部记录。',
};

export default function ArticlesPage() {
  return (
    <main>
      <SiteHeader active="articles" />
      <section className="inner-hero">
        <p className="section-kicker">CONTENT INDEX / 内容检索</p>
        <h1>从一个主题或关键词，找到下一篇值得读的内容。</h1>
        <p>所有 Markdown 内容都会在构建时进入这个索引，并按指南、实践与思考分组。</p>
      </section>
      <section className="content-section">
        <ArticleExplorer articles={articleSummaries} />
      </section>
      <SiteFooter />
    </main>
  );
}
